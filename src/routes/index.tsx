import { createFileRoute } from "@tanstack/react-router";
import { BindApp } from "@/components/BindApp";
import { Faq } from "@/components/Faq";
import { HomeCopy } from "@/components/HomeCopy";
import { HowItWorks } from "@/components/HowItWorks";
import { JsonLd } from "@/components/JsonLd";
import { SiteShell } from "@/components/SiteShell";
import { AdUnit } from "@/components/AdUnit";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/")({
  head: () =>
    pageHead({
      title: "Bind — Images to PDF & PDF to Images Online Free · No Upload",
      description:
        "Convert JPEG, PNG and WebP to a multipage PDF, or extract PDF pages as PNG, JPEG or WebP. 100% in your browser — no upload, no signup, no watermark. A4, Letter, margins, Contain/Cover.",
      path: "/",
    }),
  component: Home,
});

function Home() {
  return (
    <SiteShell>
      <JsonLd path="/" title="Bind — Images to PDF & PDF to Images" includeFaq />
      <BindApp mode="images-to-pdf" />
      <HowItWorks />
      <AdUnit slot="mid" className="mt-10" />
      <HomeCopy />
      <Faq />
    </SiteShell>
  );
}
