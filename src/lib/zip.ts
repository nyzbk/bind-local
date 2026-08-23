import JSZip from "jszip";

export async function zipBlobs(
  entries: { name: string; blob: Blob }[],
  onProgress?: (done: number, total: number) => void,
): Promise<Blob> {
  const zip = new JSZip();
  entries.forEach((entry) => {
    zip.file(entry.name, entry.blob);
  });
  return zip.generateAsync({ type: "blob" }, (meta) => {
    if (onProgress) onProgress(Math.round(meta.percent), 100);
  });
}
