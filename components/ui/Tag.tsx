import { cn } from "@/lib/utils";

interface TagProps {
  children: React.ReactNode;
  className?: string;
  variant?: "default" | "accent";
}

export function Tag({ children, className, variant = "default" }: TagProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center border",
        variant === "default" &&
          "border-border-strong px-2 py-0.5 text-[0.7rem] text-text-secondary",
        variant === "accent" &&
          "text-small px-3 py-1 font-mono-ui text-accent uppercase border-accent bg-accent-soft",
        className,
      )}
    >
      {children}
    </span>
  );
}
