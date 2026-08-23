import { createFileRoute } from "@tanstack/react-router";
import { BindApp } from "@/components/BindApp";
import { Faq } from "@/components/Faq";
import { HowItWorks } from "@/components/HowItWorks";
import { JsonLd } from "@/components/JsonLd";
import { SiteShell } from "@/components/SiteShell";
import { AdUnit } from "@/components/AdUnit";
import { APP_DESCRIPTION, APP_NAME } from "@/lib/constants";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: `${APP_NAME} — Images to PDF & PDF to Images Online Free · No Upload` },
      { name: "description", content: APP_DESCRIPTION },
    ],
  }),
  component: Home,
});

function Home() {
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
