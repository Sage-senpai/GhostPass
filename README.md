# GhostPass

**TEE-Enforced Utility Leasing for Soulbound Gaming Assets**

GhostPass productionizes the [Liquefaction protocol](https://hackmd.io/@EspressoSystems/liquefaction) (Austgen et al., Cornell/IC3) — a TEE-based key encumbrance system that enables non-custodial, time-bound rental of privileges attached to Soulbound Tokens (SBTs).

Ownership never moves. The TEE enforces the rules.

> Built for the [Shape Rotator Hackathon](https://www.encode.club/shape-rotator-virtual-hackathon) — Track 1: TEE & AI-Enabled Applications

---

## The Problem

Soulbound Tokens carry real utility — rank access, game privileges, governance rights — but their non-transferability creates a dead market. Owners can't monetize achievements they underutilize. Renters can't access elite privileges without years of grinding.

## The Solution

GhostPass applies the **Liquefaction key encumbrance primitive** to create a trustless rental marketplace:

1. **Owner lists** an SBT privilege (e.g., Diamond Rank in a game)
2. **Renter pays** in SOL via the marketplace
3. **dstack TEE enclave** initializes and generates a verifiable attestation (MRENCLAVE + MRSIGNER)
4. Owner's private key is **encumbered** inside the enclave with time-bound, capability-limited rules
5. A **session key** is issued to the renter — scoped to specific actions, auto-expires
6. When time runs out, the TEE **destroys the session key** and releases the encumbrance

Neither party trusts the other. The hardware enforces everything.

## How It Relates to the Research

### Liquefaction (Primary Track)

GhostPass is a direct application of the [Liquefaction paper](https://hackmd.io/@EspressoSystems/liquefaction) by James Austgen (Cornell/IC3). The paper formally defines **TEE-based key encumbrance** — locking a private key inside a TEE with programmatic restrictions on what it can sign, for how long, and under what conditions.

GhostPass implements this as:
- **Key encumbrance** — owner's key locked in dstack enclave with time + capability constraints
- **Attestation verification** — MRENCLAVE measurements prove the enclave runs correct code
- **Session key generation** — capability-limited keys derived inside the TEE for renters
- **Automatic revocation** — encumbrance releases when the session expires

### Conditional Recall (Secondary Track)

The session key mechanism in GhostPass is a form of **brokered credential delegation** — the owner delegates limited access to their credential (SBT/key) through a TEE intermediary, with automatic recall on expiry. This maps directly to the Conditional Recall primitive.

### Bonus Track: Beyond Gaming

The same TEE key encumbrance primitive applies to researcher/builder collaboration:
- **API Key Sharing** — rent access to a premium API key without exposing the secret
- **Cloud Credential Delegation** — share cloud resources with auto-expiring TEE-enforced access
- **Dataset Access Control** — time-bound access to proprietary datasets via encumbered keys
- **Premium Tool Sharing** — teams share paid tool access without sharing passwords

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 16 (App Router, Turbopack) |
| Language | TypeScript (0 errors) |
| Styling | Tailwind CSS v4 (custom design system) |
| Blockchain | Solana (devnet) via `@solana/web3.js` |
| Wallets | Phantom, Solflare + auto-detection, mock fallback |
| TEE | Simulated dstack enclave (attestation, encumbrance, session keys) |
| Deployment | Vercel |

## Project Structure

```
src/
  app/
    page.tsx                    # Landing page
    (app)/                      # App pages (sidebar layout)
      dashboard/                # Stats, privileges, active sessions
      marketplace/              # Filterable rental listings + TEE rental flow
      privileges/               # User's SBTs with listing form
      sessions/                 # Active sessions with live countdown timers
      activity/                 # Transaction history
      tee/                      # TEE Dashboard (enclave, attestations, keys)
      settings/                 # Profile, notifications, preferences
      docs/                     # Protocol docs, security model, FAQ
  components/
    Providers.tsx               # Dynamic SSR-safe provider wrapper
    ProvidersInner.tsx          # Solana + Wallet + Toast providers
    layout/                     # Sidebar, MobileNav
    wallet/                     # WalletConnectModal (real detection)
    tee/                        # RentalFlowModal (7-step encumbrance flow)
    ui/                         # CountdownTimer, Toast
  context/
    SolanaWalletProvider.tsx    # Phantom + Solflare adapters, devnet
    WalletContext.tsx            # Real wallet + mock fallback
  lib/
    tee-simulator.ts            # TEE attestation, encumbrance, session key engine
    types.ts                    # TypeScript interfaces
    mock-data.ts                # Mock privileges, listings, sessions
```

## Running Locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Key Features

- **7-Step TEE Rental Flow** — Interactive modal visualizing the full Liquefaction encumbrance process with live artifact generation
- **TEE Dashboard** — Enclave status, live attestation generation, session keys, key encumbrances
- **Real Wallet Integration** — Auto-detects Phantom/Solflare, falls back to demo mode
- **Live Session Timers** — Real-time countdowns on active rentals
- **Marketplace Filtering** — By game, privilege type, duration, price
- **Responsive Design** — Desktop sidebar + mobile bottom nav
- **Design System** — Dark luxury glassmorphism aesthetic

## Architecture: TEE Simulation

Since the hackathon MVP doesn't deploy to real dstack hardware, GhostPass includes a full **TEE simulation engine** (`src/lib/tee-simulator.ts`) that models:

- `simulateEnclaveInit()` — Initialize a dstack TEE enclave with platform metadata
- `simulateAttestation(enclaveId)` — Generate MRENCLAVE/MRSIGNER attestation reports
- `simulateKeyEncumbrance(...)` — Lock a key with time + capability constraints
- `simulateSessionKeyGeneration(...)` — Derive a capability-limited session key

The simulation produces realistic artifacts (hex hashes, timestamps, capability arrays) that demonstrate what the production flow would look like with real dstack integration.

## Production Roadmap

| Phase | Scope |
|-------|-------|
| Phase 1 (Done) | Full frontend, TEE simulation, marketplace, wallet integration |
| Phase 2 | Solana smart contracts (SBT Registry, Privilege Mapper, Session Controller) |
| Phase 3 | Real dstack TEE integration, mainnet deployment |

## Research References

- **Liquefaction** — Austgen, J. (Cornell/IC3). TEE-based key encumbrance for shared, rented, or pooled asset control.
- **dstack** — Decentralized TEE cloud infrastructure. Shared infra layer for TEE applications.
- **Conditional Recall** — Brokered credential delegation via TEE with automatic recall.

## Author

**Anyadike Divine** — Shape Rotator Hackathon, IC3

## License

MIT
