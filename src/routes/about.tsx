import { createFileRoute, Link } from "@tanstack/react-router";
import { JsonLd } from "@/components/JsonLd";
import { Prose } from "@/components/Prose";
import { SiteShell } from "@/components/SiteShell";
import { SoftAgencyCta } from "@/components/SoftAgencyCta";
import { AGENCY_NAME } from "@/lib/constants";
import { CONTACT_EMAIL, pageHead } from "@/lib/seo";

export const Route = createFileRoute("/about")({
  head: () =>
    pageHead({
      title: "About Bind — private images ↔ PDF converter",
      description:
        "Bind is a free, client-side utility that turns images into multipage PDFs and PDF pages into images. Files never leave the browser. Built by Ultimatum. No signup, no watermark.",
      path: "/about",
    }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <SiteShell>
      <JsonLd path="/about" title="About Bind" includeFaq={false} />
      <Prose className="mt-0">
        <h1 className="!mt-0 text-3xl font-semibold tracking-tight">About Bind</h1>
        <p>
          Bind is a free browser utility for one hinge: raster images become a multipage PDF, and PDF pages become
          raster images. It is not a cloud converter. pdf-lib writes the PDF, pdf.js reads pages, Canvas paints
          pixels, JSZip packs downloads. Those libraries run in your tab. Close the tab and the documents are gone
          from Bind, because Bind never held them.
        </p>
        <p>
          The product is the converter you see on the home page, plus the pages that explain how to use it:{" "}
          <Link to="/how-to">how-to</Link>, <Link to="/use-cases">use cases</Link>, <Link to="/faq">FAQ</Link>,{" "}
          <Link to="/contact">contact</Link>. Ads may appear after Google approves the site. Auto-open popups are
          not part of the design. Advertising partners never receive the files you convert.
        </p>
        <h2>In scope</h2>
        <ul>
          <li>JPEG, PNG, WebP, BMP, static GIF → PDF with A4 / Letter / Legal / square, margins, Contain / Cover / Stretch.</li>
          <li>PDF → PNG, JPEG or WebP at 1×–3×, all pages or a typed range, single download or ZIP.</li>
          <li>Reorder, iOS Safari, filename sanitization, in-tab memory warnings.</li>
        </ul>
        <h2>Out of scope</h2>
        <ul>
          <li>HEIC decode (use a HEIC converter first).</li>
          <li>Merge, split, compress, OCR, e-sign, form fill, PDF/A, CMYK.</li>
          <li>Accounts, cloud storage, “history of your files”.</li>
        </ul>
        <p>
          Bind is built by {AGENCY_NAME}. Questions and copyright notices:{" "}
          <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>. The tool is provided as-is; browser memory is
          the real limit, not a fake quota.
        </p>
        <div className="rounded-[12px] border border-border bg-surface p-4">
          <p className="text-xs font-medium tracking-wide text-muted uppercase">Made with {AGENCY_NAME}</p>
          <SoftAgencyCta className="mt-2" />
        </div>
      </Prose>
    </SiteShell>
  );
}
