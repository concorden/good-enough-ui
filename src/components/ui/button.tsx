import type { Child } from "hono/jsx";
import { cn } from "./utils";

const variantStyles = {
  default: "bg-primary text-primary-foreground shadow-sm hover:bg-primary/90",
  destructive: "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
  outline: "border border-input bg-background text-foreground shadow-sm hover:bg-accent hover:text-accent-foreground",
  secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
  ghost: "text-foreground hover:bg-accent hover:text-accent-foreground",
  link: "text-primary underline-offset-4 hover:underline p-0 h-auto",
} as const;

const sizeStyles = {
  sm: "h-8 px-3 text-sm rounded",
  default: "h-9 px-4 py-2 rounded-md",
  lg: "h-10 px-6 text-lg rounded-md",
  icon: "h-9 w-9 rounded-md p-0",
} as const;

export type ButtonVariant = keyof typeof variantStyles;
export type ButtonSize = keyof typeof sizeStyles;

export type ButtonProps = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  class?: string;
  children?: Child;
  // pass-through for hx-*, x-*, and any other HTML attributes
  [key: string]: unknown;
};

export function Button({
  variant = "default",
  size = "default",
  class: className,
  children,
  ...rest
}: ButtonProps) {
  return (
    <button
      class={cn(
        "inline-flex items-center justify-center font-medium transition-colors",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        "disabled:pointer-events-none disabled:opacity-50",
        variantStyles[variant],
        sizeStyles[size],
        className,
      )}
      {...rest}
    >
      {children}
    </button>
  );
}
