"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { User } from "@/generated/prisma/browser";
import { getMe } from "../queries/get-me";

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  error: unknown | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

/**
 * Provides authentication state to the entire application.
 * Ensures the `getMe` query is only executed once on mount.
 */
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<unknown | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await getMe();
        setUser(userData);
      } catch (err) {
        console.error("Error fetching user in AuthProvider:", err);
        setError(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, isLoading, error }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuthContext must be used within an AuthProvider");
  }
  return context;
}
