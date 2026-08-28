import { createFileRoute } from "@tanstack/react-router";
import { Faq } from "@/components/Faq";
import { JsonLd } from "@/components/JsonLd";
import { Prose } from "@/components/Prose";
import { SiteShell } from "@/components/SiteShell";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/faq")({
  head: () =>
    pageHead({
      title: "Bind FAQ — privacy, formats, iPhone, page size, limits",
      description:
        "Answers for Bind: no uploads, JPEG/PNG/WebP to PDF, PDF page ranges, Contain/Cover/Stretch, PNG vs JPEG vs WebP, iOS Safari, memory limits, and how Bind differs from Folio.",
      path: "/faq",
    }),
  component: FaqPage,
});

function FaqPage() {
  return (
    <SiteShell>
      <JsonLd path="/faq" title="Bind FAQ" includeFaq />
      <Prose className="mt-0">
        <p className="font-mono text-xs tracking-wide text-accent-deep uppercase">FAQ</p>
        <h1 className="!mt-2 text-3xl font-semibold tracking-tight">Questions about Bind</h1>
        <p>
          Short product answers live in the accordion. They are written for people converting real documents in a
          phone browser, not for a generic “PDF tool” template. If your question is “will you add merge / OCR /
          e-sign?”, the answer is no — those are other products, and keeping them out is how this page stays
          private and small.
        </p>
      </Prose>
      <Faq heading="All questions" />
    </SiteShell>
  );
}
