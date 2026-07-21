import { siteContent } from "@/data/siteContent";

export function Footer() {
  const { footer } = siteContent;
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border px-(--section-px) py-12">
      <div className="container-max flex flex-col items-center gap-2 text-center">
        <p className="text-h3 font-display font-bold text-text-primary">
          {footer.name}
          <span className="text-accent">.</span>
        </p>
        <span className="font-mono-ui text-label text-text-tertiary uppercase">© {year}</span>
      </div>
    </footer>
  );
}
