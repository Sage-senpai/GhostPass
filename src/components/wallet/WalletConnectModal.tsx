"use client";

import { useWallet } from "@/context/WalletContext";
import { useWallet as useSolanaWallet } from "@solana/wallet-adapter-react";
import { useEffect, useCallback, useMemo } from "react";
import Image from "next/image";

// Featured wallets with custom SVG icons (shown first, always visible)
const featuredWallets = [
  {
    name: "Phantom",
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <rect width="28" height="28" rx="8" fill="#AB9FF2" />
        <path
          d="M21.5 14.2c0-4.3-3.5-7.7-7.8-7.7a7.76 7.76 0 0 0-7.7 8.3c.2 3.8 3.4 6.7 7.2 6.7h.6c.3 0 .5-.1.7-.3l.5-.5c.2-.2.5-.2.7 0l.5.5c.2.2.4.3.7.3h1.5c1.7 0 3.1-1.4 3.1-3.1v-4.2Z"
          fill="#fff"
        />
        <circle cx="11.5" cy="13.5" r="1.5" fill="#AB9FF2" />
        <circle cx="16" cy="13.5" r="1.5" fill="#AB9FF2" />
      </svg>
    ),
  },
  {
    name: "Solflare",
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <rect width="28" height="28" rx="8" fill="#FC7227" />
        <path
          d="M14 5l2.5 5.5L22 13l-5.5 2.5L14 21l-2.5-5.5L6 13l5.5-2.5L14 5Z"
          fill="#fff"
        />
      </svg>
    ),
  },
  {
    name: "Coinbase Wallet",
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <rect width="28" height="28" rx="8" fill="#0052FF" />
        <rect x="8" y="8" width="12" height="12" rx="3" fill="#fff" />
        <rect x="11" y="11" width="6" height="6" rx="1" fill="#0052FF" />
      </svg>
    ),
  },
  {
    name: "Trust",
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <rect width="28" height="28" rx="8" fill="#0500FF" />
        <path d="M14 5L7 8.5v5.5c0 5 3 9.5 7 11 4-1.5 7-6 7-11V8.5L14 5z" stroke="#fff" strokeWidth="1.5" fill="none" />
        <path d="M11.5 14l2 2 3.5-4" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    name: "Ledger",
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <rect width="28" height="28" rx="8" fill="#000" />
        <rect x="7" y="7" width="8" height="14" rx="1" stroke="#fff" strokeWidth="1.2" fill="none" />
        <rect x="17" y="14" width="4" height="7" rx="1" stroke="#fff" strokeWidth="1.2" fill="none" />
        <rect x="9" y="18" width="4" height="1.5" rx="0.5" fill="#fff" />
      </svg>
    ),
  },
  {
    name: "Nightly",
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <rect width="28" height="28" rx="8" fill="#1A1A2E" />
        <path d="M18 10a6 6 0 11-8 8 5 5 0 008-8z" fill="#E2C044" />
        <circle cx="19" cy="8" r="1" fill="#E2C044" />
        <circle cx="21" cy="11" r="0.7" fill="#E2C044" />
      </svg>
    ),
  },
];

export default function WalletConnectModal() {
  const { showConnectModal, setShowConnectModal, connect } = useWallet();
  const { wallets: solanaWallets } = useSolanaWallet();

  // Build wallet list with real detection status
  const walletList = useMemo(() => {
    return featuredWallets.map((fw) => {
      const adapter = solanaWallets.find(
        (sw) => sw.adapter.name.toLowerCase() === fw.name.toLowerCase()
      );
      const isInstalled = adapter?.readyState === "Installed";
      const iconUrl = adapter?.adapter.icon;
      return {
        name: fw.name,
        adapterName: adapter?.adapter.name || fw.name,
        icon: fw.icon,
        iconUrl,
        isInstalled,
      };
    });
  }, [solanaWallets]);

  // Sort: installed wallets first
  const sortedWallets = useMemo(() => {
    return [...walletList].sort((a, b) => {
      if (a.isInstalled && !b.isInstalled) return -1;
      if (!a.isInstalled && b.isInstalled) return 1;
      return 0;
    });
  }, [walletList]);

  const installedCount = sortedWallets.filter((w) => w.isInstalled).length;

  const handleClose = useCallback(() => {
    setShowConnectModal(false);
  }, [setShowConnectModal]);

  useEffect(() => {
    if (!showConnectModal) return;

    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") handleClose();
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [showConnectModal, handleClose]);

  if (!showConnectModal) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center px-4"
      role="dialog"
      aria-modal="true"
      aria-label="Connect Wallet"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-bg-dark/80 backdrop-blur-sm"
        onClick={handleClose}
      />

      {/* Modal */}
      <div className="glass-card relative w-full max-w-sm p-6 animate-in">
        {/* Header */}
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-paper text-lg font-semibold font-[family-name:var(--font-display)]">
            Connect Wallet
          </h2>
          <button
            onClick={handleClose}
            className="w-8 h-8 rounded-lg flex items-center justify-center bg-transparent border border-border/50 text-highlight/60 hover:text-paper hover:border-highlight/50 transition-all duration-150 cursor-pointer"
            aria-label="Close"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M1 1l12 12M13 1L1 13" />
            </svg>
          </button>
        </div>

        {/* Description */}
        <p className="text-highlight/50 text-sm mb-4 leading-relaxed">
          Connect a Solana wallet to start leasing elite gaming privileges.
        </p>

        {/* Network + Detection Badge */}
        <div className="flex items-center justify-between mb-4 px-3 py-2 rounded-lg bg-asphalt/50 border border-border/30">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-amber-400" />
            <span className="text-xs font-mono text-highlight/60">Solana Devnet</span>
          </div>
          {installedCount > 0 && (
            <span className="text-xs text-positive font-mono">
              {installedCount} detected
            </span>
          )}
        </div>

        {/* Wallet Options */}
        <div className="flex flex-col gap-2 max-h-[320px] overflow-y-auto custom-scrollbar pr-1">
          {sortedWallets.map((w) => (
            <button
              key={w.name}
              onClick={() => connect(w.adapterName)}
              className="glass-card glass-card-hover flex items-center gap-3.5 px-4 py-3 w-full text-left cursor-pointer border-border/50 bg-transparent"
            >
              <span className="flex-shrink-0 relative">
                {w.isInstalled && w.iconUrl ? (
                  <Image
                    src={w.iconUrl}
                    alt={w.name}
                    width={28}
                    height={28}
                    className="rounded-lg"
                    unoptimized
                  />
                ) : (
                  w.icon
                )}
              </span>
              <div className="flex-1 min-w-0">
                <span className="text-paper text-sm font-semibold block">
                  {w.name}
                </span>
                <span
                  className={`text-[11px] ${
                    w.isInstalled ? "text-positive" : "text-highlight/40"
                  }`}
                >
                  {w.isInstalled ? "Installed — click to connect" : "Demo mode"}
                </span>
              </div>
              {w.isInstalled && (
                <span className="w-2 h-2 rounded-full bg-positive flex-shrink-0 animate-pulse" />
              )}
              <svg
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-highlight/30 flex-shrink-0"
              >
                <path d="M5 2l5 5-5 5" />
              </svg>
            </button>
          ))}
        </div>

        {/* Footer */}
        <p className="text-highlight/30 text-xs text-center mt-4 leading-relaxed">
          No wallet installed? Click any option to explore in demo mode.
        </p>
      </div>
    </div>
  );
}
