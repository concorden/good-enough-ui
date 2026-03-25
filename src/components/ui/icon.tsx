import { createElement } from "hono/jsx";
import type { IconNode } from "lucide";
import { cn } from "./utils";

export type IconProps = {
  icon: IconNode;
  size?: number | string;
  "stroke-width"?: number | string;
  class?: string;
  [key: string]: unknown;
};

export function Icon({
  icon,
  size = 24,
  "stroke-width": strokeWidth = 2,
  class: className,
  ...rest
}: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width={strokeWidth}
      stroke-linecap="round"
      stroke-linejoin="round"
      class={cn("shrink-0", className)}
      {...rest}
    >
      {icon.map(([tag, attrs]) => createElement(tag, attrs))}
    </svg>
  );
}
