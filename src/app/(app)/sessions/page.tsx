import { activeSessions } from "@/lib/mock-data";

function formatTimeRemaining(ms: number): string {
  const totalMinutes = Math.floor(ms / 60_000);
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  if (hours > 0) return `${hours}h ${minutes}m`;
  return `${minutes}m`;
}

export default function SessionsPage() {
  return (
    <main className="min-h-screen bg-bg-dark px-6 py-12 md:px-16">
      <h1 className="font-display text-3xl font-bold text-paper mb-8">
        Active Sessions
      </h1>

      <div className="grid gap-6 sm:grid-cols-2">
        {activeSessions.map((session) => (
          <div
            key={session.id}
            className="glass-card p-6 flex flex-col gap-4"
          >
            {/* Header row */}
            <div className="flex items-start justify-between gap-3">
              <h2 className="font-display text-lg font-semibold text-paper leading-tight">
                {session.privilege.name}
              </h2>
              <span
                className={
                  session.status === "active" ? "badge badge-active" : "badge badge-alert"
                }
              >
                {session.status === "active" ? "Active" : "Expired"}
              </span>
            </div>

            {/* Details */}
            <div className="grid grid-cols-2 gap-y-3 text-sm">
              <div>
                <span className="block text-xs uppercase tracking-wider text-highlight/50 font-mono mb-1">
                  Renter
                </span>
                <span className="text-paper">{session.renter}</span>
              </div>
              <div>
                <span className="block text-xs uppercase tracking-wider text-highlight/50 font-mono mb-1">
                  Lender
                </span>
                <span className="text-paper">{session.lender}</span>
              </div>
              <div>
                <span className="block text-xs uppercase tracking-wider text-highlight/50 font-mono mb-1">
                  Time Remaining
                </span>
                <span className="text-paper font-mono text-base font-semibold">
                  {formatTimeRemaining(session.timeRemainingMs)}
                </span>
              </div>
              <div>
                <span className="block text-xs uppercase tracking-wider text-highlight/50 font-mono mb-1">
                  Price
                </span>
                <span className="text-paper font-mono">
                  {session.price} {session.currency}
                </span>
              </div>
            </div>

            {/* Game + type badge */}
            <div className="flex items-center gap-2 text-sm text-highlight/70">
              <span className="uppercase tracking-wider text-xs font-mono bg-asphalt px-2 py-0.5 rounded">
                {session.privilege.type}
              </span>
              <span>{session.privilege.game}</span>
            </div>

            {/* Actions */}
            <div className="flex gap-3 mt-auto pt-2 border-t border-border">
              <button className="btn-secondary flex-1 text-sm">
                End Session
              </button>
              <button className="btn-primary flex-1 text-sm">
                Extend Rental
              </button>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
