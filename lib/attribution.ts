import * as OxHex from "ox/Hex";
import type { Hex } from "viem";

const BUILDER_CODE = "bc_85m6nbyz";
const ENCODED_STRING =
  "0x62635f38356d366e62797a0b0080218021802180218021802180218021";

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
