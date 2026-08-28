import { createFileRoute, Link } from "@tanstack/react-router";
import { JsonLd } from "@/components/JsonLd";
import { Prose } from "@/components/Prose";
import { SiteShell } from "@/components/SiteShell";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/use-cases")({
  head: () =>
    pageHead({
      title: "Bind use cases — receipts, scans, print packs, PDF extracts",
      description:
        "How people use Bind: expense receipts into one PDF, homework scans, print-shop photo sheets, extracting paper figures, screenshot packs, and portal uploads that want page images not PDFs.",
      path: "/use-cases",
    }),
  component: UseCasesPage,
});

function UseCasesPage() {
  return (
    <SiteShell>
      <JsonLd path="/use-cases" title="Bind use cases" />
      <Prose className="mt-0">
        <p className="font-mono text-xs tracking-wide text-accent-deep uppercase">Use cases</p>
        <h1 className="!mt-2 text-3xl font-semibold tracking-tight">What Bind is for</h1>
        <p>
          The converter does two jobs. These are the stacks that actually show up in a private, client-side tool —
          not a marketing list of industries. Each one names the direction, the settings that matter, and the
          mistake that wastes a retry.
        </p>

        <h2>Expense receipts into one PDF</h2>
        <p>
          Photograph each receipt, drop the JPEGs on <Link to="/images-to-pdf">Images to PDF</Link>, order them by
          date, A4, Contain, small margins. Contain keeps the thermal-paper edges and totals on the page. Cover
          will crop the last line of VAT. Do not shoot HEIC and expect Bind to decode it. If finance wants
          “one PDF per trip”, this is that PDF. If they want itemised text for a spreadsheet, Bind will not OCR
          the totals — export the PDF, then use an OCR tool they already approve.
        </p>

        <h2>Homework, exams and paper forms</h2>
        <p>
          Students and parents still submit “photos of the worksheet”. Teachers still ask for a single PDF.
          Photograph pages in order, check rotation in Photos first (Bind will not auto-rotate to portrait),
          Contain so the hole-punch margin survives. Dark phone photos of pencil are a lighting problem, not a
          Bind setting. For a printed packet that is already a PDF and the LMS only accepts images, flip to{" "}
          <Link to="/pdf-to-images">PDF to Images</Link>, 2× PNG, range if they only want questions 4–6.
        </p>

        <h2>Photo sheets for a print shop</h2>
        <p>
          A shop that prints “one photo per A4” does not want a zip of originals with mixed aspect ratios. Cover
          on Letter or A4 fills the sheet; warn yourself that faces near the edge may clip. Stretch will make
          people look wrong. Square page size is a reasonable middle when the shop’s tray is irrelevant and you
          just need a consistent document. Ask the shop whether they want PDF or JPEG; many RIPs prefer a PDF of
          pages, which is exactly this direction.
        </p>

        <h2>Figures out of a paper or a slide deck</h2>
        <p>
          Academic PDFs hide charts on page 14. Extract that page at 2× or 3× PNG, then crop in any editor. Bind
          will not clip the figure for you and will not reconstruct a vector chart. If the PDF is a scanned book,
          3× only enlarges the scan. If the chart is vector, 2× PNG is usually enough for a blog or a slide.
        </p>

        <h2>Screenshot documentation</h2>
        <p>
          Bug reports and SOPs are often a stack of PNGs. Order them as the user walked the flow, Contain, A4.
          PNG in, PDF out, no extra JPEG mud. The other direction is useful when a vendor emails a 20-page PDF
          spec and you need page 4 and 5 in Slack, which still hates PDFs on mobile. Range those two pages, JPEG
          if they are already photos, PNG if they are UI.
        </p>

        <h2>Portals that refuse PDF and demand “JPG of each page”</h2>
        <p>
          Visa sites, insurers and some banks still do this. Drop the official PDF, extract all pages or the
          subset they listed, JPEG or PNG per their spec, 2× so stamps stay readable. Zip, upload. Do not
          re-photograph the monitor. Do not run the file through a cloud converter that stores “for 24 hours”.
          Bind’s output is a raster of what pdf.js drew — if a signature overlay is a PDF annotation pdf.js skips,
          flatten in the original app first.
        </p>

        <h2>What not to force through Bind</h2>
        <p>
          400-page scanned books on a phone. HEIC bursts from a wedding. Merging two PDFs. Compressing a 80 MB
          scan for email. Filling IRS-style forms. Those fail or they are the wrong product. Keep Bind for the
          hinge: pictures become pages, pages become pictures, on this device. Settings walkthrough:{" "}
          <Link to="/how-to">how-to</Link>. Limits: <Link to="/faq">FAQ</Link>.
        </p>
      </Prose>
    </SiteShell>
  );
}
