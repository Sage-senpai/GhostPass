import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Documentation",
};

export default function DocsPage() {
  const sections = [
    {
      title: "What is GhostPass?",
      content:
        "GhostPass is a productionization of the Liquefaction protocol (James Austgen, Cornell/IC3) \u2014 a TEE-based key encumbrance system enabling shared, rented, or pooled asset control. GhostPass applies this primitive to Soulbound Gaming Assets (SBTs), allowing players to lease the privileges attached to their tokens without transferring ownership. Using dstack TEE enclaves, the protocol issues cryptographically time-bound capability sessions that grant controlled access to elite game features.",
    },
    {
      title: "How Does It Work?",
      steps: [
        {
          step: "01",
          label: "Connect Wallet",
          desc: "Link your Solana wallet (Phantom or Solflare). GhostPass auto-detects installed wallets and scans for SBT achievements.",
        },
        {
          step: "02",
          label: "List or Browse",
          desc: "Lenders set a price and duration for their privilege. Renters browse the marketplace and filter by game, type, or rarity.",
        },
        {
          step: "03",
          label: "TEE Encumbrance",
          desc: "Click 'Rent via TEE' to trigger the 7-step Liquefaction flow: SBT detection \u2192 ownership verification \u2192 enclave init \u2192 attestation \u2192 key encumbrance \u2192 session key \u2192 verification.",
        },
        {
          step: "04",
          label: "Play & Auto-Revoke",
          desc: "The renter uses the session key for time-bound access. When the timer expires, the TEE destroys the session key and releases the encumbrance automatically.",
        },
      ],
    },
    {
      title: "The Liquefaction Protocol",
      content:
        "Liquefaction (Austgen, Cornell/IC3) formally defines TEE-based key encumbrance \u2014 the ability to lock a private key inside a Trusted Execution Environment with programmatic restrictions on what it can sign, for how long, and under what conditions. GhostPass implements three core primitives from the paper:",
      features: [
        "Key Encumbrance \u2014 The owner's private key is locked inside a dstack TEE enclave. The enclave enforces time-bound and capability-limited constraints. The key cannot be extracted, even by the enclave operator.",
        "Attestation Verification \u2014 The TEE generates MRENCLAVE and MRSIGNER measurements \u2014 cryptographic proof that the exact correct code is running inside the enclave. Verifiers can check these proofs on-chain.",
        "Session Key Derivation \u2014 Inside the TEE, a capability-limited session key is derived. This key can only perform specific pre-approved actions (e.g., enter a raid, vote in a DAO). It cannot transfer tokens, change ownership, or exceed its scope.",
        "Automatic Revocation \u2014 When the rental period expires, the TEE destroys the session key and releases the encumbrance. No manual intervention, no counterparty trust. Hardware enforces the rules.",
      ],
    },
    {
      title: "dstack TEE Infrastructure",
      content:
        "dstack is a decentralized TEE cloud \u2014 the shared infrastructure layer for privacy-preserving applications. GhostPass uses dstack enclaves to isolate the key encumbrance and session key generation process. The dstack platform provides: hardware-backed isolation (Intel SGX / TDX), remote attestation for verifying enclave integrity, secure key management within the enclave boundary, and decentralized deployment so no single operator controls the TEE. In the current MVP, the TEE flow is simulated with realistic artifacts. Production deployment will use real dstack enclaves.",
    },
    {
      title: "Conditional Recall \u2014 Session Key Revocation",
      content:
        "The session key mechanism in GhostPass implements a form of brokered credential delegation, as described in the Conditional Recall research (Xyn Sun, Teleport/Flashbots). The owner delegates limited access to their credential (SBT/key) through a TEE intermediary. The 'recall condition' is time-based: when the rental period expires, the TEE automatically recalls (destroys) the delegated session key. This pattern extends beyond gaming to any scenario requiring temporary, revocable credential sharing \u2014 API keys, cloud resources, dataset access.",
    },
    {
      title: "Security Model",
      features: [
        "Non-transferable \u2014 SBTs remain in the owner\u2019s wallet at all times. Ownership never moves.",
        "Hardware isolation \u2014 The private key is encumbered inside a TEE enclave. Not even the enclave operator can extract it.",
        "Cryptographic attestation \u2014 Every session generates a verifiable MRENCLAVE + MRSIGNER proof that the correct code is running.",
        "Capability-limited \u2014 Session keys can only perform pre-approved actions. They cannot transfer tokens or exceed scope.",
        "Time-bound \u2014 Cryptographic expiry enforced at the hardware level. No manual revocation needed.",
        "Trustless \u2014 Neither lender nor renter needs to trust the other. The TEE is the escrow.",
      ],
    },
    {
      title: "Beyond Gaming \u2014 Use Cases",
      types: [
        { name: "Gaming Privileges", desc: "Rent rank access, beta passes, rare buffs from elite players", icon: "\uD83C\uDFAE" },
        { name: "API Key Sharing", desc: "Share premium API keys with collaborators \u2014 TEE enforces limits and auto-expiry", icon: "\uD83D\uDD11" },
        { name: "Cloud Credentials", desc: "Delegate cloud resources across teams with time-bound TEE sessions", icon: "\u2601\uFE0F" },
        { name: "Dataset Access", desc: "Time-bound access to proprietary datasets via encumbered keys", icon: "\uD83D\uDDC3\uFE0F" },
        { name: "Governance Rights", desc: "Temporary voting power in guilds/DAOs without transferring tokens", icon: "\uD83D\uDDF3\uFE0F" },
        { name: "Premium Tools", desc: "Teams share paid tool access without sharing passwords", icon: "\u2694\uFE0F" },
      ],
    },
    {
      title: "FAQ",
      faq: [
        {
          q: "Can the renter steal my SBT?",
          a: "No. SBTs are non-transferable by design. GhostPass only leases the utility \u2014 never the token itself. The key encumbrance ensures the owner retains full control.",
        },
        {
          q: "What happens when a session expires?",
          a: "The TEE automatically destroys the session key and releases the encumbrance. Access is revoked instantly with no manual action required.",
        },
        {
          q: "What if the TEE goes down mid-session?",
          a: "The session key was already issued and has a cryptographic expiry baked in. Even if the TEE restarts, the key self-invalidates on schedule.",
        },
        {
          q: "How does attestation work?",
          a: "The TEE generates MRENCLAVE (code measurement) and MRSIGNER (signer measurement) hashes. These prove exactly what code is running inside the enclave. Verifiers can check these proofs on-chain or off-chain.",
        },
        {
          q: "Is this real dstack integration?",
          a: "The current MVP simulates the full TEE flow with realistic artifacts (hex hashes, attestation reports, session keys). Production deployment will use real dstack enclaves on Intel SGX/TDX hardware.",
        },
        {
          q: "Which wallets are supported?",
          a: "Phantom and Solflare with auto-detection. If no wallet is installed, GhostPass runs in demo mode with simulated SOL.",
        },
        {
          q: "What research is this based on?",
          a: "Primarily the Liquefaction paper by James Austgen (Cornell/IC3), with elements of Conditional Recall (Xyn Sun, Teleport/Flashbots) for session key revocation. dstack provides the TEE infrastructure layer.",
        },
      ],
    },
  ];

  return (
    <main className="min-h-screen bg-bg-dark px-6 py-10 md:px-12 lg:px-20">
      <div className="mb-10">
        <h1 className="font-display text-3xl font-bold text-paper md:text-4xl">
          Documentation
        </h1>
        <p className="mt-2 text-sm text-highlight/60">
          Learn how GhostPass works and get started.
        </p>
      </div>

      <div className="max-w-3xl space-y-10">
        {sections.map((section) => (
          <section key={section.title} className="glass-card p-6 md:p-8">
            <h2 className="font-display text-xl font-bold text-paper mb-4">
              {section.title}
            </h2>

            {section.content && (
              <p className="text-sm leading-relaxed text-highlight/70 mb-4">
                {section.content}
              </p>
            )}

            {section.steps && (
              <div className="space-y-4">
                {section.steps.map((s) => (
                  <div key={s.step} className="flex gap-4">
                    <span className="font-mono text-2xl font-black text-highlight/10 flex-shrink-0 w-10">
                      {s.step}
                    </span>
                    <div>
                      <h3 className="text-sm font-semibold text-paper">{s.label}</h3>
                      <p className="text-sm text-highlight/60 mt-0.5">{s.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {section.features && (
              <ul className="space-y-2 mt-2">
                {section.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm text-highlight/70">
                    <span className="text-positive mt-0.5 flex-shrink-0">{"\u2713"}</span>
                    {f}
                  </li>
                ))}
              </ul>
            )}

            {section.types && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {section.types.map((t) => (
                  <div key={t.name} className="flex items-center gap-3 bg-asphalt/50 rounded-xl p-3 border border-border/50">
                    <span className="text-xl">{t.icon}</span>
                    <div>
                      <h3 className="text-sm font-semibold text-paper">{t.name}</h3>
                      <p className="text-xs text-highlight/50">{t.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {section.faq && (
              <div className="space-y-4">
                {section.faq.map((item) => (
                  <div key={item.q}>
                    <h3 className="text-sm font-semibold text-paper mb-1">{item.q}</h3>
                    <p className="text-sm text-highlight/60">{item.a}</p>
                  </div>
                ))}
              </div>
            )}
          </section>
        ))}
      </div>
    </main>
  );
}
