import { PDFDocument } from "pdf-lib";
import { MAX_CANVAS_EDGE, MAX_PAGE_POINTS } from "./constants";
import type { ImageFit, ImagesToPdfOptions, Margins, Orientation, PageSize } from "./types";

const MM_TO_PT = 72 / 25.4;

const PAGE_SIZES: Record<Exclude<PageSize, "fit" | "custom">, readonly [number, number]> = {
  a4: [595.28, 841.89],
  letter: [612, 792],
};

const MARGIN_MM: Record<Margins, number> = {
  none: 0,
  small: 8,
  medium: 12,
  large: 20,
};

function mmToPt(mm: number): number {
  return mm * MM_TO_PT;
}

function orient(width: number, height: number, imgW: number, imgH: number, orientation: Orientation): [number, number] {
  let w = width;
  let h = height;
  if (orientation === "landscape" && w < h) [w, h] = [h, w];
  if (orientation === "portrait" && w > h) [w, h] = [h, w];
  if (orientation === "auto") {
    const wantLandscape = imgW > imgH;
    const isLandscape = w > h;
    if (wantLandscape !== isLandscape) [w, h] = [h, w];
  }
  return [w, h];
}

async function decodeBitmap(file: File): Promise<ImageBitmap> {
  if (typeof createImageBitmap === "function") {
    try {
      return await createImageBitmap(file, { imageOrientation: "from-image" } as ImageBitmapOptions);
    } catch {
      // fall through to HTMLImageElement
    }
  }
  const url = URL.createObjectURL(file);
  try {
    const img = new Image();
    img.decoding = "async";
    await new Promise<void>((resolve, reject) => {
      img.onload = () => resolve();
      img.onerror = () => reject(new Error(`Could not decode ${file.name}`));
      img.src = url;
    });
    if (typeof createImageBitmap === "function") {
      return await createImageBitmap(img);
    }
    const canvas = document.createElement("canvas");
    canvas.width = img.naturalWidth || img.width;
    canvas.height = img.naturalHeight || img.height;
    const ctx = canvas.getContext("2d");
    if (!ctx) throw new Error("Canvas unavailable");
    ctx.drawImage(img, 0, 0);
    return await createImageBitmap(canvas);
  } finally {
    URL.revokeObjectURL(url);
  }
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

function drawFitted(
  ctx: CanvasRenderingContext2D,
  bitmap: ImageBitmap,
  boxW: number,
  boxH: number,
  fit: ImageFit,
): void {
  const imgW = bitmap.width;
  const imgH = bitmap.height;
  if (fit === "stretch") {
    ctx.drawImage(bitmap, 0, 0, boxW, boxH);
    return;
  }
  if (fit === "cover") {
    const scale = Math.max(boxW / imgW, boxH / imgH);
    const drawW = imgW * scale;
    const drawH = imgH * scale;
    ctx.drawImage(bitmap, (boxW - drawW) / 2, (boxH - drawH) / 2, drawW, drawH);
    return;
  }
  const scale = Math.min(boxW / imgW, boxH / imgH);
  const drawW = imgW * scale;
  const drawH = imgH * scale;
  ctx.drawImage(bitmap, (boxW - drawW) / 2, (boxH - drawH) / 2, drawW, drawH);
}

export async function imagesToPdf(
  files: File[],
  options: ImagesToPdfOptions,
  onProgress?: (current: number, total: number, label: string) => void,
): Promise<Blob> {
  if (files.length === 0) throw new Error("Add at least one image.");
  const pdf = await PDFDocument.create();
  const marginPt = mmToPt(MARGIN_MM[options.margins]);

  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    onProgress?.(i + 1, files.length, file.name);
    const bitmap = await decodeBitmap(file);
    const imgW = bitmap.width;
    const imgH = bitmap.height;

    let pageW: number;
    let pageH: number;
    if (options.pageSize === "fit") {
      pageW = imgW + marginPt * 2;
      pageH = imgH + marginPt * 2;
      if (options.orientation === "landscape" && pageW < pageH) [pageW, pageH] = [pageH, pageW];
      if (options.orientation === "portrait" && pageW > pageH) [pageW, pageH] = [pageH, pageW];
    } else if (options.pageSize === "custom") {
      [pageW, pageH] = orient(
        mmToPt(options.customWidthMm || 210),
        mmToPt(options.customHeightMm || 297),
        imgW,
        imgH,
        options.orientation,
      );
    } else {
      const size = PAGE_SIZES[options.pageSize];
      [pageW, pageH] = orient(size[0], size[1], imgW, imgH, options.orientation);
    }

    if (pageW > MAX_PAGE_POINTS || pageH > MAX_PAGE_POINTS) {
      const s = MAX_PAGE_POINTS / Math.max(pageW, pageH);
      pageW *= s;
      pageH *= s;
    }

    const availableW = Math.max(1, pageW - marginPt * 2);
    const availableH = Math.max(1, pageH - marginPt * 2);

    const dpiScale = 2;
    let pxW = Math.round(availableW * dpiScale);
    let pxH = Math.round(availableH * dpiScale);
    const maxEdge = Math.max(pxW, pxH);
    if (maxEdge > MAX_CANVAS_EDGE) {
      const s = MAX_CANVAS_EDGE / maxEdge;
      pxW = Math.max(1, Math.round(pxW * s));
      pxH = Math.max(1, Math.round(pxH * s));
    }

    const canvas = document.createElement("canvas");
    canvas.width = pxW;
    canvas.height = pxH;
    const ctx = canvas.getContext("2d");
    if (!ctx) {
      bitmap.close();
      throw new Error("Canvas unavailable in this browser.");
    }

    const hasAlpha = file.type === "image/png" || file.type === "image/webp" || file.type === "image/gif";
    const usePng = hasAlpha && options.quality >= 0.98;
    if (!usePng) {
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, pxW, pxH);
    }
    drawFitted(ctx, bitmap, pxW, pxH, options.fit);
    bitmap.close();

    const blob = await canvasToBlob(canvas, usePng ? "image/png" : "image/jpeg", options.quality);
    const bytes = new Uint8Array(await blob.arrayBuffer());
    const image = usePng ? await pdf.embedPng(bytes) : await pdf.embedJpg(bytes);
    const page = pdf.addPage([pageW, pageH]);
    page.drawImage(image, {
      x: marginPt,
      y: marginPt,
      width: availableW,
      height: availableH,
    });
  }

  const saved = await pdf.save();
  const copy = new Uint8Array(saved.byteLength);
  copy.set(saved);
  return new Blob([copy], { type: "application/pdf" });
}
