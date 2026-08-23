import { Download, Share2 } from "lucide-react";
import { AdUnit } from "./AdUnit";
import { SoftAgencyCta } from "./SoftAgencyCta";
import { formatBytes } from "@/lib/format";
import type { ExtractedImage } from "@/lib/types";

type PdfResult = {
  kind: "pdf";
  blob: Blob;
  name: string;
  pages: number;
};

type ImagesResult = {
  kind: "images";
  items: ExtractedImage[];
  zipName: string;
};

type Props = {
  result: PdfResult | ImagesResult;
  onDownloadPdf: () => void;
  onSharePdf?: () => void;
  onDownloadImage: (item: ExtractedImage) => void;
  onDownloadZip: () => void;
};

export function ResultsPanel({ result, onDownloadPdf, onSharePdf, onDownloadImage, onDownloadZip }: Props) {
  if (result.kind === "pdf") {
    return (
      <section className="rounded-[12px] border border-border bg-surface p-4 shadow-card sm:p-5">
        <p className="text-sm font-medium text-ok">PDF ready</p>
        <p className="mt-1 font-mono text-xs text-muted">
          {result.name} · {result.pages} {result.pages === 1 ? "page" : "pages"} · {formatBytes(result.blob.size)}
        </p>
        <div className="mt-4 flex flex-col gap-2 sm:flex-row">
          <button
            type="button"
            onClick={onDownloadPdf}
            className="inline-flex min-h-11 flex-1 items-center justify-center gap-2 rounded-[8px] bg-accent px-4 text-sm font-medium text-accent-ink hover:bg-accent-deep"
          >
            <Download className="size-4" />
            Download PDF
          </button>
          {onSharePdf ? (
            <button
              type="button"
              onClick={onSharePdf}
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-[8px] border border-border px-4 text-sm font-medium hover:bg-bg"
            >
              <Share2 className="size-4" />
              Share
            </button>
          ) : null}
        </div>
        <AdUnit slot="after-success" className="mt-5" />
        <SoftAgencyCta variant="after-success" className="mt-4" />
      </section>
    );
  }

  return (
    <section className="rounded-[12px] border border-border bg-surface p-4 shadow-card sm:p-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-sm font-medium text-ok">Images ready</p>
          <p className="mt-1 font-mono text-xs text-muted">
            {result.items.length} {result.items.length === 1 ? "page" : "pages"}
          </p>
        </div>
        <button
          type="button"
          onClick={onDownloadZip}
          className="inline-flex min-h-11 items-center justify-center gap-2 rounded-[8px] bg-accent px-4 text-sm font-medium text-accent-ink hover:bg-accent-deep"
        >
          <Download className="size-4" />
          Download ZIP
        </button>
      </div>
      <ul className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
        {result.items.map((item) => (
          <li key={item.name} className="overflow-hidden rounded-[8px] border border-border bg-bg">
            <img src={item.url} alt={item.name} className="aspect-[3/4] w-full object-contain bg-surface" />
            <div className="flex items-center justify-between gap-2 px-2 py-2">
              <span className="truncate font-mono text-[11px] text-muted">{item.name}</span>
              <button
                type="button"
                onClick={() => onDownloadImage(item)}
                className="min-h-11 min-w-11 text-xs font-medium text-accent-deep hover:underline"
              >
                Download
              </button>
            </div>
          </li>
        ))}
      </ul>
      <AdUnit slot="after-success" className="mt-5" />
      <SoftAgencyCta variant="after-success" className="mt-4" />
    </section>
  );
}
