"use client";

import { useAuthContext } from "../components/auth-provider";

/**
 * Hook to access the current authentication state.
 * Must be used within an AuthProvider.
 */
export function useAuth() {
  return useAuthContext();
}
