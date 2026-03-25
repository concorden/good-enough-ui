import type { Child } from "hono/jsx";
import { cn } from "./utils";

type Props = { children?: Child; class?: string; [key: string]: unknown };

export function Dialog({ children, ...rest }: Props) {
  return (
    <div x-data="{ open: false }" x-on:close-dialog="open = false" {...rest}>
      {children}
    </div>
  );
}

export function DialogTrigger({ children, ...rest }: Props) {
  return (
    <span x-on:click="open = true" {...rest}>
      {children}
    </span>
  );
}

export function DialogContent({ children, class: className, ...rest }: Props) {
  return (
    <div x-show="open" x-cloak="" class="relative z-50" {...rest}>
      {/* Backdrop */}
      <div
        x-show="open"
        x-transition:enter="ease-out duration-200"
        x-transition:enter-start="opacity-0"
        x-transition:enter-end="opacity-100"
        x-transition:leave="ease-in duration-150"
        x-transition:leave-start="opacity-100"
        x-transition:leave-end="opacity-0"
        class="fixed inset-0 bg-black/80"
      />

      {/* Panel container */}
      <div class="fixed inset-0 overflow-y-auto">
        <div
          class="flex min-h-full items-center justify-center p-4"
          {...{ "x-on:click.self": "open = false" }}
        >
          <div
            x-show="open"
            x-transition:enter="ease-out duration-200"
            x-transition:enter-start="opacity-0 scale-95"
            x-transition:enter-end="opacity-100 scale-100"
            x-transition:leave="ease-in duration-150"
            x-transition:leave-start="opacity-100 scale-100"
            x-transition:leave-end="opacity-0 scale-95"
            {...{ "x-on:keydown.escape.window": "open = false" }}
            role="dialog"
            aria-modal="true"
            class={cn(
              "relative w-full max-w-lg rounded-lg border border-border bg-background p-6 shadow-lg",
              className,
            )}
          >
            {children}

            {/* Close button */}
            <button
              x-on:click="open = false"
              class="absolute right-4 top-4 rounded-sm text-muted-foreground opacity-70 transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
              <span class="sr-only">Close</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export function DialogHeader({ children, class: className, ...rest }: Props) {
  return (
    <div class={cn("flex flex-col space-y-1.5 text-center sm:text-left", className)} {...rest}>
      {children}
    </div>
  );
}

export function DialogFooter({ children, class: className, ...rest }: Props) {
  return (
    <div class={cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2 pt-4", className)} {...rest}>
      {children}
    </div>
  );
}

export function DialogTitle({ children, class: className, ...rest }: Props) {
  return (
    <h2 class={cn("text-lg font-semibold leading-none tracking-tight", className)} {...rest}>
      {children}
    </h2>
  );
}

export function DialogDescription({ children, class: className, ...rest }: Props) {
  return (
    <p class={cn("text-sm text-muted-foreground", className)} {...rest}>
      {children}
    </p>
  );
}

export function DialogClose({ children, ...rest }: Props) {
  return (
    <span x-on:click="open = false" {...rest}>
      {children}
    </span>
  );
}
