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
  date: Date | string | number | null | undefined;
  mode?: "short" | "long";
}): string {
  const { date, mode = "short" } = params;
  if (!date) return "--";

  const d = new Date(date);

  const options: Intl.DateTimeFormatOptions = {
    month: "short",
    day: "numeric",
  };

  if (mode === "long") {
    options.year = "numeric";
  }

  return d.toLocaleDateString("en-US", options);
}

/**
 * Formats a date as a relative time string (e.g., "2h ago", "5m ago", "Just now").
 */
export function formatRelativeTime(
  date: Date | string | number | null | undefined,
): string {
  if (!date) return "--";

  const d = new Date(date);
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - d.getTime()) / 1000);

  if (diffInSeconds < 60) {
    return "Just now";
  }

  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) {
    return `${diffInMinutes}m ago`;
  }

  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) {
    return `${diffInHours}h ago`;
  }

  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 7) {
    return `${diffInDays}d ago`;
  }

  return formatDate({ date: d });
}
