"use client";

import { useWallet } from "@/context/WalletContext";
import { useToast } from "@/components/ui/Toast";

export default function SettingsPage() {
  const { wallet } = useWallet();
  const { toast } = useToast();

  return (
    <main className="min-h-screen bg-bg-dark px-6 py-10 md:px-12 lg:px-20">
      <div className="mb-10">
        <h1 className="font-display text-3xl font-bold text-paper md:text-4xl">
          Settings
        </h1>
        <p className="mt-2 text-sm text-highlight/60">
          Configure your GhostPass preferences.
        </p>
      </div>

      <div className="max-w-2xl space-y-6">
        {/* Profile */}
        <section className="glass-card p-6">
          <h2 className="font-display text-lg font-semibold text-paper mb-4">
            Profile
          </h2>
          <div className="space-y-4">
            <div>
              <label className="block text-xs uppercase tracking-wider text-highlight/50 font-mono mb-1.5">
                Wallet Address
              </label>
              <div className="flex items-center gap-3">
                <span className="font-mono text-sm text-paper bg-asphalt px-4 py-2.5 rounded-xl flex-1 border border-border">
                  {wallet.connected ? wallet.address : "Not connected"}
                </span>
                {wallet.connected && (
                  <button
                    className="btn-secondary text-sm !py-2.5"
                    onClick={() => toast("Address copied to clipboard", "success")}
                  >
                    Copy
                  </button>
                )}
              </div>
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider text-highlight/50 font-mono mb-1.5">
                Display Name
              </label>
              <input
                type="text"
                placeholder="Anonymous Player"
                className="w-full bg-asphalt border border-border rounded-xl px-4 py-2.5 text-sm text-paper placeholder-highlight/30 outline-none focus:border-highlight/40 transition-colors"
              />
            </div>
          </div>
        </section>

        {/* Notifications */}
        <section className="glass-card p-6">
          <h2 className="font-display text-lg font-semibold text-paper mb-4">
            Notifications
          </h2>
          <div className="space-y-3">
            {[
              { label: "Session expiry alerts", description: "Get notified before sessions expire" },
              { label: "Rental requests", description: "Receive alerts when someone rents your privileges" },
              { label: "Price change alerts", description: "Track marketplace price changes" },
            ].map((item) => (
              <div key={item.label} className="flex items-center justify-between py-2">
                <div>
                  <p className="text-sm font-medium text-paper">{item.label}</p>
                  <p className="text-xs text-highlight/50">{item.description}</p>
                </div>
                <button
                  className="relative w-11 h-6 rounded-full bg-border transition-colors cursor-pointer border-none"
                  onClick={(e) => {
                    const btn = e.currentTarget;
                    btn.classList.toggle("bg-positive");
                    btn.classList.toggle("bg-border");
                    const dot = btn.querySelector("span");
                    dot?.classList.toggle("translate-x-5");
                    toast("Setting updated", "success");
                  }}
                >
                  <span className="absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-paper transition-transform" />
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* Rental Preferences */}
        <section className="glass-card p-6">
          <h2 className="font-display text-lg font-semibold text-paper mb-4">
            Rental Preferences
          </h2>
          <div className="space-y-4">
            <div>
              <label className="block text-xs uppercase tracking-wider text-highlight/50 font-mono mb-1.5">
                Default Rental Duration
              </label>
              <select className="w-full bg-asphalt border border-border rounded-xl px-4 py-2.5 text-sm text-paper outline-none focus:border-highlight/40 transition-colors cursor-pointer appearance-none">
                <option>1 hour</option>
                <option>3 hours</option>
                <option>24 hours</option>
              </select>
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider text-highlight/50 font-mono mb-1.5">
                Auto-extend Sessions
              </label>
              <select className="w-full bg-asphalt border border-border rounded-xl px-4 py-2.5 text-sm text-paper outline-none focus:border-highlight/40 transition-colors cursor-pointer appearance-none">
                <option>Disabled</option>
                <option>If balance allows</option>
                <option>Always</option>
              </select>
            </div>
          </div>
        </section>

        {/* Save */}
        <button
          className="btn-primary w-full text-center"
          onClick={() => toast("Settings saved successfully", "success")}
        >
          Save Changes
        </button>
      </div>
    </main>
  );
}
