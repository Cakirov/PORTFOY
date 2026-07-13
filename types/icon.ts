import type { ComponentType, SVGProps } from "react";

/** Structurally compatible with both lucide-react icons and custom inline SVG icons. */
export type IconComponent = ComponentType<SVGProps<SVGSVGElement>>;
