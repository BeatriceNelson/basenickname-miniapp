"use client";

import { useConnect, useAccount, useDisconnect } from "wagmi";

import { truncateAddress } from "@/lib/utils";

export function ConnectStrip() {
  const { address, isConnected } = useAccount();
  const { connect, connectors, isPending } = useConnect();
  const { disconnect } = useDisconnect();

  if (isConnected) {
    return (
      <button
        type="button"
        onClick={() => disconnect()}
        className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-medium text-text-secondary"
      >
        {truncateAddress(address)}
      </button>
    );
  }

  return (
    <div className="flex flex-wrap gap-2">
      {connectors.map((connector) => (
        <button
          key={connector.uid}
          type="button"
          disabled={isPending}
          onClick={() => connect({ connector })}
          className="rounded-full border border-primary/20 bg-primary/10 px-3 py-1.5 text-xs font-medium text-primary disabled:opacity-60"
        >
          {connector.name}
        </button>
      ))}
    </div>
  );
}
