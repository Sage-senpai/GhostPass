"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useWallet } from "@/context/WalletContext";

const navItems = [
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="7" height="8" rx="1.5" />
        <rect x="11" y="2" width="7" height="5" rx="1.5" />
        <rect x="2" y="12" width="7" height="6" rx="1.5" />
        <rect x="11" y="9" width="7" height="9" rx="1.5" />
      </svg>
    ),
  },
  {
    label: "Marketplace",
    href: "/marketplace",
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 3h14l-1.5 9H4.5L3 3Z" />
        <path d="M4.5 12L4 16h12l-.5-4" />
        <circle cx="7" cy="18" r="1" />
        <circle cx="13" cy="18" r="1" />
      </svg>
    ),
  },
  {
    label: "My Privileges",
    href: "/privileges",
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M10 2l2.4 4.8L18 7.6l-4 3.9.9 5.5L10 14.5 5.1 17l.9-5.5-4-3.9 5.6-.8L10 2Z" />
      </svg>
    ),
  },
  {
    label: "Sessions",
    href: "/sessions",
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="10" cy="10" r="8" />
        <path d="M10 5v5l3.5 3.5" />
      </svg>
    ),
  },
  {
    label: "Activity",
    href: "/activity",
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="2,10 5,10 8,4 12,16 15,10 18,10" />
      </svg>
    ),
  },
  {
    label: "TEE Dashboard",
    href: "/tee",
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M10 2L3 6v4c0 5.5 3 10.7 7 12 4-1.3 7-6.5 7-12V6l-7-4z" />
        <path d="M7 10l2.5 2.5L14 8" />
      </svg>
    ),
  },
  {
    label: "Settings",
    href: "/settings",
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="10" cy="10" r="3" />
        <path d="M10 1v2m0 14v2M3.5 3.5l1.4 1.4m10.2 10.2l1.4 1.4M1 10h2m14 0h2M3.5 16.5l1.4-1.4m10.2-10.2l1.4-1.4" />
      </svg>
    ),
  },
  {
    label: "Docs",
    href: "/docs",
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 2h9l5 5v11a1 1 0 01-1 1H4a1 1 0 01-1-1V3a1 1 0 011-1z" />
        <polyline points="13,2 13,7 18,7" />
        <line x1="6" y1="11" x2="14" y2="11" />
        <line x1="6" y1="15" x2="11" y2="15" />
      </svg>
    ),
  },
];

export default function Sidebar() {
  const pathname = usePathname();
  const { wallet, disconnect, setShowConnectModal } = useWallet();

  return (
    <aside className="hidden md:flex flex-col fixed left-0 top-0 bottom-0 w-[260px] glass-card rounded-none border-l-0 border-t-0 border-b-0 z-40">
      {/* Brand */}
      <div className="px-6 pt-7 pb-6">
        <Link href="/dashboard" className="flex items-center gap-2.5 no-underline">
          <Image
            src="/logo.png"
            alt="GhostPass"
            width={36}
            height={36}
            className="rounded-xl"
          />
          <div>
            <h1 className="text-paper text-lg font-bold tracking-tight leading-none font-[family-name:var(--font-display)]">
              GhostPass
            </h1>
            <p className="text-border text-[10px] uppercase tracking-[0.15em] mt-0.5">
              Privilege Layer
            </p>
          </div>
        </Link>
      </div>

      {/* Divider */}
      <div className="mx-5 h-px bg-border/30" />

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 flex flex-col gap-0.5 overflow-y-auto">
        {navItems.map((item) => {
          const isActive =
            pathname === item.href || pathname?.startsWith(item.href + "/");

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`
                flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium
                transition-all duration-150 no-underline
                ${
                  isActive
                    ? "bg-paper/10 text-paper"
                    : "text-highlight/60 hover:text-paper hover:bg-paper/5"
                }
              `}
            >
              <span
                className={`flex-shrink-0 ${isActive ? "text-paper" : "text-highlight/40"}`}
              >
                {item.icon}
              </span>
              {item.label}
              {isActive && (
                <span className="ml-auto w-1.5 h-1.5 rounded-full bg-positive" />
              )}
            </Link>
          );
        })}
      </nav>

      {/* Divider */}
      <div className="mx-5 h-px bg-border/30" />

      {/* Wallet Section */}
      <div className="p-4">
        {wallet.connected ? (
          <div className="glass-card rounded-xl p-3.5">
            <div className="flex items-center gap-2.5 mb-2.5">
              <div className="w-2 h-2 rounded-full bg-positive" />
              <span className="text-xs text-highlight/60 font-medium">
                Connected
              </span>
            </div>
            <p className="text-paper text-sm font-mono font-medium truncate mb-1">
              {wallet.address}
            </p>
            <div className="flex items-center justify-between">
              <span className="text-highlight/50 text-xs">
                {wallet.balance} SOL
              </span>
              <button
                onClick={disconnect}
                className="text-alert/70 hover:text-alert text-xs font-medium cursor-pointer bg-transparent border-none transition-colors duration-150"
              >
                Disconnect
              </button>
            </div>
          </div>
        ) : (
          <button
            onClick={() => setShowConnectModal(true)}
            className="btn-primary w-full text-center text-sm"
          >
            Connect Wallet
          </button>
        )}
      </div>
    </aside>
  );
}
