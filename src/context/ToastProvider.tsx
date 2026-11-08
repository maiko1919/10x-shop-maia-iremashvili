import { useState } from "react";
import type { ReactNode } from "react";
import { ToastContext } from "./ToastContext";
import type { ToastContextValue, ToastVariant } from "./ToastContext";

interface Toast {
  id: number;
  message: string;
  variant: ToastVariant;
}

interface ToastProviderProps {
  children: ReactNode;
}

let nextId = 1;

function ToastProvider({ children }: ToastProviderProps) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  function showToast(message: string, variant: ToastVariant = "success") {
    const id = nextId++;
    setToasts((prev) => [...prev, { id, message, variant }]);
    window.setTimeout(() => {
      setToasts((prev) => prev.filter((toast) => toast.id !== id));
    }, 2500);
  }

  const value: ToastContextValue = { showToast };

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div
        role="status"
        aria-live="polite"
        className="pointer-events-none fixed bottom-4 right-4 z-50 flex flex-col gap-2"
      >
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`animate-toast-in rounded-xl px-4 py-3 text-sm font-medium text-white shadow-lg ${
              toast.variant === "success" ? "bg-neutral-800" : "bg-red-600"
            }`}
          >
            {toast.message}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export default ToastProvider;