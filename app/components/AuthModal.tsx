"use client";

import { useState } from "react";
import { X, Mail, Lock, User, LogIn, UserPlus, CheckCircle2, Sparkles, Shield } from "lucide-react";

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: string;
}

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (user: AuthUser, message: string) => void;
}

export function AuthModal({ isOpen, onClose, onSuccess }: AuthModalProps) {
  const [mode, setMode] = useState<"login" | "register">("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await fetch("/api/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: mode,
          name: mode === "register" ? name : undefined,
          email,
          password,
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        setError(data.error || "Xatolik yuz berdi");
        setLoading(false);
        return;
      }

      onSuccess(data.user, data.message);
      onClose();
      // Reset form
      setName("");
      setEmail("");
      setPassword("");
    } catch (err) {
      setError("Server bilan aloqa uzildi, qayta urinib ko'ring.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl overflow-hidden">
        {/* Ambient Top Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-24 bg-gradient-to-b from-indigo-500/20 to-transparent blur-2xl pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="text-center mb-6 relative z-10">
          <div className="w-12 h-12 rounded-2xl bg-indigo-600/10 border border-indigo-500/30 text-indigo-400 flex items-center justify-center mx-auto mb-3 shadow-lg shadow-indigo-600/10">
            {mode === "login" ? <LogIn className="w-6 h-6" /> : <UserPlus className="w-6 h-6" />}
          </div>
          <h3 className="text-2xl font-bold text-white">
            {mode === "login" ? "Tizimga kirish" : "Ro'yxatdan o'tish"}
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            {mode === "login"
              ? "Profilga kiring va shaxsiy o'yinlar ro'yxatini boshqaring"
              : "PlayCover hamjamiyatiga qo'shiling va barcha imkoniyatlardan foydalaning"}
          </p>
        </div>

        {/* Error Notice */}
        {error && (
          <div className="mb-4 p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-xs text-rose-300 flex items-center gap-2 animate-in fade-in">
            <Shield className="w-4 h-4 text-rose-400 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-3.5 relative z-10">
          {mode === "register" && (
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Ismingiz yoki Taxallus</label>
              <div className="relative">
                <User className="w-4 h-4 absolute left-3.5 top-3 text-slate-500" />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Masalan: Sardor"
                  className="w-full pl-10 pr-3 py-2.5 text-xs rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 transition"
                  required
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">Email manzil</label>
            <div className="relative">
              <Mail className="w-4 h-4 absolute left-3.5 top-3 text-slate-500" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="foydalanuvchi@gmail.com"
                className="w-full pl-10 pr-3 py-2.5 text-xs rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 transition"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">Parol</label>
            <div className="relative">
              <Lock className="w-4 h-4 absolute left-3.5 top-3 text-slate-500" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-10 pr-3 py-2.5 text-xs rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 transition"
                required
              />
            </div>
            {mode === "register" && (
              <span className="text-[10px] text-slate-500 mt-1 block">Kamida 6 ta belgi</span>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-2 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:bg-indigo-800 text-white text-xs font-semibold shadow-lg shadow-indigo-600/30 transition cursor-pointer active:scale-98"
          >
            {loading ? (
              <span className="animate-pulse">Tekshirilmoqda...</span>
            ) : mode === "login" ? (
              <>
                <LogIn className="w-4 h-4" />
                Kirish
              </>
            ) : (
              <>
                <UserPlus className="w-4 h-4" />
                Ro'yxatdan o'tish
              </>
            )}
          </button>
        </form>

        {/* Switch mode */}
        <div className="mt-5 pt-4 border-t border-slate-800/80 text-center text-xs text-slate-400">
          {mode === "login" ? (
            <p>
              Hisobingiz yo'qmi?{" "}
              <button
                type="button"
                onClick={() => {
                  setMode("register");
                  setError(null);
                }}
                className="text-indigo-400 hover:text-indigo-300 font-semibold cursor-pointer underline underline-offset-2 ml-1"
              >
                Ro'yxatdan o'ting
              </button>
            </p>
          ) : (
            <p>
              Allaqachon profilingiz bormi?{" "}
              <button
                type="button"
                onClick={() => {
                  setMode("login");
                  setError(null);
                }}
                className="text-indigo-400 hover:text-indigo-300 font-semibold cursor-pointer underline underline-offset-2 ml-1"
              >
                Kirish
              </button>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
