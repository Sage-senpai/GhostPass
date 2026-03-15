"use client";

import { useState, useEffect } from "react";

interface CountdownTimerProps {
  initialMs: number;
  className?: string;
  onExpire?: () => void;
}

export default function CountdownTimer({
  initialMs,
  className = "",
  onExpire,
}: CountdownTimerProps) {
  const [remaining, setRemaining] = useState(initialMs);

  useEffect(() => {
    if (remaining <= 0) {
      onExpire?.();
      return;
    }

    const interval = setInterval(() => {
      setRemaining((prev) => {
        const next = prev - 1000;
        if (next <= 0) {
          clearInterval(interval);
          onExpire?.();
          return 0;
        }
        return next;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [remaining <= 0, onExpire]);

  const hours = Math.floor(remaining / 3_600_000);
  const minutes = Math.floor((remaining % 3_600_000) / 60_000);
  const seconds = Math.floor((remaining % 60_000) / 1_000);

  const isLow = remaining < 600_000; // < 10 minutes

  return (
    <span
      className={`font-mono font-semibold tabular-nums ${
        isLow ? "text-alert animate-pulse" : "text-positive"
      } ${className}`}
    >
      {hours > 0 && `${hours}h `}
      {String(minutes).padStart(2, "0")}m {String(seconds).padStart(2, "0")}s
    </span>
  );
}
