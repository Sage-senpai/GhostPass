# GhostPass — Hackathon Submission Details

Copy each section below into the corresponding field on the submission form.

---

## Submission Details (copy this into "Provide a detailed explanation of your submission")

GhostPass is a TEE-enforced utility leasing protocol for Soulbound Tokens (SBTs) on Solana, built on the Liquefaction protocol (Austgen et al., Cornell/IC3).

### The Problem

Soulbound Tokens carry real utility — rank access, game privileges, governance rights — but their non-transferability creates a dead market. Owners can't monetize achievements they underutilize. Renters can't access elite privileges without years of grinding. There is no existing protocol that respects the soul-bound constraint while enabling utility sharing.

### The Solution

GhostPass productionizes the Liquefaction key encumbrance primitive. When a lender lists a privilege:

1. A **dstack TEE enclave** initializes and generates a verifiable attestation (MRENCLAVE + MRSIGNER measurements)
2. The owner's private key is **encumbered** inside the enclave with time-bound, capability-limited restrictions
3. A scoped **session key** is issued to the renter — it can only perform pre-approved actions and auto-expires
4. When the session ends, the TEE **destroys the session key** and releases the encumbrance

The original SBT never leaves the owner's wallet. Neither party trusts the other — the hardware enforces everything.

### Research Foundation

**Liquefaction (Primary Track)** — GhostPass is a direct application of the Liquefaction paper by James Austgen (Cornell/IC3). We implement three core primitives: TEE-based key encumbrance, attestation verification (MRENCLAVE/MRSIGNER proofs), and capability-limited session key derivation.

**Conditional Recall (Secondary Track)** — Our session key mechanism implements brokered credential delegation via TEE, as described in the Conditional Recall research (Xyn Sun, Teleport/Flashbots). The "recall condition" is time-based: when the rental expires, the TEE automatically recalls the delegated session key.

**Bonus Track: Beyond Gaming** — The same TEE key encumbrance primitive extends to researcher/builder collaboration: sharing API keys without exposing secrets, delegating cloud credentials with auto-expiry, time-bound access to proprietary datasets, and team access to premium tools without sharing passwords.

**dstack** is the shared TEE infrastructure layer. The MVP simulates the full dstack enclave flow with realistic artifacts; production deployment will use real dstack enclaves on Intel SGX/TDX.

### What We Built

**Frontend dApp (Next.js 16 + TypeScript + Tailwind CSS v4)**
- Full landing page with animated flow visualization, hero section, security model, marketplace preview, "Beyond Gaming" use cases, and IC3 research references
- 8-page App Router application: Dashboard, Marketplace, Privileges, Sessions, Activity, TEE Dashboard, Settings, Documentation
- Glassmorphism dark-luxury design system with custom theme variables
- Fully responsive (sidebar on desktop, bottom nav on mobile)
- Loading skeletons, 404 page, SEO meta tags, OpenGraph + Twitter cards, sitemap, robots.txt

**Web3 Integration (Solana Devnet)**
- Real Solana wallet adapter supporting Phantom and Solflare with auto-detection
- Graceful mock fallback for demo mode when no wallet is installed
- Live SOL balance fetching from Solana devnet (auto-refreshes every 30s)
- Real wallet address, balance, and provider name flow through the entire app

**TEE Simulation Engine (Liquefaction Protocol)**
- Full TEE simulation modeling the complete Liquefaction flow: SBT detection → ownership verification → enclave initialization → attestation generation → key encumbrance → session key issuance → session verification
- Interactive 7-step rental flow modal with animated progress and live artifact generation (MRENCLAVE hash, encumbrance proof, session key)
- TEE Dashboard showing live enclave status, on-demand attestation generation, attestation logs, active session keys, and key encumbrance records
- 5-node protocol architecture diagram (User Wallet → SBT Registry → Privilege Mapper → Rental Marketplace → TEE Session Controller)

**Documentation**
- In-app docs covering the Liquefaction protocol, dstack infrastructure, Conditional Recall, security model, use cases, and FAQ
- Comprehensive README with research references, architecture, and setup instructions

### Tech Stack
- Next.js 16.1.6 (App Router, Turbopack)
- TypeScript (0 compilation errors)
- Tailwind CSS v4 with custom @theme design system
- @solana/wallet-adapter-react + @solana/web3.js (Devnet)
- Phantom + Solflare wallet adapters with auto-detection

### Tracks
- **Liquefaction** — direct implementation of TEE-based key encumbrance for SBT utility leasing
- **Conditional Recall** — brokered credential delegation via TEE with time-based automatic recall
- **Bonus Track** — the same primitive enables trustless credential sharing for researchers, builders, and teams

---

## Link to Code (copy this)

https://github.com/sage-senpai/ghostpass

---

## Link to Demo Video (copy this)

[PASTE YOUR YOUTUBE LINK HERE]

---

## Link to Presentation (copy this)

(https://gamma.app/docs/GhostPass-htzz14er8o6vmpy)

---

## Live Demo Link (copy this)

https://ghost-pass-two.vercel.app

