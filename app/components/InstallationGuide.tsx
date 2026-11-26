"use client";

import { ExternalLink, CheckCircle2 } from "lucide-react";

export function InstallationGuide() {
  return (
    <section id="guide" className="mt-20 pt-10 border-t border-slate-800">
      <div className="text-center max-w-3xl mx-auto mb-12">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
          Mac kompyuteringizda o'rnatish yo'riqnomasi
        </h2>
        <p className="text-sm text-slate-400 mt-2">
          PlayCover orqali iOS ilova va o'yinlarini 3 oddiy qadamda ishga tushiring
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 rounded-2xl bg-slate-900/50 border border-slate-800 relative hover:border-slate-700 transition">
          <div className="w-10 h-10 rounded-xl bg-indigo-500/10 text-indigo-400 font-bold flex items-center justify-center mb-4 border border-indigo-500/20">
            1
          </div>
          <h3 className="text-base font-semibold text-white mb-2">PlayCover dasturini yuklang</h3>
          <p className="text-xs text-slate-400 leading-relaxed mb-4">
            Rasmiy PlayCover ilovasini Mac kompyuteringizga (Apple Silicon M-seriya) o'rnating. U bepul va ochiq manbali loyihadir.
          </p>
          <a
            href="https://playcover.io"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1 text-xs font-semibold text-indigo-400 hover:text-indigo-300"
          >
            playcover.io saytiga o'tish <ExternalLink className="w-3 h-3" />
          </a>
        </div>

        <div className="p-6 rounded-2xl bg-slate-900/50 border border-slate-800 relative hover:border-slate-700 transition">
          <div className="w-10 h-10 rounded-xl bg-indigo-500/10 text-indigo-400 font-bold flex items-center justify-center mb-4 border border-indigo-500/20">
            2
          </div>
          <h3 className="text-base font-semibold text-white mb-2">IPA faylini o'rnating</h3>
          <p className="text-xs text-slate-400 leading-relaxed mb-4">
            Saytimizdan o'zingizga ma'qul o'yinning .ipa faylini yuklab oling va uni PlayCover ilovasi oynasiga shunchaki sudrab tashlang (Drag & Drop).
          </p>
          <div className="text-[11px] text-slate-500">
            O'rnatish bir necha soniyada yakunlanadi.
          </div>
        </div>

        <div className="p-6 rounded-2xl bg-slate-900/50 border border-slate-800 relative hover:border-slate-700 transition">
          <div className="w-10 h-10 rounded-xl bg-indigo-500/10 text-indigo-400 font-bold flex items-center justify-center mb-4 border border-indigo-500/20">
            3
          </div>
          <h3 className="text-base font-semibold text-white mb-2">Keymapping sozlang va o'ynang</h3>
          <p className="text-xs text-slate-400 leading-relaxed mb-4">
            O'yinni ishga tushiring va saytimizdan yuklab olingan <code className="text-indigo-400">.playmap</code> profilini import qiling yoki <kbd className="px-1.5 py-0.5 rounded bg-slate-800 text-[10px] font-mono border border-slate-700">Cmd + K</kbd> orqali o'zingiz sozlang.
          </p>
          <div className="text-[11px] text-emerald-400 flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5" />
            Sichqoncha va Klaviatura tayyor!
          </div>
        </div>
      </div>
    </section>
  );
}
