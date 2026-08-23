function ascii(bytes: Uint8Array, start: number, len: number): string {
  return String.fromCharCode(...bytes.slice(start, start + len)).toLowerCase();
}

function isHeicBrand(brand: string): boolean {
  return ["heic", "heix", "heif", "hevc", "hevx", "mif1", "msf1"].includes(brand);
}

export type SniffKind = "image" | "pdf" | "heic" | "unsupported";

export async function sniffFile(file: File): Promise<{ kind: SniffKind; detail?: string }> {
  const name = file.name || "";
  const type = (file.type || "").toLowerCase();
  const head = new Uint8Array(await file.slice(0, 16).arrayBuffer());

  if (/\.(heic|heif|heics)$/i.test(name) || type.includes("heic") || type.includes("heif")) {
    return { kind: "heic" };
  }
  if (head.length >= 12 && ascii(head, 4, 4) === "ftyp") {
    const brand = ascii(head, 8, 4);
    if (isHeicBrand(brand)) return { kind: "heic" };
    if (brand === "avif") return { kind: "unsupported", detail: "AVIF is not supported. Use JPEG, PNG, or WebP." };
  }

  if (head[0] === 0x25 && head[1] === 0x50 && head[2] === 0x44 && head[3] === 0x46) {
    return { kind: "pdf" };
  }
  if (head[0] === 0xff && head[1] === 0xd8 && head[2] === 0xff) return { kind: "image" };
  if (head[0] === 0x89 && head[1] === 0x50 && head[2] === 0x4e && head[3] === 0x47) return { kind: "image" };
  if (head[0] === 0x47 && head[1] === 0x49 && head[2] === 0x46) return { kind: "image" };
  if (head[0] === 0x42 && head[1] === 0x4d) return { kind: "image" };
  if (ascii(head, 0, 4) === "riff" && ascii(head, 8, 4) === "webp") return { kind: "image" };

  if (type === "application/pdf" || /\.pdf$/i.test(name)) return { kind: "pdf" };
  if (
    /\.(jpe?g|png|webp|bmp|gif)$/i.test(name) ||
    type === "image/jpeg" ||
    type === "image/png" ||
    type === "image/webp" ||
    type === "image/bmp" ||
    type === "image/gif"
  ) {
    return { kind: "image" };
  }

  return { kind: "unsupported", detail: "Unsupported file type. Use JPEG, PNG, WebP, BMP, GIF, or PDF." };
}

export const HEIC_MESSAGE = "Convert in HEIC Local first, then Bind";
export const PASSWORD_PDF_MESSAGE = "Password-protected PDFs are not supported in this free tool";
export const WORKER_FAIL_MESSAGE = "Browser PDF engine failed to load — refresh";
