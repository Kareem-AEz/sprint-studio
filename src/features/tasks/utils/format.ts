/**
 * Formats a string value for display (e.g., "IN_PROGRESS" -> "In Progress")
 */
export function formatDisplayValue(value: string): string {
  return value
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
}

/**
 * Formats a Date object for display.
 * @param params An object with the following fields:
 *  - date: The Date to format.
 *  - mode: 'short' (e.g., "Mar 12") or 'long' (e.g., "Mar 12, 2026"). Optional, defaults to 'short'.
 * @returns A formatted date string.
 */
export function formatDate(params: {
  date: Date | null | undefined;
  mode?: "short" | "long";
}): string {
  const { date, mode = "short" } = params;
  if (!date) return "--";

  const options: Intl.DateTimeFormatOptions = {
    month: "short",
    day: "numeric",
  };

  if (mode === "long") {
    options.year = "numeric";
  }

  return date.toLocaleDateString("en-US", options);
}
