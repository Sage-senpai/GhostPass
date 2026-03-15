"use client";

import { useState } from "react";
import { privileges } from "@/lib/mock-data";

const myPrivileges = privileges.slice(0, 3);

const rarityBadge: Record<string, string> = {
  legendary: "badge badge-alert",
  epic: "badge badge-neutral",
  rare: "badge badge-active",
  common: "badge badge-neutral",
};

const rarityLabel: Record<string, string> = {
  legendary: "Legendary",
  epic: "Epic",
  rare: "Rare",
  common: "Common",
};

export default function PrivilegesPage() {
  const [listingId, setListingId] = useState<string | null>(null);
  const [duration, setDuration] = useState<"1h" | "3h" | "24h">("3h");
  const [price, setPrice] = useState("");

  return (
    <main className="min-h-screen bg-bg-dark px-6 py-12 md:px-16">
      <h1 className="font-display text-3xl font-bold text-paper mb-8">
        My Privileges
      </h1>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {myPrivileges.map((priv) => (
          <div
            key={priv.id}
            className="glass-card glass-card-hover p-6 flex flex-col gap-4"
          >
            {/* Header */}
            <div className="flex items-start justify-between gap-3">
              <h2 className="font-display text-lg font-semibold text-paper leading-tight">
                {priv.name}
              </h2>
              <span className={rarityBadge[priv.rarity]}>
                {rarityLabel[priv.rarity]}
              </span>
            </div>

            {/* Meta */}
            <div className="flex items-center gap-2 text-sm text-highlight/70">
              <span className="uppercase tracking-wider text-xs font-mono bg-asphalt px-2 py-0.5 rounded">
                {priv.type}
              </span>
              <span>{priv.game}</span>
            </div>

            {/* Description */}
            <p className="text-sm text-highlight/60 leading-relaxed">
              {priv.description}
            </p>

            {/* Actions */}
            {listingId === priv.id ? (
              <div className="mt-auto flex flex-col gap-3 border-t border-border pt-4">
                {/* Duration selector */}
                <label className="text-xs uppercase tracking-wider text-highlight/50 font-mono">
                  Duration
                </label>
                <div className="flex gap-2">
                  {(["1h", "3h", "24h"] as const).map((d) => (
                    <button
                      key={d}
                      onClick={() => setDuration(d)}
                      className={`flex-1 py-2 rounded-lg text-sm font-mono font-medium transition-colors ${
                        duration === d
                          ? "bg-paper text-bg-dark"
                          : "bg-asphalt text-highlight/70 hover:bg-card-hover"
                      }`}
                    >
                      {d}
                    </button>
                  ))}
                </div>

                {/* Price input */}
                <label className="text-xs uppercase tracking-wider text-highlight/50 font-mono">
                  Price (SOL)
                </label>
                <div className="flex items-center gap-2 bg-asphalt rounded-lg border border-border focus-within:border-highlight/50 transition-colors">
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    placeholder="0.00"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    className="w-full bg-transparent px-4 py-2.5 text-paper font-mono text-sm outline-none placeholder:text-highlight/30"
                  />
                  <span className="pr-4 text-xs text-highlight/50 font-mono">
                    SOL
                  </span>
                </div>

                {/* Submit / Cancel */}
                <button className="btn-primary w-full mt-1">
                  Activate Secure Session
                </button>
                <button
                  onClick={() => {
                    setListingId(null);
                    setPrice("");
                    setDuration("3h");
                  }}
                  className="btn-secondary w-full text-sm"
                >
                  Cancel
                </button>
              </div>
            ) : (
              <button
                onClick={() => setListingId(priv.id)}
                className="btn-secondary mt-auto w-full"
              >
                List for Rent
              </button>
            )}
          </div>
        ))}
      </div>
    </main>
  );
}
