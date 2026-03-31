"use client";

import { QueryClient } from "@tanstack/react-query";
import { createConfig, createStorage, http } from "wagmi";
import { base } from "wagmi/chains";
import { coinbaseWallet, injected } from "wagmi/connectors";

export const wagmiConfig = createConfig({
  chains: [base],
  connectors: [
    coinbaseWallet({
      appName: "BaseNickname",
      preference: "all",
    }),
    injected(),
  ],
  storage: createStorage({
    storage:
      typeof window !== "undefined" ? window.localStorage : undefined,
  }),
  transports: {
    [base.id]: http(),
  },
  ssr: true,
});

export const queryClient = new QueryClient();
