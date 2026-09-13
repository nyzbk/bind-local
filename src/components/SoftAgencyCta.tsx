import { cn } from "@/lib/utils";
import { AGENCY_NAME, HUB_URL } from "@/lib/constants";

type Props = {
  className?: string;
  variant?: "footer" | "after-success";
};

export function SoftAgencyCta({ className, variant = "footer" }: Props) {
  if (variant === "after-success") {
    return (
      <p className={cn("text-sm leading-relaxed text-muted", className)}>
        Need a site or a brand system?{" "}
        <a
          href={HUB_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium text-accent-deep underline-offset-2 hover:underline"
        >
          Ultimatum hub
        </a>
        .
      </p>
    );
  }

  return (
    <div className={cn("flex max-w-xl flex-col items-start gap-3", className)}>
      <p className="text-sm leading-relaxed text-muted">
        Built by{" "}
        <a
          href={HUB_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium text-ink underline-offset-2 hover:underline"
        >
          {AGENCY_NAME}
        </a>
        {" — "}
        free tools, $10k websites & brand systems
      </p>
      <a
        href={HUB_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex min-h-11 items-center justify-center rounded-lg border border-border bg-surface px-4 py-2 text-sm font-medium text-ink no-underline hover:border-accent"
      >
        Ultimatum hub
      </a>
    </div>
  );
}
