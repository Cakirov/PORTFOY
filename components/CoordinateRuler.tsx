const NUMBERS = ["1", "2", "3", "4", "5", "6"];
const LETTERS = ["A", "B", "C", "D"];

/** Fixed edge coordinate ticks — decorative technical-drawing sheet chrome. */
export function CoordinateRuler() {
  return (
    <div aria-hidden="true" className="hidden font-mono-ui text-[0.6rem] tracking-wide text-text-tertiary lg:block">
      <div className="pointer-events-none fixed top-1.5 left-[34px] right-[34px] z-50 flex justify-between">
        {NUMBERS.map((n) => (
          <span key={n}>{n}</span>
        ))}
      </div>
      <div className="pointer-events-none fixed bottom-1.5 left-[34px] right-[34px] z-50 flex justify-between">
        {LETTERS.map((l) => (
          <span key={l}>{l}</span>
        ))}
      </div>
      <div className="pointer-events-none fixed top-[34px] bottom-[34px] left-1.5 z-50 flex flex-col justify-between">
        {LETTERS.map((l) => (
          <span key={l}>{l}</span>
        ))}
      </div>
      <div className="pointer-events-none fixed top-[34px] bottom-[34px] right-1.5 z-50 flex flex-col justify-between">
        {NUMBERS.slice(0, 4).map((n) => (
          <span key={n}>{n}</span>
        ))}
      </div>
    </div>
  );
}
