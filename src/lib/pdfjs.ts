import type { PDFDocumentProxy } from "pdfjs-dist";
import { PASSWORD_PDF_MESSAGE, WORKER_FAIL_MESSAGE } from "./magic";

type PdfjsModule = typeof import("pdfjs-dist");

let pdfjsPromise: Promise<PdfjsModule> | null = null;

export async function loadPdfjs(): Promise<PdfjsModule> {
  if (typeof window === "undefined") {
    throw new Error("PDF engine is only available in the browser.");
  }
  if (!pdfjsPromise) {
    pdfjsPromise = import("pdfjs-dist")
      .then((pdfjs) => {
        if (!pdfjs.GlobalWorkerOptions.workerSrc) {
          pdfjs.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.mjs";
        }
        return pdfjs;
      })
      .catch((err) => {
        pdfjsPromise = null;
        const message = err instanceof Error ? err.message : String(err);
        throw new Error(`${WORKER_FAIL_MESSAGE} (${message})`);
      });
  }
  return pdfjsPromise;
}

export async function openPdfDocument(data: Uint8Array): Promise<PDFDocumentProxy> {
  const pdfjs = await loadPdfjs();
  try {
    const task = pdfjs.getDocument({
      data: data.slice(),
      password: "",
      useSystemFonts: true,
    });
    return await task.promise;
  } catch (err) {
    const name = (err as { name?: string })?.name ?? "";
    const message = err instanceof Error ? err.message : String(err);
    if (name === "PasswordException" || /password/i.test(message)) {
      throw new Error(PASSWORD_PDF_MESSAGE);
    }
    if (/worker/i.test(message) || name === "MissingPDFException") {
      throw new Error(WORKER_FAIL_MESSAGE);
    }
    throw new Error("This PDF could not be opened. It may be corrupt.");
  }
}

export async function renderPdfPageThumb(file: File, scale = 0.35): Promise<{ pageCount: number; thumbUrl?: string }> {
  const data = new Uint8Array(await file.arrayBuffer());
  const pdf = await openPdfDocument(data);
  const pageCount = pdf.numPages;
  if (pageCount < 1) {
    await pdf.cleanup();
    throw new Error("This PDF has no pages.");
  }
  try {
    const page = await pdf.getPage(1);
    const viewport = page.getViewport({ scale });
    const canvas = document.createElement("canvas");
    canvas.width = Math.max(1, Math.ceil(viewport.width));
    canvas.height = Math.max(1, Math.ceil(viewport.height));
    const ctx = canvas.getContext("2d");
    if (!ctx) return { pageCount };
    await page.render({ canvas, canvasContext: ctx, viewport }).promise;
    const blob = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, "image/jpeg", 0.72));
    return { pageCount, thumbUrl: blob ? URL.createObjectURL(blob) : undefined };
  } finally {
    await pdf.cleanup();
  }
}
