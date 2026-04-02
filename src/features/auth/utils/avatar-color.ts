/**
 * Deterministically generates a hex color from a string (e.g., username).
 * The colors are selected to match the provided reference image and
 * maintain good contrast in both light and dark themes with white text.
 */

const AVATAR_COLORS = [
  "#3b82f6", // Blue
  "#14b8a6", // Teal
  "#a855f7", // Purple
  "#ef4444", // Red
  "#22c55e", // Green
  "#f97316", // Orange
  "#06b6d4", // Cyan
  "#ec4899", // Pink
  "#6366f1", // Indigo
  "#f59e0b", // Amber
];

export function getAvatarColor(name: string): string {
  if (!name) return AVATAR_COLORS[0];

  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }

  const index = Math.abs(hash) % AVATAR_COLORS.length;
  return AVATAR_COLORS[index];
}

/**
 * Returns initials from a name (e.g., "Kareem Mohamed" -> "KM").
 */
export function getInitials(name: string): string {
  if (!name) return "";
  
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0].substring(0, 2).toUpperCase();
  
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}
