import { Link } from "@tanstack/react-router";
import { Prose } from "./Prose";

export function ImagesToPdfCopy() {
  return (
    <Prose>
      <h2>Turn a folder of pictures into one printable PDF</h2>
      <p>
        This page is only the images-to-PDF direction. You are not extracting pages here. You are stacking rasters
        onto paper: each file in the list becomes exactly one page in the download. That mapping is deliberate.
        Bind will not auto-collage four Instagram squares onto an A4 sheet, will not detect a desk-photo of two
        receipts and split them, and will not downsample unless you already resized the files. What you drop is
        what gets drawn, fitted to the page box you configured.
      </p>
      <p>
        JPEG from a phone camera is the common case. PNG is better when the source is a screenshot, a stamp, a
        signature on white, or a UI capture with hard edges. WebP arrives from modern Android shares and some
        browsers’ “save image”. BMP still shows up from old scanners. Static GIF is accepted; animation is not
        replayed. HEIC is rejected with a pointer to convert first — Safari can display HEIC, but the PDF library
        in this tab expects a bitmap it can embed.
      </p>

      <h3>Order, paper, margins, fit</h3>
      <p>
        Sort the list before you bind. Page 1 is the top row. A4 is 210 × 297 mm. Letter is 8.5 × 11 in. Legal is
        longer. Margins are applied inside that rectangle; they are not a second paper size. Contain is the safe
        default for anything with text around the edges of the photo. Cover is for a lookbook. Stretch is the
        escape hatch. If a photo looks letterboxed and you hate the bands, you wanted Cover, not a bug.
      </p>
      <p>
        Filenames are sanitized for the download (<code>bind-12-images.pdf</code> by default) so Windows and iOS
        Files do not choke on emoji or slashes. They do not become PDF bookmarks. There is no TOC. If you need
        named destinations, that is an editor’s job after Bind.
      </p>

      <h3>When this direction is the wrong tool</h3>
      <p>
        If you already have a PDF and want to pull pictures out, switch to{" "}
        <Link to="/pdf-to-images">PDF to Images</Link>. If you need to split a 80-page scan into email-sized
        chunks, that is not Bind. If the photos are HEIC straight from Camera, convert them first. If you need the
        PDF to contain selectable text, photograph less and export from the original app, or OCR later. Bind’s
        output is an image-per-page PDF: boring, widely accepted, and private.
      </p>
      <p>
        Walkthrough with screenshots of each control: <Link to="/how-to">How to bind images into a PDF</Link>.
        Receipts, schoolwork and print-shop packs: <Link to="/use-cases">use cases</Link>.
      </p>
    </Prose>
  );
}
