import type { ReactNode } from "react";
import { Nav } from "@/app/components/Nav";
import { FeedbackButton } from "@/app/components/FeedbackButton";

export default function ProductLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen">
      <Nav />
      <main className="flex-1 overflow-x-hidden">
        {children}
      </main>
      <FeedbackButton />
    </div>
  );
}
