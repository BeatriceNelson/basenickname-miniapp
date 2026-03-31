"use client";

import { useAccount, useReadContract } from "wagmi";

import { CONTRACT_ADDRESS, contractAbi } from "@/lib/contract";
import { truncateAddress } from "@/lib/utils";
import { ConnectStrip } from "@/components/connect-strip";

export function IdentityCard() {
  const { address, isConnected } = useAccount();
  const { data } = useReadContract({
    address: CONTRACT_ADDRESS,
    abi: contractAbi,
    functionName: "nickname",
    args: address ? [address] : undefined,
    query: {
      enabled: Boolean(address),
    },
  });

  const nickname = data?.toString() || "No nickname yet";

  return (
    <section className="space-y-4">
      <div className="rounded-[32px] bg-gradient-to-br from-primary to-secondary p-[1px] shadow-soft">
        <div className="rounded-[31px] bg-white p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.28em] text-text-secondary">
                My identity
              </p>
              <h2 className="mt-2 text-3xl font-semibold tracking-tight text-text-primary">
                {nickname}
              </h2>
            </div>
            <ConnectStrip />
          </div>

          <div className="mt-8 rounded-[28px] bg-background p-4">
            <p className="text-xs uppercase tracking-[0.2em] text-text-secondary">
              Wallet
            </p>
            <p className="mt-2 text-base font-medium text-text-primary">
              {truncateAddress(address)}
            </p>
            <p className="mt-4 text-xs text-text-secondary">
              {isConnected
                ? "This card reflects the current nickname stored in the BaseNickname contract."
                : "Connect a wallet to load your identity card."}
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3">
        <a
          href="/"
          className="rounded-[24px] bg-white px-3 py-4 text-center text-sm font-medium text-text-primary shadow-soft"
        >
          Update
        </a>
        <button
          type="button"
          onClick={() => {
            if (typeof navigator !== "undefined" && nickname) {
              void navigator.clipboard.writeText(nickname);
            }
          }}
          className="rounded-[24px] bg-white px-3 py-4 text-center text-sm font-medium text-text-primary shadow-soft"
        >
          Copy
        </button>
        <button
          type="button"
          className="rounded-[24px] bg-accent px-3 py-4 text-center text-sm font-semibold text-white shadow-soft"
        >
          Share
        </button>
      </div>
    </section>
  );
}
