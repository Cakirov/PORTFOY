import { type ClassValue, clsx } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

// Custom type-scale utilities (text-display/text-h1/h2/h3/body/small/label,
// defined in styles/globals.css) share the `text-*` prefix with Tailwind's
// built-in font-size and text-color utilities. Without this, tailwind-merge
// doesn't recognize them and silently drops one side whenever a type-scale
// class and a text-color class (e.g. text-text-primary) appear together —
// registering them as their own group keeps both.
const customTwMerge = extendTailwindMerge<"custom-type-scale">({
  extend: {
    classGroups: {
      "custom-type-scale": [
        { text: ["display", "h1", "h2", "h3", "body", "small", "label"] },
      ],
    },
  },
});

export function cn(...inputs: ClassValue[]) {
  return customTwMerge(clsx(inputs));
}
