import { socialLinks } from "@/data/socialLinks";
import { siteContent } from "@/data/siteContent";
import { PERSON_NAME } from "@/lib/constants";
import { SITE_URL } from "@/lib/metadata";

const SAME_AS_PLATFORMS = new Set(["linkedin", "github"]);

/** Renders a schema.org Person JSON-LD block so search engines can associate the site with its owner. */
export function StructuredData() {
  const data = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: PERSON_NAME,
    jobTitle: siteContent.hero.eyebrow,
    url: SITE_URL,
    sameAs: socialLinks
      .filter((link) => SAME_AS_PLATFORMS.has(link.platform))
      .map((link) => link.href),
  };

  return (
    <script
      type="application/ld+json"
      // Content is fully static/first-party (no user input) — the standard
      // Next.js pattern for embedding JSON-LD structured data.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
