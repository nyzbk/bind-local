import { useCallback, useEffect, useMemo, useState } from "react";
import { ControlsImagesToPdf } from "./ControlsImagesToPdf";
import { ControlsPdfToImages } from "./ControlsPdfToImages";
import { Dropzone } from "./Dropzone";
import { FileList } from "./FileList";
import { ModeSwitcher } from "./ModeSwitcher";
import { PdfFileCard } from "./PdfFileCard";
import { ProgressBar } from "./ProgressBar";
import { ResultsPanel } from "./ResultsPanel";
import { MEMORY_WARN_BYTES } from "@/lib/constants";
import { downloadBlob, shareOrDownload } from "@/lib/download";
import { formatBytes, newId, sanitizeFilename, stemFromFilename } from "@/lib/format";
import { imagesToPdf } from "@/lib/imagesToPdf";
import { HEIC_MESSAGE, sniffFile } from "@/lib/magic";
import { parsePageRange, pdfToImages } from "@/lib/pdfToImages";
import { renderPdfPageThumb } from "@/lib/pdfjs";
import { zipBlobs } from "@/lib/zip";
import {
  DEFAULT_IMAGES_OPTIONS,
  DEFAULT_PDF_OPTIONS,
  type BindMode,
  type ExtractedImage,
  type ImageItem,
  type ImagesToPdfOptions,
  type PdfItem,
  type PdfToImagesOptions,
} from "@/lib/types";

type PdfResult = { kind: "pdf"; blob: Blob; name: string; pages: number };
type ImagesResult = { kind: "images"; items: ExtractedImage[]; zipName: string };

export function BindApp({ mode }: { mode: BindMode }) {
  const [images, setImages] = useState<ImageItem[]>([]);
  const [pdf, setPdf] = useState<PdfItem | null>(null);
  const [notice, setNotice] = useState<string | null>(null);
  const [imagesOptions, setImagesOptions] = useState<ImagesToPdfOptions>(DEFAULT_IMAGES_OPTIONS);
  const [pdfOptions, setPdfOptions] = useState<PdfToImagesOptions>(DEFAULT_PDF_OPTIONS);
  const [busy, setBusy] = useState(false);
  const [progress, setProgress] = useState<{ current: number; total: number; label: string } | null>(null);
  const [result, setResult] = useState<PdfResult | ImagesResult | null>(null);
  const [rangeError, setRangeError] = useState<string | undefined>();

  useEffect(() => {
    setNotice(null);
    setResult(null);
    setProgress(null);
    setRangeError(undefined);
  }, [mode]);

  useEffect(() => {
    return () => {
      images.forEach((item) => URL.revokeObjectURL(item.thumbUrl));
    };
  }, [images]);

  useEffect(() => {
    return () => {
      if (pdf?.thumbUrl) URL.revokeObjectURL(pdf.thumbUrl);
    };
  }, [pdf]);

  useEffect(() => {
    return () => {
      if (result?.kind === "images") result.items.forEach((item) => URL.revokeObjectURL(item.url));
    };
  }, [result]);

  const totalBytes = useMemo(() => {
    if (mode === "images-to-pdf") return images.reduce((sum, item) => sum + item.size, 0);
    return pdf?.size ?? 0;
  }, [mode, images, pdf]);

  const validImages = images.filter((item) => !item.error);
  const canBind = mode === "images-to-pdf" ? validImages.length > 0 && !busy : Boolean(pdf && !pdf.error && !busy && !rangeError);

  useEffect(() => {
    if (mode !== "pdf-to-images" || !pdf?.pageCount || pdfOptions.pages === "all") {
      setRangeError(undefined);
      return;
    }
    try {
      parsePageRange(pdfOptions.pages, pdf.pageCount);
      setRangeError(undefined);
    } catch (err) {
      setRangeError(err instanceof Error ? err.message : "Invalid page range");
    }
  }, [mode, pdf, pdfOptions.pages]);

  const addFiles = useCallback(
    async (files: File[]) => {
      setNotice(null);
      setResult(null);
      const messages: string[] = [];

      if (mode === "images-to-pdf") {
        const next: ImageItem[] = [];
        for (const file of files) {
          const sniff = await sniffFile(file);
          if (sniff.kind === "heic") {
            messages.push(`${file.name}: ${HEIC_MESSAGE}`);
            continue;
          }
          if (sniff.kind === "pdf") {
            messages.push(`${file.name}: switch to PDF → Images to extract pages.`);
            continue;
          }
          if (sniff.kind !== "image") {
            messages.push(`${file.name}: ${sniff.detail ?? "unsupported file"}`);
            continue;
          }
          next.push({
            id: newId(),
            file,
            name: file.name,
            size: file.size,
            thumbUrl: URL.createObjectURL(file),
          });
        }
        if (next.length) setImages((prev) => [...prev, ...next]);
      } else {
        const file = files[0];
        if (!file) return;
        if (files.length > 1) messages.push("Only one PDF at a time. Extra files were ignored.");
        const sniff = await sniffFile(file);
        if (sniff.kind === "heic") {
          messages.push(HEIC_MESSAGE);
        } else if (sniff.kind === "image") {
          messages.push("Switch to Images → PDF to bind photos into a document.");
        } else if (sniff.kind !== "pdf") {
          messages.push(sniff.detail ?? "That is not a PDF.");
        } else {
          if (pdf?.thumbUrl) URL.revokeObjectURL(pdf.thumbUrl);
          const item: PdfItem = { id: newId(), file, name: file.name, size: file.size };
          setPdf(item);
          try {
            const info = await renderPdfPageThumb(file);
            setPdf((current) =>
              current && current.id === item.id
                ? { ...current, pageCount: info.pageCount, thumbUrl: info.thumbUrl }
                : current,
            );
          } catch (err) {
            setPdf((current) =>
              current && current.id === item.id
                ? { ...current, error: err instanceof Error ? err.message : "Could not read this PDF." }
                : current,
            );
          }
        }
      }

      if (messages.length) setNotice(messages.join(" "));
    },
    [mode, pdf],
  );

  function reorder(from: number, to: number) {
    if (to < 0 || to >= images.length || from === to) return;
    setImages((prev) => {
      const copy = [...prev];
      const [moved] = copy.splice(from, 1);
      copy.splice(to, 0, moved);
      return copy;
    });
  }

  function removeImage(id: string) {
    setImages((prev) => {
      const item = prev.find((entry) => entry.id === id);
      if (item) URL.revokeObjectURL(item.thumbUrl);
      return prev.filter((entry) => entry.id !== id);
    });
  }

  function clearImages() {
    images.forEach((item) => URL.revokeObjectURL(item.thumbUrl));
    setImages([]);
    setResult(null);
  }

  function clearPdf() {
    if (pdf?.thumbUrl) URL.revokeObjectURL(pdf.thumbUrl);
    setPdf(null);
    setResult(null);
  }

  async function run() {
    if (!canBind) return;
    setBusy(true);
    setNotice(null);
    setResult(null);
    setProgress({ current: 0, total: 1, label: "Starting" });
    try {
      if (mode === "images-to-pdf") {
        const files = validImages.map((item) => item.file);
        const blob = await imagesToPdf(files, imagesOptions, (current, total, label) => {
          setProgress({ current, total, label: `Image ${current} of ${total} · ${label}` });
        });
        setResult({
          kind: "pdf",
          blob,
          name: sanitizeFilename(`bind-${files.length}-images.pdf`),
          pages: files.length,
        });
      } else if (pdf) {
        const items = await pdfToImages(pdf.file, pdfOptions, (current, total, label) => {
          setProgress({ current, total, label });
        });
        setResult({
          kind: "images",
          items: items.map((item) => ({ ...item, url: URL.createObjectURL(item.blob) })),
          zipName: sanitizeFilename(`${stemFromFilename(pdf.name)}-pages.zip`),
        });
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : "Something went wrong.";
      if (/memory|allocation|heap/i.test(message)) {
        setNotice("This batch is too large for this browser. Try fewer files or a lower scale.");
      } else {
        setNotice(message);
      }
    } finally {
      setBusy(false);
      setProgress(null);
    }
  }

  async function downloadZip() {
    if (result?.kind !== "images") return;
    const blob = await zipBlobs(result.items.map((item) => ({ name: item.name, blob: item.blob })));
    downloadBlob(blob, result.zipName);
  }

  const hero =
    mode === "images-to-pdf"
      ? {
          title: "Images to PDF — free, private, no upload",
          body: "Bind photos into a clean multipage PDF. Page size, margins and fit stay in your control. Files never leave this device.",
        }
      : {
          title: "PDF to images — extract pages in the browser",
          body: "Turn PDF pages into PNG, JPEG or WebP. Pick a range, scale and download a ZIP. No account, no watermark.",
        };

  return (
    <div className="grid gap-6">
      <div className="max-w-2xl">
        <p className="font-mono text-xs tracking-wide text-accent-deep uppercase">Client-side converter</p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">{hero.title}</h1>
        <p className="mt-3 text-base leading-relaxed text-muted">{hero.body}</p>
      </div>

      <ModeSwitcher mode={mode} />
      <Dropzone mode={mode} onFiles={addFiles} disabled={busy} />

      {notice ? (
        <p className="rounded-[8px] border border-danger/20 bg-surface px-3 py-3 text-sm text-danger" role="alert">
          {notice}
        </p>
      ) : null}

      {totalBytes > MEMORY_WARN_BYTES ? (
        <p className="rounded-[8px] border border-warn/20 bg-surface px-3 py-3 text-sm text-warn" role="status">
          Combined size is {formatBytes(totalBytes)}. Large batches can hit browser memory limits — try fewer files or
          a lower scale.
        </p>
      ) : null}

      {mode === "images-to-pdf" ? (
        <div className="grid gap-4 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.9fr)]">
          <FileList items={images} onReorder={reorder} onRemove={removeImage} onClear={clearImages} />
          {images.length > 0 ? <ControlsImagesToPdf value={imagesOptions} onChange={setImagesOptions} /> : null}
        </div>
      ) : (
        <div className="grid gap-4 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.9fr)]">
          {pdf ? <PdfFileCard item={pdf} onClear={clearPdf} /> : <div />}
          {pdf && !pdf.error ? (
            <ControlsPdfToImages
              value={pdfOptions}
              onChange={setPdfOptions}
              pageCount={pdf.pageCount}
              rangeError={rangeError}
            />
          ) : null}
        </div>
      )}

      {progress ? <ProgressBar current={progress.current} total={progress.total} label={progress.label} /> : null}

      {(mode === "images-to-pdf" ? images.length > 0 : Boolean(pdf && !pdf.error)) && (
        <div className="hidden md:block">
          <PrimaryButton disabled={!canBind} onClick={run} mode={mode} />
        </div>
      )}

      {result ? (
        <ResultsPanel
          result={result}
          onDownloadPdf={() => {
            if (result.kind === "pdf") downloadBlob(result.blob, result.name);
          }}
          onSharePdf={() => {
            if (result.kind === "pdf") void shareOrDownload(result.blob, result.name, result.name);
          }}
          onDownloadImage={(item) => downloadBlob(item.blob, item.name)}
          onDownloadZip={() => void downloadZip()}
        />
      ) : null}

      {(mode === "images-to-pdf" ? images.length > 0 : Boolean(pdf && !pdf.error)) && (
        <div className="h-20 md:hidden" aria-hidden="true" />
      )}

      {(mode === "images-to-pdf" ? images.length > 0 : Boolean(pdf && !pdf.error)) && (
        <div className="fixed inset-x-0 bottom-0 z-20 border-t border-border bg-surface/95 p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] md:hidden">
          <PrimaryButton disabled={!canBind} onClick={run} mode={mode} />
        </div>
      )}
    </div>
  );
}

function PrimaryButton({
  disabled,
  onClick,
  mode,
}: {
  disabled: boolean;
  onClick: () => void;
  mode: BindMode;
}) {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      className="inline-flex min-h-12 w-full items-center justify-center rounded-[8px] bg-accent px-5 text-sm font-semibold text-accent-ink hover:bg-accent-deep disabled:opacity-40"
    >
      {mode === "images-to-pdf" ? "Bind to PDF" : "Extract images"}
    </button>
  );
}
