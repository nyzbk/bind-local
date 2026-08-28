import { Link } from "@tanstack/react-router";
import { Prose } from "./Prose";

export function HomeCopy() {
  return (
    <Prose>
      <h2>A private hinge between photos and pages</h2>
      <p>
        Bind is a free converter that lives entirely in this tab. On one side: JPEG, PNG, WebP, BMP and still GIF
        frames. On the other: a multipage PDF you can print, email or upload. Flip the direction and the same tab
        rasterizes PDF pages into PNG, JPEG or WebP, one file per page, with an optional ZIP. Nothing in that loop
        is posted to a server. There is no account wall, no watermark across the footer, and no daily counter that
        unlocks when you pay.
      </p>
      <p>
        That design is not a slogan. Receipts, boarding passes, homework scans, signed leases and screenshots of a
        bug often contain data you would not drop into a random “free PDF” farm. Bind loads pdf-lib and pdf.js into
        the browser, draws on Canvas, and hands you a blob. Close the tab and the bytes are gone. The hosting
        provider sees that you requested the page; it never sees the JPEG of your passport.
      </p>

      <h2>Images to PDF without a desktop installer</h2>
      <p>
        Drop a stack of photos, drag them into the order you want, then choose paper. A4 is the default for most of
        the world. Letter and Legal match US office trays. A square page is useful when you are building a simple
        lookbook rather than a print document. Margins keep content off the printer’s unprintable edge. Fit mode
        decides how a 4:3 phone photo sits on that paper:
      </p>
      <ul>
        <li>
          <strong>Contain</strong> shows the whole image. Empty bands may appear at the sides or top and bottom.
          Use this for documents, whiteboards and anything you must not crop.
        </li>
        <li>
          <strong>Cover</strong> fills the content box. Overflow is cropped. Use this for photo sheets where a
          full-bleed look matters more than seeing the last millimetre of background.
        </li>
        <li>
          <strong>Stretch</strong> fills the box by distorting aspect ratio. That is rarely what you want for a
          face or a contract; it exists for the case where a portal demands an exact pixel rectangle and you accept
          the warp.
        </li>
      </ul>
      <p>
        Each image becomes one page. Bind does not try to flow text, does not run OCR, and does not invent a second
        column. If you need a text-searchable PDF, run OCR in a dedicated tool after download. If you need to merge
        two existing PDFs or compress a heavy scan, that is a different job — Folio is the sibling for split and
        compress, not a clone of this page.
      </p>

      <h2>PDF to images when a portal wants pictures</h2>
      <p>
        Many government forms, insurance chats and CMS fields still refuse a PDF and ask for “page 3 as a JPG”.
        Bind rasterizes the pages you select at 1×, 2× or 3× and writes PNG (lossless), JPEG (photos) or WebP
        (smaller, modern). A custom range such as <code>1-3,5,8-10</code> skips the rest. Download a single page to
        inspect it, or a ZIP when you need the set. Encrypted PDFs fail with a readable error rather than an empty
        archive.
      </p>
      <p>
        Scale is a trade: 3× PNG of a 40-page report will choke a phone. 1× JPEG of a contract with 8-point
        footnotes will look muddy when you pinch-zoom. Start at 2× PNG for text, then drop scale if the ZIP is
        unwieldy. Bind will not invent pixels that were never in the PDF; a fax-quality scan stays fax-quality.
      </p>

      <h2>What this site is, and what it is not</h2>
      <p>
        Bind is a finished utility, not a landing page for a product that “coming soon” converts files in the
        cloud. The converter on this page is the product. Around it you will find a{" "}
        <Link to="/how-to">step-by-step guide</Link>,{" "}
        <Link to="/use-cases">use cases</Link> for receipts, schools, print shops and research, a{" "}
        <Link to="/faq">FAQ</Link> with the limits we actually hit in browsers, and a{" "}
        <Link to="/contact">contact address</Link> that a human reads. Legal pages cover privacy and terms. Ads may
        appear after the site is approved; they are not turned into auto-popups, and they never receive the files
        you convert.
      </p>
      <p>
        Out of scope, so you do not waste a tap: HEIC from iPhone Camera (convert first), PDF merge/split/compress,
        electronic signatures, form filling, OCR, CMYK press profiles, and batch jobs measured in gigabytes. Those
        are real needs. They are not this tool. The honest boundary is how Bind stays small enough to run in Safari
        on a phone without shipping your documents to a farm.
      </p>

      <h2>Start on this page</h2>
      <p>
        Use the switcher above for <Link to="/images-to-pdf">Images to PDF</Link> or{" "}
        <Link to="/pdf-to-images">PDF to Images</Link>. On a computer, drag files onto the dropzone. On a phone,
        pick from Photos or Files. Reorder, set paper or range, then download. If the tab ever reloads mid-job,
        the batch was too large for this device — cut it in half and run again. No file was “lost on a server”,
        because none was sent.
      </p>
    </Prose>
  );
}
