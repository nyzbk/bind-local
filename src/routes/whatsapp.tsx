import { createFileRoute, Link } from "@tanstack/react-router";
import { Faq } from "@/components/Faq";
import { JsonLd } from "@/components/JsonLd";
import { Prose } from "@/components/Prose";
import { SiteShell } from "@/components/SiteShell";
import { whatsappFaq } from "@/lib/constants";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/whatsapp")({
  head: () =>
    pageHead({
      title: "WhatsApp: twelve photos are not a PDF — Bind",
      description:
        "Photo send recodes frames. A multipage PDF must go as a document. Bind writes the PDF in this tab. It does not sit inside WhatsApp.",
      path: "/whatsapp",
    }),
  component: WhatsAppPage,
});

function WhatsAppPage() {
  return (
    <SiteShell>
      <JsonLd path="/whatsapp" title="WhatsApp photos vs one PDF" includeFaq={false} />
      <Prose className="mt-0">
        <p className="font-mono text-xs tracking-wide text-accent-deep uppercase">WhatsApp</p>
        <h1 className="!mt-2 text-3xl font-semibold tracking-tight">
          Twelve chat bubbles are not a twelve-page PDF.
        </h1>
        <p>
          People photograph a form, tap WhatsApp, and send the stills as photos. The other person gets recoded
          frames, often in a different order, often missing page 4. A clerk who asked for “one PDF” did not get a
          PDF. Bind’s job is to make that document in this tab. WhatsApp’s job is to carry the file you point at.
          Those are not the same job. This page is only the mismatch.
        </p>

        <h2>Photo send versus document send</h2>
        <p>
          <strong>Send as photo.</strong> WhatsApp recodes. Quality drops. EXIF usually dies on their copy — that
          is their encoder, not Bind, and it is irrelevant to page order. You still have N separate pictures. There
          is no page 1–N container. If you needed a printable packet, you do not have one.
        </p>
        <p>
          <strong>Send as document.</strong> You attach bytes. If those bytes are the Bind PDF from Files, the other
          person can open a multipage file. If those bytes are a random JPEG from Recents, you sent a picture with
          a document flag. Document is a pipe, not a binder.
        </p>
        <p>
          HD toggles inside WhatsApp change their recode of photos. They do not invent a PDF. Status and View once
          are delivery modes. They do not bind pages.
        </p>

        <h2>What Bind does before you open WhatsApp</h2>
        <p>
          Use <Link to="/images-to-pdf">Images to PDF</Link>: order the stills, A4/Letter, Contain for forms, then
          download. On iPhone the download must land in Files — see <Link to="/iphone">iPhone</Link>. Then in
          WhatsApp pick that PDF as a document. Do not pick Recents. Recents is the photo stack you already had.
        </p>
        <p>
          Reverse: they sent you a PDF and a portal wants JPEGs. Save the PDF to Files, run{" "}
          <Link to="/pdf-to-images">PDF to Images</Link>, range the pages the portal named, then send those stills
          on purpose — or upload them outside WhatsApp.
        </p>

        <h2>The ceiling</h2>
        <p>
          Bind cannot patch WhatsApp. It cannot raise their document size ceiling (that number moves by client;
          we will not print a fake megabyte). A 80-page 3× scan may fail as a document. Split the range. Lower
          scale on extract. Bind will not sit in the WhatsApp sandbox and rewrite Media/WhatsApp/Images. Desktop
          WhatsApp often attaches a disk file from Pictures — if that folder still holds JPEGs, you attached
          JPEGs. Point the dialog at Downloads / the Bind PDF.
        </p>

        <h2>Steps</h2>
        <ol>
          <li>Bind the stills in Safari or desktop Chromium. Confirm page order on page 1 and the last page.</li>
          <li>Save the PDF. On iPhone, Files, not Photos.</li>
          <li>WhatsApp → attach document → that PDF. Skip Recents.</li>
          <li>
            If they insist on photos, extract only the pages they named, then send those files as photos
            knowing they will recode. That is a worse packet. Say so.
          </li>
          <li>
            If the document is too heavy, extract a range or bind fewer stills. Do not “compress inside WhatsApp”
            and hope pages survive.
          </li>
        </ol>

        <h2>What looks like a bug and is not</h2>
        <ul>
          <li>They received one soft image — photo send. Send the PDF as document.</li>
          <li>Order scrambled — they sorted the bubbles. A PDF keeps Bind’s list order.</li>
          <li>Desktop attached DCIM — wrong folder. Point at the Bind download.</li>
          <li>Preview in chat shows page 1 only — many clients preview the first page of a PDF. Open the file.</li>
        </ul>

        <h2>Forward from the thread is not forward from Files</h2>
        <p>
          A photo you already sent sits in the thread as WhatsApp’s recode. Forwarding that bubble forwards the
          recode. It does not resurrect the Bind PDF. If you need the packet again, attach the Files PDF again.
          Starred messages and exported chats are not a document store Bind can open.
        </p>
        <h2>Group admin who wanted “one file”</h2>
        <p>
          School parents, a small shop, a site crew: someone always dumps a burst of photos into the group. The
          admin then cannot print. Bind on one phone, PDF as document into the group, caption the page count.
          Everyone else can keep sending photos; you still have a packet. Bind does not moderate the group.
        </p>
        <h2>Do not screenshot a PDF preview into the chat</h2>
        <p>
          Preview page 1 → screenshot → send photo. You just invented a new JPEG of a page, with a new crop and
          a new recode. Page 2–12 never moved. Open the PDF, or extract named pages with{" "}
          <Link to="/pdf-to-images">PDF to Images</Link> and send those files on purpose.
        </p>
        <h2>Voice note plus photos is still not a PDF</h2>
        <p>
          A voice note that says “page three is the stamp” does not bind pages. The clerk who only reads the
          attachment will not play the note. Put the stamp on a page in the PDF, or extract page 3 as a still if
          they refuse PDFs. Two objects, two pipes.
        </p>
        <h2>WhatsApp Web</h2>
        <p>
          Web often attaches from the computer’s disk dialog. That dialog is Pictures by habit. Pictures is JPEGs.
          Bind download is Downloads. If you converted on the phone and never copied the PDF to the computer, Web
          cannot attach a file that is only on the phone. Copy the PDF to the machine, or send from the phone
          client as document.
        </p>

        <h2>Broadcast lists and communities</h2>
        <p>
          A broadcast list is still photo-or-document per recipient copy. Sending twelve stills to forty people
          is forty stacks of recodes. Bind once, attach the PDF as a document once per list, caption the page
          count. Communities and announcement channels do not bind pages either. They only multiply whatever
          object you pointed at.
        </p>
        <h2>Quoted reply on page 1</h2>
        <p>
          Quoting the chat preview of a PDF quotes page 1 as a picture. The rest of the file is not in that
          quote. If the argument is about page 7, extract page 7 on purpose, or tell them to open the document.
          A quoted thumbnail is not a packet.
        </p>
        <h2>Starred chat is not an archive of the PDF</h2>
        <p>
          Stars keep a pointer in WhatsApp. They do not keep a second copy of Bind’s bytes in Files. If you
          wipe the chat, the star dies with it. Keep the Files PDF if the packet still matters next month.
        </p>

        <h2>Honesty limits</h2>
        <p>
          Bind does not end-to-end encrypt the PDF for you, does not unsend a photo stack, and does not OCR the
          chat. Success is: a multipage PDF you verified, attached as a document, from Files or Downloads. If you
          still dump Recents into the thread, you sent photos. For mail caps see <Link to="/email">email</Link>.
          Buttons: <Link to="/how-to">how-to</Link>. Converter: <Link to="/">Bind</Link>.
        </p>
      </Prose>
      <Faq heading="WhatsApp questions" items={whatsappFaq} />
    </SiteShell>
  );
}
