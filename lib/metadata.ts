import type { Metadata } from "next";

const SITE_NAME = "Ömer Çakıroğlu — Yazılım Mühendisi";
const SITE_DESCRIPTION =
  "Yazılım, ürün geliştirme ve yeni nesil teknolojiler üzerine çalışan bir yazılım mühendisinin kişisel portföyü.";
const SITE_URL = "https://example.com";

export function buildMetadata(): Metadata {
  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: SITE_NAME,
      template: `%s — ${SITE_NAME}`,
    },
    description: SITE_DESCRIPTION,
    keywords: [
      "yazılım mühendisi",
      "portföy",
      "full-stack geliştirici",
      "ürün geliştirme",
      "yapay zeka",
    ],
    authors: [{ name: "Ömer Çakıroğlu" }],
    openGraph: {
      type: "website",
      locale: "tr_TR",
      url: SITE_URL,
      title: SITE_NAME,
      description: SITE_DESCRIPTION,
      siteName: SITE_NAME,
    },
    twitter: {
      card: "summary_large_image",
      title: SITE_NAME,
      description: SITE_DESCRIPTION,
    },
  };
}
