export type BindMode = "images-to-pdf" | "pdf-to-images";

export type PageSize = "a4" | "letter" | "fit" | "custom";
export type Orientation = "portrait" | "landscape" | "auto";
export type Margins = "none" | "small" | "medium" | "large";
export type ImageFit = "contain" | "cover" | "stretch";
export type RasterFormat = "png" | "jpeg" | "webp";

export type ImagesToPdfOptions = {
  pageSize: PageSize;
  customWidthMm: number;
  customHeightMm: number;
  orientation: Orientation;
  margins: Margins;
  fit: ImageFit;
  quality: number;
};

export type PdfToImagesOptions = {
  pages: "all" | string;
  format: RasterFormat;
  scale: 1 | 1.5 | 2 | 3;
  quality: number;
};

export type ImageItem = {
  id: string;
  file: File;
  name: string;
  size: number;
  thumbUrl: string;
  error?: string;
};

export type PdfItem = {
  id: string;
  file: File;
  name: string;
  size: number;
  pageCount?: number;
  thumbUrl?: string;
  error?: string;
};

export type ExtractedImage = {
  name: string;
  blob: Blob;
  page: number;
  width: number;
  height: number;
  url: string;
};

export const DEFAULT_IMAGES_OPTIONS: ImagesToPdfOptions = {
  pageSize: "fit",
  customWidthMm: 210,
  customHeightMm: 297,
  orientation: "auto",
  margins: "medium",
  fit: "contain",
  quality: 0.92,
};

export const DEFAULT_PDF_OPTIONS: PdfToImagesOptions = {
  pages: "all",
  format: "png",
  scale: 2,
  quality: 0.92,
};
