import type { Metadata } from "next";
import { activityHistory } from "@/lib/mock-data";

export const metadata: Metadata = {
  title: "Activity",
};

function formatTimestamp(iso: string): string {
  const date = new Date(iso);
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  }) +
    " " +
    date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
}

export default function ActivityPage() {
  return (
    <main className="min-h-screen bg-bg-dark px-6 py-12 md:px-16">
      <h1 className="font-display text-3xl font-bold text-paper mb-8">
        Activity
      </h1>

      <div className="flex flex-col gap-3">
        {activityHistory.map((item) => {
          const isEarned = item.direction === "earned";

          return (
            <div
              key={item.id}
              className="glass-card glass-card-hover px-6 py-4 flex items-center gap-5"
            >
              {/* Direction icon */}
              <div
                className={`flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-full ${
                  isEarned
                    ? "bg-positive/15 text-positive"
                    : "bg-alert/15 text-alert"
                }`}
              >
                {isEarned ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 17a.75.75 0 01-.75-.75V5.612L5.29 9.77a.75.75 0 01-1.08-1.04l5.25-5.5a.75.75 0 011.08 0l5.25 5.5a.75.75 0 11-1.08 1.04l-3.96-4.158V16.25A.75.75 0 0110 17z"
                      clipRule="evenodd"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 3a.75.75 0 01.75.75v10.638l3.96-4.158a.75.75 0 111.08 1.04l-5.25 5.5a.75.75 0 01-1.08 0l-5.25-5.5a.75.75 0 111.08-1.04l3.96 4.158V3.75A.75.75 0 0110 3z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}
              </div>

              {/* Privilege + game */}
              <div className="flex-1 min-w-0">
                <p className="text-paper font-medium text-sm truncate">
                  {item.privilegeName}
                </p>
                <p className="text-highlight/50 text-xs mt-0.5">
                  {item.game}
                </p>
              </div>

              {/* Counterparty */}
              <div className="hidden sm:block text-sm text-highlight/60 min-w-[110px]">
                {item.counterparty}
              </div>

              {/* Timestamp */}
              <div className="hidden md:block text-xs text-highlight/40 font-mono min-w-[130px] text-right">
                {formatTimestamp(item.timestamp)}
              </div>

              {/* Amount */}
              <div
                className={`text-right min-w-[90px] font-mono font-semibold text-sm ${
                  isEarned ? "text-positive" : "text-alert"
                }`}
              >
                {isEarned ? "+" : "-"}
                {item.amount} {item.currency}
              </div>
            </div>
          );
        })}
      </div>
    </main>
  );
}
