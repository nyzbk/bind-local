import { APP_DESCRIPTION, APP_NAME, FAQ } from "@/lib/constants";
import { CONTACT_EMAIL, SITE_ORIGIN, canonicalUrl } from "@/lib/seo";

type Props = {
  path?: string;
  title?: string;
  includeFaq?: boolean;
};

export function JsonLd({ path = "/", title, includeFaq = true }: Props) {
  const url = canonicalUrl(path);
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        name: APP_NAME,
        url: `${SITE_ORIGIN}/`,
        description: APP_DESCRIPTION,
        publisher: {
          "@type": "Organization",
          name: "Ultimatum",
          email: CONTACT_EMAIL,
        },
      },
      {
        "@type": "WebApplication",
        name: APP_NAME,
        url: `${SITE_ORIGIN}/`,
        applicationCategory: "UtilitiesApplication",
        operatingSystem: "Any",
        offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
        description: APP_DESCRIPTION,
      },
      {
        "@type": "WebPage",
        name: title || APP_NAME,
        url,
        isPartOf: { "@type": "WebSite", url: `${SITE_ORIGIN}/` },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: `${SITE_ORIGIN}/`,
          },
          ...(path === "/"
            ? []
            : [
                {
                  "@type": "ListItem",
                  position: 2,
                  name: title || path,
                  item: url,
                },
              ]),
        ],
      },
      ...(includeFaq
        ? [
            {
              "@type": "FAQPage",
              mainEntity: FAQ.map((item) => ({
                "@type": "Question",
                name: item.q,
                acceptedAnswer: { "@type": "Answer", text: item.a },
              })),
            },
          ]
        : []),
    ],
  };

  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
  );
}
