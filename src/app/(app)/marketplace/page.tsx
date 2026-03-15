"use client";

import { useState, useMemo } from "react";
import {
  rentalListings,
  games,
  privilegeTypes,
  durations,
} from "@/lib/mock-data";
import type { RentalListing, Privilege } from "@/lib/types";
import { useToast } from "@/components/ui/Toast";
import RentalFlowModal from "@/components/tee/RentalFlowModal";

const rarityColors: Record<Privilege["rarity"], string> = {
  legendary: "bg-amber-500/15 text-amber-400 border border-amber-500/30",
  epic: "bg-purple-500/15 text-purple-400 border border-purple-500/30",
  rare: "bg-blue-500/15 text-blue-400 border border-blue-500/30",
  common: "bg-gray-500/15 text-gray-400 border border-gray-500/30",
};

const typeColors: Record<Privilege["type"], string> = {
  rank: "bg-highlight/10 text-highlight border border-highlight/20",
  access: "bg-positive/10 text-positive border border-positive/20",
  buff: "bg-orange-500/10 text-orange-400 border border-orange-500/20",
  governance: "bg-cyan-500/10 text-cyan-400 border border-cyan-500/20",
};

type SortOrder = "asc" | "desc" | "none";

export default function MarketplacePage() {
  const { toast } = useToast();
  const [selectedListing, setSelectedListing] = useState<RentalListing | null>(null);
  const [gameFilter, setGameFilter] = useState<string>("all");
  const [typeFilter, setTypeFilter] = useState<string>("all");
  const [durationFilter, setDurationFilter] = useState<string>("all");
  const [priceSort, setPriceSort] = useState<SortOrder>("none");

  const filteredListings = useMemo(() => {
    let results = rentalListings.filter((l) => l.isActive);

    if (gameFilter !== "all") {
      results = results.filter((l) => l.privilege.game === gameFilter);
    }
    if (typeFilter !== "all") {
      results = results.filter((l) => l.privilege.type === typeFilter);
    }
    if (durationFilter !== "all") {
      results = results.filter((l) => l.duration === durationFilter);
    }
    if (priceSort === "asc") {
      results = [...results].sort((a, b) => a.price - b.price);
    } else if (priceSort === "desc") {
      results = [...results].sort((a, b) => b.price - a.price);
    }

    return results;
  }, [gameFilter, typeFilter, durationFilter, priceSort]);

  const selectClasses =
    "appearance-none rounded-xl border border-border bg-card/80 px-4 py-2.5 text-sm text-paper outline-none transition-colors hover:border-highlight/40 focus:border-highlight focus:ring-1 focus:ring-highlight/30 cursor-pointer";

  return (
    <main className="min-h-screen bg-bg-dark px-6 py-10 md:px-12 lg:px-20">
      {/* Header */}
      <div className="mb-10">
        <h1 className="font-display text-3xl font-bold text-paper md:text-4xl">
          Marketplace
        </h1>
        <p className="mt-2 text-sm text-highlight/60">
          Browse and rent gaming privileges from other players.
        </p>
      </div>

      {/* Filter Bar */}
      <section className="glass-card mb-8 flex flex-wrap items-center gap-3 p-4">
        {/* Game filter */}
        <select
          value={gameFilter}
          onChange={(e) => setGameFilter(e.target.value)}
          className={selectClasses}
        >
          <option value="all">All Games</option>
          {games.map((g) => (
            <option key={g} value={g}>
              {g}
            </option>
          ))}
        </select>

        {/* Type filter */}
        <select
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value)}
          className={selectClasses}
        >
          <option value="all">All Types</option>
          {privilegeTypes.map((t) => (
            <option key={t} value={t} className="capitalize">
              {t.charAt(0).toUpperCase() + t.slice(1)}
            </option>
          ))}
        </select>

        {/* Duration filter */}
        <select
          value={durationFilter}
          onChange={(e) => setDurationFilter(e.target.value)}
          className={selectClasses}
        >
          <option value="all">Any Duration</option>
          {durations.map((d) => (
            <option key={d} value={d}>
              {d}
            </option>
          ))}
        </select>

        {/* Price sort */}
        <select
          value={priceSort}
          onChange={(e) => setPriceSort(e.target.value as SortOrder)}
          className={selectClasses}
        >
          <option value="none">Sort by Price</option>
          <option value="asc">Price: Low to High</option>
          <option value="desc">Price: High to Low</option>
        </select>

        {/* Reset */}
        {(gameFilter !== "all" ||
          typeFilter !== "all" ||
          durationFilter !== "all" ||
          priceSort !== "none") && (
          <button
            onClick={() => {
              setGameFilter("all");
              setTypeFilter("all");
              setDurationFilter("all");
              setPriceSort("none");
            }}
            className="ml-auto text-xs font-medium text-alert transition-colors hover:text-alert/80"
          >
            Clear Filters
          </button>
        )}
      </section>

      {/* Results count */}
      <p className="mb-5 text-xs text-highlight/50">
        {filteredListings.length} listing{filteredListings.length !== 1 && "s"}{" "}
        found
      </p>

      {/* Listings Grid */}
      {filteredListings.length === 0 ? (
        <div className="glass-card flex flex-col items-center justify-center gap-2 py-20">
          <p className="text-lg font-medium text-paper/60">
            No listings match your filters
          </p>
          <p className="text-sm text-highlight/40">
            Try adjusting your search criteria.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filteredListings.map((listing: RentalListing) => (
            <div
              key={listing.id}
              className="glass-card glass-card-hover flex flex-col gap-5 p-6"
            >
              {/* Badges row */}
              <div className="flex flex-wrap items-center gap-2">
                <span
                  className={`inline-flex items-center rounded-full px-3 py-0.5 text-xs font-medium capitalize ${typeColors[listing.privilege.type]}`}
                >
                  {listing.privilege.type}
                </span>
                <span
                  className={`inline-flex items-center rounded-full px-3 py-0.5 text-xs font-medium capitalize ${rarityColors[listing.privilege.rarity]}`}
                >
                  {listing.privilege.rarity}
                </span>
              </div>

              {/* Name & game */}
              <div>
                <h3 className="font-display text-lg font-semibold text-paper">
                  {listing.privilege.name}
                </h3>
                <p className="mt-0.5 text-xs text-highlight/50">
                  {listing.privilege.game}
                </p>
              </div>

              {/* Description */}
              <p className="flex-1 text-sm leading-relaxed text-highlight/70">
                {listing.privilege.description}
              </p>

              {/* Stats row */}
              <div className="flex items-end justify-between border-t border-border/40 pt-4">
                <div className="flex flex-col gap-1">
                  <span className="text-[11px] uppercase tracking-wider text-highlight/40">
                    Duration
                  </span>
                  <span className="font-mono text-sm font-medium text-paper">
                    {listing.duration}
                  </span>
                </div>

                <div className="flex flex-col items-center gap-1">
                  <span className="text-[11px] uppercase tracking-wider text-highlight/40">
                    Price
                  </span>
                  <span className="font-mono text-base font-bold text-paper">
                    {listing.price} {listing.currency}
                  </span>
                </div>

                <div className="flex flex-col items-end gap-1">
                  <span className="text-[11px] uppercase tracking-wider text-highlight/40">
                    Lender
                  </span>
                  <span className="text-xs font-medium text-highlight/60">
                    {listing.lender}
                  </span>
                </div>
              </div>

              {/* Rent button */}
              <button
                className="btn-primary w-full text-center"
                onClick={() => setSelectedListing(listing)}
              >
                Rent via TEE
              </button>
            </div>
          ))}
        </div>
      )}
      {/* TEE Rental Flow Modal */}
      {selectedListing && (
        <RentalFlowModal
          isOpen={!!selectedListing}
          onClose={() => {
            setSelectedListing(null);
            toast(`Session activated for ${selectedListing.privilege.name}`, "success");
          }}
          privilegeName={selectedListing.privilege.name}
          privilegeId={selectedListing.privilege.id}
          privilegeType={selectedListing.privilege.type}
          game={selectedListing.privilege.game}
          price={selectedListing.price}
          currency={selectedListing.currency}
          duration={selectedListing.duration}
          durationHours={selectedListing.durationHours}
          lender={selectedListing.lender}
        />
      )}
    </main>
  );
}
