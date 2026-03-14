"use client";

import { createContext, useContext, useState, useCallback, type ReactNode } from "react";
import type { WalletState } from "@/lib/types";

interface WalletContextType {
  wallet: WalletState;
  connect: (provider: string) => void;
  disconnect: () => void;
  showConnectModal: boolean;
  setShowConnectModal: (show: boolean) => void;
}

const WalletContext = createContext<WalletContextType | null>(null);

export function WalletProvider({ children }: { children: ReactNode }) {
  const [wallet, setWallet] = useState<WalletState>({
    connected: false,
    address: null,
    balance: 0,
  });
  const [showConnectModal, setShowConnectModal] = useState(false);

  const connect = useCallback((provider: string) => {
    // Mock wallet connection
    void provider;
    setWallet({
      connected: true,
      address: "Gh0sT...x7Kp",
      balance: 4.2,
    });
    setShowConnectModal(false);
  }, []);

  const disconnect = useCallback(() => {
    setWallet({ connected: false, address: null, balance: 0 });
  }, []);

  return (
    <WalletContext.Provider
      value={{ wallet, connect, disconnect, showConnectModal, setShowConnectModal }}
    >
      {children}
    </WalletContext.Provider>
  );
}

export function useWallet() {
  const ctx = useContext(WalletContext);
  if (!ctx) throw new Error("useWallet must be used within WalletProvider");
  return ctx;
}
