"use client";

import { CheckCircle2, Info, X } from "lucide-react";

export interface ToastNotification {
  id: string;
  title: string;
  message: string;
  type: "success" | "info" | "warning";
}

interface ToastProps {
  toasts: ToastNotification[];
  onDismiss: (id: string) => void;
}

export function ToastContainer({ toasts, onDismiss }: ToastProps) {
  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`pointer-events-auto p-4 rounded-xl shadow-2xl border text-sm flex items-start gap-3 backdrop-blur-md animate-in slide-in-from-bottom-3 duration-200 ${
            toast.type === "success"
              ? "bg-slate-900/95 border-emerald-500/40 text-emerald-300"
              : toast.type === "warning"
              ? "bg-slate-900/95 border-amber-500/40 text-amber-300"
              : "bg-slate-900/95 border-indigo-500/40 text-indigo-300"
          }`}
        >
          {toast.type === "success" ? (
            <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
          ) : (
            <Info className="w-5 h-5 text-indigo-400 shrink-0 mt-0.5" />
          )}
          <div className="flex-1">
            <div className="font-semibold text-white">{toast.title}</div>
            <div className="text-xs text-slate-300 mt-0.5 leading-relaxed">{toast.message}</div>
          </div>
          <button
            onClick={() => onDismiss(toast.id)}
            className="text-slate-400 hover:text-white cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ))}
    </div>
  );
}
