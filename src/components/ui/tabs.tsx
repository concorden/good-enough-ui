import type { Child } from "hono/jsx";
import { cn } from "./utils";

type Props = { children?: Child; class?: string; [key: string]: unknown };
type TabsProps = Props & { defaultValue: string };
type TabsTriggerProps = Props & { value: string };
type TabsContentProps = Props & { value: string };

export function Tabs({ children, defaultValue, class: className, ...rest }: TabsProps) {
  return (
    <div
      x-data={`{ tab: '${defaultValue}' }`}
      class={cn("w-full", className)}
      {...rest}
    >
      {children}
    </div>
  );
}

export function TabsList({ children, class: className, ...rest }: Props) {
  return (
    <div
      role="tablist"
      class={cn(
        "inline-flex h-10 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground",
        className,
      )}
      {...rest}
    >
      {children}
    </div>
  );
}

export function TabsTrigger({ children, value, class: className, ...rest }: TabsTriggerProps) {
  return (
    <button
      role="tab"
      x-on:click={`tab = '${value}'`}
      x-bind:data-state={`tab === '${value}' ? 'active' : 'inactive'`}
      x-bind:aria-selected={`tab === '${value}'`}
      class={cn(
        "inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        "disabled:pointer-events-none disabled:opacity-50",
        "data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm",
        className,
      )}
      {...rest}
    >
      {children}
    </button>
  );
}

export function TabsContent({ children, value, class: className, ...rest }: TabsContentProps) {
  return (
    <div
      role="tabpanel"
      x-show={`tab === '${value}'`}
      x-cloak=""
      class={cn(
        "mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        className,
      )}
      {...rest}
    >
      {children}
    </div>
  );
}
