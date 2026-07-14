import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import { Roboto_Condensed, Inter, JetBrains_Mono } from "next/font/google";
import { Providers } from "@/components/Providers";
import { SkipLink } from "@/components/SkipLink";
import { ScrollProgress } from "@/components/ScrollProgress";
import { CrosshairCursor } from "@/components/CrosshairCursor";
import { CoordinateReadout } from "@/components/CoordinateReadout";
import { RegistrationMarks } from "@/components/RegistrationMarks";
import { SheetIndexRail } from "@/components/SheetIndexRail";
import { StructuredData } from "@/components/StructuredData";
import { buildMetadata } from "@/lib/metadata";
import "../styles/globals.css";

const robotoCondensed = Roboto_Condensed({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "700"],
  variable: "--font-display-family",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin", "latin-ext"],
  variable: "--font-body-family",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin", "latin-ext"],
  variable: "--font-mono-family",
  display: "swap",
});

export const metadata: Metadata = buildMetadata();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="tr"
      className={`${robotoCondensed.variable} ${inter.variable} ${jetbrainsMono.variable}`}
    >
      <body className="antialiased">
        <StructuredData />
        <Providers>
          <SkipLink />
          <ScrollProgress />
          <RegistrationMarks />
          <CoordinateReadout />
          <CrosshairCursor />
          <SheetIndexRail />
          {children}
        </Providers>
        <Analytics />
      </body>
    </html>
  );
}
