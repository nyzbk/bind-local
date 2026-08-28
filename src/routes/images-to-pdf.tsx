import { createFileRoute } from "@tanstack/react-router";
import { BindApp } from "@/components/BindApp";
import { Faq } from "@/components/Faq";
import { HowItWorks } from "@/components/HowItWorks";
import { ImagesToPdfCopy } from "@/components/ImagesToPdfCopy";
import { JsonLd } from "@/components/JsonLd";
import { SiteShell } from "@/components/SiteShell";
import { AdUnit } from "@/components/AdUnit";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/images-to-pdf")({
  head: () =>
    pageHead({
      title: "Images to PDF — Bind · Free, private, no upload",
      description:
        "Convert JPG, PNG, WebP, BMP and GIF into a clean multipage PDF in your browser. Choose A4, Letter or Legal, margins and Contain/Cover/Stretch. No upload, no signup, no watermark.",
      path: "/images-to-pdf",
    }),
  component: ImagesToPdfPage,
});

function ImagesToPdfPage() {
  return (
    <SiteShell>
      <JsonLd path="/images-to-pdf" title="Images to PDF" includeFaq={false} />
      <BindApp mode="images-to-pdf" />
      <HowItWorks />
      <AdUnit slot="mid" className="mt-10" />
      <ImagesToPdfCopy />
      <Faq heading="Images to PDF questions" />
    </SiteShell>
  );
}
