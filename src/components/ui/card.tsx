import type { Child } from "hono/jsx";
import { cn } from "./utils";

type Props = { children?: Child; class?: string; [key: string]: unknown };

export function Card({ children, class: className, ...rest }: Props) {
  return (
    <div
      class={cn(
        "rounded-xl border border-border bg-background text-foreground shadow-sm",
        className,
      )}
      {...rest}
    >
      {children}
    </div>
  );
}

export function CardHeader({ children, class: className, ...rest }: Props) {
  return (
    <div class={cn("flex flex-col space-y-1.5 p-6 pb-0", className)} {...rest}>
      {children}
    </div>
  );
}

export function CardTitle({ children, class: className, ...rest }: Props) {
  return (
    <h3 class={cn("text-2xl font-semibold leading-none tracking-tight", className)} {...rest}>
      {children}
    </h3>
  );
}

export function CardDescription({ children, class: className, ...rest }: Props) {
  return (
    <p class={cn("text-sm text-muted-foreground", className)} {...rest}>
      {children}
    </p>
  );
}

export function CardContent({ children, class: className, ...rest }: Props) {
  return (
    <div class={cn("p-6", className)} {...rest}>
      {children}
    </div>
  );
}

export function CardFooter({ children, class: className, ...rest }: Props) {
  return (
    <div class={cn("flex items-center p-6 pt-0", className)} {...rest}>
      {children}
    </div>
  );
}
