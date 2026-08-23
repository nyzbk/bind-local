import { MAX_CANVAS_EDGE } from "./constants";
import { openPdfDocument } from "./pdfjs";
import type { PdfToImagesOptions, RasterFormat } from "./types";

export type RenderedPage = {
  name: string;
  blob: Blob;
  page: number;
  width: number;
  height: number;
};

export function parsePageRange(input: string, pageCount: number): number[] {
  const trimmed = input.trim();
  if (!trimmed || trimmed.toLowerCase() === "all") {
    return Array.from({ length: pageCount }, (_, i) => i + 1);
  }
  const pages = new Set<number>();
  for (const raw of trimmed.split(",")) {
    const part = raw.trim();
    if (!part) continue;
    if (part.includes("-")) {
      const [aRaw, bRaw] = part.split("-");
      const a = Number.parseInt(aRaw ?? "", 10);
      const b = Number.parseInt(bRaw ?? "", 10);
      if (!Number.isFinite(a) || !Number.isFinite(b)) {
        throw new Error("Invalid page range. Use 1-3,5,8-10.");
      }
      const start = Math.min(a, b);
      const end = Math.max(a, b);
      for (let p = start; p <= end; p++) {
        if (p >= 1 && p <= pageCount) pages.add(p);
      }
    } else {
      const p = Number.parseInt(part, 10);
      if (!Number.isFinite(p)) {
        throw new Error("Invalid page range. Use 1-3,5,8-10.");
      }
      if (p >= 1 && p <= pageCount) pages.add(p);
    }
  }
  if (pages.size === 0) {
    throw new Error("No pages in that range match this PDF.");
  }
  return [...pages].sort((a, b) => a - b);
}

function canvasToBlob(canvas: HTMLCanvasElement, type: string, quality?: number): Promise<Blob> {
  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (!blob) reject(new Error("Could not encode image"));
        else resolve(blob);
      },
      type,
      quality,
    );
  });
}

function mimeFor(format: RasterFormat): string {
  if (format === "png") return "image/png";
  if (format === "webp") return "image/webp";
  return "image/jpeg";
}

function extFor(type: string): string {
  if (type === "image/png") return "png";
  if (type === "image/webp") return "webp";
  return "jpg";
}

async function mapPool<T, R>(items: T[], limit: number, worker: (item: T, index: number) => Promise<R>): Promise<R[]> {
  const results: R[] = new Array(items.length);
  let next = 0;
  async function run(): Promise<void> {
    while (next < items.length) {
      const index = next++;
      results[index] = await worker(items[index], index);
    }
  }
  const n = Math.max(1, Math.min(limit, items.length));
  await Promise.all(Array.from({ length: n }, () => run()));
  return results;
}

export async function pdfToImages(
  file: File,
  options: PdfToImagesOptions,
  onProgress?: (current: number, total: number, label: string) => void,
): Promise<RenderedPage[]> {
  const data = new Uint8Array(await file.arrayBuffer());
  const pdf = await openPdfDocument(data);
  try {
    if (pdf.numPages < 1) throw new Error("This PDF has no pages.");
    const range = options.pages === "all" ? "all" : options.pages;
    const pages = parsePageRange(range, pdf.numPages);
    const concurrency = typeof navigator !== "undefined" && navigator.maxTouchPoints > 0 ? 1 : 2;

    return await mapPool(pages, concurrency, async (pageNum, index) => {
      onProgress?.(index + 1, pages.length, `Page ${pageNum}`);
      const page = await pdf.getPage(pageNum);
      let scale = options.scale;
      let viewport = page.getViewport({ scale });
      const maxEdge = Math.max(viewport.width, viewport.height);
      if (maxEdge > MAX_CANVAS_EDGE) {
        scale *= MAX_CANVAS_EDGE / maxEdge;
        viewport = page.getViewport({ scale });
      }
      const canvas = document.createElement("canvas");
      canvas.width = Math.max(1, Math.ceil(viewport.width));
      canvas.height = Math.max(1, Math.ceil(viewport.height));
      const ctx = canvas.getContext("2d", { alpha: false });
      if (!ctx) throw new Error("Canvas unavailable in this browser.");
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      await page.render({ canvas, canvasContext: ctx, viewport }).promise;

      const preferred = mimeFor(options.format);
      let blob: Blob;
      try {
        blob = await canvasToBlob(canvas, preferred, options.quality);
      } catch {
        blob = await canvasToBlob(canvas, "image/png");
      }
      const ext = extFor(blob.type);
      return {
        name: `page-${String(pageNum).padStart(3, "0")}.${ext}`,
        blob,
        page: pageNum,
        width: canvas.width,
        height: canvas.height,
      };
    });
  } finally {
    await pdf.cleanup();
  }
}
