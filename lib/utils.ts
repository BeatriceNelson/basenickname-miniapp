import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function truncateAddress(address?: string) {
  if (!address) return "Not connected";
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}

export function sanitizeNickname(value: string) {
  return value.replace(/\s+/g, "").slice(0, 20);
}

export function validateNickname(value: string) {
  const trimmed = value.trim();

  if (!trimmed.length) {
    return {
      valid: false,
      message: "1 to 20 chars",
    };
  }

  if (trimmed.length > 20) {
    return {
      valid: false,
      message: "Max 20 chars",
    };
  }

  return {
    valid: true,
    message: "Ready to claim",
  };
}

export function parseContractError(error: unknown) {
  const message =
    error instanceof Error ? error.message : "Transaction failed. Try again.";

  if (message.includes("Taken")) return "Taken";
  if (message.includes("Invalid")) return "Invalid";
  if (message.includes("User rejected")) return "Cancelled";
  return message;
}
