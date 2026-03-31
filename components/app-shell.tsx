"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

import { cn } from "@/lib/utils";

const tabs = [
  { href: "/", label: "Register" },
  { href: "/result", label: "Result" },
  { href: "/me", label: "My" },
  { href: "/records", label: "Records" },
];

export function AppShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="mx-auto flex min-h-screen w-full max-w-md flex-col px-4 pb-24 pt-5">
      <header className="mb-4 flex items-center justify-between rounded-[28px] border border-white/70 bg-white/80 px-4 py-3 shadow-soft backdrop-blur">
        <div>
          <p className="text-xs uppercase tracking-[0.28em] text-text-secondary">
            Identity
          </p>
          <h1 className="text-lg font-semibold text-text-primary">
            BaseNickname
          </h1>
        </div>
        <div className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
          Base
        </div>
      </header>

      <main className="flex-1">{children}</main>

      <nav className="fixed bottom-4 left-1/2 z-20 flex w-[calc(100%-24px)] max-w-md -translate-x-1/2 gap-2 rounded-[28px] border border-white/70 bg-white/90 p-2 shadow-soft backdrop-blur">
        {tabs.map((tab) => {
          const active =
            pathname === tab.href ||
            (tab.href !== "/" && pathname.startsWith(tab.href));

          return (
            <Link
              key={tab.href}
              href={tab.href}
              className={cn(
                "flex-1 rounded-[20px] px-3 py-2 text-center text-xs font-medium transition",
                active
                  ? "bg-primary text-white"
                  : "text-text-secondary hover:bg-slate-100",
              )}
            >
              {tab.label}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
