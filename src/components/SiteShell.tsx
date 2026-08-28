import { Link } from "@tanstack/react-router";
import { Layers } from "lucide-react";
import type { ReactNode } from "react";
import { AdUnit } from "./AdUnit";
import { SoftAgencyCta } from "./SoftAgencyCta";
import { APP_NAME } from "@/lib/constants";
import { CONTACT_EMAIL } from "@/lib/seo";

const NAV = [
  { to: "/images-to-pdf" as const, label: "Images to PDF", hideOnMobile: true },
  { to: "/pdf-to-images" as const, label: "PDF to Images", hideOnMobile: true },
  { to: "/how-to" as const, label: "How to", hideOnMobile: true },
  { to: "/faq" as const, label: "FAQ", hideOnMobile: false },
  { to: "/about" as const, label: "About", hideOnMobile: false },
];

const FOOTER = [
  { to: "/images-to-pdf" as const, label: "Images to PDF" },
  { to: "/pdf-to-images" as const, label: "PDF to Images" },
  { to: "/how-to" as const, label: "How to" },
  { to: "/use-cases" as const, label: "Use cases" },
  { to: "/faq" as const, label: "FAQ" },
  { to: "/contact" as const, label: "Contact" },
  { to: "/about" as const, label: "About" },
  { to: "/privacy" as const, label: "Privacy" },
  { to: "/terms" as const, label: "Terms" },
];

export function SiteShell({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-dvh flex-col">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-surface focus:px-3 focus:py-2"
      >
        Skip to converter
      </a>
      <header className="border-b border-border bg-surface/80 backdrop-blur-sm">
        <div className="mx-auto flex h-14 max-w-5xl items-center justify-between gap-4 px-4">
          <Link to="/" className="flex min-h-11 items-center gap-2 font-semibold tracking-tight">
            <span className="flex size-8 items-center justify-center rounded-[8px] bg-accent text-accent-ink">
              <Layers className="size-4" strokeWidth={2} aria-hidden="true" />
            </span>
            {APP_NAME}
          </Link>
          <nav className="flex items-center gap-1 text-sm" aria-label="Primary">
            {NAV.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className={
                  item.hideOnMobile
                    ? "hidden min-h-11 items-center px-3 text-muted hover:text-ink sm:flex"
                    : "flex min-h-11 items-center px-3 text-muted hover:text-ink"
                }
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </header>
      <main id="main" className="mx-auto w-full max-w-5xl flex-1 px-4 py-8 sm:py-10">
        {children}
      </main>
      <footer className="border-t border-border bg-surface">
        <div className="mx-auto flex max-w-5xl flex-col gap-6 px-4 py-8">
          <AdUnit slot="footer" />
          <SoftAgencyCta />
          <nav className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-muted" aria-label="Footer">
            {FOOTER.map((item) => (
              <Link key={item.to} to={item.to} className="min-h-11 inline-flex items-center hover:text-ink">
                {item.label}
              </Link>
            ))}
            <a href={`mailto:${CONTACT_EMAIL}`} className="min-h-11 inline-flex items-center hover:text-ink">
              {CONTACT_EMAIL}
            </a>
            <span className="font-mono text-xs">Files stay on this device</span>
          </nav>
        </div>
      </footer>
    </div>
  );
}
