/**
 * TEE Simulation Engine
 *
 * Simulates the Liquefaction protocol's TEE-based key encumbrance flow.
 * Based on James Austgen's research at Cornell/IC3.
 *
 * Flow: SBT Detection → Key Encumbrance → Attestation → Session Key → Time-Bound Access
 */

export interface TEEAttestation {
  enclaveId: string;
  timestamp: string;
  mrEnclave: string; // Measurement of enclave code
  mrSigner: string; // Measurement of signer
  reportData: string; // Custom data in attestation
  isvProdId: number;
  isvSvn: number;
  status: "verified" | "pending" | "failed";
}

export interface SessionKey {
  id: string;
  publicKey: string;
  capabilities: string[];
  issuedAt: string;
  expiresAt: string;
  privilegeId: string;
  privilegeName: string;
  encumbranceProof: string;
  status: "active" | "expired" | "revoked";
}

export interface EncumbranceRecord {
  id: string;
  ownerWallet: string;
  sbtTokenId: string;
  privilegeId: string;
  encumbranceHash: string;
  teeEnclaveId: string;
  createdAt: string;
  expiresAt: string;
  status: "locked" | "released";
}

export interface TEEEnclaveStatus {
  enclaveId: string;
  platform: "dstack" | "sgx" | "tdx";
  status: "running" | "attesting" | "sealed" | "terminated";
  uptime: number;
  sessionsActive: number;
  sessionsTotal: number;
  lastAttestation: string;
  securityLevel: "hardware" | "simulated";
}

// Deterministic random hex generator (seeded by input)
function generateHex(length: number, seed: string): string {
  const chars = "0123456789abcdef";
  let result = "";
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = ((hash << 5) - hash + seed.charCodeAt(i)) | 0;
  }
  for (let i = 0; i < length; i++) {
    hash = ((hash << 5) - hash + i) | 0;
    result += chars[Math.abs(hash) % 16];
  }
  return result;
}

function generateId(prefix: string): string {
  return `${prefix}-${generateHex(8, prefix + Date.now().toString())}`;
}

// --- Simulated TEE Operations ---

export function simulateEnclaveInit(): TEEEnclaveStatus {
  return {
    enclaveId: `dstack-enclave-${generateHex(6, "enclave")}`,
    platform: "dstack",
    status: "running",
    uptime: 99.97,
    sessionsActive: 2,
    sessionsTotal: 47,
    lastAttestation: new Date().toISOString(),
    securityLevel: "simulated",
  };
}

export function simulateAttestation(enclaveId: string): TEEAttestation {
  return {
    enclaveId,
    timestamp: new Date().toISOString(),
    mrEnclave: generateHex(64, "mrEnclave-" + enclaveId),
    mrSigner: generateHex(64, "mrSigner-" + enclaveId),
    reportData: generateHex(128, "report-" + enclaveId),
    isvProdId: 1,
    isvSvn: 1,
    status: "verified",
  };
}

export function simulateKeyEncumbrance(
  ownerWallet: string,
  privilegeId: string,
  durationMs: number
): EncumbranceRecord {
  const now = new Date();
  return {
    id: generateId("enc"),
    ownerWallet,
    sbtTokenId: `sbt-${generateHex(8, ownerWallet + privilegeId)}`,
    privilegeId,
    encumbranceHash: generateHex(64, "encumbrance-" + privilegeId + ownerWallet),
    teeEnclaveId: `dstack-enclave-${generateHex(6, "enclave")}`,
    createdAt: now.toISOString(),
    expiresAt: new Date(now.getTime() + durationMs).toISOString(),
    status: "locked",
  };
}

export function simulateSessionKeyGeneration(
  privilegeId: string,
  privilegeName: string,
  capabilities: string[],
  durationMs: number
): SessionKey {
  const now = new Date();
  return {
    id: generateId("sk"),
    publicKey: generateHex(64, "sessionKey-" + privilegeId),
    capabilities,
    issuedAt: now.toISOString(),
    expiresAt: new Date(now.getTime() + durationMs).toISOString(),
    privilegeId,
    privilegeName,
    encumbranceProof: generateHex(128, "proof-" + privilegeId),
    status: "active",
  };
}

// --- Rental Flow Steps ---

export type RentalStep =
  | "idle"
  | "detecting-sbt"
  | "verifying-ownership"
  | "initializing-tee"
  | "generating-attestation"
  | "encumbering-key"
  | "generating-session-key"
  | "verifying-session"
  | "complete"
  | "error";

export interface RentalFlowState {
  step: RentalStep;
  progress: number; // 0-100
  attestation: TEEAttestation | null;
  encumbrance: EncumbranceRecord | null;
  sessionKey: SessionKey | null;
  error: string | null;
}

export const RENTAL_STEPS: { step: RentalStep; label: string; description: string; durationMs: number }[] = [
  {
    step: "detecting-sbt",
    label: "Detecting SBT",
    description: "Scanning wallet for soulbound token ownership",
    durationMs: 800,
  },
  {
    step: "verifying-ownership",
    label: "Verifying Ownership",
    description: "Confirming SBT is non-transferable and valid",
    durationMs: 600,
  },
  {
    step: "initializing-tee",
    label: "Initializing TEE Enclave",
    description: "Booting dstack secure enclave for key encumbrance",
    durationMs: 1200,
  },
  {
    step: "generating-attestation",
    label: "Generating Attestation",
    description: "Creating TEE attestation proof for session integrity",
    durationMs: 1000,
  },
  {
    step: "encumbering-key",
    label: "Encumbering Key",
    description: "Locking private key inside TEE with time-bound restrictions",
    durationMs: 1500,
  },
  {
    step: "generating-session-key",
    label: "Generating Session Key",
    description: "Issuing capability-limited session credential",
    durationMs: 800,
  },
  {
    step: "verifying-session",
    label: "Verifying Session",
    description: "Confirming session key is valid and time-bound",
    durationMs: 500,
  },
];

// Pre-generated mock data for TEE dashboard
export const mockAttestationLogs: TEEAttestation[] = [
  {
    enclaveId: "dstack-enclave-7a3f21",
    timestamp: "2026-03-15T10:30:00Z",
    mrEnclave: "a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2",
    mrSigner: "f6e5d4c3b2a1f6e5d4c3b2a1f6e5d4c3b2a1f6e5d4c3b2a1f6e5d4c3b2a1f6e5",
    reportData: generateHex(128, "report-log-1"),
    isvProdId: 1,
    isvSvn: 1,
    status: "verified",
  },
  {
    enclaveId: "dstack-enclave-7a3f21",
    timestamp: "2026-03-15T09:15:00Z",
    mrEnclave: "a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2",
    mrSigner: "f6e5d4c3b2a1f6e5d4c3b2a1f6e5d4c3b2a1f6e5d4c3b2a1f6e5d4c3b2a1f6e5",
    reportData: generateHex(128, "report-log-2"),
    isvProdId: 1,
    isvSvn: 1,
    status: "verified",
  },
  {
    enclaveId: "dstack-enclave-7a3f21",
    timestamp: "2026-03-15T08:00:00Z",
    mrEnclave: "a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2",
    mrSigner: "f6e5d4c3b2a1f6e5d4c3b2a1f6e5d4c3b2a1f6e5d4c3b2a1f6e5d4c3b2a1f6e5",
    reportData: generateHex(128, "report-log-3"),
    isvProdId: 1,
    isvSvn: 1,
    status: "verified",
  },
];

export const mockSessionKeys: SessionKey[] = [
  {
    id: "sk-a1b2c3d4",
    publicKey: "7Kp4xR9mVqNfW2jL8bHc3YtAs6DgE5Fz1UoP0iMnQ4rS",
    capabilities: ["raid_access", "matchmaking_elite"],
    issuedAt: "2026-03-15T10:00:00Z",
    expiresAt: "2026-03-15T13:00:00Z",
    privilegeId: "priv-4",
    privilegeName: "Raid Entry Key",
    encumbranceProof: generateHex(128, "proof-active-1"),
    status: "active",
  },
  {
    id: "sk-e5f6g7h8",
    publicKey: "3NqTv8WxYz2KmD5rJ7cFhG6bA4sE1PuL9iOoR0tUwVXy",
    capabilities: ["rank_elite", "tournament_entry"],
    issuedAt: "2026-03-15T09:00:00Z",
    expiresAt: "2026-03-15T12:00:00Z",
    privilegeId: "priv-1",
    privilegeName: "Elite Rank Badge",
    encumbranceProof: generateHex(128, "proof-active-2"),
    status: "active",
  },
];

export const mockEncumbrances: EncumbranceRecord[] = [
  {
    id: "enc-x1y2z3",
    ownerWallet: "Gh0sT...x7Kp",
    sbtTokenId: "sbt-9f8e7d6c",
    privilegeId: "priv-4",
    encumbranceHash: generateHex(64, "enc-hash-1"),
    teeEnclaveId: "dstack-enclave-7a3f21",
    createdAt: "2026-03-15T10:00:00Z",
    expiresAt: "2026-03-15T13:00:00Z",
    status: "locked",
  },
  {
    id: "enc-a4b5c6",
    ownerWallet: "Gh0sT...x7Kp",
    sbtTokenId: "sbt-1a2b3c4d",
    privilegeId: "priv-1",
    encumbranceHash: generateHex(64, "enc-hash-2"),
    teeEnclaveId: "dstack-enclave-7a3f21",
    createdAt: "2026-03-15T09:00:00Z",
    expiresAt: "2026-03-15T12:00:00Z",
    status: "locked",
  },
];
