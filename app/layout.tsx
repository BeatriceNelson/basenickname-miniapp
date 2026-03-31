import type { ReactNode } from "react";

import "@/app/globals.css";
import { AppShell } from "@/components/app-shell";
import { Providers } from "@/components/providers";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <title>BaseNickname</title>
        <meta
          name="description"
          content="Register a clean nickname identity on Base."
        />
        <meta name="base:app_id" content="69cb22b26b6a2cd82c727ed5" />
        <meta
          name="talentapp:project_verification"
          content="891f24a8b42305585c1f81bc478d4e366ce990f4f2f3f702dafff6321b99d2529d53f364aac0a8c8bb0f46c8a136381580c5eebb73e253136a9f0705f13b80a0"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, viewport-fit=cover" />
      </head>
      <body>
        <Providers>
          <AppShell>{children}</AppShell>
        </Providers>
      </body>
    </html>
  );
}
