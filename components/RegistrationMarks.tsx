const POSITIONS = ["tl", "tr", "bl", "br"] as const;

const POSITION_CLASSES: Record<(typeof POSITIONS)[number], string> = {
  tl: "top-2.5 left-2.5",
  tr: "top-2.5 right-2.5",
  bl: "bottom-2.5 left-2.5",
  br: "bottom-2.5 right-2.5",
};

/** Fixed corner crop/registration marks — decorative print-drawing chrome. */
export function RegistrationMarks() {
  return (
    <div aria-hidden="true" className="hidden lg:block">
      {POSITIONS.map((pos) => (
        <div
          key={pos}
          className={`pointer-events-none fixed z-[60] h-[18px] w-[18px] opacity-[0.55] ${POSITION_CLASSES[pos]}`}
        >
          <span className="absolute top-1/2 left-0 h-px w-full -translate-y-1/2 bg-text-tertiary" />
          <span className="absolute top-0 left-1/2 h-full w-px -translate-x-1/2 bg-text-tertiary" />
        </div>
      ))}
    </div>
  );
}
