import { createFileRoute } from "@tanstack/react-router";
import { SiteShell } from "@/components/SiteShell";
import { SoftAgencyCta } from "@/components/SoftAgencyCta";
import { AGENCY_NAME } from "@/lib/constants";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [{ title: "About Bind — private images ↔ PDF" }],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <SiteShell>
      <article className="mx-auto max-w-2xl">
        <h1 className="text-3xl font-semibold tracking-tight">About Bind</h1>
        <div className="mt-8 space-y-4 text-sm leading-relaxed">
          <p>
            Bind is a free, private, client-side utility that converts images into PDF documents and extracts PDF pages
            as images. Everything happens in your browser — files never leave your device.
          </p>
          <p className="text-muted">
            Bind belongs to a family of focused free tools built for speed, privacy and zero friction. No sign-up, no
            watermarks, no artificial daily limits.
          </p>
          <p className="text-muted">
            It is not a PDF editor, merger or compressor. Bind does one job: raster images become a multipage PDF, and
            PDF pages become images you can download one by one or as a ZIP.
          </p>
          <div className="rounded-[12px] border border-border bg-surface p-4">
            <p className="text-xs font-medium tracking-wide text-muted uppercase">Made with {AGENCY_NAME}</p>
            <SoftAgencyCta className="mt-2" />
          </div>
        </div>
      </article>
    </SiteShell>
  );
}
