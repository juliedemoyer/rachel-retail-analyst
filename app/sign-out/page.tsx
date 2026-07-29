"use client";

import { useEffect } from "react";
import { useClerk } from "@clerk/nextjs";

/**
 * Force sign-out helper.
 *
 * Visit /sign-out to wipe the Clerk session and land back on the home page.
 * Used to clear stale sessions left behind by old invitation flows so a fresh
 * invitation link can prompt for password again.
 */
export default function SignOutPage() {
  const { signOut } = useClerk();

  useEffect(() => {
    signOut({ redirectUrl: "/" }).catch(() => {
      // Even if signOut throws (e.g. no active session), redirect home.
      window.location.href = "/";
    });
  }, [signOut]);

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4"
      style={{ background: "#0d0b09", color: "#f0ebe3" }}
    >
      <div className="text-center">
        <p
          style={{
            fontFamily: "var(--font-space-grotesk), sans-serif",
            fontSize: "0.78rem",
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.55)",
          }}
        >
          Signing out…
        </p>
      </div>
    </div>
  );
}
