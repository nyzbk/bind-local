import { FileStack, Shield, SlidersHorizontal } from "lucide-react";

const STEPS = [
  {
    icon: FileStack,
    title: "Choose files",
    body: "Drop photos or a PDF. Nothing is uploaded — work stays in this tab.",
  },
  {
    icon: SlidersHorizontal,
    title: "Set the page",
    body: "Pick size, margins and fit, or choose a page range and image format.",
  },
  {
    icon: Shield,
    title: "Bind or extract",
    body: "Download a clean multipage PDF, or a ZIP of page images. No watermark.",
  },
];

export function HowItWorks() {
  return (
    <section className="mt-14">
      <h2 className="text-xl font-semibold tracking-tight">How it works</h2>
      <ol className="mt-4 grid gap-3 sm:grid-cols-3">
        {STEPS.map((step, index) => {
          const Icon = step.icon;
          return (
            <li key={step.title} className="rounded-[12px] border border-border bg-surface p-4 shadow-card">
              <p className="font-mono text-xs text-muted">0{index + 1}</p>
              <Icon className="mt-3 size-5 text-accent-deep" strokeWidth={1.75} aria-hidden="true" />
              <h3 className="mt-3 text-sm font-medium">{step.title}</h3>
              <p className="mt-1 text-sm leading-relaxed text-muted">{step.body}</p>
            </li>
          );
        })}
      </ol>
    </section>
  );
}
