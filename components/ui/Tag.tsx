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
        "text-small inline-flex items-center border px-3 py-1 font-mono-ui uppercase",
        variant === "default" &&
          "border-border-strong text-text-secondary bg-bg-elevated/60",
        variant === "accent" && "border-accent bg-accent-soft text-accent",
        className,
      )}
    >
      {children}
    </span>
  );
}
