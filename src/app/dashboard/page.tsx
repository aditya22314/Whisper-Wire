"use client";

import { SidebarTrigger } from "@/components/ui/sidebar";
import { getUserFromStorage, type UserData } from "@/lib/auth-storage";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export default function Dashboard() {
  // Sync NextAuth session to localStorage

  // Get session from NextAuth
  const { data: session } = useSession();

  // Track localStorage user in state so UI updates immediately after login
  const [storedUser, setStoredUser] = useState<UserData | null>(null);

  useEffect(() => {
    // Whenever session changes (e.g. after login), re-read from localStorage
    setStoredUser(getUserFromStorage());
  }, [session]);

  return (
    <div className="p-8">
      <div className="mb-6 flex items-center gap-4">
        <SidebarTrigger />
        <h1 className="text-3xl font-semibold">Dashboard</h1>
      </div>

      <div className="space-y-4">
        <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-xl font-semibold">User Information</h2>

          {/* Display from NextAuth session */}
          {session?.user && (
            <div className="space-y-2">
              <p>
                <span className="font-medium">From NextAuth Session:</span>
              </p>
              <p>Name: {session.user.name || "N/A"}</p>
              <p>Email: {session.user.email || "N/A"}</p>
              <p>ID: {"id" in session.user ? session.user.id : "N/A"}</p>
            </div>
          )}

          {/* Display from localStorage */}
          {storedUser && (
            <div className="mt-4 space-y-2 border-t pt-4">
              <p>
                <span className="font-medium">From localStorage:</span>
              </p>
              <p>Name: {storedUser.name || "N/A"}</p>
              <p>Email: {storedUser.email || "N/A"}</p>
              <p>ID: {storedUser.id || "N/A"}</p>
            </div>
          )}
        </div>

        <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-xl font-semibold">Quick Access</h2>
          <p className="text-slate-600">
            User data is automatically synced to localStorage after login. You
            can access it using <code>getUserFromStorage()</code> anywhere in
            your app.
          </p>
        </div>
      </div>
    </div>
  );
}
