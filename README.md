# Good Enough UI (WIP)

I am tired of using React for apps that don't need any React features. I always end up there using it though. Mostly because of how good shadcn is.


A lightweight component library for server-side JSX + Alpine.js, styled with Tailwind CSS v4. Built for Hono's JSX runtime but should work with any JSX runtime that outputs HTML strings.

## Stack

- **Server-side JSX** (Hono) for HTML rendering
- **Alpine.js** for client-side interactivity (dialogs, tabs, toggles)
- **Tailwind CSS v4** with design tokens via `@theme`
- **Lucide** icons (framework-agnostic base package)

HTMX-compatible but not HTMX-specific — components pass through arbitrary attributes via `...rest`, so `hx-*` attrs work naturally at the call site.

## Components

| Component | Type | Description |
|-----------|------|-------------|
| `Button` | Styled | Variants: default, destructive, outline, secondary, ghost, link. Sizes: sm, default, lg, icon |
| `Dialog` | Alpine | Modal dialog with backdrop, transitions, ESC to close |
| `Tabs` | Alpine | Tab switching with active state via `data-[state=active]:` Tailwind variants |
| `Card` | Styled | Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter |
| `Icon` | Utility | Renders Lucide icons via `createElement` for dynamic SVG tags |

## Usage

```tsx
import { Button } from "./components/ui/button";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle } from "./components/ui/dialog";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "./components/ui/tabs";
import { Card, CardHeader, CardTitle, CardContent } from "./components/ui/card";
import { Icon } from "./components/ui/icon";
import { Plus } from "lucide";

// Button with HTMX
<Button variant="destructive" hx-delete="/api/items/1" hx-target="#list">Delete</Button>

// Button with Alpine
<Button variant="secondary" x-on:click="count++">+</Button>

// Icon
<Button><Icon icon={Plus} size={16} /> Add</Button>

// Dialog
<Dialog>
  <DialogTrigger>
    <Button variant="outline">Open</Button>
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Title</DialogTitle>
    </DialogHeader>
    <p>Content here</p>
  </DialogContent>
</Dialog>

// Tabs
<Tabs defaultValue="account">
  <TabsList>
    <TabsTrigger value="account">Account</TabsTrigger>
    <TabsTrigger value="settings">Settings</TabsTrigger>
  </TabsList>
  <TabsContent value="account">...</TabsContent>
  <TabsContent value="settings">...</TabsContent>
</Tabs>
```

## Design Tokens

Defined in `src/styles.css` via Tailwind v4's `@theme` and `:root` CSS variables. Shadcn neutral palette by default.

Available tokens: `background`, `foreground`, `primary`, `secondary`, `destructive`, `muted`, `accent`, `border`, `input`, `ring` — each with a `-foreground` counterpart where applicable.

To customize, change the `:root` values in `styles.css`.

## Development

```sh
bun install
bun run dev     # starts Tailwind watcher + Hono server
```

## Quirks and Gotchas

### Boolean Alpine attributes must use `=""`

Hono's JSX renders bare boolean attributes as `="true"` (e.g., `x-cloak` becomes `x-cloak="true"`). Alpine tries to evaluate `"true"` as a JavaScript expression, which crashes **all** Alpine components on the page.

```tsx
// Bad — breaks Alpine silently
<div x-cloak x-transition>

// Good
<div x-cloak="" x-transition="">
```

Affects: `x-cloak`, `x-transition` (bare), `x-ignore`, and any other valueless Alpine directive.

### Dotted Alpine modifiers need spread syntax

TSX doesn't allow dots in attribute names, so Alpine modifiers like `.self`, `.window`, `.prevent` can't be written directly.

```tsx
// Won't compile
<div x-on:click.self="open = false">

// Use spread syntax instead
<div {...{ "x-on:click.self": "open = false" }}>
<div {...{ "x-on:keydown.escape.window": "open = false" }}>
```

### `$dispatch` is Alpine-only

HTMX event handlers (`hx-on--after-request`, etc.) run outside Alpine's scope, so Alpine magics like `$dispatch` aren't available. Use vanilla DOM instead:

```tsx
// In an HTMX handler — $dispatch won't work
hx-on--after-request="$dispatch('close-dialog')"

// Use dispatchEvent instead
hx-on--after-request="this.dispatchEvent(new CustomEvent('close-dialog', { bubbles: true }))"
```

Then listen with Alpine on an ancestor: `x-on:close-dialog="open = false"`.

### Dynamic SVG tags need `createElement`

JSX can't render dynamic tag names for SVG elements (`path`, `circle`, `line`, etc.). The `Icon` component uses `createElement` from `hono/jsx` to handle this for Lucide icon data.
