"use client";

import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { saveUserToStorage, clearUserFromStorage } from "@/lib/auth-storage";

/**
 * Hook to automatically sync NextAuth session to localStorage
 * Call this in your layout or dashboard component
 */
export function useAuthSync() {
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === "authenticated" && session?.user) {
      // Save user data to localStorage when authenticated
      saveUserToStorage({
        id: session.user.id || "",
        email: session.user.email || null,
        name: session.user.name || null,
        image: session.user.image || null,
      });
    } else if (status === "unauthenticated") {
      // Clear localStorage when logged out
      clearUserFromStorage();
    }
  }, [session, status]);
}

