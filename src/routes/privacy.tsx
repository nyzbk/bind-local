import { createFileRoute } from "@tanstack/react-router";
import { SiteShell } from "@/components/SiteShell";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [{ title: "Privacy Policy — Bind" }],
  }),
  component: PrivacyPage,
});

function PrivacyPage() {
  return (
    <SiteShell>
      <article className="mx-auto max-w-2xl">
        <h1 className="text-3xl font-semibold tracking-tight">Privacy Policy</h1>
        <p className="mt-2 font-mono text-xs text-muted">Last updated: 23 August 2026</p>
        <div className="mt-8 space-y-4 text-sm leading-relaxed text-ink">
          <p>
            Bind processes your files entirely in your web browser. We do not upload, store, or transmit the content of
            your images or PDF files to any server.
          </p>
          <ul className="list-disc space-y-2 pl-5 text-muted">
            <li>No accounts or registration required.</li>
            <li>No file content is sent to our servers or third parties for processing.</li>
            <li>Processing uses only client-side libraries (pdf-lib, pdf.js, Canvas).</li>
            <li>
              Standard web analytics and advertising (Google AdSense) may collect anonymized usage data after you
              interact with the site. This does not include the content of files you process.
            </li>
            <li>You can use the tool offline after the page has loaded (subject to browser cache).</li>
          </ul>
          <p className="text-muted">
            Hosting and CDN providers may log IP addresses, user-agent strings and request paths for security and
            reliability. They do not receive the bytes of files you convert.
          </p>
          <p className="text-muted">If you have questions, contact via the agency link in About.</p>
        </div>
      </article>
    </SiteShell>
  );
}
