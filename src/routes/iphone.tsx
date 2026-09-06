import { createFileRoute, Link } from "@tanstack/react-router";
import { Faq } from "@/components/Faq";
import { JsonLd } from "@/components/JsonLd";
import { Prose } from "@/components/Prose";
import { SiteShell } from "@/components/SiteShell";
import { iphoneFaq } from "@/lib/constants";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/iphone")({
  head: () =>
    pageHead({
      title: "iPhone: the PDF is in Files, not Photos — Bind",
      description:
        "Bind writes a PDF in this Safari tab. Photos will not show it as a camera still. Save to Files, then attach that file. HEIC is not a PDF page.",
      path: "/iphone",
    }),
  component: IphonePage,
});

function IphonePage() {
  return (
    <SiteShell>
      <JsonLd path="/iphone" title="iPhone: PDF lives in Files, not Photos" includeFaq={false} />
      <Prose className="mt-0">
        <p className="font-mono text-xs tracking-wide text-accent-deep uppercase">iPhone</p>
        <h1 className="!mt-2 text-3xl font-semibold tracking-tight">
          The PDF is a Files object. Photos will not grow a document.
        </h1>
        <p>
          Bind turns JPEG, PNG and WebP into a multipage PDF in this Safari tab, or rasterizes a PDF back into
          stills. That sentence is the product. The iPhone ceiling is not “does Safari run Canvas”. It is this:
          Camera Roll is a stack of stills. A PDF is a document. Photos will not list <code>bind-12-images.pdf</code>{" "}
          next to yesterday’s sunset. If you keep picking Recents, you are sending photos, not the document you
          just bound. The full button sequence lives on the{" "}
          <Link to="/how-to">how-to</Link>. This page is only the Files-versus-Photos split.
        </p>

        <h2>Three objects people mix up</h2>
        <p>
          <strong>The JPEGs in Photos.</strong> Those are the receipts, homework pages, boarding passes. They stay
          in the album after Bind. Bind does not delete them and does not rewrite them. If they were HEIC, Bind
          rejected them — convert first, then bind the JPEG.
        </p>
        <p>
          <strong>The PDF blob in this tab.</strong> It exists while the tab is open and until you save it. Safari
          may open a preview of that blob in a new tab. A preview is not Files. If you screenshot the preview you
          made a new photo of a document, which is the wrong container again.
        </p>
        <p>
          <strong>The file in Files / iCloud Drive.</strong> That is the object Mail, WhatsApp document-send, a
          print shop and a government portal can accept as a PDF. Save it with a boring name. That is the file you
          pick next time a share sheet asks “which file”, not Recents.
        </p>

        <h2>What Bind does on this origin</h2>
        <p>
          On the <Link to="/">homepage</Link> or on <Link to="/images-to-pdf">Images to PDF</Link> you drop stills,
          order them, pick A4 or Letter, Contain or Cover, then download. The other direction —{" "}
          <Link to="/pdf-to-images">PDF to Images</Link> — writes PNG/JPEG/WebP pages into a ZIP that also belongs
          in Files, not in Photos. Nothing is posted to a server. Airplane mode is fine after the page has loaded.
          Bind does not log into iCloud and does not insert a PDF into the Camera Roll database.
        </p>

        <h2>The ceiling this page exists for</h2>
        <p>
          iOS will not pretend a PDF is a photo. Share sheets that default to Photos will ignore the document you
          made. iCloud Photos may even re-fetch the original JPEGs from the cloud (“Optimize iPhone Storage”) so
          the album looks complete and dirty. The PDF you saved in Files is a separate item. If you never saved, you
          have zero documents — only the stills you started with.
        </p>
        <p>
          Live Photo is a still plus a motion file. Bind binds the still you pick. It does not mux the .MOV into
          the PDF. Do not expect a Live Photo to become an animated page.
        </p>

        <h2>Steps that actually produce a Files PDF</h2>
        <ol>
          <li>
            If Camera Roll is HEIC, convert to JPEG first. Conversion copies pixels. It does not make a PDF.
          </li>
          <li>
            Open Bind in Safari, not inside a messenger’s in-app browser. Pick the JPEGs. Order page 1 at the top.
          </li>
          <li>
            Paper: A4 outside the US, Letter for US trays. Contain for forms. Cover for photo sheets. Modest
            margins if a printer will see this.
          </li>
          <li>Bind. Wait for the progress label. Then download / Share.</li>
          <li>
            If Files is empty, Share → Save to Files (On My iPhone or iCloud Drive). Open Files and confirm the
            PDF icon, not a thumbnail in Recents.
          </li>
          <li>
            Attach that Files object. Mail, a portal, a printer queue. Recents is the photo stack. Related:{" "}
            <Link to="/whatsapp">WhatsApp photos vs one PDF</Link>, <Link to="/email">email the PDF vs a ZIP</Link>.
          </li>
        </ol>

        <h2>Extract direction on iPhone</h2>
        <p>
          A portal wants “JPG of page 3”. Drop the PDF (from Files) onto PDF to Images, range <code>3</code>, JPEG
          or PNG, 2× if type is small. The ZIP also lands as a Files object. Unzip in Files. Do not screenshot
          Preview and call that page 3 — that is a new photo with a new crop.
        </p>

        <h2>What looks like a bug and is not</h2>
        <ul>
          <li>Photos does not show the PDF — expected. Look in Files.</li>
          <li>Safari preview, empty Files — save via Share. Then open Files.</li>
          <li>Tab reload on 80 receipts — heap. Split the batch. That warning is in the FAQ, not a quota.</li>
          <li>HEIC rejected — convert, then bind. Bind is not a HEIC decoder.</li>
          <li>Home Screen icon still asks for Safari — it is a website. Output is still Files.</li>
        </ul>

        <h2>Add to Home Screen is still a website</h2>
        <p>
          iOS will offer Add to Home Screen. The icon looks like an app. It is still this origin in Safari’s
          engine. It does not gain a Photos write API. It does not get a document provider that injects PDFs into
          Camera Roll. Treat the icon as a bookmark. Output still goes through Share → Files.
        </p>
        <h2>On My iPhone versus iCloud Drive</h2>
        <p>
          Both are Files locations. On My iPhone stays on the device until you move it. iCloud Drive syncs the PDF
          to other devices signed into the same Apple ID — useful for a laptop printer, risky if that Drive is
          shared with a family member who should not see a lease. Bind does not choose the folder. You do, in the
          share sheet. Bind cannot later “unsync” a PDF you put in a shared Drive.
        </p>
        <p>
          AirDrop defaults to the original photos if you pick from Photos. AirDrop the Files PDF if the other
          Mac should print pages 1–N. Sending 12 JPEGs over AirDrop is the WhatsApp mistake with a different
          radio. Related mismatch on chat: <Link to="/whatsapp">WhatsApp</Link>.
        </p>
        <h2>Print Center is not Photos either</h2>
        <p>
          AirPrint from Files opens the PDF. Print from Photos prints a photo. If the school asked for a packet
          on A4, the Files PDF with Contain and margins is the object. A photo print of page 1 is a poster of
          page 1. Bind already picked paper size; the printer still has unprintable edges — that is why margins
          exist on the how-to. This page does not repeat the millimetre table.
        </p>
        <h2>When the batch is receipts for a trip</h2>
        <p>
          Photograph, convert HEIC if needed, bind in groups of 15–20 on a phone, save each PDF with the date in
          the filename, then optionally bind those PDFs is <em>not</em> Bind — Bind does not merge PDFs. Keep one
          PDF per day if memory dies. Email those daily PDFs — <Link to="/email">watch the 25 MB cap</Link> —
          rather than one giant blob. The album still holds every receipt JPEG. Delete or keep them; Bind will
          not decide.
        </p>
        <h2>iPad split view</h2>
        <p>
          Files on one side, Bind on the other, drag stills in. The PDF still downloads to Downloads/Files, not
          to Photos. Split view does not change the object model. Large iPad RAM helps the heap; it does not write
          a PDF into the photo library.
        </p>

        <h2>Honesty limits</h2>
        <p>
          Bind does not deskew a crooked scan, does not OCR, does not merge two PDFs, and does not strip GPS from
          the JPEGs. Empty GPS is a different tool. Merge/split is a different tool. Success here is: a PDF icon in
          Files whose pages match the list you ordered, then a share sheet that points at that icon. If you still
          pick Recents, you undid the bind.
        </p>
        <p>
          Related: <Link to="/">open the converter</Link>
          {" \u00b7 "}
          <Link to="/how-to">how-to</Link>
          {" \u00b7 "}
          <Link to="/whatsapp">WhatsApp</Link>
          {" \u00b7 "}
          <Link to="/email">Email</Link>
          {" \u00b7 "}
          <Link to="/faq">FAQ</Link>.
        </p>
      </Prose>
      <Faq heading="iPhone questions" items={iphoneFaq} />
    </SiteShell>
  );
}
