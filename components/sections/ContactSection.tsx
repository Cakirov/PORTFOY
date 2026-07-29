"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Masthead } from "@/components/ui/Masthead";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { GridBackdrop } from "@/components/ui/GridBackdrop";
import { StaggerGroup } from "@/components/motion/StaggerGroup";
import { ContactForm } from "@/components/sections/ContactForm";
import { socialLinks } from "@/data/socialLinks";
import { siteContent } from "@/data/siteContent";
import { SECTION_IDS } from "@/lib/constants";
import { fadeInUp } from "@/lib/motion";

// Small "clamped corner" marks on the form panel — the same motif as the
// intro loader's signal-lock brackets, echoed here as static (non-animated)
// chrome to read as a fixed instrument rather than a one-time flourish.
const CORNERS = [
  "-top-1 -left-1 border-t-2 border-l-2",
  "-top-1 -right-1 border-t-2 border-r-2",
  "-bottom-1 -left-1 border-b-2 border-l-2",
  "-bottom-1 -right-1 border-b-2 border-r-2",
] as const;

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

      <div className="container-max relative px-(--section-px) py-(--section-py)">
        <ScrollReveal>
          <Masthead fig="08" name="CONTACT" view="SIGNATURE" sheet="8 / 8" />
        </ScrollReveal>

        <div className="grid gap-14 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-16 lg:items-start">
          {/* Pitch + direct contact methods. */}
          <ScrollReveal className="flex flex-col gap-8">
            <Eyebrow>{contact.eyebrow}</Eyebrow>
            <h2 id="contact-heading" className="text-h1 font-display font-bold text-text-primary">
              {contact.heading}
            </h2>
            <p className="text-body max-w-md text-text-secondary">{contact.body}</p>

            <StaggerGroup className="mt-2 flex flex-col border-t border-dashed border-border">
              {ctaLinks.map((link) => (
                <motion.a
                  key={link.platform}
                  href={link.href}
                  variants={fadeInUp}
                  className="group flex items-center justify-between gap-4 border-b border-dashed border-border py-4 font-mono-ui text-small text-text-primary transition-colors duration-(--motion-fast) hover:text-accent"
                >
                  <span className="flex items-center gap-3">
                    <link.icon className="h-4 w-4 text-accent" strokeWidth={1.75} aria-hidden="true" />
                    {link.label}
                  </span>
                  <ArrowUpRight className="h-4 w-4 shrink-0 text-text-tertiary transition-[transform,color] duration-(--motion-fast) group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent" />
                </motion.a>
              ))}
            </StaggerGroup>
          </ScrollReveal>

          {/* The form itself, framed as a distinct "submitted sheet" panel. */}
          <ScrollReveal delay={0.12} className="relative border border-border-strong bg-bg-elevated/60 p-6 sm:p-8 md:p-10">
            {CORNERS.map((pos) => (
              <span key={pos} aria-hidden="true" className={`pointer-events-none absolute h-3 w-3 border-accent ${pos}`} />
            ))}
            <ContactForm />
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
