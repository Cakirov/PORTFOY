import { cn } from "@/lib/utils";

interface EyebrowProps {
  children: React.ReactNode;
  className?: string;
}

/** Small uppercase label used above section headings ("SELECTED WORK" style). */
export function Eyebrow({ children, className }: EyebrowProps) {
  return (
    <span
      className={cn(
        "text-label inline-flex items-center gap-2 text-accent",
        className,
      )}
    >
      <span aria-hidden="true">◈</span>
      {children}
    </span>
  );
}
