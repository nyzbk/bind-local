import { Link } from "@tanstack/react-router";
import { Prose } from "./Prose";

export function PdfToImagesCopy() {
  return (
    <Prose>
      <h2>Rasterize PDF pages without an upload</h2>
      <p>
        This page is only PDF → images. You drop one PDF, Bind counts the pages, you choose all of them or a
        range, then each selected page is painted onto a canvas and encoded as PNG, JPEG or WebP. The original
        PDF is not modified, not re-saved, and not sent anywhere. You leave with files a chat app or a CMS can
        swallow when “attach PDF” is greyed out.
      </p>
      <p>
        Range syntax is a comma-separated list of pages and spans: <code>1-3,5,8-10</code>. Order in the box does
        not reshuffle output — pages come out in document order. Numbers past the last page are ignored. Zero and
        negatives are invalid. If the file is encrypted, damaged, or a PDF Bind cannot parse, you get an error in
        this tab, not a 500 from an API.
      </p>

      <h3>Scale and format</h3>
      <p>
        1× paints near the PDF’s native point size. 2× doubles each edge (four times the pixels). 3× is for small
        type you will OCR or crop later, and it is the first setting that kills a phone on a long file. PNG keeps
        every pixel of the rasterization — use it for text, forms, stamps. JPEG is for photographed pages already
        in the PDF as photos. WebP is the small modern option; confirm the destination accepts it before you
        batch 40 pages.
      </p>
      <p>
        A ZIP is the practical download when you need more than one page. Single-page download is there so you can
        check page 7 before committing to a 3× PNG of a 60-page manual. iOS Safari can share a file when Web Share
        is available; otherwise use the download and Files.
      </p>

      <h3>What rasterization cannot do</h3>
      <p>
        Vector logos become pixels. Fonts become pixels. Layers flatten. Annotations that pdf.js does not draw
        will be missing. A 72 dpi scan does not become sharp because you picked 3× — you only upsample the mud.
        Interactive form fields are not “filled”; they are photographed in their current appearance. If you needed
        a cropped figure from page 12, extract the page here, then crop in Fit or any image editor. Bind will not
        auto-detect figures.
      </p>
      <p>
        To go the other way — photos into a new PDF — use <Link to="/images-to-pdf">Images to PDF</Link>. Full
        walkthrough: <Link to="/how-to">how-to</Link>. Limits and iPhone notes: <Link to="/faq">FAQ</Link>.
      </p>
    </Prose>
  );
}
