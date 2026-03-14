"use client";

import { useWallet } from "@/context/WalletContext";
import { useEffect, useCallback } from "react";

const wallets = [
  {
    name: "Phantom",
    provider: "phantom",
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
    name: "Backpack",
    provider: "backpack",
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <rect width="28" height="28" rx="8" fill="#E33E3F" />
        <rect x="8" y="7" width="12" height="14" rx="3" stroke="#fff" strokeWidth="1.8" fill="none" />
        <path d="M11 7V5.5a3 3 0 0 1 6 0V7" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" />
        <rect x="10.5" y="12" width="7" height="4" rx="1" fill="#fff" />
      </svg>
    ),
  },
  {
    name: "Solflare",
    provider: "solflare",
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
];

export default function WalletConnectModal() {
  const { showConnectModal, setShowConnectModal, connect } = useWallet();

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
        <div className="flex items-center justify-between mb-6">
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
        <p className="text-highlight/50 text-sm mb-5 leading-relaxed">
          Select a wallet to connect to GhostPass and start leasing elite gaming
          privileges.
        </p>

        {/* Wallet Options */}
        <div className="flex flex-col gap-2.5">
          {wallets.map((w) => (
            <button
              key={w.provider}
              onClick={() => connect(w.provider)}
              className="glass-card glass-card-hover flex items-center gap-4 px-4 py-3.5 w-full text-left cursor-pointer border-border/50 bg-transparent"
            >
              <span className="flex-shrink-0">{w.icon}</span>
              <div className="flex-1 min-w-0">
                <span className="text-paper text-sm font-semibold block">
                  {w.name}
                </span>
                <span className="text-highlight/40 text-xs">
                  Detected
                </span>
              </div>
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-highlight/30 flex-shrink-0"
              >
                <path d="M6 3l5 5-5 5" />
              </svg>
            </button>
          ))}
        </div>

        {/* Footer */}
        <p className="text-highlight/30 text-xs text-center mt-5 leading-relaxed">
          By connecting, you agree to the GhostPass Terms of Service.
        </p>
      </div>
    </div>
  );
}
