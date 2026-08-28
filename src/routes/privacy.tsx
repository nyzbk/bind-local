import { createFileRoute, Link } from "@tanstack/react-router";
import { JsonLd } from "@/components/JsonLd";
import { Prose } from "@/components/Prose";
import { SiteShell } from "@/components/SiteShell";
import { CONTACT_EMAIL, pageHead } from "@/lib/seo";

export const Route = createFileRoute("/privacy")({
  head: () =>
    pageHead({
      title: "Privacy Policy — Bind",
      description:
        "Bind converts images and PDFs in your browser. File contents are not uploaded. Hosting logs and Google AdSense may collect standard usage data. Contact ultaultimatum@gmail.com.",
      path: "/privacy",
    }),
  component: PrivacyPage,
});

function PrivacyPage() {
  return (
    <SiteShell>
      <JsonLd path="/privacy" title="Privacy Policy" includeFaq={false} />
      <Prose className="mt-0">
        <h1 className="!mt-0 text-3xl font-semibold tracking-tight">Privacy Policy</h1>
        <p className="font-mono text-xs text-muted">Last updated: 28 August 2026</p>
        <p>
          Bind processes your files entirely in your web browser. We do not upload, store, or transmit the content
          of your images or PDF files to a conversion server. There is no Bind account and no file locker.
        </p>
        <h2>What we do not collect from the converter</h2>
        <ul>
          <li>The bytes of images and PDFs you drop on the page.</li>
          <li>Filenames as a stored history. They exist only in this tab until you close it.</li>
          <li>A user profile, email-from-signup, or payment record for the converter itself.</li>
        </ul>
        <h2>What the website may collect</h2>
        <ul>
          <li>
            Hosting and CDN (Vercel) may log IP address, user-agent and request path for security and reliability.
            Those logs do not include the contents of files you convert.
          </li>
          <li>
            Google AdSense may set cookies and collect standard usage data after you use the site, using publisher
            ID ca-pub-7636435144500691. Ads are not given your documents. See Google’s advertising privacy policy
            for that processing.
          </li>
          <li>
            ads.txt at the site root lists the authorised seller: google.com, pub-7636435144500691, DIRECT,
            f08c47fec0942fa0.
          </li>
        </ul>
        <h2>Contact</h2>
        <p>
          Privacy questions: <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>. Do not email the documents
          you converted — we do not need them. More: <Link to="/contact">Contact</Link>,{" "}
          <Link to="/terms">Terms</Link>.
        </p>
      </Prose>
    </SiteShell>
  );
}
