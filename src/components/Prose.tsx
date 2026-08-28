import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Prose({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <article
      className={cn(
        "mt-14 max-w-2xl space-y-4 text-[15px] leading-relaxed text-ink",
        "[&_h2]:mt-10 [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:tracking-tight",
        "[&_h3]:mt-6 [&_h3]:text-base [&_h3]:font-medium",
        "[&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-5",
        "[&_ol]:list-decimal [&_ol]:space-y-2 [&_ol]:pl-5",
        "[&_a]:text-accent-deep [&_a]:underline-offset-2 hover:[&_a]:underline",
        className,
      )}
    >
      {children}
    </article>
  );
}
