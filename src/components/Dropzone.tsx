import { useCallback, useRef, useState, type DragEvent } from "react";
import { Upload } from "lucide-react";
import { cn } from "@/lib/utils";
import { ACCEPT_IMAGES, ACCEPT_PDF } from "@/lib/constants";
import type { BindMode } from "@/lib/types";

type Props = {
  mode: BindMode;
  onFiles: (files: File[]) => void;
  disabled?: boolean;
};

export function Dropzone({ mode, onFiles, disabled }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [active, setActive] = useState(false);
  const isImages = mode === "images-to-pdf";

  const handleFiles = useCallback(
    (list: FileList | File[] | null) => {
      if (!list) return;
      const files = Array.from(list);
      if (files.length) onFiles(files);
    },
    [onFiles],
  );

  function onDrag(event: DragEvent, next: boolean) {
    event.preventDefault();
    event.stopPropagation();
    if (!disabled) setActive(next);
  }

  function onDrop(event: DragEvent) {
    onDrag(event, false);
    if (disabled) return;
    handleFiles(event.dataTransfer.files);
  }

  return (
    <div
      onDragEnter={(e) => onDrag(e, true)}
      onDragOver={(e) => onDrag(e, true)}
      onDragLeave={(e) => onDrag(e, false)}
      onDrop={onDrop}
      className={cn(
        "flex flex-col items-center justify-center gap-3 rounded-[12px] border border-dashed px-4 py-10 text-center transition-colors duration-150 sm:py-14",
        active ? "border-accent bg-accent/5" : "border-border bg-surface",
        disabled && "opacity-60",
      )}
    >
      <span className="flex size-12 items-center justify-center rounded-[8px] bg-bg text-accent-deep">
        <Upload className="size-5" strokeWidth={1.75} aria-hidden="true" />
      </span>
      <div className="space-y-1">
        <p className="text-base font-medium">
          {isImages ? "Drop images here" : "Drop a PDF here"}
        </p>
        <p className="text-sm text-muted">
          {isImages
            ? "JPG, PNG, WebP, BMP, GIF · processed only in this tab"
            : "One PDF at a time · pages stay on this device"}
        </p>
      </div>
      <button
        type="button"
        disabled={disabled}
        onClick={() => inputRef.current?.click()}
        className="inline-flex min-h-11 items-center justify-center rounded-[8px] bg-accent px-5 text-sm font-medium text-accent-ink hover:bg-accent-deep disabled:opacity-50"
      >
        {isImages ? "Choose images" : "Choose PDF"}
      </button>
      <input
        ref={inputRef}
        type="file"
        className="sr-only"
        multiple={isImages}
        accept={isImages ? ACCEPT_IMAGES : ACCEPT_PDF}
        onChange={(event) => {
          handleFiles(event.target.files);
          event.currentTarget.value = "";
        }}
      />
    </div>
  );
}
