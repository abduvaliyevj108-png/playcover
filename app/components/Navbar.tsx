"use client";

import { Gamepad2, BookOpen, ArrowUpRight, LogIn, User, LogOut } from "lucide-react";
import { AuthUser } from "./AuthModal";

interface NavbarProps {
  user: AuthUser | null;
  onReset: () => void;
  onOpenGuide: () => void;
  onOpenAuth: () => void;
  onLogout: () => void;
}

export function Navbar({ user, onReset, onOpenGuide, onOpenAuth, onLogout }: NavbarProps) {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Brand */}
        <div onClick={onReset} className="flex items-center gap-3 cursor-pointer group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-500 flex items-center justify-center shadow-lg shadow-indigo-500/25 group-hover:scale-105 transition">
            <Gamepad2 className="w-6 h-6 text-white" />
          </div>
          <div>
            <span className="font-bold text-lg tracking-tight bg-gradient-to-r from-white via-slate-100 to-indigo-200 bg-clip-text text-transparent">
              PlayCover Hub
            </span>
            <span className="hidden sm:inline-block ml-2 text-xs px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 font-medium">
              macOS M1/M2/M3/M4
            </span>
          </div>
        </div>

        {/* Right buttons */}
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={onOpenGuide}
            className="hidden md:flex items-center gap-1.5 text-xs font-medium text-slate-300 hover:text-white px-3 py-2 rounded-lg border border-slate-800 hover:border-slate-700 bg-slate-900/60 hover:bg-slate-900 transition cursor-pointer"
          >
            <BookOpen className="w-3.5 h-3.5 text-indigo-400" />
            <span>O'rnatish</span> Qo'llanmasi
          </button>

          <a
            href="https://playcover.io"
            target="_blank"
            rel="noreferrer"
            className="hidden sm:flex items-center gap-1.5 text-xs font-semibold px-3 py-2 rounded-lg border border-slate-800 hover:border-slate-700 text-slate-300 hover:text-white bg-slate-900 transition"
          >
            PlayCover App
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>

          {/* User Auth Section */}
          {user ? (
            <div className="flex items-center gap-2 pl-1 border-l border-slate-800/80">
              <div className="flex items-center gap-2 px-2.5 py-1.5 rounded-xl bg-slate-900 border border-slate-800">
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-6 h-6 rounded-lg bg-indigo-950 object-cover"
                />
                <span className="text-xs font-semibold text-white max-w-[90px] sm:max-w-[120px] truncate">
                  {user.name}
                </span>
              </div>
              <button
                onClick={onLogout}
                className="p-2 rounded-xl border border-slate-800 hover:border-rose-500/30 text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 transition cursor-pointer"
                title="Chiqish"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <button
              onClick={onOpenAuth}
              className="flex items-center gap-1.5 text-xs font-semibold px-3.5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white shadow-sm shadow-indigo-600/25 transition active:scale-95 cursor-pointer"
            >
              <LogIn className="w-3.5 h-3.5" />
              Kirish
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
