"use client";

import { useState, useEffect, useCallback } from "react";
import {
  RENTAL_STEPS,
  simulateAttestation,
  simulateKeyEncumbrance,
  simulateSessionKeyGeneration,
  type RentalFlowState,
  type RentalStep,
  type TEEAttestation,
  type EncumbranceRecord,
  type SessionKey,
} from "@/lib/tee-simulator";
import { useToast } from "@/components/ui/Toast";

interface RentalFlowModalProps {
  isOpen: boolean;
  onClose: () => void;
  privilegeName: string;
  privilegeId: string;
  privilegeType: string;
  game: string;
  price: number;
  currency: string;
  duration: string;
  durationHours: number;
  lender: string;
}

export default function RentalFlowModal({
  isOpen,
  onClose,
  privilegeName,
  privilegeId,
  privilegeType,
  game,
  price,
  currency,
  duration,
  durationHours,
  lender,
}: RentalFlowModalProps) {
  const { toast } = useToast();
  const [state, setState] = useState<RentalFlowState>({
    step: "idle",
    progress: 0,
    attestation: null,
    encumbrance: null,
    sessionKey: null,
    error: null,
  });

  const [currentStepIndex, setCurrentStepIndex] = useState(-1);

  const resetFlow = useCallback(() => {
    setState({
      step: "idle",
      progress: 0,
      attestation: null,
      encumbrance: null,
      sessionKey: null,
      error: null,
    });
    setCurrentStepIndex(-1);
  }, []);

  const runFlow = useCallback(() => {
    resetFlow();
    let stepIdx = 0;

    const runStep = () => {
      if (stepIdx >= RENTAL_STEPS.length) {
        setState((prev) => ({ ...prev, step: "complete", progress: 100 }));
        toast(`Session activated for ${privilegeName}!`, "success");
        return;
      }

      const currentStep = RENTAL_STEPS[stepIdx];
      setCurrentStepIndex(stepIdx);
      setState((prev) => ({
        ...prev,
        step: currentStep.step,
        progress: Math.round(((stepIdx + 0.5) / RENTAL_STEPS.length) * 100),
      }));

      setTimeout(() => {
        // Generate artifacts at specific steps
        if (currentStep.step === "generating-attestation") {
          const attestation = simulateAttestation("dstack-enclave-" + privilegeId.slice(0, 6));
          setState((prev) => ({ ...prev, attestation }));
        }
        if (currentStep.step === "encumbering-key") {
          const encumbrance = simulateKeyEncumbrance(
            "Gh0sT...x7Kp",
            privilegeId,
            durationHours * 3_600_000
          );
          setState((prev) => ({ ...prev, encumbrance }));
        }
        if (currentStep.step === "generating-session-key") {
          const sessionKey = simulateSessionKeyGeneration(
            privilegeId,
            privilegeName,
            [privilegeType + "_access", "time_bound"],
            durationHours * 3_600_000
          );
          setState((prev) => ({ ...prev, sessionKey }));
        }

        setState((prev) => ({
          ...prev,
          progress: Math.round(((stepIdx + 1) / RENTAL_STEPS.length) * 100),
        }));

        stepIdx++;
        runStep();
      }, currentStep.durationMs);
    };

    runStep();
  }, [privilegeId, privilegeName, privilegeType, durationHours, resetFlow, toast]);

  useEffect(() => {
    if (!isOpen) resetFlow();
  }, [isOpen, resetFlow]);

  if (!isOpen) return null;

  const isRunning = state.step !== "idle" && state.step !== "complete" && state.step !== "error";

  return (
    <div className="fixed inset-0 z-[90] flex items-center justify-center p-4 overflow-y-auto">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-bg-dark/80 backdrop-blur-sm" onClick={!isRunning ? onClose : undefined} />

      {/* Modal */}
      <div className="relative w-full max-w-2xl glass-card p-0 overflow-hidden my-auto max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="px-4 sm:px-6 py-4 sm:py-5 border-b border-border/40">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="font-display text-lg sm:text-xl font-bold text-paper">
                TEE Rental Flow
              </h2>
              <p className="text-xs text-highlight/50 mt-1 font-mono">
                Liquefaction Protocol — Key Encumbrance via dstack
              </p>
            </div>
            {!isRunning && (
              <button
                onClick={onClose}
                className="text-highlight/40 hover:text-paper transition-colors bg-transparent border-none cursor-pointer text-xl"
              >
                &times;
              </button>
            )}
          </div>
        </div>

        {/* Privilege Info */}
        <div className="px-4 sm:px-6 py-3 sm:py-4 bg-asphalt/30 border-b border-border/20">
          <div className="flex items-center justify-between flex-wrap gap-3">
            <div>
              <h3 className="text-paper font-semibold">{privilegeName}</h3>
              <p className="text-xs text-highlight/50">{game} &middot; {privilegeType}</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="font-mono text-paper font-bold">{price} {currency}</p>
                <p className="text-xs text-highlight/40">{duration}</p>
              </div>
              <div className="text-right">
                <p className="text-xs text-highlight/40">Lender</p>
                <p className="text-sm text-paper">{lender}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        {state.step !== "idle" && (
          <div className="px-4 sm:px-6 pt-3 sm:pt-4">
            <div className="h-1.5 bg-border/30 rounded-full overflow-hidden">
              <div
                className="h-full bg-positive rounded-full transition-all duration-500 ease-out"
                style={{ width: `${state.progress}%` }}
              />
            </div>
          </div>
        )}

        {/* Steps */}
        <div className="px-4 sm:px-6 py-4 sm:py-5">
          {state.step === "idle" ? (
            <div className="text-center py-6 sm:py-8">
              <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-positive/10 border border-positive/30 flex items-center justify-center">
                <svg width="32" height="32" viewBox="0 0 48 48" fill="none">
                  <path d="M24 4L6 12v12c0 11.1 7.7 21.5 18 24 10.3-2.5 18-12.9 18-24V12L24 4z" stroke="var(--color-positive)" strokeWidth="2" fill="none" />
                  <path d="M17 24l5 5 9-10" stroke="var(--color-positive)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <h3 className="font-display text-lg font-bold text-paper mb-2">
                Ready to Initiate TEE Session
              </h3>
              <p className="text-sm text-highlight/60 max-w-md mx-auto mb-6">
                This will activate the Liquefaction key encumbrance protocol via a dstack TEE enclave.
                Your payment will be held in escrow until the session is verified.
              </p>
              <button
                onClick={runFlow}
                className="btn-primary text-base !py-3 !px-10 font-bold"
              >
                Activate TEE Session &rarr;
              </button>
            </div>
          ) : (
            <div className="space-y-1.5 sm:space-y-2">
              {RENTAL_STEPS.map((step, idx) => {
                const isActive = idx === currentStepIndex;
                const isComplete = idx < currentStepIndex || state.step === "complete";
                const isPending = idx > currentStepIndex && state.step !== "complete";

                return (
                  <div
                    key={step.step}
                    className={`flex items-start gap-2.5 sm:gap-3 p-2.5 sm:p-3 rounded-xl transition-all duration-300 ${
                      isActive ? "bg-positive/5 border border-positive/20" :
                      isComplete ? "opacity-70" :
                      "opacity-30"
                    }`}
                  >
                    {/* Status icon */}
                    <div className={`w-6 h-6 sm:w-7 sm:h-7 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${
                      isComplete ? "bg-positive/20 text-positive" :
                      isActive ? "bg-positive/10 border border-positive/40" :
                      "bg-border/20 border border-border/30"
                    }`}>
                      {isComplete ? (
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                          <path d="M3 7l3 3 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      ) : isActive ? (
                        <div className="w-2.5 h-2.5 rounded-full bg-positive animate-pulse" />
                      ) : (
                        <span className="text-[10px] font-mono text-highlight/30">{String(idx + 1).padStart(2, "0")}</span>
                      )}
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <p className={`text-sm font-semibold ${isComplete || isActive ? "text-paper" : "text-highlight/40"}`}>
                        {step.label}
                      </p>
                      <p className={`text-xs mt-0.5 ${isActive ? "text-highlight/60" : "text-highlight/30"}`}>
                        {step.description}
                      </p>
                    </div>

                    {/* Timing */}
                    {isActive && (
                      <span className="text-[10px] font-mono text-positive animate-pulse flex-shrink-0">
                        processing...
                      </span>
                    )}
                    {isComplete && !isPending && (
                      <span className="text-[10px] font-mono text-positive/60 flex-shrink-0">
                        {(step.durationMs / 1000).toFixed(1)}s
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          )}

          {/* Completion state */}
          {state.step === "complete" && (
            <div className="mt-6 space-y-4">
              {/* Attestation proof */}
              {state.attestation && (
                <div className="bg-asphalt/40 rounded-xl p-4 border border-border/30">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-2 h-2 rounded-full bg-positive" />
                    <span className="text-xs font-mono text-positive font-semibold uppercase tracking-wider">
                      TEE Attestation Verified
                    </span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                    <div>
                      <span className="text-highlight/40 block">MRENCLAVE</span>
                      <span className="text-paper font-mono break-all">{state.attestation.mrEnclave.slice(0, 32)}...</span>
                    </div>
                    <div>
                      <span className="text-highlight/40 block">Enclave ID</span>
                      <span className="text-paper font-mono">{state.attestation.enclaveId}</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Session key */}
              {state.sessionKey && (
                <div className="bg-asphalt/40 rounded-xl p-4 border border-positive/20">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-2 h-2 rounded-full bg-positive animate-pulse" />
                    <span className="text-xs font-mono text-positive font-semibold uppercase tracking-wider">
                      Session Key Active
                    </span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                    <div>
                      <span className="text-highlight/40 block">Public Key</span>
                      <span className="text-paper font-mono break-all">{state.sessionKey.publicKey.slice(0, 24)}...</span>
                    </div>
                    <div>
                      <span className="text-highlight/40 block">Capabilities</span>
                      <span className="text-paper font-mono">{state.sessionKey.capabilities.join(", ")}</span>
                    </div>
                    <div>
                      <span className="text-highlight/40 block">Expires</span>
                      <span className="text-paper font-mono">{new Date(state.sessionKey.expiresAt).toLocaleString()}</span>
                    </div>
                    <div>
                      <span className="text-highlight/40 block">Encumbrance Proof</span>
                      <span className="text-paper font-mono break-all">{state.sessionKey.encumbranceProof.slice(0, 24)}...</span>
                    </div>
                  </div>
                </div>
              )}

              <button
                onClick={onClose}
                className="btn-primary w-full text-center font-bold"
              >
                Session Active — View Dashboard
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
