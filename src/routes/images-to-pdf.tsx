import { createFileRoute } from "@tanstack/react-router";
import { BindApp } from "@/components/BindApp";
import { Faq } from "@/components/Faq";
import { HowItWorks } from "@/components/HowItWorks";
import { JsonLd } from "@/components/JsonLd";
import { SiteShell } from "@/components/SiteShell";
import { AdUnit } from "@/components/AdUnit";

export const Route = createFileRoute("/images-to-pdf")({
  head: () => ({
    meta: [
      { title: "Images to PDF — Bind · Free, private, no upload" },
      {
        name: "description",
        content:
          "Convert JPG, PNG, WebP and more into a clean multipage PDF in your browser. No upload, no signup, no watermark.",
      },
    ],
  }),
  component: ImagesToPdfPage,
});

function ImagesToPdfPage() {
  return (
    <SiteShell>
      <JsonLd />
      <BindApp mode="images-to-pdf" />
      <HowItWorks />
      <AdUnit slot="mid" className="mt-10" />
      <Faq />
    </SiteShell>
  );
}
