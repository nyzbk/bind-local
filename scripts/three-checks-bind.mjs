#!/usr/bin/env node
/**
 * Bind three-checks:
 * 1. Security — no POST/PUT of image or PDF content
 * 2. Images → PDF — 3 JPEGs become a 3-page PDF
 * 3. PDF → Images + errors — extract ZIP; HEIC reject; password PDF message
 */
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { chromium } from "playwright";
import { PDFDocument } from "pdf-lib";
import JSZip from "jszip";

const BASE = process.env.BIND_CHECK_URL || "http://127.0.0.1:8080";
const FIX = "/workspace/tmp/bind-fixtures";
const OUT = "/workspace/screenshots";
mkdirSync(OUT, { recursive: true });

const posts = [];
const result = {
  security: { pass: false, posts: [] },
  imagesToPdf: { pass: false, pages: 0, size: 0 },
  pdfToImages: { pass: false, zipEntries: [] },
  heic: { pass: false, message: "" },
  password: { pass: false, message: "" },
  legal: {},
  adsTxt: {},
  ctaHeight: 0,
};

const browser = await chromium.launch({ args: ["--no-sandbox"] });
const page = await browser.newPage({ acceptDownloads: true, viewport: { width: 1280, height: 900 } });

page.on("request", (req) => {
  const method = req.method();
  const url = req.url();
  if (["POST", "PUT"].includes(method) && /\.(jpg|jpeg|png|pdf|webp|gif|heic)|application\/pdf|image\//i.test(url + (req.headers()["content-type"] || ""))) {
    posts.push({ method, url });
  }
  if (["POST", "PUT"].includes(method)) {
    const postData = req.postData() || "";
    if (postData.includes("%PDF") || postData.startsWith("\xff\xd8") || postData.includes("ftyp")) {
      posts.push({ method, url, note: "body looks like a file" });
    }
  }
});

async function fileChooserSet(locator, files) {
  const [chooser] = await Promise.all([page.waitForEvent("filechooser"), locator.click()]);
  await chooser.setFiles(files);
}

try {
  await page.goto(BASE + "/", { waitUntil: "networkidle" });

  // --- 2. Images → PDF ---
  await fileChooserSet(page.getByRole("button", { name: "Choose images" }), [
    `${FIX}/red-800x600.jpg`,
    `${FIX}/green-1200x400.jpg`,
    `${FIX}/blue-400x900.jpg`,
  ]);
  await page.getByText("3 images").waitFor({ timeout: 10000 });
  const bindBtn = page.getByRole("button", { name: "Bind to PDF" }).first();
  const box = await bindBtn.boundingBox();
  result.ctaHeight = box?.height ?? 0;
  const [download] = await Promise.all([
    page.waitForEvent("download", { timeout: 30000 }),
    bindBtn.click().then(async () => {
      await page.getByRole("button", { name: "Download PDF" }).waitFor({ timeout: 25000 });
      await page.getByRole("button", { name: "Download PDF" }).click();
    }),
  ]);
  const pdfPath = `${OUT}/bind-three-images.pdf`;
  await download.saveAs(pdfPath);
  const pdfBytes = readFileSync(pdfPath);
  const loaded = await PDFDocument.load(pdfBytes);
  result.imagesToPdf.pages = loaded.getPageCount();
  result.imagesToPdf.size = pdfBytes.byteLength;
  result.imagesToPdf.pass = result.imagesToPdf.pages === 3 && result.imagesToPdf.size > 1000;
  await page.screenshot({ path: `${OUT}/bind-images-to-pdf.png`, fullPage: true });

  // --- 3a. PDF → Images ---
  await page.goto(BASE + "/pdf-to-images", { waitUntil: "networkidle" });
  await fileChooserSet(page.getByRole("button", { name: "Choose PDF" }), `${FIX}/sample-3p.pdf`);
  await page.getByText(/3 pages/).waitFor({ timeout: 15000 });
  await page.getByRole("button", { name: "Extract images" }).first().click();
  await page.getByRole("button", { name: "Download ZIP" }).waitFor({ timeout: 30000 });
  const [zipDownload] = await Promise.all([
    page.waitForEvent("download", { timeout: 15000 }),
    page.getByRole("button", { name: "Download ZIP" }).click(),
  ]);
  const zipPath = `${OUT}/bind-pages.zip`;
  await zipDownload.saveAs(zipPath);
  const zip = await JSZip.loadAsync(readFileSync(zipPath));
  result.pdfToImages.zipEntries = Object.keys(zip.files).sort();
  result.pdfToImages.pass =
    result.pdfToImages.zipEntries.length === 3 &&
    result.pdfToImages.zipEntries.every((name) => /^page-00[123]\.png$/.test(name));
  await page.screenshot({ path: `${OUT}/bind-pdf-to-images.png`, fullPage: true });

  // --- 3b. HEIC reject ---
  await page.goto(BASE + "/", { waitUntil: "networkidle" });
  await fileChooserSet(page.getByRole("button", { name: "Choose images" }), `${FIX}/photo.heic`);
  const heicAlert = page.getByRole("alert");
  await heicAlert.waitFor({ timeout: 8000 });
  result.heic.message = (await heicAlert.innerText()).trim();
  result.heic.pass = /HEIC Local/i.test(result.heic.message);

  // --- 3c. password PDF ---
  await page.goto(BASE + "/pdf-to-images", { waitUntil: "networkidle" });
  await fileChooserSet(page.getByRole("button", { name: "Choose PDF" }), `${FIX}/password.pdf`);
  const pwd = page.locator("text=/Password-protected|could not be opened|corrupt/i").first();
  await pwd.waitFor({ timeout: 15000 });
  result.password.message = (await pwd.innerText()).trim();
  result.password.pass = /password/i.test(result.password.message) || /could not be opened/i.test(result.password.message);

  // --- legal + ads.txt ---
  for (const path of ["/privacy", "/terms", "/about", "/ads.txt"]) {
    const res = await page.goto(BASE + path, { waitUntil: "domcontentloaded" });
    result.legal[path] = res?.status() ?? 0;
  }
  const ads = await (await page.goto(BASE + "/ads.txt")).text();
  result.adsTxt.body = ads.trim();
  result.adsTxt.pass = ads.includes("google.com, pub-7636435144500691, DIRECT, f08c47fec0942fa0");

  result.security.posts = posts;
  result.security.pass = posts.length === 0;
} finally {
  await browser.close();
}

const allPass =
  result.security.pass &&
  result.imagesToPdf.pass &&
  result.pdfToImages.pass &&
  result.heic.pass &&
  result.password.pass &&
  result.adsTxt.pass &&
  result.ctaHeight >= 44 &&
  ["/privacy", "/terms", "/about"].every((p) => result.legal[p] === 200);

writeFileSync(`${OUT}/bind-three-checks.json`, JSON.stringify({ allPass, result }, null, 2));
console.log(JSON.stringify({ allPass, result }, null, 2));
process.exit(allPass ? 0 : 1);
