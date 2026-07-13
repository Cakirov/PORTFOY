import { RevealText } from "@/components/ui/RevealText";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { fadeIn } from "@/lib/motion";
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
    <div
      className={cn(
        "flex flex-col gap-4",
        align === "center" && "items-center text-center",
        className,
      )}
    >
      <ScrollReveal variants={fadeIn}>
        <Eyebrow>{eyebrow}</Eyebrow>
      </ScrollReveal>
      <RevealText as="h2" text={heading} id={id} className="text-h1 text-text-primary" />
      {body ? (
        <ScrollReveal delay={0.1} className="text-body max-w-xl text-text-secondary">
          <p>{body}</p>
        </ScrollReveal>
      ) : null}
    </div>
  );
}
