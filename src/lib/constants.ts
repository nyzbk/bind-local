export const APP_NAME = "Bind";
export const APP_TAGLINE = "Images to PDF & PDF to Images";
export const APP_DESCRIPTION =
  "Convert images to PDF or extract PDF pages as images. 100% private, client-side, no signup, no watermark.";

export const ADSENSE_CLIENT = "ca-pub-7636435144500691";
export const AGENCY_NAME = "Ultimatum";
export const AGENCY_URL =
  (typeof import.meta !== "undefined" && import.meta.env?.VITE_AGENCY_URL) ||
  "https://ultimatum.studio";

export const MEMORY_WARN_BYTES = 80 * 1024 * 1024;
export const MAX_CANVAS_EDGE = 4096;
export const MAX_PAGE_POINTS = 14400;

export const ACCEPT_IMAGES = ".jpg,.jpeg,.png,.webp,.bmp,.gif,image/jpeg,image/png,image/webp,image/bmp,image/gif";
export const ACCEPT_PDF = ".pdf,application/pdf";

export const FAQ = [
  {
    q: "Is Bind really private?",
    a: "Yes. All conversion happens in your browser. Files are never uploaded to a server.",
  },
  {
    q: "Do I need to create an account?",
    a: "No. No signup, no email, no limits beyond your browser’s memory.",
  },
  {
    q: "What image formats can I convert to PDF?",
    a: "JPG, PNG, WebP, BMP and static GIF. HEIC is not supported directly — convert with HEIC Local first, then Bind.",
  },
  {
    q: "Can I extract only some pages from a PDF?",
    a: "Yes. Use a custom page range such as 1-3,5,8-10.",
  },
  {
    q: "Why is the PDF or image quality lower than expected?",
    a: "You control quality and scale. For PDF to images use 2× or 3× scale and PNG for lossless output.",
  },
  {
    q: "Does it work on iPhone / iPad?",
    a: "Yes. iOS Safari is a supported critical path for both directions.",
  },
  {
    q: "Is there a file size limit?",
    a: "No artificial product limit. Extremely large files may hit browser memory limits — try fewer files or a lower scale.",
  },
  {
    q: "Can I reorder images before making a PDF?",
    a: "Yes. Drag items in the list, or use the up and down controls on a phone.",
  },
] as const;
