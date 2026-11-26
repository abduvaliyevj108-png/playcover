"use client";

import { Game } from "../data/games";
import { CheckCircle2, Star, Check, Share2, Keyboard, Gamepad2, Download } from "lucide-react";

interface GameCardProps {
  game: Game;
  isCopied: boolean;
  onSelect: (game: Game) => void;
  onShare: (game: Game, e: React.MouseEvent) => void;
  onQuickDownload: (game: Game, e: React.MouseEvent) => void;
}

export function GameCard({
  game,
  isCopied,
  onSelect,
  onShare,
  onQuickDownload,
}: GameCardProps) {
  return (
    <div
      onClick={() => onSelect(game)}
      className="group relative flex flex-col rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-indigo-500/50 hover:bg-slate-900/90 transition duration-200 cursor-pointer overflow-hidden shadow-lg hover:shadow-indigo-500/10"
    >
      {/* Card Banner */}
      <div className="relative h-40 w-full overflow-hidden bg-slate-950">
        <img
          src={game.banner}
          alt={game.title}
          className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent" />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 flex gap-1.5 flex-wrap">
          <span className="px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded-md bg-slate-950/80 backdrop-blur-md text-indigo-300 border border-indigo-500/20">
            {game.category}
          </span>
          {game.playcoverVerified && (
            <span className="px-2 py-0.5 text-[10px] font-bold rounded-md bg-emerald-950/80 backdrop-blur-md text-emerald-400 border border-emerald-500/30 flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3" />
              Tekshirilgan
            </span>
          )}
        </div>

        <div className="absolute top-3 right-3 flex items-center gap-1 px-2 py-0.5 rounded-md bg-slate-950/80 backdrop-blur-md text-amber-400 text-xs font-semibold">
          <Star className="w-3.5 h-3.5 fill-amber-400" />
          {game.rating}
        </div>

        {/* Game Icon */}
        <div className="absolute -bottom-4 left-4 w-12 h-12 rounded-xl overflow-hidden border-2 border-slate-900 shadow-md bg-slate-800">
          <img src={game.icon} alt={game.title} className="w-full h-full object-cover" />
        </div>

        {/* Share button */}
        <button
          onClick={(e) => onShare(game, e)}
          className="absolute bottom-2 right-2 p-1.5 rounded-lg bg-slate-950/70 hover:bg-slate-900 text-slate-300 hover:text-white transition cursor-pointer"
          title="Havolani nusxalash"
        >
          {isCopied ? (
            <Check className="w-3.5 h-3.5 text-emerald-400" />
          ) : (
            <Share2 className="w-3.5 h-3.5" />
          )}
        </button>
      </div>

      {/* Card Body */}
      <div className="p-4 pt-6 flex-1 flex flex-col justify-between">
        <div>
          <h3 className="font-bold text-base text-white group-hover:text-indigo-400 transition">
            {game.title}
          </h3>
          <p className="mt-1 text-xs text-slate-400 line-clamp-2 leading-relaxed">
            {game.description}
          </p>
        </div>

        <div className="mt-4 pt-4 border-t border-slate-800/80">
          {/* Features badges */}
          <div className="flex flex-wrap gap-1.5 mb-3">
            {game.keymappingSupported && (
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-800 text-slate-300 flex items-center gap-1">
                <Keyboard className="w-3 h-3 text-indigo-400" />
                Keymap
              </span>
            )}
            {game.controllerSupported && (
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-800 text-slate-300 flex items-center gap-1">
                <Gamepad2 className="w-3 h-3 text-purple-400" />
                Geympad
              </span>
            )}
            <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-800 text-slate-400 ml-auto">
              {game.size}
            </span>
          </div>

          {/* Download button row */}
          <div className="flex items-center justify-between text-xs pt-1">
            <span className="text-slate-400 text-[11px] font-medium">
              v{game.version} • {game.downloads}
            </span>
            <button
              onClick={(e) => onQuickDownload(game, e)}
              className="font-semibold text-indigo-400 hover:text-white bg-indigo-500/10 hover:bg-indigo-600 px-2.5 py-1 rounded-md transition flex items-center gap-1 active:scale-95 cursor-pointer"
            >
              <Download className="w-3 h-3" />
              Yuklash
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
