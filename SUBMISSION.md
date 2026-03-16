# GhostPass — Hackathon Submission Details

Copy each section below into the corresponding field on the submission form.

---

## Submission Details (copy this)

GhostPass is a TEE-enforced utility leasing protocol for Soulbound Tokens (SBTs) on Solana, built on the Liquefaction protocol (Austgen et al., Cornell/IC3).

### The Problem
Soulbound Tokens carry real utility — rank access, game privileges, governance rights — but their non-transferability creates a dead market. Owners can't monetize them, and renters can't access elite privileges without years of grinding. There is no existing mechanism that respects the soul-bound constraint while still enabling utility sharing.

### The Solution
GhostPass productionizes the Liquefaction key encumbrance primitive. When a lender lists a privilege, their private key is encumbered inside a dstack TEE enclave with time-bound, capability-limited restrictions. The enclave generates a verifiable TEE attestation (MRENCLAVE + MRSIGNER measurements) proving the execution environment is trustworthy. A scoped session key is then issued to the renter — one that can only perform pre-approved actions and automatically expires. The original SBT never leaves the owner's wallet. No trust in the renter is required.

### What We Built

**Frontend dApp (Next.js 16 + TypeScript + Tailwind CSS v4)**
- Full landing page with animated flow visualization, hero section, security model, marketplace preview
- 8-page App Router application: Dashboard, Marketplace, Privileges, Sessions, Activity, TEE Dashboard, Settings, Documentation
- Glassmorphism dark-luxury design system with custom theme variables
- Fully responsive (sidebar on desktop, bottom nav on mobile)
- Loading skeletons, 404 page, SEO meta tags, OpenGraph + Twitter cards

**Web3 Integration (Solana Devnet)**
- Real Solana wallet adapter supporting 6 wallets: Phantom, Solflare, Coinbase Wallet, Trust Wallet, Ledger, Nightly
- Auto-detection of installed wallets with graceful mock fallback for demo
- Live SOL balance fetching from Solana devnet (auto-refreshes every 30s)
- Real wallet address, balance, and provider name displayed throughout the app

**TEE Simulation Engine (Liquefaction Protocol)**
- Full TEE simulation modeling the complete Liquefaction flow: SBT detection, ownership verification, enclave initialization, attestation generation, key encumbrance, session key issuance, session verification
- Interactive 7-step rental flow modal with animated progress, live artifact generation (MRENCLAVE hash, encumbrance proof, session key)
- TEE Dashboard showing live enclave status, attestation logs, active session keys, and key encumbrance records
- Architecture diagram of the 5-node protocol flow (User Wallet → SBT Registry → Privilege Mapper → Rental Marketplace → TEE Session Controller)

### Tech Stack
- Next.js 16.1.6 (App Router, Turbopack)
- TypeScript (0 errors)
- Tailwind CSS v4 with custom @theme variables
- @solana/wallet-adapter-react + @solana/web3.js (Devnet)
- Phantom, Solflare, Coinbase, Trust, Ledger, Nightly wallet adapters

### Tracks
- Liquefaction — direct implementation of the Liquefaction protocol (Austgen, Cornell/IC3) for gaming SBT utility leasing
- NDAI Agreements — non-delegatable attestable identity via SBTs + TEE attestation proofs

---

## Link to Code (copy this)

https://github.com/sage-senpai/ghostpass

---

## Link to Presentation (copy this)

https://gamma.app/docs/YOUR-GAMMA-LINK

---

## Commit Message (copy this)

```
feat: Milestone 4 — SEO, multi-wallet support, real wallet data flow

- Full SEO: OpenGraph, Twitter cards, meta tags, sitemap.xml, robots.txt
- 6 wallet adapters: Phantom, Solflare, Coinbase, Trust, Ledger, Nightly
- Real wallet detection with installed/demo status in connect modal
- Real wallet data (address, balance, provider name) flows through dashboard, settings, sidebar
- Loading skeletons, 404 page, page-level metadata
- Dynamic SSR-safe provider imports (Providers.tsx + ProvidersInner.tsx)
- TypeScript: 0 errors
```
