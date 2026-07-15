import { Eyebrow } from "@/components/ui/Eyebrow";
import { Masthead } from "@/components/ui/Masthead";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { Button } from "@/components/ui/Button";
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
      className="container-max relative border-t border-border px-(--section-px) py-(--section-py)"
    >
      <ScrollReveal>
        <Masthead fig="08" name="CONTACT" view="SIGNATURE" sheet="8 / 8" />
      </ScrollReveal>

      <ScrollReveal className="mx-auto flex max-w-3xl flex-col items-center gap-8 border border-border-strong px-6 py-16 text-center sm:px-12">
        <Eyebrow className="justify-center">{contact.eyebrow}</Eyebrow>

        <h2 id="contact-heading" className="text-h1 font-display font-bold text-text-primary">
          {contact.heading}
        </h2>

        <p className="text-body max-w-xl text-text-secondary">{contact.body}</p>

        <div className="mt-4 flex flex-wrap items-center justify-center gap-4">
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
        </div>
      </ScrollReveal>
    </section>
  );
}
