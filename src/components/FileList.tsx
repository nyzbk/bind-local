import { ChevronDown, ChevronUp, GripVertical, X } from "lucide-react";
import { useState } from "react";
import { formatBytes } from "@/lib/format";
import { cn } from "@/lib/utils";
import type { ImageItem } from "@/lib/types";

type Props = {
  items: ImageItem[];
  onReorder: (from: number, to: number) => void;
  onRemove: (id: string) => void;
  onClear: () => void;
};

export function FileList({ items, onReorder, onRemove, onClear }: Props) {
  const [dragIndex, setDragIndex] = useState<number | null>(null);

  if (items.length === 0) return null;

  return (
    <section className="rounded-[12px] border border-border bg-surface shadow-card">
      <div className="flex items-center justify-between gap-3 border-b border-border px-4 py-3">
        <h2 className="text-sm font-medium">
          {items.length} {items.length === 1 ? "image" : "images"}
        </h2>
        <button
          type="button"
          onClick={onClear}
          className="min-h-11 px-2 text-sm text-muted hover:text-ink"
        >
          Clear all
        </button>
      </div>
      <ul className="divide-y divide-border">
        {items.map((item, index) => (
          <li
            key={item.id}
            draggable
            onDragStart={() => setDragIndex(index)}
            onDragOver={(event) => {
              event.preventDefault();
              if (dragIndex === null || dragIndex === index) return;
              onReorder(dragIndex, index);
              setDragIndex(index);
            }}
            onDragEnd={() => setDragIndex(null)}
            className={cn("flex items-center gap-3 px-3 py-2", dragIndex === index && "bg-bg")}
          >
            <span className="hidden cursor-grab text-muted sm:inline" aria-hidden="true">
              <GripVertical className="size-4" />
            </span>
            <img
              src={item.thumbUrl}
              alt=""
              className="size-[72px] shrink-0 rounded-[6px] object-cover outline outline-1 -outline-offset-1 outline-ink/10"
            />
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium">{item.name}</p>
              <p className="font-mono text-xs text-muted">{formatBytes(item.size)}</p>
              {item.error ? <p className="mt-1 text-xs text-danger">{item.error}</p> : null}
            </div>
            <div className="flex shrink-0 items-center">
              <button
                type="button"
                aria-label="Move up"
                disabled={index === 0}
                onClick={() => onReorder(index, index - 1)}
                className="grid size-11 place-items-center text-muted hover:text-ink disabled:opacity-30"
              >
                <ChevronUp className="size-4" />
              </button>
              <button
                type="button"
                aria-label="Move down"
                disabled={index === items.length - 1}
                onClick={() => onReorder(index, index + 1)}
                className="grid size-11 place-items-center text-muted hover:text-ink disabled:opacity-30"
              >
                <ChevronDown className="size-4" />
              </button>
              <button
                type="button"
                aria-label={`Remove ${item.name}`}
                onClick={() => onRemove(item.id)}
                className="grid size-11 place-items-center text-muted hover:text-danger"
              >
                <X className="size-4" />
              </button>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
