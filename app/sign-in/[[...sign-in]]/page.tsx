import { SignIn } from "@clerk/nextjs";
import type { Metadata } from "next";

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default function SignInPage() {
  return (
    <div
      className="min-h-screen flex items-center justify-center px-4"
      style={{ background: "#F0EAE0" }}
    >
      <div className="w-full max-w-sm">
        {/* Logo wordmark */}
        <div className="mb-8 text-center">
          <a href="/" style={{ textDecoration: "none" }}>
            <span
              style={{
                fontFamily: "var(--font-space-grotesk), sans-serif",
                fontWeight: 600,
                fontSize: "1.25rem",
                color: "#1C1914",
                letterSpacing: "0.01em",
              }}
            >
              Rachel
            </span>
            <span
              style={{
                fontFamily: "var(--font-space-grotesk), sans-serif",
                fontWeight: 300,
                fontSize: "1.25rem",
                color: "rgba(28,25,20,0.45)",
                marginLeft: "4px",
              }}
            >
              Retail
            </span>
          </a>
          <p
            style={{
              margin: "6px 0 0",
              fontSize: "0.78rem",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "rgba(28,25,20,0.5)",
              fontFamily: "var(--font-space-grotesk), sans-serif",
            }}
          >
            Admin sign-in
          </p>
        </div>

        {/* Clerk component — light theme on cream background */}
        <SignIn
          fallbackRedirectUrl="/app"
          appearance={{
            variables: {
              colorPrimary:      "#B34E2A",
              colorDanger:       "#e05a3a",
              borderRadius:      "4px",
              fontFamily:        "Inter, system-ui, sans-serif",
              fontFamilyButtons: "'Space Grotesk', system-ui, sans-serif",
            },
            elements: {
              card: {
                style: {
                  background: "#FFFFFF",
                  boxShadow:  "0 2px 24px rgba(28,25,20,0.07)",
                  border:     "1px solid rgba(28,25,20,0.10)",
                  borderRadius: "6px",
                },
              },
              headerTitle:    { style: { display: "none" } },
              headerSubtitle: { style: { display: "none" } },
              header:         { style: { display: "none" } },
              formButtonPrimary: { className: "font-semibold tracking-wide" },
              footer: { style: { display: "none" } },
            },
          }}
        />

      </div>
    </div>
  );
}
