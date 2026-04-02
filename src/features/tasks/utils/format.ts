/**
 * Formats a string value for display (e.g., "IN_PROGRESS" -> "In Progress")
 */
export function formatDisplayValue(value: string): string {
  return value
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
}
