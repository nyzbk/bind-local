import type { ReactNode } from "react";
import { Segmented } from "./Segmented";
import type { PdfToImagesOptions, RasterFormat } from "@/lib/types";

type Props = {
  value: PdfToImagesOptions;
  onChange: (next: PdfToImagesOptions) => void;
  pageCount?: number;
  rangeError?: string;
};

export function ControlsPdfToImages({ value, onChange, pageCount, rangeError }: Props) {
  function patch(partial: Partial<PdfToImagesOptions>) {
    onChange({ ...value, ...partial });
  }
  const custom = value.pages !== "all";

  return (
    <section className="rounded-[12px] border border-border bg-surface p-4 shadow-card sm:p-5">
      <h2 className="text-sm font-medium">Extract setup</h2>
      <div className="mt-4 grid gap-4">
        <Field label="Pages">
          <Segmented<"all" | "custom">
            ariaLabel="Page selection"
            value={custom ? "custom" : "all"}
            onChange={(next) => patch({ pages: next === "all" ? "all" : "" })}
            options={[
              { value: "all", label: pageCount ? `All (${pageCount})` : "All" },
              { value: "custom", label: "Custom" },
            ]}
          />
          {custom ? (
            <input
              type="text"
              inputMode="numeric"
              placeholder="1-3,5,8-10"
              value={value.pages === "all" ? "" : value.pages}
              onChange={(e) => patch({ pages: e.target.value })}
              className="min-h-11 w-full rounded-[8px] border border-border bg-bg px-3 font-mono text-sm text-ink"
              aria-label="Custom page range"
              aria-invalid={Boolean(rangeError)}
            />
          ) : null}
          {rangeError ? <p className="text-xs text-danger">{rangeError}</p> : null}
        </Field>
        <Field label="Format">
          <Segmented<RasterFormat>
            ariaLabel="Output format"
            value={value.format}
            onChange={(format) => patch({ format })}
            options={[
              { value: "png", label: "PNG" },
              { value: "jpeg", label: "JPEG" },
              { value: "webp", label: "WebP" },
            ]}
          />
        </Field>
        <Field label="Scale">
          <Segmented<"1" | "1.5" | "2" | "3">
            ariaLabel="Render scale"
            value={String(value.scale) as "1" | "1.5" | "2" | "3"}
            onChange={(scale) => patch({ scale: Number(scale) as 1 | 1.5 | 2 | 3 })}
            options={[
              { value: "1", label: "1×" },
              { value: "1.5", label: "1.5×" },
              { value: "2", label: "2×" },
              { value: "3", label: "3×" },
            ]}
          />
        </Field>
        {value.format !== "png" ? (
          <Field label={`Quality · ${value.quality.toFixed(2)}`}>
            <input
              type="range"
              min={0.7}
              max={1}
              step={0.01}
              value={value.quality}
              onChange={(e) => patch({ quality: Number(e.target.value) })}
              className="h-11 w-full accent-accent"
              aria-label="Output quality"
            />
          </Field>
        ) : null}
      </div>
    </section>
  );
}

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="grid gap-2">
      <p className="text-xs font-medium tracking-wide text-muted uppercase">{label}</p>
      {children}
    </div>
  );
}
