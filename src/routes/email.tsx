import { createFileRoute, Link } from "@tanstack/react-router";
import { Faq } from "@/components/Faq";
import { JsonLd } from "@/components/JsonLd";
import { Prose } from "@/components/Prose";
import { SiteShell } from "@/components/SiteShell";
import { emailFaq } from "@/lib/constants";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/email")({
  head: () =>
    pageHead({
      title: "Email the PDF, not a ZIP of every page — Bind",
      description:
        "Gmail’s 25 MB cap is on the message, not on Bind. Mail one PDF, or extract only the pages a portal named. Bind does not send mail or create Drive links.",
      path: "/email",
    }),
  component: EmailPage,
});

function EmailPage() {
  return (
    <SiteShell>
      <JsonLd path="/email" title="Email one PDF versus a ZIP of pages" includeFaq={false} />
      <Prose className="mt-0">
        <p className="font-mono text-xs tracking-wide text-accent-deep uppercase">Email</p>
        <h1 className="!mt-2 text-3xl font-semibold tracking-tight">
          One PDF is an attachment. A ZIP of 3× PNG pages is a different object.
        </h1>
        <p>
          Bind can emit either. People then paste both into Gmail and blame the converter when Google removes the
          file and inserts a Drive link. Official Gmail help (6584): if attachments total more than 25 MB, Gmail
          takes the files out of the message and puts a Drive link in. That is a mail cap, not a Bind quota. Bind
          never talks to Drive and never sends the message.
        </p>

        <h2>Which object the recipient asked for</h2>
        <p>
          <strong>They asked for a PDF.</strong> Images to PDF, order the stills, download one file, attach that
          file. On iPhone it must exist in Files first — <Link to="/iphone">iPhone</Link>. Do not attach the 12
          JPEGs “and a PDF”. The JPEGs are the sources. The PDF is the packet.
        </p>
        <p>
          <strong>A portal asked for JPG of page 3.</strong> PDF to Images, range <code>3</code>, JPEG or PNG.
          Attach that still, or upload it in the portal. Mailing the whole report PDF is the wrong object. Mailing
          a 3× PNG ZIP of 80 pages is how you hit 25 MB.
        </p>
        <p>
          MIME/base64 makes a binary larger in the message than it looks on disk. A PDF that shows 24 MB in Files
          can already fail the cap. Do not cut it fine. Split the range or bind fewer photos.
        </p>

        <h2>What Bind does</h2>
        <p>
          It writes a blob in this tab. You save it. You attach it in Mail, Outlook, Fastmail, a clerk’s web form.
          Close the tab before save and the blob is gone — there is no “resend from Bind’s server”, because there
          is no server copy. The <Link to="/">converter</Link> is the product. Mail is yours.
        </p>

        <h2>The ceiling</h2>
        <p>
          Bind will not raise Gmail’s 25 MB. Bind will not flatten a 3× PNG ZIP into a small PDF automatically —
          those are opposite directions. If the PDF is huge, you put too many heavy photos on too many pages, or
          you extracted at 3×. Lower scale. Fewer pages. Contain on A4 does not magically shrink a 40-megapixel
          phone photo; the photo is still in the page. Shrink the stills before bind if the clerk’s inbox is the
          bottleneck. That shrink is not this tool’s primary job.
        </p>

        <h2>Steps</h2>
        <ol>
          <li>Decide PDF packet vs named stills. Do not send both “to be safe” if the cap is tight.</li>
          <li>
            Bind or extract. Open page 1 and the last page. Crooked scans stay crooked — Bind does not deskew.
          </li>
          <li>Look at the file size in Files or Finder before you open compose.</li>
          <li>
            If it is near 20 MB+, split. Two mails with two PDFs beat one Drive surprise when the clerk’s policy
            forbids Drive.
          </li>
          <li>
            Attach the Files/Downloads object, not Recents. Recents is photos. WhatsApp is a different pipe —{" "}
            <Link to="/whatsapp">WhatsApp</Link>.
          </li>
        </ol>

        <h2>What looks like a bug and is not</h2>
        <ul>
          <li>Drive link appeared — Gmail 25 MB. Not Bind.</li>
          <li>Clerk says they cannot open ZIP — they wanted a PDF. Send the PDF.</li>
          <li>Type is soft in a 1× extract — raise scale or rescan. Raster cannot invent vectors.</li>
          <li>Outlook blocked PDF — their policy. Bind wrote a normal raster-per-page PDF, not JS-in-PDF.</li>
        </ul>

        <h2>Work mailbox versus Gmail</h2>
        <p>
          Many work servers cap attachments at 10 MB and silently drop the rest. 25 MB is Gmail’s published
          number, not a universal law. If the clerk is on a government or university host, believe their bounce.
          Split PDFs by day or by form. Bind does not know their server.
        </p>
        <h2>Do not CC a ZIP of passports</h2>
        <p>
          Bind is local so that a scan need not hit a conversion farm. Email is not local. If the document is
          identity-sensitive, ask whether the clerk has a portal. A PDF in mail is still a copy on two servers.
          That is not a Bind defect; it is why this page tells you which object to attach, not that mail is a
          safe. Do not send identity scans to ultaultimatum@gmail.com either — Contact already says that.
        </p>
        <h2>Portal 2–10 MB “upload JPG”</h2>
        <p>
          That is PDF to Images, one page, JPEG, 1× or 2×, then the portal, not Gmail. Mailing them a 40-page PDF
          because “email always works” is how the ticket sits unopened. Named still versus packet — pick once.
        </p>
        <h2>Second attachment: the form plus the ID page</h2>
        <p>
          Two small PDFs often beat one combined file near the cap. Bind does not merge, so you already have a
          reason to keep them separate. Two attachments, two filenames the clerk can file. One ZIP of mixed PNG
          pages is how names get lost.
        </p>
        <h2>Plain-text reminder in the body</h2>
        <p>
          Write “PDF, 8 pages, A4, receipts 12–19 May” in the message body. Bind does not write that sentence.
          Clerks search mail, not EXIF. The filename after sanitization may have lost commas and emoji — rename
          in Files before attach if their system keys off a strict pattern. The how-to already notes sanitization;
          this page only repeats that mail is where the name is judged.
        </p>

        <h2>Extract JPEG quality versus PDF size</h2>
        <p>
          A JPEG extract at 1× is a small still. A PDF of the same page holds the raster Bind painted at the
          paper size you chose. They are not interchangeable for a cap. If the clerk asked for a document, mail
          the PDF and keep extract quality out of the argument. If they asked for a still, pick 1× or 2× JPEG
          and skip the ZIP of every page. Quality sliders on other sites are a different product.
        </p>
        <h2>Reply-all with the same 20 MB file</h2>
        <p>
          Each hop copies the attachment. A thread that already holds the PDF does not need the same file
          attached again unless a new person is missing it. Bind cannot see the thread. You can. Re-attach only
          when the new recipient was not on the last mail.
        </p>
        <h2>Shared mailbox and delayed delivery</h2>
        <p>
          Some shared inboxes quarantine PDF from unknown senders. That is their filter, not a Bind header.
          If the clerk says “nothing arrived” and Gmail on your side shows Sent with a normal size, the file
          left your device. Ask them to check quarantine before you rebuild the PDF.
        </p>

        <h2>Honesty limits</h2>
        <p>
          Bind does not BCC, does not virus-scan, does not PDF/A. If a portal requires PDF/A, print-to-PDF from
          Preview after you verify pages, or ask them which profile. Success is: the object they named, under the
          mail cap, attached from the folder you saved. How-to buttons: <Link to="/how-to">how-to</Link>. Use-case
          stacks: <Link to="/use-cases">use cases</Link>.
        </p>
      </Prose>
      <Faq heading="Email questions" items={emailFaq} />
    </SiteShell>
  );
}
