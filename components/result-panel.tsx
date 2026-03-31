"use client";

import Link from "next/link";

const statusMap = {
  pending: {
    title: "Processing",
    tone: "text-warning",
    panel: "bg-warning/10 border-warning/20",
    body: "Confirm in wallet and wait for Base.",
  },
  success: {
    title: "Nickname saved",
    tone: "text-success",
    panel: "bg-success/10 border-success/20",
    body: "Your identity is updated onchain.",
  },
  error: {
    title: "Action failed",
    tone: "text-danger",
    panel: "bg-danger/10 border-danger/20",
    body: "The contract rejected this update.",
  },
} as const;

type ResultPanelProps = {
  status?: string;
  nickname?: string;
  tx?: string;
  message?: string;
};

export function ResultPanel({ status = "pending", nickname = "Unknown", tx, message }: ResultPanelProps) {
  const key = status in statusMap ? (status as keyof typeof statusMap) : "pending";
  const config = statusMap[key];

  return (
    <section className="space-y-4">
      <div className={`rounded-[32px] border p-6 ${config.panel}`}>
        <p className="text-xs uppercase tracking-[0.28em] text-text-secondary">
          Result
        </p>
        <h2 className={`mt-3 text-4xl font-semibold tracking-tight ${config.tone}`}>
          {config.title}
        </h2>
        <p className="mt-3 text-sm text-text-secondary">{config.body}</p>

        <div className="mt-6 rounded-[24px] bg-white/90 p-4">
          <p className="text-xs uppercase tracking-[0.2em] text-text-secondary">
            Nickname
          </p>
          <p className="mt-2 text-2xl font-semibold text-text-primary">{nickname}</p>
          {message ? (
            <p className="mt-3 text-sm text-danger">{message}</p>
          ) : null}
          {tx ? (
            <p className="mt-3 break-all text-xs text-text-secondary">{tx}</p>
          ) : null}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <Link
          href="/"
          className="rounded-[24px] bg-white px-4 py-4 text-center text-sm font-medium text-text-primary shadow-soft"
        >
          Back Home
        </Link>
        <Link
          href="/me"
          className="rounded-[24px] bg-primary px-4 py-4 text-center text-sm font-semibold text-white shadow-soft"
        >
          View My Card
        </Link>
      </div>
    </section>
  );
}
