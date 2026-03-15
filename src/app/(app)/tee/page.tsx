"use client";

import { useState } from "react";
import {
  simulateEnclaveInit,
  simulateAttestation,
  mockAttestationLogs,
  mockSessionKeys,
  mockEncumbrances,
  type TEEEnclaveStatus,
  type TEEAttestation,
} from "@/lib/tee-simulator";
import { useToast } from "@/components/ui/Toast";

export default function TEEDashboardPage() {
  const { toast } = useToast();
  const [enclave] = useState<TEEEnclaveStatus>(simulateEnclaveInit());
  const [attestations] = useState(mockAttestationLogs);
  const [sessionKeys] = useState(mockSessionKeys);
  const [encumbrances] = useState(mockEncumbrances);
  const [liveAttestation, setLiveAttestation] = useState<TEEAttestation | null>(null);

  const runAttestation = () => {
    setLiveAttestation(null);
    toast("Generating TEE attestation...", "info");
    setTimeout(() => {
      const att = simulateAttestation(enclave.enclaveId);
      setLiveAttestation(att);
      toast("Attestation verified successfully", "success");
    }, 2000);
  };

  return (
    <main className="min-h-screen bg-bg-dark px-6 py-10 md:px-12 lg:px-20">
      <div className="mb-10">
        <div className="flex items-center gap-3 mb-2">
          <h1 className="font-display text-3xl font-bold text-paper md:text-4xl">
            TEE Dashboard
          </h1>
          <span className="badge badge-active text-xs">
            <span className="w-1.5 h-1.5 rounded-full bg-positive inline-block" />
            Enclave Active
          </span>
        </div>
        <p className="text-sm text-highlight/60">
          Monitor dstack TEE enclave status, attestation proofs, and active session keys.
          <span className="text-highlight/40 ml-1 font-mono text-xs">
            Based on Liquefaction (Austgen, Cornell/IC3)
          </span>
        </p>
      </div>

      {/* Enclave Status */}
      <section className="mb-8">
        <h2 className="font-display text-lg font-semibold text-paper mb-4">
          Enclave Status
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="glass-card p-5">
            <span className="text-xs font-medium uppercase tracking-widest text-highlight/50 block mb-1">
              Enclave ID
            </span>
            <span className="font-mono text-sm text-paper">{enclave.enclaveId}</span>
          </div>
          <div className="glass-card p-5">
            <span className="text-xs font-medium uppercase tracking-widest text-highlight/50 block mb-1">
              Platform
            </span>
            <span className="font-mono text-sm text-paper uppercase">{enclave.platform}</span>
            <span className="ml-2 badge badge-active text-[10px]">{enclave.status}</span>
          </div>
          <div className="glass-card p-5">
            <span className="text-xs font-medium uppercase tracking-widest text-highlight/50 block mb-1">
              Uptime
            </span>
            <span className="stat-value !text-xl text-positive">{enclave.uptime}%</span>
          </div>
          <div className="glass-card p-5">
            <span className="text-xs font-medium uppercase tracking-widest text-highlight/50 block mb-1">
              Sessions
            </span>
            <span className="stat-value !text-xl">{enclave.sessionsActive}</span>
            <span className="text-xs text-highlight/40 ml-1">/ {enclave.sessionsTotal} total</span>
          </div>
        </div>
      </section>

      {/* Architecture Diagram */}
      <section className="mb-8">
        <h2 className="font-display text-lg font-semibold text-paper mb-4">
          Protocol Architecture
        </h2>
        <div className="glass-card p-6 overflow-x-auto">
          <div className="flex items-center justify-between gap-3 min-w-[600px]">
            {[
              { label: "User Wallet", sub: "SBT Owner", color: "text-paper", bg: "bg-card" },
              { label: "SBT Registry", sub: "On-chain", color: "text-amber-400", bg: "bg-amber-500/10" },
              { label: "Privilege Mapper", sub: "SBT \u2192 Rights", color: "text-purple-400", bg: "bg-purple-500/10" },
              { label: "Rental Marketplace", sub: "Listings + Payments", color: "text-sky-400", bg: "bg-sky-500/10" },
              { label: "TEE Session Controller", sub: "dstack Enclave", color: "text-positive", bg: "bg-positive/10" },
            ].map((node, idx, arr) => (
              <div key={node.label} className="flex items-center gap-3">
                <div className={`${node.bg} border border-border/40 rounded-xl p-4 text-center min-w-[120px]`}>
                  <p className={`text-sm font-semibold ${node.color}`}>{node.label}</p>
                  <p className="text-[10px] text-highlight/40 font-mono mt-1">{node.sub}</p>
                </div>
                {idx < arr.length - 1 && (
                  <svg width="24" height="12" viewBox="0 0 24 12" className="flex-shrink-0">
                    <path d="M0 6h18m0 0l-4-4m4 4l-4 4" stroke="var(--color-border)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Live Attestation */}
      <section className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-display text-lg font-semibold text-paper">
            TEE Attestation
          </h2>
          <button onClick={runAttestation} className="btn-secondary text-sm !py-2">
            Generate New Attestation
          </button>
        </div>

        {liveAttestation && (
          <div className="glass-card p-5 mb-4 border-positive/20">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-2 h-2 rounded-full bg-positive animate-pulse" />
              <span className="text-xs font-mono text-positive font-bold uppercase tracking-wider">
                Latest Attestation — Verified
              </span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div>
                <span className="text-highlight/40 block mb-1">MRENCLAVE (Code Measurement)</span>
                <span className="text-paper font-mono break-all bg-asphalt/50 px-3 py-2 rounded-lg block">
                  {liveAttestation.mrEnclave}
                </span>
              </div>
              <div>
                <span className="text-highlight/40 block mb-1">MRSIGNER (Signer Measurement)</span>
                <span className="text-paper font-mono break-all bg-asphalt/50 px-3 py-2 rounded-lg block">
                  {liveAttestation.mrSigner}
                </span>
              </div>
              <div className="md:col-span-2">
                <span className="text-highlight/40 block mb-1">Report Data</span>
                <span className="text-paper font-mono break-all bg-asphalt/50 px-3 py-2 rounded-lg block text-[11px]">
                  {liveAttestation.reportData}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Attestation Logs */}
        <div className="glass-card overflow-hidden">
          <div className="px-5 py-3 border-b border-border/30">
            <span className="text-xs font-mono text-highlight/50 uppercase tracking-wider">
              Attestation Log
            </span>
          </div>
          <div className="divide-y divide-border/20">
            {attestations.map((att, idx) => (
              <div key={idx} className="px-5 py-3 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`w-2 h-2 rounded-full ${att.status === "verified" ? "bg-positive" : "bg-alert"}`} />
                  <span className="text-sm text-paper">{att.enclaveId}</span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-xs font-mono text-highlight/40">
                    {new Date(att.timestamp).toLocaleString()}
                  </span>
                  <span className="badge badge-active text-[10px]">{att.status}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Active Session Keys */}
      <section className="mb-8">
        <h2 className="font-display text-lg font-semibold text-paper mb-4">
          Active Session Keys
        </h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {sessionKeys.map((sk) => (
            <div key={sk.id} className="glass-card p-5">
              <div className="flex items-center justify-between mb-3">
                <span className="font-display font-semibold text-paper">{sk.privilegeName}</span>
                <span className={`badge text-[10px] ${sk.status === "active" ? "badge-active" : "badge-alert"}`}>
                  {sk.status}
                </span>
              </div>
              <div className="space-y-2 text-xs">
                <div>
                  <span className="text-highlight/40">Public Key</span>
                  <p className="text-paper font-mono truncate">{sk.publicKey}</p>
                </div>
                <div className="flex gap-4">
                  <div>
                    <span className="text-highlight/40">Capabilities</span>
                    <p className="text-paper font-mono">{sk.capabilities.join(", ")}</p>
                  </div>
                  <div>
                    <span className="text-highlight/40">Expires</span>
                    <p className="text-paper font-mono">{new Date(sk.expiresAt).toLocaleTimeString()}</p>
                  </div>
                </div>
                <div>
                  <span className="text-highlight/40">Encumbrance Proof</span>
                  <p className="text-paper font-mono truncate text-[10px]">{sk.encumbranceProof}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Key Encumbrances */}
      <section>
        <h2 className="font-display text-lg font-semibold text-paper mb-4">
          Key Encumbrances
        </h2>
        <div className="glass-card overflow-hidden">
          <div className="px-5 py-3 border-b border-border/30 flex items-center gap-3">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <rect x="3" y="7" width="10" height="7" rx="1.5" stroke="var(--color-highlight)" strokeWidth="1.2" />
              <path d="M5 7V5a3 3 0 016 0v2" stroke="var(--color-highlight)" strokeWidth="1.2" strokeLinecap="round" />
            </svg>
            <span className="text-xs font-mono text-highlight/50 uppercase tracking-wider">
              Active Encumbrances
            </span>
          </div>
          <div className="divide-y divide-border/20">
            {encumbrances.map((enc) => (
              <div key={enc.id} className="px-5 py-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${enc.status === "locked" ? "bg-amber-400" : "bg-positive"}`} />
                    <span className="text-sm font-mono text-paper">{enc.id}</span>
                  </div>
                  <span className={`badge text-[10px] ${enc.status === "locked" ? "bg-amber-400/10 text-amber-400 border border-amber-400/30" : "badge-active"}`}>
                    {enc.status}
                  </span>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-xs">
                  <div>
                    <span className="text-highlight/40">Owner</span>
                    <p className="text-paper font-mono">{enc.ownerWallet}</p>
                  </div>
                  <div>
                    <span className="text-highlight/40">SBT Token</span>
                    <p className="text-paper font-mono">{enc.sbtTokenId}</p>
                  </div>
                  <div>
                    <span className="text-highlight/40">TEE Enclave</span>
                    <p className="text-paper font-mono">{enc.teeEnclaveId}</p>
                  </div>
                  <div>
                    <span className="text-highlight/40">Expires</span>
                    <p className="text-paper font-mono">{new Date(enc.expiresAt).toLocaleTimeString()}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
