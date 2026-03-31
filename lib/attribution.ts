import * as OxHex from "ox/Hex";
import type { Hex } from "viem";

const BUILDER_CODE = "YOUR_BUILDER_CODE";
const ENCODED_STRING = "YOUR_ENCODED_STRING";

function normalizeHex(value: string): Hex | undefined {
  if (!value || value.startsWith("YOUR_")) return undefined;
  const maybeHex = value.startsWith("0x") ? value : `0x${value}`;

  try {
    OxHex.assert(maybeHex, { strict: true });
    return maybeHex as Hex;
  } catch {
    return undefined;
  }
}

export function getDataSuffix(): Hex | undefined {
  const encoded = normalizeHex(ENCODED_STRING);
  if (encoded) return encoded;

  const builder = normalizeHex(BUILDER_CODE);
  if (builder) return builder;

  return undefined;
}
