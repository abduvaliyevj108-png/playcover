"use client";

import { X, BookOpen } from "lucide-react";

interface GuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function GuideModal({ isOpen, onClose }: GuideModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl overflow-y-auto max-h-[85vh]">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center border border-indigo-500/20">
            <BookOpen className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-white">PlayCover O'rnatish va Sozlash Qo'llanmasi</h3>
            <p className="text-xs text-slate-400">Apple Silicon Mac uchun to'liq tushuntirish</p>
          </div>
        </div>

        <div className="space-y-4 text-xs sm:text-sm text-slate-300 leading-relaxed">
          <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800">
            <h4 className="font-semibold text-white mb-1 flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-indigo-600 text-white text-xs flex items-center justify-center">1</span>
              PlayCover nima va u qanday ishlaydi?
            </h4>
            <p className="text-slate-400 mt-1">
              PlayCover — bu macOS (Apple Silicon M1, M2, M3, M4) tizimlarida iOS ilova va o'yinlarini to'liq emulyatorsiz, to'g'ridan-to'g'ri ARM arxitekturasi orqali mahalliy (native) ishga tushiruvchi dastur. Shu sababli o'yinlar qotmasdan, 120 FPS gacha tezlikda ishlaydi.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800">
            <h4 className="font-semibold text-white mb-1 flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-indigo-600 text-white text-xs flex items-center justify-center">2</span>
              Keymapping (.playmap) fayllarini import qilish
            </h4>
            <p className="text-slate-400 mt-1">
              Saytimizdagi har bir o'yinda <strong>"Keymap (.playmap)"</strong> tugmasi bor. Uni yuklab oling, o'yinni PlayCover orqali oching va o'yin oynasida sichqonchaning o'ng tugmasi orqali sozlamalarga kirib, yuklab olingan faylni tanlang.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800">
            <h4 className="font-semibold text-white mb-1 flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-indigo-600 text-white text-xs flex items-center justify-center">3</span>
              Geympad (PS5 DualSense / Xbox) ulash
            </h4>
            <p className="text-slate-400 mt-1">
              Bluetooth orqali geympadni Mac'ingizga ulang. PlayCover qo'shimcha drayversiz geympadni to'g'ridan-to'g'ri taniydi va o'yinda ishlay boshlaydi.
            </p>
          </div>
        </div>

        <div className="mt-6 flex justify-end gap-3 pt-4 border-t border-slate-800">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold transition cursor-pointer"
          >
            Tushunarli, yopish
          </button>
        </div>
      </div>
    </div>
  );
}
