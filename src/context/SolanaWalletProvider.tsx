"use client";

import { useMemo, type ReactNode } from "react";
import {
  ConnectionProvider,
  WalletProvider as SolanaWalletAdapterProvider,
} from "@solana/wallet-adapter-react";
import { PhantomWalletAdapter } from "@solana/wallet-adapter-phantom";
import { SolflareWalletAdapter } from "@solana/wallet-adapter-solflare";
import { clusterApiUrl } from "@solana/web3.js";

interface SolanaWalletProviderProps {
  children: ReactNode;
}

export default function SolanaWalletProvider({ children }: SolanaWalletProviderProps) {
  // Use devnet for the hackathon MVP
  const endpoint = useMemo(() => clusterApiUrl("devnet"), []);

  const wallets = useMemo(
    () => [
      new PhantomWalletAdapter(),
      new SolflareWalletAdapter(),
    ],
    []
  );

  return (
    <ConnectionProvider endpoint={endpoint}>
      <SolanaWalletAdapterProvider wallets={wallets} autoConnect>
        {children}
      </SolanaWalletAdapterProvider>
    </ConnectionProvider>
  );
}
