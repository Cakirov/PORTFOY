import type { IconComponent } from "@/types/icon";
import { cn } from "@/lib/utils";

interface IconBadgeProps {
  icon: IconComponent;
  className?: string;
  size?: "sm" | "md";
}

export function IconBadge({ icon: Icon, className, size = "md" }: IconBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center justify-center border border-border-strong bg-bg-elevated text-accent",
        size === "md" ? "h-11 w-11" : "h-9 w-9",
        className,
      )}
      aria-hidden="true"
    >
      <Icon className={size === "md" ? "h-5 w-5" : "h-4 w-4"} strokeWidth={1.75} />
    </span>
  );
}
