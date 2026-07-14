import { socialLinks } from "@/data/socialLinks";
import { siteContent } from "@/data/siteContent";
import { REVISION_HISTORY, CURRENT_REVISION } from "@/lib/constants";

export function Footer() {
  const { footer } = siteContent;
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border px-(--section-px) py-12">
      <div className="mx-auto flex max-w-(--container-max) flex-col gap-8">
        <div>
          <p className="mb-3 font-mono-ui text-label text-text-tertiary">Revision History</p>
          <div className="overflow-x-auto border border-border-strong">
            <table className="w-full border-collapse text-small">
              <thead>
                <tr>
                  <th className="border border-border px-3 py-2 text-left font-mono-ui text-label text-text-tertiary">Rev</th>
                  <th className="border border-border px-3 py-2 text-left font-mono-ui text-label text-text-tertiary">Tarih</th>
                  <th className="border border-border px-3 py-2 text-left font-mono-ui text-label text-text-tertiary">Açıklama</th>
                </tr>
              </thead>
              <tbody>
                {REVISION_HISTORY.map((row, i) => {
                  const isCurrent = i === REVISION_HISTORY.length - 1;
                  return (
                    <tr key={row.rev} className={isCurrent ? "text-accent" : "text-text-secondary"}>
                      <td className="border border-border px-3 py-2 font-mono-ui">{row.rev}</td>
                      <td className="border border-border px-3 py-2 font-mono-ui">{row.date}</td>
                      <td className="border border-border px-3 py-2">{row.note}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        <div className="grid grid-cols-2 border border-border-strong font-mono-ui sm:grid-cols-3">
          <div className="border-r border-b border-border-strong p-4 sm:border-b-0">
            <span className="mb-1 block text-label text-text-tertiary">Drawn By</span>
            <span className="text-small text-text-primary">{footer.name}</span>
          </div>
          <div className="border-b border-border-strong p-4 sm:border-r sm:border-b-0">
            <span className="mb-1 block text-label text-text-tertiary">Checked By</span>
            <span className="text-small text-text-primary">OK</span>
          </div>
          <div className="border-r border-border-strong p-4">
            <span className="mb-1 block text-label text-text-tertiary">Approved By</span>
            <span className="text-small text-accent">Beklemede</span>
          </div>
          <div className="border-r border-border-strong p-4">
            <span className="mb-1 block text-label text-text-tertiary">Date</span>
            <span className="text-small text-text-primary">{CURRENT_REVISION.date}</span>
          </div>
          <div className="border-r border-border-strong p-4">
            <span className="mb-1 block text-label text-text-tertiary">Sheet</span>
            <span className="text-small text-text-primary">8 / 8</span>
          </div>
          <div className="p-4">
            <span className="mb-1 block text-label text-text-tertiary">Rev</span>
            <span className="text-small text-accent">{CURRENT_REVISION.rev}</span>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-4 font-mono-ui text-small text-text-tertiary uppercase sm:flex-row">
          <span>
            {footer.name} — © {year}
          </span>
          <div className="flex items-center gap-5 normal-case">
            {socialLinks.map((link) => (
              <a
                key={link.platform}
                href={link.href}
                aria-label={link.label}
                className="text-text-secondary transition-colors hover:text-accent"
              >
                <link.icon className="h-4 w-4" strokeWidth={1.75} />
              </a>
            ))}
          </div>
          <span>Built with Next.js</span>
        </div>
      </div>
    </footer>
  );
}
