import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Splits text into words for staggered reveal animations. */
export function splitWords(text: string): string[] {
  return text.split(" ");
}
