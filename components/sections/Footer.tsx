import { siteContent } from "@/data/siteContent";
import { socialLinks } from "@/data/socialLinks";
import { Divider } from "@/components/ui/Divider";

export function Footer() {
  const { footer } = siteContent;
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border px-(--section-px) py-12">
      <div className="container-max flex flex-col items-center gap-3 text-center">
        <p className="text-h3 font-display font-bold text-text-primary">
          {footer.name}
          <span className="text-accent">.</span>
        </p>
        <p className="text-small max-w-sm text-text-secondary">{footer.tagline}</p>

        <div className="mt-1 flex items-center gap-2">
          {socialLinks.map((link) => (
            <a
              key={link.platform}
              href={link.href}
              aria-label={link.label}
              // p-3 around a 16px icon = 40px tap target — the icon's own
              // visual size stays the same, only the hit area grows.
              className="p-3 text-text-tertiary transition-colors duration-(--motion-fast) hover:text-accent"
            >
              <link.icon className="h-4 w-4" strokeWidth={1.75} aria-hidden="true" />
            </a>
          ))}
        </div>

        <Divider className="my-2 w-24" />

        <span className="font-mono-ui text-label text-text-tertiary uppercase">© {year}</span>
      </div>
    </footer>
  );
}
