"use server";

import { cookies } from "next/headers";

export async function getSidebarState() {
  const cookieStore = await cookies();
  return cookieStore.get("sidebar_state")?.value === "true";
}
