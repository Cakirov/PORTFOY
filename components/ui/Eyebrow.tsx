import { cn } from "@/lib/utils";

interface EyebrowProps {
  children: React.ReactNode;
  className?: string;
  /** "lg" is used where an eyebrow needs more presence than the default (e.g. Hero). */
  size?: "base" | "lg";
}

/** Small uppercase label used above section headings ("SELECTED WORK" style). */
export function Eyebrow({ children, className, size = "base" }: EyebrowProps) {
  return (
    <span
      className={cn(
        size === "lg" ? "text-label-lg" : "text-label",
        "inline-flex items-center gap-2 text-accent",
        className,
      )}
    >
      <span aria-hidden="true">◈</span>
      {children}
    </span>
  );
}
