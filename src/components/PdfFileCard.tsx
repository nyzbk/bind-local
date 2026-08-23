import { FileText, X } from "lucide-react";
import { formatBytes } from "@/lib/format";
import type { PdfItem } from "@/lib/types";

type Props = {
  item: PdfItem;
  onClear: () => void;
};

export function PdfFileCard({ item, onClear }: Props) {
  return (
    <section className="flex items-center gap-4 rounded-[12px] border border-border bg-surface p-3 shadow-card">
      {item.thumbUrl ? (
        <img
          src={item.thumbUrl}
          alt=""
          className="h-24 w-16 shrink-0 rounded-[6px] bg-bg object-contain outline outline-1 -outline-offset-1 outline-ink/10"
        />
      ) : (
        <span className="grid h-24 w-16 shrink-0 place-items-center rounded-[6px] bg-bg text-accent-deep">
          <FileText className="size-6" />
        </span>
      )}
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-medium">{item.name}</p>
        <p className="font-mono text-xs text-muted">
          {formatBytes(item.size)}
          {item.pageCount != null ? ` · ${item.pageCount} ${item.pageCount === 1 ? "page" : "pages"}` : ""}
        </p>
        {item.error ? <p className="mt-1 text-xs text-danger">{item.error}</p> : null}
      </div>
      <button
        type="button"
        aria-label="Remove PDF"
        onClick={onClear}
        className="grid size-11 shrink-0 place-items-center text-muted hover:text-danger"
      >
        <X className="size-4" />
      </button>
    </section>
  );
}
