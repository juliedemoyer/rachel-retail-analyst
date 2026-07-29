"use client";

import { useState, useEffect } from "react";
import AskRachel from "./AskRachel";
import AskSidebar from "./AskSidebar";

interface QuotaData {
  cap: { monthlyQuestions: number; monthlyUsd: number };
  questionsThisMonth: number;
  questionsToday: number;
  monthlyQuestionsRemaining: number;
  blocked: boolean;
  estCostPerQuestionEur: number;
}

export default function AskLayout({
  accountId,
  initialQuestion,
}: {
  accountId?: string;
  initialQuestion?: string;
}) {
  const [input, setInput] = useState(initialQuestion ?? "");
  const [quota, setQuota] = useState<QuotaData | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetch("/api/ask/quota")
      .then((r) => (r.ok ? r.json() : null))
      .then((q) => { if (!cancelled) setQuota(q); })
      .catch(() => {});
    return () => { cancelled = true; };
  }, []);

  return (
    <div className="ask-body">
      <div className="ask-chat-col">
        <AskRachel
          accountId={accountId}
          input={input}
          onInputChange={setInput}
          quota={quota}
        />
      </div>
      <aside className="ask-sidebar-col">
        <AskSidebar
          input={input}
          onPromptSelect={setInput}
          quota={quota}
        />
      </aside>
    </div>
  );
}
