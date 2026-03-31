"use client";

import { useMemo, useState } from "react";
import { useAccount, useReadContract } from "wagmi";

import { CONTRACT_ADDRESS, contractAbi } from "@/lib/contract";

const tabs = ["All", "Current", "Recent"] as const;

export function RecordsView() {
  const [tab, setTab] = useState<(typeof tabs)[number]>("All");
  const { address } = useAccount();
  const { data } = useReadContract({
    address: CONTRACT_ADDRESS,
    abi: contractAbi,
    functionName: "nickname",
    args: address ? [address] : undefined,
    query: {
      enabled: Boolean(address),
    },
  });

  const items = useMemo(
    () => [
      {
        title: data ? `Current nickname: ${data}` : "No current nickname",
        subtitle: "Onchain getter",
        type: "Current",
      },
      {
        title: "Recent local submissions will appear here",
        subtitle: "UI placeholder for history sync",
        type: "Recent",
      },
      {
        title: "Activity structure ready for future indexing",
        subtitle: "All records",
        type: "All",
      },
    ],
    [data],
  );

  const visible =
    tab === "All" ? items : items.filter((item) => item.type === tab);

  return (
    <section className="space-y-4">
      <div className="rounded-[32px] bg-white p-5 shadow-soft">
        <p className="text-xs uppercase tracking-[0.28em] text-text-secondary">
          Records
        </p>
        <h2 className="mt-2 text-3xl font-semibold tracking-tight text-text-primary">
          Nickname activity
        </h2>

        <div className="mt-5 flex gap-2 rounded-[24px] bg-background p-1">
          {tabs.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setTab(item)}
              className={`flex-1 rounded-[20px] px-3 py-2 text-sm font-medium ${
                tab === item ? "bg-white text-primary shadow-sm" : "text-text-secondary"
              }`}
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-3">
        {visible.map((item) => (
          <div
            key={`${item.type}-${item.title}`}
            className="rounded-[28px] border border-slate-100 bg-white p-4 shadow-soft"
          >
            <div className="flex items-center justify-between">
              <p className="text-base font-medium text-text-primary">{item.title}</p>
              <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                {item.type}
              </span>
            </div>
            <p className="mt-3 text-sm text-text-secondary">{item.subtitle}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
