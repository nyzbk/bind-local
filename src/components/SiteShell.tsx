import { Link } from "@tanstack/react-router";
import { Layers } from "lucide-react";
import type { ReactNode } from "react";
import { AdUnit } from "./AdUnit";
import { SoftAgencyCta } from "./SoftAgencyCta";
import { APP_NAME } from "@/lib/constants";

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
          <nav className="flex items-center gap-1 text-sm">
            <Link
              to="/images-to-pdf"
              className="hidden min-h-11 items-center px-3 text-muted hover:text-ink sm:flex"
            >
              Images to PDF
            </Link>
            <Link
              to="/pdf-to-images"
              className="hidden min-h-11 items-center px-3 text-muted hover:text-ink sm:flex"
            >
              PDF to Images
            </Link>
            <Link to="/about" className="flex min-h-11 items-center px-3 text-muted hover:text-ink">
              About
            </Link>
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
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-muted">
            <Link to="/privacy" className="min-h-11 inline-flex items-center hover:text-ink">
              Privacy
            </Link>
            <Link to="/terms" className="min-h-11 inline-flex items-center hover:text-ink">
              Terms
            </Link>
            <Link to="/about" className="min-h-11 inline-flex items-center hover:text-ink">
              About
            </Link>
            <span className="font-mono text-xs">Files stay on this device</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
