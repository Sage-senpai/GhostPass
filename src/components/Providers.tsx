"use client";

import dynamic from "next/dynamic";
import type { ReactNode } from "react";

// Dynamically import the provider tree with SSR disabled
// This prevents Solana wallet adapter hooks from running during static page generation
const ProvidersInner = dynamic(() => import("./ProvidersInner"), { ssr: false });

export default function Providers({ children }: { children: ReactNode }) {
  return <ProvidersInner>{children}</ProvidersInner>;
}
