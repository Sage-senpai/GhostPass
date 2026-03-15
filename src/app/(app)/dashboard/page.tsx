"use client";

import { privileges, activeSessions, userStats } from "@/lib/mock-data";
import type { Privilege, Session } from "@/lib/types";
import CountdownTimer from "@/components/ui/CountdownTimer";

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

export default function DashboardPage() {
  const userPrivileges = privileges.slice(0, 3);

  const stats = [
    { label: "Total Privileges", value: userStats.totalPrivileges },
    { label: "Active Rentals", value: userStats.activeRentals },
    {
      label: "Revenue Earned",
      value: `${userStats.revenueEarned} ${userStats.currency}`,
    },
  ];

  return (
    <main className="min-h-screen bg-bg-dark px-6 py-10 md:px-12 lg:px-20">
      {/* Header */}
      <div className="mb-10">
        <h1 className="font-display text-3xl font-bold text-paper md:text-4xl">
          Dashboard
        </h1>
        <p className="mt-2 text-sm text-highlight/60">
          Manage your privileges, track rentals, and monitor earnings.
        </p>
      </div>

      {/* Stats Overview */}
      <section className="mb-12 grid grid-cols-1 gap-4 sm:grid-cols-3">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="glass-card flex flex-col gap-1 p-6"
          >
            <span className="text-xs font-medium uppercase tracking-widest text-highlight/50">
              {stat.label}
            </span>
            <span className="stat-value font-mono">
              {stat.value}
            </span>
          </div>
        ))}
      </section>

      {/* Your Privileges */}
      <section className="mb-12">
        <h2 className="font-display mb-5 text-xl font-semibold text-paper">
          Your Privileges
        </h2>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {userPrivileges.map((priv) => (
            <div
              key={priv.id}
              className="glass-card glass-card-hover flex flex-col gap-4 p-6"
            >
              <div className="flex flex-wrap items-center gap-2">
                <span
                  className={`badge inline-flex items-center rounded-full px-3 py-0.5 text-xs font-medium ${typeColors[priv.type]}`}
                >
                  {priv.type}
                </span>
                <span
                  className={`badge inline-flex items-center rounded-full px-3 py-0.5 text-xs font-medium capitalize ${rarityColors[priv.rarity]}`}
                >
                  {priv.rarity}
                </span>
              </div>

              <div>
                <h3 className="font-display text-lg font-semibold text-paper">
                  {priv.name}
                </h3>
                <p className="mt-0.5 text-xs text-highlight/50">{priv.game}</p>
              </div>

              <p className="text-sm leading-relaxed text-highlight/70">
                {priv.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Active Sessions */}
      <section>
        <h2 className="font-display mb-5 text-xl font-semibold text-paper">
          Active Sessions
        </h2>

        {activeSessions.length === 0 ? (
          <p className="text-sm text-highlight/50">No active sessions.</p>
        ) : (
          <div className="flex flex-col gap-3">
            {activeSessions.map((session: Session) => (
              <div
                key={session.id}
                className="glass-card flex flex-col items-start justify-between gap-4 p-5 sm:flex-row sm:items-center"
              >
                <div className="flex flex-col gap-1">
                  <h3 className="font-display text-base font-semibold text-paper">
                    {session.privilege.name}
                  </h3>
                  <p className="text-xs text-highlight/50">
                    {session.privilege.game}
                  </p>
                </div>

                <div className="flex flex-col items-start gap-1 sm:items-center">
                  <span className="text-[11px] uppercase tracking-wider text-highlight/40">
                    {session.lender === "You" ? "Rented to" : "Rented from"}
                  </span>
                  <span className="text-sm font-medium text-paper">
                    {session.lender === "You" ? session.renter : session.lender}
                  </span>
                </div>

                <div className="flex items-center gap-5">
                  <div className="flex flex-col items-end gap-0.5">
                    <span className="text-[11px] uppercase tracking-wider text-highlight/40">
                      Remaining
                    </span>
                    <CountdownTimer
                      initialMs={session.timeRemainingMs}
                      className="text-sm"
                    />
                  </div>
                  <div className="flex flex-col items-end gap-0.5">
                    <span className="text-[11px] uppercase tracking-wider text-highlight/40">
                      Price
                    </span>
                    <span className="font-mono text-sm font-semibold text-paper">
                      {session.price} {session.currency}
                    </span>
                  </div>
                  <span className="badge badge-active text-xs">Active</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
