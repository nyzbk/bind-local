import { FileImage, FileText } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { cn } from "@/lib/utils";
import type { BindMode } from "@/lib/types";

const OPTIONS: { to: "/images-to-pdf" | "/pdf-to-images"; mode: BindMode; label: string; icon: typeof FileImage }[] = [
  { to: "/images-to-pdf", mode: "images-to-pdf", label: "Images → PDF", icon: FileImage },
  { to: "/pdf-to-images", mode: "pdf-to-images", label: "PDF → Images", icon: FileText },
];

export function ModeSwitcher({ mode }: { mode: BindMode }) {
  return (
    <div
      role="tablist"
      aria-label="Conversion direction"
      className="grid grid-cols-2 gap-1 rounded-[12px] border border-border bg-bg p-1"
    >
      {OPTIONS.map((option) => {
        const active = option.mode === mode;
        const Icon = option.icon;
        return (
          <Link
            key={option.mode}
            to={option.to}
            role="tab"
            aria-selected={active}
            className={cn(
              "flex min-h-12 items-center justify-center gap-2 rounded-[8px] px-3 text-sm font-medium transition-colors duration-150",
              active ? "bg-surface text-ink shadow-sm" : "text-muted hover:text-ink",
            )}
          >
            <Icon className="size-4" strokeWidth={1.75} aria-hidden="true" />
            {option.label}
          </Link>
        );
      })}
    </div>
  );
}
