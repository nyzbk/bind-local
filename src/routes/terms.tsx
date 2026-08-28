import { createFileRoute, Link } from "@tanstack/react-router";
import { JsonLd } from "@/components/JsonLd";
import { Prose } from "@/components/Prose";
import { SiteShell } from "@/components/SiteShell";
import { CONTACT_EMAIL, pageHead } from "@/lib/seo";

export const Route = createFileRoute("/terms")({
  head: () =>
    pageHead({
      title: "Terms of Use — Bind",
      description:
        "Bind is provided as-is. Browser memory limits apply. You are responsible for the files you convert. Contact ultaultimatum@gmail.com.",
      path: "/terms",
    }),
  component: TermsPage,
});

function TermsPage() {
  return (
    <SiteShell>
      <JsonLd path="/terms" title="Terms of Use" includeFaq={false} />
      <Prose className="mt-0">
        <h1 className="!mt-0 text-3xl font-semibold tracking-tight">Terms of Use</h1>
        <p className="font-mono text-xs text-muted">Last updated: 28 August 2026</p>
        <p>The Bind tool is provided “as is” without warranty of any kind.</p>
        <ul>
          <li>
            Browser memory and rendering limits apply. Very large files, high page counts or 3× scale may fail on
            low-RAM devices. That is not a paid-tier lock.
          </li>
          <li>
            We do not guarantee perfect visual fidelity for every PDF, font subset, annotation or colour profile.
          </li>
          <li>
            You are solely responsible for the content you process and for complying with applicable laws,
            including copyright.
          </li>
          <li>Do not use the tool to process illegal content.</li>
          <li>We may update the tool at any time.</li>
        </ul>
        <p>
          By using Bind you accept these terms. Questions:{" "}
          <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.{" "}
          <Link to="/privacy">Privacy</Link> · <Link to="/contact">Contact</Link>.
        </p>
      </Prose>
    </SiteShell>
  );
}
