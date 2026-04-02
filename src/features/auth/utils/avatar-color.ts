import { getAvatarColor as getSharedAvatarColor } from "@/lib/colors";

/**
 * Generates a visually distinct, deterministic avatar background color from a string (such as a username).
 * @deprecated Use getAvatarColor from @/lib/colors instead.
 */
export const getAvatarColor = getSharedAvatarColor;

/**
 * Returns initials from a name (e.g., "Kareem Ahmed" -> "KA").
 */
export function getInitials(name: string): string {
  if (!name) return "";

  // Split the name into parts using one or more whitespace characters as the separator
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0].substring(0, 2).toUpperCase();

  // This returns the first character of the first part and the first character of the last part, uppercased.
  // Example: "Kareem Ahmed" -> "KA", "Jane Mary Doe" -> "JD"
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}
