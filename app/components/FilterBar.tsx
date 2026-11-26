"use client";

import { ShieldCheck, Gamepad2, RotateCcw } from "lucide-react";

interface FilterBarProps {
  categories: readonly string[];
  selectedCategory: string;
  filterVerifiedOnly: boolean;
  controllerOnly: boolean;
  searchQuery: string;
  onSelectCategory: (cat: string) => void;
  onToggleVerified: () => void;
  onToggleController: () => void;
  onResetFilters: () => void;
}

export function FilterBar({
  categories,
  selectedCategory,
  filterVerifiedOnly,
  controllerOnly,
  searchQuery,
  onSelectCategory,
  onToggleVerified,
  onToggleController,
  onResetFilters,
}: FilterBarProps) {
  const isFiltered =
    filterVerifiedOnly ||
    controllerOnly ||
    searchQuery.trim().length > 0 ||
    selectedCategory !== "Barchasi";

  return (
    <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 pb-6 border-b border-slate-800">
      {/* Categories pills */}
      <div className="flex items-center gap-2 overflow-x-auto w-full lg:w-auto pb-2 lg:pb-0 scrollbar-none">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => onSelectCategory(category)}
            className={`px-4 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition cursor-pointer ${
              selectedCategory === category
                ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/30 scale-105"
                : "bg-slate-900 text-slate-400 hover:text-white border border-slate-800 hover:border-slate-700"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Toggles */}
      <div className="flex flex-wrap items-center gap-2.5">
        <button
          onClick={onToggleVerified}
          className={`flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg border transition cursor-pointer ${
            filterVerifiedOnly
              ? "bg-emerald-500/10 border-emerald-500/40 text-emerald-400 shadow-sm"
              : "bg-slate-900 border-slate-800 text-slate-400 hover:text-white"
          }`}
        >
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          Faqat tekshirilganlar
        </button>

        <button
          onClick={onToggleController}
          className={`flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg border transition cursor-pointer ${
            controllerOnly
              ? "bg-purple-500/10 border-purple-500/40 text-purple-400 shadow-sm"
              : "bg-slate-900 border-slate-800 text-slate-400 hover:text-white"
          }`}
        >
          <Gamepad2 className="w-4 h-4 text-purple-400" />
          Geympad mosligi
        </button>

        {isFiltered && (
          <button
            onClick={onResetFilters}
            className="text-xs px-2.5 py-1.5 text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 rounded-lg transition cursor-pointer flex items-center gap-1"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Tozalash
          </button>
        )}
      </div>
    </div>
  );
}
