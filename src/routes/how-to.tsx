import { createFileRoute, Link } from "@tanstack/react-router";
import { JsonLd } from "@/components/JsonLd";
import { Prose } from "@/components/Prose";
import { SiteShell } from "@/components/SiteShell";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/how-to")({
  head: () =>
    pageHead({
      title: "How to convert images to PDF and PDF to images — Bind",
      description:
        "Step-by-step: bind JPEG, PNG and WebP into an A4 or Letter PDF, or extract PDF pages as PNG, JPEG or WebP. Page size, margins, fit modes, ranges and iPhone notes. Files stay in the browser.",
      path: "/how-to",
    }),
  component: HowToPage,
});

function HowToPage() {
  return (
    <SiteShell>
      <JsonLd path="/how-to" title="How to convert images to PDF and PDF to images" />
      <Prose className="mt-0">
        <p className="font-mono text-xs tracking-wide text-accent-deep uppercase">Guide</p>
        <h1 className="!mt-2 text-3xl font-semibold tracking-tight">How to use Bind</h1>
        <p>
          Two directions, one tab. Below is the exact sequence the converter on the home page follows — including
          the settings people miss (fit mode, scale, range syntax) and the failures that are the browser’s memory,
          not a broken upload. Nothing here requires an account. Open{" "}
          <Link to="/images-to-pdf">Images to PDF</Link> or <Link to="/pdf-to-images">PDF to Images</Link> in
          another window if you want to click along.
        </p>

        <h2>Part 1 — Images to PDF</h2>
        <ol>
          <li>
            <strong>Collect the rasters.</strong> JPEG and PNG cover almost every phone and scanner. WebP is fine.
            HEIC from iPhone Camera is not — convert those frames first. Do not zip the folder; drop the images
            themselves.
          </li>
          <li>
            <strong>Add them to Bind.</strong> Drag onto the dropzone on a computer, or use the picker on a phone.
            Thumbnails stay in this tab as object URLs. They are not a cloud preview.
          </li>
          <li>
            <strong>Order the list.</strong> Top row is page 1. Drag on desktop. Use the up/down controls on a
            phone. Remove a row that was added twice. The PDF will not sort by filename unless you already sorted
            the list that way.
          </li>
          <li>
            <strong>Pick paper.</strong> A4 for most printers outside the US. Letter for US office trays. Legal when
            a clerk’s tray is long. Square only when you are making a simple photo document, not a standard print
            job.
          </li>
          <li>
            <strong>Set margins.</strong> A few millimetres keep faces and page numbers off the unprintable rim.
            Zero margin is full-bleed and will clip on many consumer printers even if the PDF looks edge-to-edge
            on screen.
          </li>
          <li>
            <strong>Choose fit.</strong> Contain = whole image, possible letterbox. Cover = fill, possible crop.
            Stretch = fill and distort. For a desk photo of a form, Contain. For a poster of a landscape, Cover.
          </li>
          <li>
            <strong>Bind and download.</strong> Wait until the progress label finishes. Save{" "}
            <code>bind-N-images.pdf</code>. Open it in the browser, Preview or Acrobat before you email it. If the
            tab reloads, split the batch; the file never reached a server, so there is nothing to “retry” in the
            cloud.
          </li>
        </ol>
        <p>
          iPhone extra: Photos → share a selection into Files, or pick directly from the Bind chooser. After
          download, the share sheet (when the browser allows it) can send the PDF to Mail or Files. Add Bind to
          Home Screen if you convert receipts every week; it is still a website.
        </p>

        <h2>Part 2 — PDF to images</h2>
        <ol>
          <li>
            <strong>Drop one PDF.</strong> Encrypted files error out. Huge scanned manuals may warn about memory
            before they die — heed the warning.
          </li>
          <li>
            <strong>Read the page count</strong> on the file card. That number is what the range parser uses.
          </li>
          <li>
            <strong>Range.</strong> Leave “all” if you want every page. Otherwise type spans and singles:{" "}
            <code>1-3,5,8-10</code>. Spaces are fine. <code>1,1,1</code> still yields page 1 once. Pages past the
            end are skipped, not padded with blanks.
          </li>
          <li>
            <strong>Format.</strong> PNG for text and UI. JPEG for already-photographed pages. WebP when the
            destination is a modern web app and you checked that it accepts WebP.
          </li>
          <li>
            <strong>Scale.</strong> 1× for a quick look. 2× for something you will read or OCR. 3× only when type
            is tiny and the device has RAM. Scale multiplies both edges.
          </li>
          <li>
            <strong>Extract.</strong> Inspect one page if you are unsure about quality. Then download the ZIP for
            the set. Unzip on the phone in Files, or on the computer in the folder you chose.
          </li>
        </ol>

        <h2>Fit math, in one paragraph</h2>
        <p>
          The content box is page size minus margins. Contain scales the image uniformly until both width and
          height fit inside that box, then centres it. Cover scales uniformly until the box is fully covered, then
          centres and clips. Stretch maps the image rectangle onto the box independently on X and Y. Bind does not
          rotate to “best fit” unless you already rotated the source file; a landscape photo on portrait A4 will
          letterbox under Contain. Rotate in your photos app first if you want the long side of the photo along
          the long side of the paper.
        </p>

        <h2>Quality checklist before you hit send</h2>
        <ul>
          <li>Open page 1 and the last page. Crooked scans are still crooked; Bind does not deskew.</li>
          <li>Pinch-zoom a line of text if this PDF will be read, not just attached. Soft type → raise scale or rescan.</li>
          <li>Confirm the recipient wants PDF vs images. Portals that say “JPG of page 3” want the extract direction.</li>
          <li>Do not email a 3× PNG ZIP of a 80-page book to a 25 MB inbox. Lower scale or send fewer pages.</li>
          <li>Filenames with commas and emoji get cleaned. If a portal keys off a strict name, rename after download.</li>
        </ul>

        <h2>When a job fails</h2>
        <p>
          “Too large for this browser” means heap, not Bind quota. Cut the list in half. Lower scale. Close other
          tabs. Desktop Chrome survives more than iOS Safari. A blank page in the PDF usually means a source image
          failed to decode (truncated JPEG, odd color profile) — remove that row and bind again. A PDF that never
          shows a page count is not a PDF Bind can parse; re-export from the original app. More edge cases live in
          the <Link to="/faq">FAQ</Link>. Practical stacks (receipts, school, print) are in{" "}
          <Link to="/use-cases">use cases</Link>.
        </p>
      </Prose>
    </SiteShell>
  );
}
