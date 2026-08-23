import { createFileRoute } from "@tanstack/react-router";
import { BindApp } from "@/components/BindApp";
import { Faq } from "@/components/Faq";
import { HowItWorks } from "@/components/HowItWorks";
import { JsonLd } from "@/components/JsonLd";
import { SiteShell } from "@/components/SiteShell";
import { AdUnit } from "@/components/AdUnit";

export const Route = createFileRoute("/pdf-to-images")({
  head: () => ({
    meta: [
      { title: "PDF to Images — Bind · Extract pages as PNG, JPEG, WebP" },
      {
        name: "description",
        content:
          "Extract PDF pages as PNG, JPEG or WebP entirely in your browser. Choose a page range, download a ZIP. No upload.",
      },
    ],
  }),
  component: PdfToImagesPage,
});

function PdfToImagesPage() {
  return (
    <SiteShell>
      <JsonLd />
      <BindApp mode="pdf-to-images" />
      <HowItWorks />
      <AdUnit slot="mid" className="mt-10" />
      <Faq />
    </SiteShell>
  );
}
