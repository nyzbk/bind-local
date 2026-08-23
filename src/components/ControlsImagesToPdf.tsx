import type { ReactNode } from "react";
import { Segmented } from "./Segmented";
import type { ImageFit, ImagesToPdfOptions, Margins, Orientation, PageSize } from "@/lib/types";

type Props = {
  value: ImagesToPdfOptions;
  onChange: (next: ImagesToPdfOptions) => void;
};

export function ControlsImagesToPdf({ value, onChange }: Props) {
  function patch(partial: Partial<ImagesToPdfOptions>) {
    onChange({ ...value, ...partial });
  }

  return (
    <section className="rounded-[12px] border border-border bg-surface p-4 shadow-card sm:p-5">
      <h2 className="text-sm font-medium">Page setup</h2>
      <div className="mt-4 grid gap-4">
        <Field label="Page size">
          <Segmented<PageSize>
            ariaLabel="Page size"
            value={value.pageSize}
            onChange={(pageSize) => patch({ pageSize })}
            options={[
              { value: "fit", label: "Fit to image" },
              { value: "a4", label: "A4" },
              { value: "letter", label: "Letter" },
              { value: "custom", label: "Custom" },
            ]}
          />
        </Field>
        {value.pageSize === "custom" ? (
          <div className="grid grid-cols-2 gap-3">
            <label className="text-xs font-medium text-muted">
              Width (mm)
              <input
                type="number"
                min={20}
                max={1000}
                value={value.customWidthMm}
                onChange={(e) => patch({ customWidthMm: Number(e.target.value) || 210 })}
                className="mt-1 min-h-11 w-full rounded-[8px] border border-border bg-bg px-3 text-sm text-ink"
              />
            </label>
            <label className="text-xs font-medium text-muted">
              Height (mm)
              <input
                type="number"
                min={20}
                max={1000}
                value={value.customHeightMm}
                onChange={(e) => patch({ customHeightMm: Number(e.target.value) || 297 })}
                className="mt-1 min-h-11 w-full rounded-[8px] border border-border bg-bg px-3 text-sm text-ink"
              />
            </label>
          </div>
        ) : null}
        <Field label="Orientation">
          <Segmented<Orientation>
            ariaLabel="Orientation"
            value={value.orientation}
            onChange={(orientation) => patch({ orientation })}
            options={[
              { value: "auto", label: "Auto" },
              { value: "portrait", label: "Portrait" },
              { value: "landscape", label: "Landscape" },
            ]}
          />
        </Field>
        <Field label="Margins">
          <Segmented<Margins>
            ariaLabel="Margins"
            value={value.margins}
            onChange={(margins) => patch({ margins })}
            options={[
              { value: "none", label: "None" },
              { value: "small", label: "Small" },
              { value: "medium", label: "Medium" },
              { value: "large", label: "Large" },
            ]}
          />
        </Field>
        <Field label="Image fit">
          <Segmented<ImageFit>
            ariaLabel="Image fit"
            value={value.fit}
            onChange={(fit) => patch({ fit })}
            options={[
              { value: "contain", label: "Contain" },
              { value: "cover", label: "Cover" },
              { value: "stretch", label: "Stretch" },
            ]}
          />
        </Field>
        <Field label={`JPEG quality · ${value.quality.toFixed(2)}`}>
          <input
            type="range"
            min={0.7}
            max={1}
            step={0.01}
            value={value.quality}
            onChange={(e) => patch({ quality: Number(e.target.value) })}
            className="h-11 w-full accent-accent"
            aria-label="JPEG quality"
          />
        </Field>
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
