import { RevealText } from "@/components/ui/RevealText";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Masthead } from "@/components/ui/Masthead";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { Button } from "@/components/ui/Button";
import { socialLinks } from "@/data/socialLinks";
import { siteContent } from "@/data/siteContent";
import { SECTION_IDS } from "@/lib/constants";

export function ContactSection() {
  const { contact } = siteContent;

  return (
    <section
      id={SECTION_IDS.contact}
      aria-labelledby="contact-heading"
      className="relative mx-auto max-w-(--container-max) border-t border-border px-6 py-28 lg:px-10 lg:py-36"
    >
      <Masthead fig="08" name="CONTACT" view="SIGNATURE" sheet="8 / 8" />

      <div className="mx-auto flex max-w-3xl flex-col items-center gap-8 border border-border-strong px-6 py-16 text-center sm:px-12">
        <ScrollReveal>
          <Eyebrow>{contact.eyebrow}</Eyebrow>
        </ScrollReveal>

        <RevealText
          as="h2"
          id="contact-heading"
          text={contact.heading}
          className="text-h1 font-display font-semibold text-text-primary"
        />

        <ScrollReveal delay={0.1} className="text-body max-w-xl text-text-secondary">
          <p>{contact.body}</p>
        </ScrollReveal>

        <ScrollReveal delay={0.2} className="mt-4 flex flex-wrap items-center justify-center gap-4">
          {socialLinks.map((link) => (
            <Button
              key={link.platform}
              href={link.href}
              variant={link.platform === "email" ? "primary" : "secondary"}
              magnetic
            >
              <link.icon className="h-4 w-4" strokeWidth={1.75} aria-hidden="true" />
              {link.label}
            </Button>
          ))}
        </ScrollReveal>
      </div>
    </section>
  );
}
