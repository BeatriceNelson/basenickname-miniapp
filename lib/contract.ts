import { type Address } from "viem";

export const CONTRACT_ADDRESS =
  "0x54e53213f577d0d37b1cffc94f517d6018837705" as Address;

export const contractAbi = [
  {
    inputs: [{ internalType: "address", name: "", type: "address" }],
    name: "nickname",
    outputs: [{ internalType: "string", name: "", type: "string" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "string", name: "name", type: "string" }],
    name: "setName",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;

export const appName = "BaseNickname";
