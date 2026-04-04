import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Simulates an artificial delay to mimic database latency during development.
 * This delay is applied only if the TURSO_DATABASE_URL environment variable is not set,
 * indicating that the production database is not in use.
 *
 * @returns A promise that resolves after the simulated delay or immediately if TURSO_DATABASE_URL is present.
 */
export const simulateDelay = async () => {
  if (!process.env.TURSO_DATABASE_URL) {
    await new Promise((resolve) => setTimeout(resolve, 500));
  }
};
