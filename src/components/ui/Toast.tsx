"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  type ReactNode,
} from "react";

type ToastType = "success" | "error" | "info";

interface Toast {
  id: number;
  message: string;
  type: ToastType;
}

interface ToastContextType {
  toast: (message: string, type?: ToastType) => void;
}

const ToastContext = createContext<ToastContextType | null>(null);

let toastId = 0;

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = useCallback((message: string, type: ToastType = "info") => {
    const id = ++toastId;
    setToasts((prev) => [...prev, { id, message, type }]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3500);
  }, []);

  const dismiss = useCallback((id: number) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const typeStyles: Record<ToastType, string> = {
    success:
      "border-positive/40 bg-positive/10 text-positive",
    error:
      "border-alert/40 bg-alert/10 text-alert",
    info: "border-highlight/30 bg-card/80 text-paper",
  };

  const icons: Record<ToastType, string> = {
    success: "\u2713",
    error: "\u2717",
    info: "\u24D8",
  };

  return (
    <ToastContext.Provider value={{ toast: addToast }}>
      {children}

      {/* Toast container */}
      <div className="fixed bottom-6 right-6 z-[100] flex flex-col gap-2 pointer-events-none md:bottom-8 md:right-8">
        {toasts.map((t) => (
          <div
            key={t.id}
            className={`pointer-events-auto flex items-center gap-3 rounded-xl border px-4 py-3 backdrop-blur-lg shadow-lg animate-slide-in min-w-[280px] max-w-[400px] ${typeStyles[t.type]}`}
            style={{
              animation: "slide-in 0.3s ease-out",
            }}
          >
            <span className="text-lg flex-shrink-0">{icons[t.type]}</span>
            <span className="text-sm font-medium flex-1">{t.message}</span>
            <button
              onClick={() => dismiss(t.id)}
              className="text-current/50 hover:text-current text-xs cursor-pointer bg-transparent border-none ml-2 flex-shrink-0"
            >
              &times;
            </button>
          </div>
        ))}
      </div>

      <style>{`
        @keyframes slide-in {
          from { transform: translateX(100%); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
      `}</style>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used within ToastProvider");
  return ctx;
}
