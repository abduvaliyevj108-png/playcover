"use client";

import { Game } from "../data/games";
import { X, Share2, CheckCircle2, Laptop, Keyboard, Download } from "lucide-react";

interface GameModalProps {
  game: Game | null;
  downloadingGameId: string | null;
  downloadProgress: number;
  onClose: () => void;
  onShare: (game: Game) => void;
  onDownload: (game: Game, type: "ipa" | "keymap") => void;
}

export function GameModal({
  game,
  downloadingGameId,
  downloadProgress,
  onClose,
  onShare,
  onDownload,
}: GameModalProps) {
  if (!game) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl max-h-[90vh] flex flex-col">
        {/* Header / Banner */}
        <div className="relative h-48 w-full bg-slate-950">
          <img
            src={game.banner}
            alt={game.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/50 to-transparent" />

          <div className="absolute top-4 right-4 flex items-center gap-2">
            <button
              onClick={() => onShare(game)}
              className="p-2 rounded-full bg-slate-950/70 hover:bg-slate-950 text-slate-300 hover:text-white transition cursor-pointer"
              title="Ulashish"
            >
              <Share2 className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-full bg-slate-950/70 hover:bg-slate-950 text-slate-300 hover:text-white transition cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="absolute bottom-4 left-6 flex items-end gap-4">
            <div className="w-16 h-16 rounded-2xl overflow-hidden border-2 border-slate-800 shadow-xl bg-slate-800">
              <img src={game.icon} alt={game.title} className="w-full h-full object-cover" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-white">{game.title}</h3>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-xs px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                  {game.category}
                </span>
                <span className="text-xs text-slate-400">Versiya: {game.version}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          <div>
            <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Tavsif</h4>
            <p className="text-sm text-slate-300 leading-relaxed">
              {game.fullDescription}
            </p>
          </div>

          {/* Features */}
          <div>
            <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Mac Imkoniyatlari</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {game.features.map((feat, i) => (
                <div key={i} className="flex items-center gap-2 text-xs text-slate-300 bg-slate-800/50 p-2.5 rounded-xl border border-slate-800">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>{feat}</span>
                </div>
              ))}
            </div>
          </div>

          {/* System Requirements */}
          <div className="bg-slate-950/60 p-4 rounded-2xl border border-slate-800/80">
            <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3 flex items-center gap-1.5">
              <Laptop className="w-4 h-4 text-indigo-400" />
              Tizim talablari (macOS)
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div>
                <span className="text-slate-500 block">Protsessor:</span>
                <span className="text-slate-200 font-medium">{game.systemReq.chip}</span>
              </div>
              <div>
                <span className="text-slate-500 block">Xotira (RAM):</span>
                <span className="text-slate-200 font-medium">{game.systemReq.ram}</span>
              </div>
              <div>
                <span className="text-slate-500 block">OS versiyasi:</span>
                <span className="text-slate-200 font-medium">{game.systemReq.macos}</span>
              </div>
            </div>
          </div>

          {/* Progress bar if downloading */}
          {downloadingGameId === game.id && (
            <div className="p-4 rounded-2xl bg-indigo-950/40 border border-indigo-500/30">
              <div className="flex justify-between text-xs font-medium text-indigo-300 mb-1.5">
                <span>Yuklanmoqda...</span>
                <span>{downloadProgress}%</span>
              </div>
              <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
                <div
                  className="bg-indigo-500 h-full rounded-full transition-all duration-300"
                  style={{ width: `${downloadProgress}%` }}
                />
              </div>
            </div>
          )}
        </div>

        {/* Footer Buttons */}
        <div className="p-6 border-t border-slate-800 bg-slate-950 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-xs text-slate-400 text-center sm:text-left">
            Fayl hajmi: <strong className="text-white">{game.size}</strong> • Yuklanishlar: <strong className="text-white">{game.downloads}</strong>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            {game.keymappingSupported && (
              <button
                onClick={() => onDownload(game, "keymap")}
                className="flex-1 sm:flex-initial flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl border border-slate-700 hover:border-slate-600 bg-slate-900 text-slate-200 text-xs font-semibold hover:bg-slate-800 transition cursor-pointer active:scale-95"
              >
                <Keyboard className="w-4 h-4 text-indigo-400" />
                Keymap (.playmap)
              </button>
            )}
            <button
              onClick={() => onDownload(game, "ipa")}
              disabled={downloadingGameId === game.id}
              className="flex-1 sm:flex-initial flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:bg-indigo-800 text-white text-xs font-semibold shadow-lg shadow-indigo-600/30 transition cursor-pointer active:scale-95"
            >
              <Download className="w-4 h-4" />
              {downloadingGameId === game.id ? "Yuklanmoqda..." : "IPA Yuklab olish"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
