"use client";

import { useState } from "react";
import {
  Gamepad2,
  Send,
  Heart,
  ShieldCheck,
  Cpu,
  Sparkles,
  Download,
  BookOpen,
  Mail,
  CheckCircle2,
  ArrowUp,
  ExternalLink,
  MessageSquare,
  Code2
} from "lucide-react";

interface FooterProps {
  onOpenGuide: () => void;
  onFilterCategory?: (category: string) => void;
}

export function Footer({ onOpenGuide, onFilterCategory }: FooterProps) {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !email.includes("@")) return;
    setSubscribed(true);
    setEmail("");
    setTimeout(() => setSubscribed(false), 5000);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative mt-24 border-t border-slate-800/80 bg-slate-950 text-slate-400 overflow-hidden">
      {/* Top ambient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-24 bg-gradient-to-b from-indigo-500/10 to-transparent blur-3xl pointer-events-none" />

      {/* Main Footer Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 pb-12 border-b border-slate-800/80">
          
          {/* Brand Column (2 cols on lg) */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-500 flex items-center justify-center shadow-lg shadow-indigo-500/25">
                <Gamepad2 className="w-6 h-6 text-white" />
              </div>
              <span className="font-bold text-xl tracking-tight bg-gradient-to-r from-white via-slate-100 to-indigo-200 bg-clip-text text-transparent">
                PlayCover Hub
              </span>
            </div>

            <p className="text-sm text-slate-400 max-w-sm leading-relaxed">
              Apple Silicon Mac (M1, M2, M3, M4) kompyuterlarida eng sara iOS o'yinlarini to'liq emulyatorsiz, 120 FPS va qulay klaviatura-sichqoncha bilan o'ynash uchun yagona portal.
            </p>

            {/* Badges */}
            <div className="flex flex-wrap gap-2 pt-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-900 border border-slate-800 text-xs text-slate-300">
                <Cpu className="w-3.5 h-3.5 text-indigo-400" />
                Apple Silicon (ARM64)
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-900 border border-slate-800 text-xs text-slate-300">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                Xavfsiz & Bepul
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-900 border border-slate-800 text-xs text-slate-300">
                <Sparkles className="w-3.5 h-3.5 text-purple-400" />
                120 FPS qo'llab-quvvatlash
              </span>
            </div>
          </div>

          {/* Quick Links Column */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Tezkor havolalar
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button
                  onClick={onOpenGuide}
                  className="hover:text-indigo-400 transition flex items-center gap-1.5 cursor-pointer text-left"
                >
                  <BookOpen className="w-4 h-4 text-slate-500" />
                  O'rnatish qo'llanmasi
                </button>
              </li>
              <li>
                <a
                  href="https://playcover.io"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-indigo-400 transition flex items-center gap-1.5"
                >
                  <Download className="w-4 h-4 text-slate-500" />
                  PlayCover App yuklab olish
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/PlayCover/PlayCover"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-indigo-400 transition flex items-center gap-1.5"
                >
                  <Code2 className="w-4 h-4 text-slate-500" />
                  GitHub Ochiq kodi
                </a>
              </li>
              <li>
                <a
                  href="https://discord.gg/playcover"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-indigo-400 transition flex items-center gap-1.5"
                >
                  <MessageSquare className="w-4 h-4 text-slate-500" />
                  PlayCover Discord
                </a>
              </li>
            </ul>
          </div>

          {/* Categories Column */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Mashhur janrlar
            </h4>
            <ul className="space-y-2 text-sm">
              {["Action", "RPG", "Shooter", "Racing", "Strategy", "Sports"].map((cat) => (
                <li key={cat}>
                  <button
                    onClick={() => {
                      if (onFilterCategory) onFilterCategory(cat);
                      scrollToTop();
                    }}
                    className="hover:text-white text-slate-400 transition cursor-pointer"
                  >
                    {cat} o'yinlari
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter / Updates Column */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Yangilanishlar
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed mb-3">
              Yangi o'yinlar, versiyalar va tayyor Keymapping sozlamalari haqida birinchilardan bo'lib xabardor bo'ling.
            </p>

            <form onSubmit={handleSubscribe} className="space-y-2">
              <div className="relative">
                <Mail className="w-4 h-4 absolute left-3 top-3 text-slate-500" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email manzilingiz..."
                  className="w-full pl-9 pr-3 py-2 text-xs rounded-xl bg-slate-900 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 transition"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-md shadow-indigo-600/20 transition cursor-pointer active:scale-98"
              >
                <Send className="w-3.5 h-3.5" />
                Obuna bo'lish
              </button>
            </form>

            {subscribed && (
              <div className="mt-2 text-[11px] text-emerald-400 flex items-center gap-1 animate-in fade-in">
                <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                Rahmat! Obuna muvaffaqiyatli qabul qilindi.
              </div>
            )}
          </div>
        </div>

        {/* Bottom Bar: Copyright & Back to top */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex items-center gap-1 text-center sm:text-left">
            <span>PlayCover Hub © 2026. Sevgi bilan tayyorlandi</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 inline-block mx-0.5" />
            <span>macOS o'yinchilari uchun.</span>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-[11px] text-slate-600 hidden sm:inline">
              PlayCover rasmiy ochiq manbali loyihadir va Apple Inc. bilan bog'lanmagan.
            </span>
            <button
              onClick={scrollToTop}
              className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:border-slate-700 transition cursor-pointer text-xs"
              title="Sahifa boshiga qaytish"
            >
              <ArrowUp className="w-3.5 h-3.5" />
              Tepaga
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
