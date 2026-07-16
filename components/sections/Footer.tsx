import { siteContent } from "@/data/siteContent";

export function Footer() {
  const { footer } = siteContent;
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border px-(--section-px) py-12">
      <div className="container-max flex flex-col gap-8">
        <div className="flex flex-col items-center justify-between gap-4 font-mono-ui text-small text-text-tertiary uppercase sm:flex-row">
          <span>
            {footer.name} — © {year}
          </span>
          <span>Built with Next.js</span>
        </div>
      </div>
    </footer>
  );
}
