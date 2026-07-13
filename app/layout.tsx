import type { Metadata } from "next";
import { Oswald, Inter, JetBrains_Mono } from "next/font/google";
import { Providers } from "@/components/Providers";
import { SkipLink } from "@/components/SkipLink";
import { ScrollProgress } from "@/components/ScrollProgress";
import { CrosshairCursor } from "@/components/CrosshairCursor";
import { CoordinateReadout } from "@/components/CoordinateReadout";
import { RegistrationMarks } from "@/components/RegistrationMarks";
import { CoordinateRuler } from "@/components/CoordinateRuler";
import { SheetIndexRail } from "@/components/SheetIndexRail";
import { buildMetadata } from "@/lib/metadata";
import "../styles/globals.css";

const oswald = Oswald({
  subsets: ["latin", "latin-ext"],
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
      className={`${oswald.variable} ${inter.variable} ${jetbrainsMono.variable}`}
    >
      <body className="antialiased">
        <Providers>
          <SkipLink />
          <ScrollProgress />
          <RegistrationMarks />
          <CoordinateRuler />
          <CoordinateReadout />
          <CrosshairCursor />
          <SheetIndexRail />
          {children}
        </Providers>
      </body>
    </html>
  );
}
