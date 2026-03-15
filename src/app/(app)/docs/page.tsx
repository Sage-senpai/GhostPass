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
          desc: "Link your Solana wallet (Phantom, Backpack, or Solflare). GhostPass automatically scans for SBT achievements.",
        },
        {
          step: "02",
          label: "List or Browse",
          desc: "Lenders set a price and duration for their privilege. Renters browse the marketplace and filter by game, type, or rarity.",
        },
        {
          step: "03",
          label: "Rent & Play",
          desc: "Pay in SOL and receive a time-bound session enforced by the TEE. When the session expires, access is automatically revoked.",
        },
      ],
    },
    {
      title: "Security Model \u2014 Liquefaction Protocol",
      content:
        "GhostPass implements the Liquefaction key encumbrance model from IC3 research. The owner\u2019s private key is locked inside a dstack TEE enclave with time-bound restrictions. The TEE generates a capability-limited session key that can only perform pre-approved actions (e.g., enter a raid, access elite matchmaking). The original SBT never leaves the owner\u2019s wallet. When the session expires, the TEE revokes the session key and releases the encumbrance \u2014 no trust in the renter required.",
      features: [
        "Non-transferable \u2014 SBTs remain in the owner\u2019s wallet at all times",
        "Time-bound \u2014 Cryptographic expiry enforced at the hardware level",
        "Attestation proofs \u2014 Every session generates a verifiable TEE attestation",
        "Auto-revocation \u2014 Privileges revoke instantly when the timer expires",
      ],
    },
    {
      title: "Supported Privilege Types",
      types: [
        { name: "Rank", desc: "Competitive tier access (e.g., elite matchmaking)", icon: "\u2694\uFE0F" },
        { name: "Access", desc: "Entry to raids, tournaments, VIP lobbies", icon: "\uD83D\uDD11" },
        { name: "Buff", desc: "Stat boosts and ability enhancements", icon: "\u26A1" },
        { name: "Governance", desc: "Temporary voting rights in guilds/DAOs", icon: "\uD83D\uDDF3\uFE0F" },
      ],
    },
    {
      title: "FAQ",
      faq: [
        {
          q: "Can the renter steal my SBT?",
          a: "No. SBTs are non-transferable by design. GhostPass only leases the utility \u2014 never the token itself.",
        },
        {
          q: "What happens when a session expires?",
          a: "Access is immediately and automatically revoked by the TEE. No manual action is required.",
        },
        {
          q: "Which wallets are supported?",
          a: "Phantom, Backpack, and Solflare. More wallets coming soon.",
        },
        {
          q: "What games are supported?",
          a: "The MVP simulates a single game environment. Real game integrations are planned via the Connector API.",
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
