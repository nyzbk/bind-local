import { createFileRoute, Link } from "@tanstack/react-router";
import { JsonLd } from "@/components/JsonLd";
import { Prose } from "@/components/Prose";
import { SiteShell } from "@/components/SiteShell";
import { CONTACT_EMAIL, pageHead } from "@/lib/seo";

export const Route = createFileRoute("/contact")({
  head: () =>
    pageHead({
      title: "Contact Bind — email for support, privacy, copyright",
      description:
        "Email Bind (Ultimatum) for converter bugs, privacy questions or copyright notices. Do not attach passports or medical scans. Files are converted in your browser, not on our servers.",
      path: "/contact",
    }),
  component: ContactPage,
});

function ContactPage() {
  return (
    <SiteShell>
      <JsonLd path="/contact" title="Contact Bind" />
      <Prose className="mt-0">
        <p className="font-mono text-xs tracking-wide text-accent-deep uppercase">Contact</p>
        <h1 className="!mt-2 text-3xl font-semibold tracking-tight">Talk to a human</h1>
        <p>
          Bind is a small free converter, not a helpdesk with a ticket queue. Mail still reaches a person. Use it
          for a broken conversion, a privacy question, a copyright notice, or a security report. There is no chat
          widget and no phone tree.
        </p>
        <p>
          Email:{" "}
          <a href={`mailto:${CONTACT_EMAIL}?subject=Bind%20(bind-local)`}>{CONTACT_EMAIL}</a>
        </p>
        <h2>What to include</h2>
        <ul>
          <li>Which direction: images → PDF or PDF → images.</li>
          <li>Browser and device (for example Safari 18 on iPhone 13, or Chrome on Windows).</li>
          <li>Page count or number of photos, format, and the exact error text on the page.</li>
          <li>Whether you used Contain/Cover, scale 1×/2×/3×, and a custom page range.</li>
        </ul>
        <h2>What not to send</h2>
        <p>
          Do not attach passports, medical scans, bank statements or photos of children. Bind never needed those
          bytes — conversion happens in your browser — and email is the wrong place to park them. If the file
          itself is the bug, describe it. We will not ask you to upload the original to a random drive.
        </p>
        <p>
          Policy and data handling: <Link to="/privacy">Privacy</Link>. Terms of use: <Link to="/terms">Terms</Link>.
          Who builds this: <Link to="/about">About</Link>.
        </p>
      </Prose>
    </SiteShell>
  );
}
