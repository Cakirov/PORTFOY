import { Eyebrow } from "@/components/ui/Eyebrow";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  eyebrow: string;
  heading: string;
  body?: string;
  id: string;
  align?: "left" | "center";
  className?: string;
}

export function SectionHeading({
  eyebrow,
  heading,
  body,
  id,
  align = "left",
  className,
}: SectionHeadingProps) {
  return (
    <ScrollReveal
      className={cn("max-w-[42rem]", align === "center" && "text-center", className)}
    >
      <Eyebrow className="mb-[1.1rem]">{eyebrow}</Eyebrow>
      <h2 id={id} className="text-h1 mb-[0.9rem] font-display font-bold text-text-primary">
        {heading}
      </h2>
      {body ? <p className="text-body text-text-secondary">{body}</p> : null}
    </ScrollReveal>
  );
}
