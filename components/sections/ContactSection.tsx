import { Eyebrow } from "@/components/ui/Eyebrow";
import { Masthead } from "@/components/ui/Masthead";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { Button } from "@/components/ui/Button";
import { GridBackdrop } from "@/components/ui/GridBackdrop";
import { SectionFigure } from "@/components/ui/SectionFigure";
import { ParallaxLayer } from "@/components/motion/ParallaxLayer";
import { socialLinks } from "@/data/socialLinks";
import { siteContent } from "@/data/siteContent";
import { SECTION_IDS } from "@/lib/constants";

export function ContactSection() {
  const { contact } = siteContent;
  // Email leads as the primary CTA here; Footer keeps the data's natural order.
  const ctaLinks = [...socialLinks].sort((a, b) => Number(b.platform === "email") - Number(a.platform === "email"));

  return (
    <section
      id={SECTION_IDS.contact}
      aria-labelledby="contact-heading"
      className="relative overflow-hidden border-t border-border bg-[image:var(--gradient-surface-fade)]"
    >
      {/* Echoes Hero's grid at a fraction of the weight — masked so it frames
          the closing card instead of showing through the readable text
          behind it, and full-bleed via the same container-max split. */}
      <GridBackdrop
        parallax
        className="opacity-[0.35] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,transparent,black_75%)]"
      />
      <ParallaxLayer layer="foreground" className="pointer-events-none absolute inset-0">
        <SectionFigure figure="08" />
      </ParallaxLayer>

      <div className="container-max relative px-(--section-px) py-(--section-py)">
        <ScrollReveal>
          <Masthead fig="08" name="CONTACT" view="SIGNATURE" sheet="8 / 8" />
        </ScrollReveal>

        <div className="relative mx-auto flex max-w-3xl flex-col items-center gap-8 border border-border-strong bg-bg px-6 py-16 text-center sm:px-12">
          <ScrollReveal className="flex flex-col items-center gap-8">
            <Eyebrow className="justify-center">{contact.eyebrow}</Eyebrow>

            <h2 id="contact-heading" className="text-h1 font-display font-bold text-text-primary">
              {contact.heading}
            </h2>

            <p className="text-body max-w-xl text-text-secondary">{contact.body}</p>
          </ScrollReveal>

          <ScrollReveal delay={0.12} className="mt-4 flex flex-wrap items-center justify-center gap-4">
            {ctaLinks.map((link) => (
              <Button
                key={link.platform}
                href={link.href}
                variant={link.platform === "email" ? "primary" : "secondary"}
              >
                <link.icon className="h-4 w-4" strokeWidth={1.75} aria-hidden="true" />
                {link.label}
              </Button>
            ))}
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
