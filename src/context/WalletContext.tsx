"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  type ReactNode,
} from "react";
import { useWallet as useSolanaWallet } from "@solana/wallet-adapter-react";
import { useConnection } from "@solana/wallet-adapter-react";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import type { WalletState } from "@/lib/types";

interface WalletContextType {
  wallet: WalletState;
  connect: (provider: string) => void;
  disconnect: () => void;
  showConnectModal: boolean;
  setShowConnectModal: (show: boolean) => void;
  isRealWallet: boolean;
}

const WalletContext = createContext<WalletContextType | null>(null);

function shortenAddress(address: string, chars = 4): string {
  return `${address.slice(0, chars)}...${address.slice(-chars)}`;
}

export function WalletProvider({ children }: { children: ReactNode }) {
  const solanaWallet = useSolanaWallet();
  const { connection } = useConnection();
  const [showConnectModal, setShowConnectModal] = useState(false);
  const [balance, setBalance] = useState(0);
  const [mockWallet, setMockWallet] = useState<WalletState>({
    connected: false,
    address: null,
    balance: 0,
  });

  // Determine if a real Solana wallet is connected
  const isRealWallet = solanaWallet.connected && !!solanaWallet.publicKey;

  // Fetch balance when real wallet connects
  useEffect(() => {
    if (!isRealWallet || !solanaWallet.publicKey) {
      setBalance(0);
      return;
    }

    let cancelled = false;

    async function fetchBalance() {
      try {
        const bal = await connection.getBalance(solanaWallet.publicKey!);
        if (!cancelled) {
          setBalance(Number((bal / LAMPORTS_PER_SOL).toFixed(4)));
        }
      } catch {
        if (!cancelled) setBalance(0);
      }
    }

    fetchBalance();

    // Refresh balance every 30 seconds
    const interval = setInterval(fetchBalance, 30_000);
    return () => {
      cancelled = true;
      clearInterval(interval);
    };
  }, [isRealWallet, solanaWallet.publicKey, connection]);

  // Build the wallet state from either real or mock
  const wallet: WalletState = isRealWallet
    ? {
        connected: true,
        address: shortenAddress(solanaWallet.publicKey!.toBase58()),
        balance,
      }
    : mockWallet;

  const connect = useCallback(
    (provider: string) => {
      // Try to select the real wallet adapter first
      const adapterName = provider.charAt(0).toUpperCase() + provider.slice(1);
      const adapter = solanaWallet.wallets.find(
        (w) => w.adapter.name.toLowerCase() === provider.toLowerCase()
      );

      if (adapter && adapter.readyState === "Installed") {
        // Real wallet detected — use adapter
        solanaWallet.select(adapter.adapter.name);
        setTimeout(() => {
          solanaWallet.connect().catch(() => {
            // If real connection fails, fall back to mock
            setMockWallet({
              connected: true,
              address: "Gh0sT...x7Kp",
              balance: 4.2,
            });
          });
        }, 100);
      } else {
        // No real wallet — use mock for demo
        void adapterName;
        setMockWallet({
          connected: true,
          address: "Gh0sT...x7Kp",
          balance: 4.2,
        });
      }
      setShowConnectModal(false);
    },
    [solanaWallet]
  );

  const disconnect = useCallback(() => {
    if (isRealWallet) {
      solanaWallet.disconnect();
    }
    setMockWallet({ connected: false, address: null, balance: 0 });
  }, [isRealWallet, solanaWallet]);

  // Auto-close modal when wallet connects
  useEffect(() => {
    if (wallet.connected) {
      setShowConnectModal(false);
    }
  }, [wallet.connected]);

  return (
    <WalletContext.Provider
      value={{
        wallet,
        connect,
        disconnect,
        showConnectModal,
        setShowConnectModal,
        isRealWallet,
      }}
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
