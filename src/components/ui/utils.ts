/** Filters falsy values and joins class names. Drop-in for clsx. */
export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(" ");
}
