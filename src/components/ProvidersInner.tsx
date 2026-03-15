"use client";

import type { ReactNode } from "react";
import SolanaWalletProvider from "@/context/SolanaWalletProvider";
import { WalletProvider } from "@/context/WalletContext";
import { ToastProvider } from "@/components/ui/Toast";
import WalletConnectModal from "@/components/wallet/WalletConnectModal";

export default function ProvidersInner({ children }: { children: ReactNode }) {
  return (
    <SolanaWalletProvider>
      <WalletProvider>
        <ToastProvider>
          {children}
          <WalletConnectModal />
        </ToastProvider>
      </WalletProvider>
    </SolanaWalletProvider>
  );
}
