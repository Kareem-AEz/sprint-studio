"use server";

// Mimic "session auth" and always return kareem@example.com's user details

import { cache } from "react";
import prisma from "@/lib/prisma";

// IMPORTANT: In a real app, you'd extract user info from the session or request
// This mock always returns Kareem's user object

// This function mimics a session-based "get me"
// This function is cached by react
export const getMe = cache(async () => {
  const email = "kareem@example.com";
  try {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    // Simulate a delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    return user;
  } catch (error) {
    console.error("Error fetching user:", error);
    return null;
  }
});
