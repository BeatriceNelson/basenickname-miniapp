"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import {
  useAccount,
  useReadContract,
  useWaitForTransactionReceipt,
  useWriteContract,
} from "wagmi";

import { appName, CONTRACT_ADDRESS, contractAbi } from "@/lib/contract";
import { getDataSuffix } from "@/lib/attribution";
import {
  parseContractError,
  sanitizeNickname,
  validateNickname,
} from "@/lib/utils";
import { ConnectStrip } from "@/components/connect-strip";

export function NicknameForm() {
  const router = useRouter();
  const { address, isConnected, chainId } = useAccount();
  const [value, setValue] = useState("");
  const [localMessage, setLocalMessage] = useState("Type your nickname");
  const rules = useMemo(() => validateNickname(value), [value]);

  const { data: currentNickname, refetch } = useReadContract({
    address: CONTRACT_ADDRESS,
    abi: contractAbi,
    functionName: "nickname",
    args: address ? [address] : undefined,
    query: {
      enabled: Boolean(address),
    },
  });

  const {
    data: hash,
    error: writeError,
    isPending: isWriting,
    writeContract,
    reset,
  } = useWriteContract();

  const receipt = useWaitForTransactionReceipt({
    hash,
    query: {
      enabled: Boolean(hash),
    },
  });

  useEffect(() => {
    if (!hash) return;

    if (receipt.isSuccess) {
      void refetch();
      const params = new URLSearchParams({
        status: "success",
        tx: hash,
        nickname: value.trim(),
      });
      router.push(`/result?${params.toString()}`);
    }

    if (receipt.isError) {
      const params = new URLSearchParams({
        status: "error",
        message: parseContractError(receipt.error),
      });
      router.push(`/result?${params.toString()}`);
    }
  }, [hash, receipt.isError, receipt.isSuccess, receipt.error, refetch, router, value]);

  useEffect(() => {
    if (writeError) {
      setLocalMessage(parseContractError(writeError));
    } else if (rules.valid) {
      setLocalMessage("Ready to claim");
    } else {
      setLocalMessage(rules.message);
    }
  }, [rules.message, rules.valid, writeError]);

  const buttonLabel = currentNickname ? "Update Nickname" : "Claim Nickname";
  const buttonDisabled = !isConnected || !rules.valid || isWriting || receipt.isLoading;
  const current = currentNickname?.toString() || "None yet";

  return (
    <section className="space-y-4">
      <div className="rounded-[32px] bg-white p-5 shadow-soft">
        <div className="mb-6 flex items-start justify-between gap-3">
          <div>
            <p className="text-xs uppercase tracking-[0.28em] text-text-secondary">
              Register
            </p>
            <h2 className="mt-2 text-3xl font-semibold tracking-tight text-text-primary">
              Pick your onchain name
            </h2>
          </div>
          <ConnectStrip />
        </div>

        <div className="rounded-[28px] bg-background p-4">
          <div className="flex items-center justify-between text-sm">
            <span className="text-text-secondary">Current</span>
            <span className="font-medium text-text-primary">{current}</span>
          </div>

          <label className="mt-4 block">
            <span className="mb-3 block text-sm font-medium text-text-primary">
              Nickname
            </span>
            <input
              value={value}
              onChange={(event) => {
                reset();
                setValue(sanitizeNickname(event.target.value));
              }}
              placeholder="beatrice"
              className="w-full rounded-[24px] border border-slate-200 bg-white px-5 py-5 text-2xl font-semibold tracking-tight text-text-primary outline-none ring-0 placeholder:text-slate-300 focus:border-primary"
            />
          </label>

          <div className="mt-4 flex items-center justify-between text-sm">
            <span
              className={
                rules.valid ? "text-success" : "text-text-secondary"
              }
            >
              {localMessage}
            </span>
            <span className="text-text-secondary">{value.trim().length}/20</span>
          </div>

          <button
            type="button"
            disabled={buttonDisabled}
            onClick={() => {
              if (!value.trim() || !address) return;

              const params = new URLSearchParams({ status: "pending", nickname: value.trim() });
              router.push(`/result?${params.toString()}`);

              writeContract({
                address: CONTRACT_ADDRESS,
                abi: contractAbi,
                functionName: "setName",
                args: [value.trim()],
                chainId,
                account: address,
                dataSuffix: getDataSuffix(),
              });
            }}
            className="mt-5 flex w-full items-center justify-center rounded-[24px] bg-primary px-4 py-4 text-base font-semibold text-white shadow-soft transition hover:bg-primary/95 disabled:cursor-not-allowed disabled:bg-slate-300"
          >
            {isWriting || receipt.isLoading ? "Submitting..." : buttonLabel}
          </button>

          {!isConnected ? (
            <p className="mt-3 text-sm text-text-secondary">
              Connect with Coinbase Wallet or an injected wallet.
            </p>
          ) : null}
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3">
        <div className="rounded-[24px] bg-white p-4">
          <p className="text-xs uppercase tracking-[0.2em] text-text-secondary">
            Rule
          </p>
          <p className="mt-2 text-sm font-medium text-text-primary">1 to 20 chars</p>
        </div>
        <div className="rounded-[24px] bg-white p-4">
          <p className="text-xs uppercase tracking-[0.2em] text-text-secondary">
            Chain
          </p>
          <p className="mt-2 text-sm font-medium text-text-primary">{appName} on Base</p>
        </div>
        <div className="rounded-[24px] bg-white p-4">
          <p className="text-xs uppercase tracking-[0.2em] text-text-secondary">
            State
          </p>
          <p className="mt-2 text-sm font-medium text-text-primary">Live contract</p>
        </div>
      </div>

      <div className="rounded-[28px] border border-dashed border-primary/25 bg-primary/5 p-4 text-sm text-text-secondary">
        Availability is not guessed offchain. The contract decides. If a name is taken or invalid, we surface that result after submit.
        <Link href="/records" className="ml-2 font-medium text-primary">
          View activity
        </Link>
      </div>
    </section>
  );
}
