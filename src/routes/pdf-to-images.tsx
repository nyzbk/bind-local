import { createFileRoute } from "@tanstack/react-router";
import { BindApp } from "@/components/BindApp";
import { Faq } from "@/components/Faq";
import { HowItWorks } from "@/components/HowItWorks";
import { JsonLd } from "@/components/JsonLd";
import { PdfToImagesCopy } from "@/components/PdfToImagesCopy";
import { SiteShell } from "@/components/SiteShell";
import { AdUnit } from "@/components/AdUnit";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/pdf-to-images")({
  head: () =>
    pageHead({
      title: "PDF to Images — Bind · Extract pages as PNG, JPEG, WebP",
      description:
        "Extract PDF pages as PNG, JPEG or WebP entirely in your browser. Custom page range, 1×–3× scale, ZIP download. No upload, no account, no watermark.",
      path: "/pdf-to-images",
    }),
  component: PdfToImagesPage,
});

function PdfToImagesPage() {
  return (
    <SiteShell>
      <JsonLd path="/pdf-to-images" title="PDF to Images" includeFaq={false} />
      <BindApp mode="pdf-to-images" />
      <HowItWorks />
      <AdUnit slot="mid" className="mt-10" />
      <PdfToImagesCopy />
      <Faq heading="PDF to images questions" />
    </SiteShell>
  );
}
