"use client";

import { Sparkles, Search, X } from "lucide-react";

interface HeroSectionProps {
  searchQuery: string;
  totalGames: number;
  onSearchChange: (value: string) => void;
  onFilterFps: () => void;
  onFilterController: () => void;
  onFilterVerified: () => void;
  onFilterAll: () => void;
}

export function HeroSection({
  searchQuery,
  totalGames,
  onSearchChange,
  onFilterFps,
  onFilterController,
  onFilterVerified,
  onFilterAll,
}: HeroSectionProps) {
  return (
    <section className="relative overflow-hidden border-b border-slate-800/60 bg-gradient-to-b from-slate-900 via-slate-950 to-slate-950 py-14 sm:py-18">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-900/25 via-transparent to-transparent pointer-events-none" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-medium mb-6">
          <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
          Apple Silicon Mac uchun maxsus optimallashtirilgan {totalGames} ta iOS o'yinlari
        </div>
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white max-w-4xl mx-auto leading-tight">
          Mac kompyuteringizda sevimli{" "}
          <span className="bg-gradient-to-r from-indigo-400 via-purple-300 to-pink-400 bg-clip-text text-transparent">
            iOS O'yinlarini
          </span>{" "}
          o'ynang
        </h1>
        <p className="mt-4 text-sm sm:text-base text-slate-400 max-w-2xl mx-auto">
          PlayCover orqali to'liq klaviatura va sichqoncha qo'llab-quvvatlovi, 120 FPS hamda tayyor tugmalar xaritasi (Keymapping) bilan bahramand bo'ling.
        </p>

        {/* Search bar inside Hero */}
        <div className="mt-8 max-w-xl mx-auto relative">
          <div className="relative flex items-center">
            <Search className="w-5 h-5 absolute left-4 text-slate-400" />
            <input
              type="text"
              placeholder="O'yin nomi bo'yicha qidiruv (masalan, Genshin, PUBG, Resident Evil, FIFA)..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full pl-12 pr-10 py-3.5 rounded-2xl bg-slate-900/90 border border-slate-700/80 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent shadow-xl transition text-sm"
            />
            {searchQuery && (
              <button
                onClick={() => onSearchChange("")}
                className="absolute right-4 text-slate-400 hover:text-white p-1 cursor-pointer"
                title="Qidiruvni tozalash"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Quick stats buttons */}
        <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-3xl mx-auto pt-6 border-t border-slate-800/60 text-left">
          <button
            onClick={onFilterAll}
            className="p-3 rounded-xl bg-slate-900/40 hover:bg-slate-900/80 border border-slate-800 hover:border-slate-700 transition text-left cursor-pointer"
          >
            <div className="text-xl sm:text-2xl font-bold text-white">{totalGames} O'yin</div>
            <div className="text-xs text-slate-400 mt-0.5">Apple Silicon M1-M4</div>
          </button>
          <button
            onClick={onFilterFps}
            className="p-3 rounded-xl bg-slate-900/40 hover:bg-slate-900/80 border border-slate-800 hover:border-slate-700 transition text-left cursor-pointer"
          >
            <div className="text-xl sm:text-2xl font-bold text-indigo-400">120 FPS</div>
            <div className="text-xs text-slate-400 mt-0.5">Ultra silliq grafika</div>
          </button>
          <button
            onClick={onFilterController}
            className="p-3 rounded-xl bg-slate-900/40 hover:bg-slate-900/80 border border-slate-800 hover:border-slate-700 transition text-left cursor-pointer"
          >
            <div className="text-xl sm:text-2xl font-bold text-purple-400">Geympad</div>
            <div className="text-xs text-slate-400 mt-0.5">Xbox & PS5 Controller</div>
          </button>
          <button
            onClick={onFilterVerified}
            className="p-3 rounded-xl bg-slate-900/40 hover:bg-slate-900/80 border border-slate-800 hover:border-slate-700 transition text-left cursor-pointer"
          >
            <div className="text-xl sm:text-2xl font-bold text-emerald-400">100%</div>
            <div className="text-xs text-slate-400 mt-0.5">Xavfsiz & Barqaror</div>
          </button>
        </div>
      </div>
    </section>
  );
}
