/**
 * Generates a deterministic hash from a string.
 */
export function getHash(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  return Math.abs(hash);
}

/**
 * Avatar Palette: Predefined, accessible, and visually balanced colors.
 * Optimized for solid background with white text.
 */
export const AVATAR_COLORS = [
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

/**
 * Category Palette: Theme-aware colors.
 * Light mode: Soft backgrounds with dark text.
 * Dark mode: Deep backgrounds (low opacity) with vibrant text.
 */
export const CATEGORY_PALETTE = [
  {
    // Blue
    light: { bg: "#eff6ff", text: "#1d4ed8", border: "#bfdbfe" },
    dark: { bg: "rgba(59, 130, 246, 0.15)", text: "#93c5fd", border: "rgba(59, 130, 246, 0.3)" },
  },
  {
    // Pink
    light: { bg: "#fdf2f8", text: "#be185d", border: "#fbcfe8" },
    dark: { bg: "rgba(236, 72, 153, 0.15)", text: "#f9a8d4", border: "rgba(236, 72, 153, 0.3)" },
  },
  {
    // Green
    light: { bg: "#f0fdf4", text: "#15803d", border: "#bbf7d0" },
    dark: { bg: "rgba(34, 197, 94, 0.15)", text: "#86efac", border: "rgba(34, 197, 94, 0.3)" },
  },
  {
    // Yellow/Amber
    light: { bg: "#fffbeb", text: "#b45309", border: "#fef3c7" },
    dark: { bg: "rgba(245, 158, 11, 0.15)", text: "#fcd34d", border: "rgba(245, 158, 11, 0.3)" },
  },
  {
    // Indigo
    light: { bg: "#eef2ff", text: "#4338ca", border: "#e0e7ff" },
    dark: { bg: "rgba(99, 102, 241, 0.15)", text: "#c7d2fe", border: "rgba(99, 102, 241, 0.3)" },
  },
  {
    // Orange
    light: { bg: "#fff7ed", text: "#c2410c", border: "#ffedd5" },
    dark: { bg: "rgba(249, 115, 22, 0.15)", text: "#fdba74", border: "rgba(249, 115, 22, 0.3)" },
  },
  {
    // Teal
    light: { bg: "#f0fdfa", text: "#0f766e", border: "#ccfbf1" },
    dark: { bg: "rgba(20, 184, 166, 0.15)", text: "#5eead4", border: "rgba(20, 184, 166, 0.3)" },
  },
  {
    // Cyan
    light: { bg: "#ecfeff", text: "#0e7490", border: "#cffafe" },
    dark: { bg: "rgba(6, 182, 212, 0.15)", text: "#67e8f9", border: "rgba(6, 182, 212, 0.3)" },
  },
  {
    // Purple
    light: { bg: "#faf5ff", text: "#7e22ce", border: "#f3e8ff" },
    dark: { bg: "rgba(168, 85, 247, 0.15)", text: "#d8b4fe", border: "rgba(168, 85, 247, 0.3)" },
  },
  {
    // Rose
    light: { bg: "#fff1f2", text: "#be123c", border: "#ffe4e6" },
    dark: { bg: "rgba(244, 63, 94, 0.15)", text: "#fda4af", border: "rgba(244, 63, 94, 0.3)" },
  },
];

/**
 * Returns a deterministic color from the avatar palette for a given name.
 */
export function getAvatarColor(name: string): string {
  if (!name) return AVATAR_COLORS[0];
  const index = getHash(name) % AVATAR_COLORS.length;
  return AVATAR_COLORS[index];
}

/**
 * Returns theme-aware background, text, and border colors for a given category name.
 */
export function getCategoryColor(category: string) {
  if (!category) return CATEGORY_PALETTE[0];
  const index = getHash(category) % CATEGORY_PALETTE.length;
  return CATEGORY_PALETTE[index];
}
