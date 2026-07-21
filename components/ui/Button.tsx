import Link from "next/link";
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { MagneticWrapper } from "@/components/ui/MagneticWrapper";

type ButtonVariant = "primary" | "secondary" | "ghost";

interface SharedProps {
  variant?: ButtonVariant;
  magnetic?: boolean;
  showArrow?: boolean;
  className?: string;
  children: ReactNode;
}

type ButtonAsLink = SharedProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & {
    href: string;
  };

type ButtonAsButton = SharedProps &
  ButtonHTMLAttributes<HTMLButtonElement> & {
    href?: undefined;
  };

type ButtonProps = ButtonAsLink | ButtonAsButton;

const VARIANT_CLASSES: Record<ButtonVariant, string> = {
  primary: "border border-accent bg-accent font-semibold text-text-inverse hover:bg-accent-strong",
  secondary:
    "border border-border-strong text-text-primary hover:border-accent hover:text-accent",
  ghost: "text-text-secondary hover:text-text-primary",
};

export function Button({
  variant = "primary",
  magnetic = false,
  showArrow = false,
  className,
  children,
  href,
  ...rest
}: ButtonProps) {
  const classes = cn(
    "inline-flex items-center gap-2 px-[1.35rem] py-[0.85rem] font-mono-ui text-[0.76rem] tracking-wide uppercase transition-[background-color,border-color,color,transform] duration-(--motion-fast) active:scale-[0.97]",
    VARIANT_CLASSES[variant],
    className,
  );

  const content = (
    <>
      {children}
      {showArrow ? (
        <ArrowUpRight className="h-4 w-4 transition-transform duration-(--motion-fast) group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      ) : null}
    </>
  );

  const element = href ? (
    <Link
      href={href}
      className={cn(classes, "group")}
      {...(rest as AnchorHTMLAttributes<HTMLAnchorElement>)}
    >
      {content}
    </Link>
  ) : (
    <button
      className={cn(classes, "group")}
      {...(rest as ButtonHTMLAttributes<HTMLButtonElement>)}
    >
      {content}
    </button>
  );

  return magnetic ? (
    <MagneticWrapper className="inline-block">{element}</MagneticWrapper>
  ) : (
    element
  );
}
