import Link from "next/link";
import Image from "next/image";
import { rentalListings } from "@/lib/mock-data";
import type { RentalListing } from "@/lib/types";

const previewListings: RentalListing[] = rentalListings.slice(0, 3);

const rarityColors: Record<string, string> = {
  legendary: "text-amber-400 border-amber-400/40 bg-amber-400/10",
  epic: "text-purple-400 border-purple-400/40 bg-purple-400/10",
  rare: "text-sky-400 border-sky-400/40 bg-sky-400/10",
  common: "text-highlight border-border bg-card",
};

const rarityGlow: Record<string, string> = {
  legendary: "shadow-[0_0_30px_rgba(251,191,36,0.15)]",
  epic: "shadow-[0_0_30px_rgba(168,85,247,0.15)]",
  rare: "shadow-[0_0_30px_rgba(56,189,248,0.12)]",
  common: "",
};

const typeIcons: Record<string, string> = {
  rank: "\u2694",
  access: "\uD83D\uDD11",
  buff: "\u26A1",
  governance: "\uD83D\uDDF3",
};

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-bg-dark text-paper overflow-x-hidden">
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-12px); }
        }
        @keyframes pulse-glow {
          0%, 100% { opacity: 0.4; filter: blur(40px); }
          50% { opacity: 0.7; filter: blur(60px); }
        }
        @keyframes flow-right {
          0% { transform: translateX(-8px); opacity: 0; }
          50% { transform: translateX(0px); opacity: 1; }
          100% { transform: translateX(8px); opacity: 0; }
        }
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes dash-flow {
          to { stroke-dashoffset: -20; }
        }
        @keyframes node-pulse {
          0%, 100% { transform: scale(1); box-shadow: 0 0 0 0 rgba(214,209,190,0.3); }
          50% { transform: scale(1.05); box-shadow: 0 0 20px 4px rgba(214,209,190,0.15); }
        }
        @keyframes particle-drift {
          0% { transform: translate(0, 0) scale(1); opacity: 0.6; }
          50% { opacity: 1; }
          100% { transform: translate(var(--dx), var(--dy)) scale(0); opacity: 0; }
        }
        .animate-float { animation: float 6s ease-in-out infinite; }
        .animate-float-delay { animation: float 6s ease-in-out 2s infinite; }
        .animate-float-delay-2 { animation: float 6s ease-in-out 4s infinite; }
        .animate-pulse-glow { animation: pulse-glow 4s ease-in-out infinite; }
        .animate-flow { animation: flow-right 2s ease-in-out infinite; }
        .animate-flow-delay { animation: flow-right 2s ease-in-out 0.6s infinite; }
        .animate-shimmer {
          background: linear-gradient(90deg, transparent 0%, rgba(214,209,190,0.08) 50%, transparent 100%);
          background-size: 200% 100%;
          animation: shimmer 3s linear infinite;
        }
        .animate-fade-in { animation: fade-in-up 0.8s ease-out both; }
        .animate-fade-in-delay { animation: fade-in-up 0.8s ease-out 0.2s both; }
        .animate-fade-in-delay-2 { animation: fade-in-up 0.8s ease-out 0.4s both; }
        .animate-node-pulse { animation: node-pulse 3s ease-in-out infinite; }
        .animate-node-pulse-delay { animation: node-pulse 3s ease-in-out 1s infinite; }
        .animate-node-pulse-delay-2 { animation: node-pulse 3s ease-in-out 2s infinite; }
      `}</style>

      {/* ─── NAV ─── */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border/40 backdrop-blur-xl bg-bg-dark/70">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 no-underline">
            <Image src="/logo.png" alt="GhostPass" width={32} height={32} className="rounded-lg" />
            <span className="font-display text-xl font-bold tracking-tight text-paper">
              Ghost<span className="text-highlight">Pass</span>
            </span>
          </Link>
          <div className="flex items-center gap-6">
            <Link href="#how-it-works" className="text-sm text-highlight/70 hover:text-paper transition-colors hidden sm:block">
              How It Works
            </Link>
            <Link href="#security" className="text-sm text-highlight/70 hover:text-paper transition-colors hidden sm:block">
              Security
            </Link>
            <Link href="#marketplace" className="text-sm text-highlight/70 hover:text-paper transition-colors hidden sm:block">
              Marketplace
            </Link>
            <Link href="/dashboard" className="btn-primary text-sm !py-2 !px-5">
              Launch App
            </Link>
          </div>
        </div>
      </nav>

      {/* ─── HERO ─── */}
      <section className="relative min-h-screen flex items-center pt-16 overflow-hidden">
        {/* Full-screen hero background image */}
        <Image
          src="/hero.png"
          alt="GhostPass - TEE-Secure Digital Asset Exchange"
          fill
          className="object-cover object-right"
          priority
        />

        {/* Dark overlay gradient — heavier on the left for text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-bg-dark via-bg-dark/85 to-bg-dark/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-bg-dark via-transparent to-bg-dark/60" />

        {/* Content overlay */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-12">
          <div className="max-w-xl">
            {/* Badge */}
            <div className="animate-fade-in inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-border bg-card/40 backdrop-blur-sm text-xs font-medium text-highlight mb-8">
              <span className="w-1.5 h-1.5 rounded-full bg-positive animate-pulse" />
              Built on Solana &middot; Liquefaction Protocol (IC3)
            </div>

            {/* Title */}
            <h1 className="animate-fade-in font-display text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tighter leading-[0.9] mb-6">
              Ghost<span className="text-highlight">Pass</span>
            </h1>

            {/* Subtitle */}
            <p className="animate-fade-in-delay font-display text-lg sm:text-xl lg:text-2xl text-highlight/80 max-w-xl leading-relaxed mb-10">
              Lease Elite Gaming Privileges Without Transferring Ownership
            </p>

            {/* ─── ANIMATED FLOW VISUALIZATION ─── */}
            <div className="animate-fade-in-delay-2 flex items-center gap-3 sm:gap-4 mb-10 flex-wrap">
              {/* Node 1 */}
              <div className="glass-card animate-node-pulse flex flex-col items-center gap-1.5 px-4 py-3 min-w-[110px] backdrop-blur-md">
                <div className="text-xl">{"\uD83C\uDFC6"}</div>
                <span className="text-[11px] font-medium text-paper">Achievement</span>
                <span className="text-[9px] text-highlight/50 font-mono">SBT</span>
              </div>

              {/* Arrow 1 */}
              <div className="flex gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-highlight/60 animate-flow" />
                <span className="w-1.5 h-1.5 rounded-full bg-highlight/60 animate-flow-delay" />
              </div>

              {/* Node 2 */}
              <div className="glass-card animate-node-pulse-delay flex flex-col items-center gap-1.5 px-4 py-3 min-w-[120px] border-highlight/40 relative overflow-hidden backdrop-blur-md">
                <div className="absolute inset-0 animate-shimmer" />
                <div className="relative text-xl">{"\uD83D\uDC7B"}</div>
                <span className="relative text-[11px] font-bold text-paper">GhostPass</span>
                <span className="relative text-[9px] text-positive font-mono">TEE</span>
              </div>

              {/* Arrow 2 */}
              <div className="flex gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-positive/60 animate-flow" />
                <span className="w-1.5 h-1.5 rounded-full bg-positive/60 animate-flow-delay" />
              </div>

              {/* Node 3 */}
              <div className="glass-card animate-node-pulse-delay-2 flex flex-col items-center gap-1.5 px-4 py-3 min-w-[110px] backdrop-blur-md">
                <div className="text-xl">{"\uD83C\uDFAE"}</div>
                <span className="text-[11px] font-medium text-paper">Access</span>
                <span className="text-[9px] text-highlight/50 font-mono">Time-Bound</span>
              </div>
            </div>

            {/* CTA */}
            <div className="animate-fade-in-delay-2 flex items-center gap-4">
              <Link
                href="/dashboard"
                className="btn-primary text-base !py-3.5 !px-8 font-bold inline-flex items-center gap-2"
              >
                Launch App
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="ml-1">
                  <path d="M3 8h10m0 0L9 4m4 4L9 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
              <Link href="#how-it-works" className="btn-secondary text-base !py-3.5 !px-8 inline-flex items-center gap-2 backdrop-blur-sm">
                Learn More
              </Link>
            </div>
          </div>
        </div>

        {/* Scroll hint */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-highlight/30 z-10">
          <span className="text-[10px] uppercase tracking-widest">Scroll</span>
          <div className="w-px h-8 bg-gradient-to-b from-highlight/30 to-transparent" />
        </div>
      </section>

      {/* ─── HOW IT WORKS ─── */}
      <section id="how-it-works" className="relative py-32 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20">
            <span className="text-xs uppercase tracking-[0.25em] text-highlight/50 font-mono mb-3 block">Protocol</span>
            <h2 className="font-display text-4xl sm:text-5xl font-bold tracking-tight mb-4">
              How It Works
            </h2>
            <p className="text-highlight/60 max-w-lg mx-auto">
              Three simple steps to lease or rent elite gaming privileges on-chain.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {/* Step 1 */}
            <div className="glass-card glass-card-hover p-8 relative group">
              <div className="absolute top-6 right-6 font-mono text-5xl font-black text-highlight/[0.06] select-none">01</div>
              <div className="w-14 h-14 rounded-2xl bg-paper/[0.06] border border-border flex items-center justify-center text-2xl mb-6 group-hover:border-highlight/40 transition-colors">
                {"\uD83D\uDD17"}
              </div>
              <h3 className="font-display text-xl font-bold mb-3">Connect Wallet</h3>
              <p className="text-sm text-highlight/60 leading-relaxed">
                Link your Solana wallet to access the GhostPass marketplace. Your SBTs and achievement NFTs are detected automatically.
              </p>
            </div>

            {/* Step 2 */}
            <div className="glass-card glass-card-hover p-8 relative group">
              <div className="absolute top-6 right-6 font-mono text-5xl font-black text-highlight/[0.06] select-none">02</div>
              <div className="w-14 h-14 rounded-2xl bg-paper/[0.06] border border-border flex items-center justify-center text-2xl mb-6 group-hover:border-highlight/40 transition-colors">
                {"\uD83D\uDCCB"}
              </div>
              <h3 className="font-display text-xl font-bold mb-3">List or Browse</h3>
              <p className="text-sm text-highlight/60 leading-relaxed">
                Lenders list their privileges with custom pricing and duration. Renters browse the marketplace and filter by game, type, or rarity.
              </p>
            </div>

            {/* Step 3 */}
            <div className="glass-card glass-card-hover p-8 relative group">
              <div className="absolute top-6 right-6 font-mono text-5xl font-black text-highlight/[0.06] select-none">03</div>
              <div className="w-14 h-14 rounded-2xl bg-paper/[0.06] border border-border flex items-center justify-center text-2xl mb-6 group-hover:border-highlight/40 transition-colors">
                {"\uD83C\uDFAE"}
              </div>
              <h3 className="font-display text-xl font-bold mb-3">Rent & Play</h3>
              <p className="text-sm text-highlight/60 leading-relaxed">
                Pay in SOL, receive time-bound access enforced by TEE. Privileges auto-revoke when the session expires. Zero trust required.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── SECURITY MODEL ─── */}
      <section id="security" className="relative py-32 px-6 border-t border-border/30">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-xs uppercase tracking-[0.25em] text-positive/70 font-mono mb-3 block">Security &middot; Liquefaction Protocol</span>
              <h2 className="font-display text-4xl sm:text-5xl font-bold tracking-tight mb-6">
                TEE-Enforced<br />Key Encumbrance
              </h2>
              <p className="text-highlight/60 leading-relaxed mb-4">
                GhostPass productionizes the <span className="text-paper font-semibold">Liquefaction protocol</span> (James Austgen, Cornell/IC3) &mdash; a TEE-based key encumbrance system. The owner&apos;s private key is locked inside a <span className="text-paper font-semibold">dstack TEE enclave</span> with time-bound restrictions. A capability-limited session key is generated that can only perform pre-approved actions.
              </p>
              <p className="text-highlight/60 leading-relaxed mb-8">
                The original SBT never leaves the owner&apos;s wallet. When the session expires, the TEE revokes the session key and releases the encumbrance &mdash; no trust in the renter required.
              </p>

              <div className="space-y-4">
                {[
                  { label: "Non-Transferable", desc: "SBTs remain in the owner's wallet at all times" },
                  { label: "Time-Bound Sessions", desc: "Cryptographic expiry enforced at the hardware level" },
                  { label: "Attestation Proofs", desc: "Every session generates a verifiable TEE attestation" },
                  { label: "Auto-Revocation", desc: "Privileges revoke instantly when the timer expires" },
                ].map((item) => (
                  <div key={item.label} className="flex items-start gap-3">
                    <div className="mt-1 w-5 h-5 rounded-full border border-positive/40 bg-positive/10 flex items-center justify-center flex-shrink-0">
                      <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                        <path d="M2 5l2.5 2.5L8 3" stroke="var(--color-positive)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                    <div>
                      <span className="text-sm font-semibold text-paper">{item.label}</span>
                      <p className="text-xs text-highlight/50">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Security visual */}
            <div className="relative flex items-center justify-center">
              <div className="glass-card p-10 sm:p-14 relative overflow-hidden">
                <div className="absolute inset-0 animate-shimmer" />

                {/* Shield icon */}
                <div className="relative flex flex-col items-center gap-6">
                  <div className="animate-float w-24 h-24 rounded-3xl bg-positive/10 border border-positive/30 flex items-center justify-center">
                    <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                      <path d="M24 4L6 12v12c0 11.1 7.7 21.5 18 24 10.3-2.5 18-12.9 18-24V12L24 4z" stroke="var(--color-positive)" strokeWidth="2.5" fill="none" />
                      <path d="M17 24l5 5 9-10" stroke="var(--color-positive)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>

                  <div className="text-center">
                    <p className="font-display text-lg font-bold text-paper mb-1">Hardware-Grade Security</p>
                    <p className="text-xs text-highlight/50 font-mono">TEE Attestation Active</p>
                  </div>

                  {/* Metrics row */}
                  <div className="grid grid-cols-3 gap-6 mt-4">
                    {[
                      { value: "100%", label: "Uptime" },
                      { value: "0", label: "Breaches" },
                      { value: "<1s", label: "Revoke" },
                    ].map((stat) => (
                      <div key={stat.label} className="text-center">
                        <div className="font-mono text-xl font-bold text-positive">{stat.value}</div>
                        <div className="text-[10px] text-highlight/40 uppercase tracking-wider">{stat.label}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── MARKETPLACE PREVIEW ─── */}
      <section id="marketplace" className="relative py-32 px-6 border-t border-border/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20">
            <span className="text-xs uppercase tracking-[0.25em] text-highlight/50 font-mono mb-3 block">Marketplace</span>
            <h2 className="font-display text-4xl sm:text-5xl font-bold tracking-tight mb-4">
              Marketplace Preview
            </h2>
            <p className="text-highlight/60 max-w-lg mx-auto">
              Browse live privilege listings from top players across games.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mb-12">
            {previewListings.map((listing) => {
              const rarity = listing.privilege.rarity;
              const colorClass = rarityColors[rarity];
              const glowClass = rarityGlow[rarity];
              const icon = typeIcons[listing.privilege.type] || "\u2728";

              return (
                <div
                  key={listing.id}
                  className={`glass-card glass-card-hover p-6 flex flex-col ${glowClass}`}
                >
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl bg-paper/[0.05] border border-border flex items-center justify-center text-xl">
                      {icon}
                    </div>
                    <span className={`badge ${colorClass} text-[10px] uppercase tracking-wider border rounded-full px-2.5 py-0.5 font-bold`}>
                      {rarity}
                    </span>
                  </div>

                  {/* Info */}
                  <h3 className="font-display text-lg font-bold mb-1">{listing.privilege.name}</h3>
                  <p className="text-xs text-highlight/50 mb-3 font-mono">{listing.privilege.game}</p>
                  <p className="text-sm text-highlight/60 leading-relaxed flex-1 mb-6">
                    {listing.privilege.description}
                  </p>

                  {/* Footer */}
                  <div className="flex items-center justify-between pt-4 border-t border-border/40">
                    <div>
                      <div className="font-mono text-lg font-bold text-paper">
                        {listing.price} <span className="text-xs text-highlight/50">{listing.currency}</span>
                      </div>
                      <div className="text-[10px] text-highlight/40">{listing.duration}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-xs text-highlight/50">{listing.lender}</div>
                      <div className="badge-active badge text-[10px] mt-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-positive inline-block" />
                        Active
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* CTA */}
          <div className="text-center">
            <Link
              href="/dashboard"
              className="btn-primary text-base !py-3.5 !px-10 font-bold inline-flex items-center gap-2"
            >
              Explore Full Marketplace
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M3 8h10m0 0L9 4m4 4L9 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* ─── BEYOND GAMING ─── */}
      <section className="relative py-32 px-6 border-t border-border/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20">
            <span className="text-xs uppercase tracking-[0.25em] text-highlight/50 font-mono mb-3 block">Beyond Gaming</span>
            <h2 className="font-display text-4xl sm:text-5xl font-bold tracking-tight mb-4">
              One Primitive, Many Use Cases
            </h2>
            <p className="text-highlight/60 max-w-2xl mx-auto">
              TEE key encumbrance isn&apos;t just for games. The same Liquefaction primitive enables trustless credential sharing for researchers, builders, and teams.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              {
                icon: "\uD83C\uDFAE",
                title: "Gaming Privileges",
                desc: "Rent rank access, beta passes, and rare buffs from elite players — SBT stays with the owner.",
                color: "text-purple-400",
                bg: "bg-purple-500/10",
                border: "border-purple-500/20",
              },
              {
                icon: "\uD83D\uDD11",
                title: "API Key Sharing",
                desc: "Share premium API keys with collaborators. TEE enforces rate limits and auto-expiry — secret never exposed.",
                color: "text-sky-400",
                bg: "bg-sky-500/10",
                border: "border-sky-500/20",
              },
              {
                icon: "\u2601\uFE0F",
                title: "Cloud Credentials",
                desc: "Delegate cloud resource access across teams with time-bound TEE-enforced sessions. No password sharing.",
                color: "text-amber-400",
                bg: "bg-amber-500/10",
                border: "border-amber-500/20",
              },
              {
                icon: "\uD83D\uDDC3\uFE0F",
                title: "Dataset Access",
                desc: "Grant researchers temporary access to proprietary datasets via encumbered keys. Revokes automatically.",
                color: "text-positive",
                bg: "bg-positive/10",
                border: "border-positive/20",
              },
            ].map((item) => (
              <div key={item.title} className={`glass-card p-6 ${item.border} border`}>
                <div className={`w-12 h-12 rounded-xl ${item.bg} flex items-center justify-center text-xl mb-4`}>
                  {item.icon}
                </div>
                <h3 className={`font-display text-base font-bold mb-2 ${item.color}`}>{item.title}</h3>
                <p className="text-sm text-highlight/60 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <p className="text-xs text-highlight/40 font-mono">
              Powered by Liquefaction key encumbrance (Austgen, Cornell/IC3) &middot; Conditional Recall credential delegation &middot; dstack TEE infrastructure
            </p>
          </div>
        </div>
      </section>

      {/* ─── RESEARCH ─── */}
      <section className="relative py-24 px-6 border-t border-border/30">
        <div className="max-w-4xl mx-auto text-center">
          <span className="text-xs uppercase tracking-[0.25em] text-highlight/50 font-mono mb-3 block">Research Foundation</span>
          <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight mb-8">
            Built on IC3 Research
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            <div className="glass-card p-5 text-left">
              <h3 className="font-display font-bold text-paper text-sm mb-2">Liquefaction</h3>
              <p className="text-xs text-highlight/50 leading-relaxed mb-3">
                TEE-based key encumbrance enabling shared, rented, or pooled asset control without transferring ownership.
              </p>
              <span className="text-[10px] font-mono text-highlight/30">James Austgen &middot; Cornell/IC3</span>
            </div>
            <div className="glass-card p-5 text-left">
              <h3 className="font-display font-bold text-paper text-sm mb-2">Conditional Recall</h3>
              <p className="text-xs text-highlight/50 leading-relaxed mb-3">
                Brokered credential delegation via TEE with automatic recall — the foundation for session key revocation.
              </p>
              <span className="text-[10px] font-mono text-highlight/30">Xyn Sun &middot; Teleport/Flashbots</span>
            </div>
            <div className="glass-card p-5 text-left">
              <h3 className="font-display font-bold text-paper text-sm mb-2">dstack</h3>
              <p className="text-xs text-highlight/50 leading-relaxed mb-3">
                Decentralized TEE cloud infrastructure — the shared execution layer for privacy-preserving applications.
              </p>
              <span className="text-[10px] font-mono text-highlight/30">Shared TEE Infrastructure</span>
            </div>
          </div>
        </div>
      </section>

      {/* ─── FOOTER ─── */}
      <footer className="border-t border-border/30 py-12 px-6">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="font-display text-lg font-bold tracking-tight text-highlight/40">
            Ghost<span className="text-highlight/60">Pass</span>
          </span>
          <p className="text-xs text-highlight/30 font-mono text-center sm:text-right">
            Liquefaction Protocol (Austgen, Cornell/IC3) &middot; Solana &middot; dstack TEE &middot; Shape Rotator Hackathon
          </p>
        </div>
      </footer>
    </div>
  );
}
