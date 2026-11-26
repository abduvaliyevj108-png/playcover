"use client";

import { useState, useEffect, useCallback } from "react";
import { Game } from "./data/games";
import { ToastContainer, ToastNotification } from "./components/ToastContainer";
import { Navbar } from "./components/Navbar";
import { HeroSection } from "./components/HeroSection";
import { FilterBar } from "./components/FilterBar";
import { GameCard } from "./components/GameCard";
import { GameModal } from "./components/GameModal";
import { GuideModal } from "./components/GuideModal";
import { AuthModal, AuthUser } from "./components/AuthModal";
import { InstallationGuide } from "./components/InstallationGuide";
import { Footer } from "./components/Footer";
import { Layers, Gamepad2, ChevronDown } from "lucide-react";

export default function HomePage() {
  const [games, setGames] = useState<Game[]>([]);
  const [categories, setCategories] = useState<readonly string[]>([]);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [hasMore, setHasMore] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Filters & State
  const [selectedCategory, setSelectedCategory] = useState<string>("Barchasi");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filterVerifiedOnly, setFilterVerifiedOnly] = useState<boolean>(false);
  const [controllerOnly, setControllerOnly] = useState<boolean>(false);
  const [limit, setLimit] = useState<number>(8);

  // Modals & Interactivity
  const [selectedGame, setSelectedGame] = useState<Game | null>(null);
  const [isGuideOpen, setIsGuideOpen] = useState<boolean>(false);
  const [isAuthOpen, setIsAuthOpen] = useState<boolean>(false);
  const [currentUser, setCurrentUser] = useState<AuthUser | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [downloadingGameId, setDownloadingGameId] = useState<string | null>(null);
  const [downloadProgress, setDownloadProgress] = useState<number>(0);
  const [toasts, setToasts] = useState<ToastNotification[]>([]);

  // Toast dispatch
  const addToast = (title: string, message: string, type: "success" | "info" | "warning" = "info") => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, title, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  };

  // Backend API Fetcher
  const fetchGamesFromBackend = useCallback(async () => {
    setIsLoading(true);
    try {
      const params = new URLSearchParams({
        category: selectedCategory,
        search: searchQuery,
        verified: String(filterVerifiedOnly),
        controller: String(controllerOnly),
        limit: String(limit),
        page: "1",
      });

      const res = await fetch(`/api/games?${params.toString()}`);
      const data = await res.json();

      if (data.success) {
        setGames(data.games);
        setTotalCount(data.total);
        setHasMore(data.hasMore);
        if (data.categories) {
          setCategories(data.categories);
        }
      }
    } catch (err) {
      console.error("Backend fetch error:", err);
      addToast("Xatolik", "Serverdan ma'lumot olishda xatolik yuz berdi", "warning");
    } finally {
      setIsLoading(false);
    }
  }, [selectedCategory, searchQuery, filterVerifiedOnly, controllerOnly, limit]);

  // Fetch when filters or limit change
  useEffect(() => {
    fetchGamesFromBackend();
  }, [fetchGamesFromBackend]);

  // Handle Download via Backend API Route
  const handleDownload = async (game: Game, type: "ipa" | "keymap") => {
    if (type === "keymap") {
      addToast("Yuklab olinmoqda", `"${game.title}" Keymap konfiguratsiyasi yuklanmoqda...`, "info");
      const downloadUrl = `/api/download?id=${game.id}&type=keymap`;
      const a = document.createElement("a");
      a.href = downloadUrl;
      a.download = `${game.id}.playmap`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      addToast("Keymap yuklandi", `"${game.title}.playmap" fayli muvaffaqiyatli yuklandi.`, "success");
      return;
    }

    // Realistic IPA progress then download via Backend API
    setDownloadingGameId(game.id);
    setDownloadProgress(10);
    addToast("Yuklab olish boshlandi", `"${game.title}" (v${game.version}) tayyorlanmoqda...`, "info");

    const interval = setInterval(() => {
      setDownloadProgress((prev) => {
        if (prev >= 90) {
          clearInterval(interval);
          setTimeout(() => {
            setDownloadingGameId(null);
            setDownloadProgress(0);

            const downloadUrl = `/api/download?id=${game.id}&type=ipa`;
            const a = document.createElement("a");
            a.href = downloadUrl;
            a.download = `${game.id}-v${game.version}-PlayCover.txt`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);

            addToast("Muvaffaqiyatli", `"${game.title}" o'rnatish paketi yuklab olindi!`, "success");
          }, 600);
          return 100;
        }
        return prev + 25;
      });
    }, 280);
  };

  // Handle Share
  const handleShare = (game: Game, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    const url = `${window.location.origin}/#${game.id}`;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(url);
      setCopiedId(game.id);
      setTimeout(() => setCopiedId(null), 2000);
      addToast("Havola nusxalandi", `"${game.title}" havolasi xotiraga olindi.`, "success");
    } else {
      addToast("Ulashish", `${game.title} havolasi: ${url}`, "info");
    }
  };

  // Reset all filters
  const handleReset = () => {
    setSelectedCategory("Barchasi");
    setSearchQuery("");
    setFilterVerifiedOnly(false);
    setControllerOnly(false);
    setLimit(8);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100">
      {/* Toast notifications */}
      <ToastContainer
        toasts={toasts}
        onDismiss={(id) => setToasts((prev) => prev.filter((t) => t.id !== id))}
      />

      {/* Top Navbar Component */}
      <Navbar
        user={currentUser}
        onReset={handleReset}
        onOpenGuide={() => setIsGuideOpen(true)}
        onOpenAuth={() => setIsAuthOpen(true)}
        onLogout={() => {
          setCurrentUser(null);
          addToast("Chiqish", "Tizimdan muvaffaqiyatli chiqdingiz.", "info");
        }}
      />

      {/* Hero Section Component */}
      <HeroSection
        searchQuery={searchQuery}
        totalGames={totalCount || 32}
        onSearchChange={(val) => {
          setSearchQuery(val);
          setLimit(8);
        }}
        onFilterAll={() => {
          handleReset();
          addToast("Filtr", "Barcha o'yinlar ro'yxati ochildi.", "info");
        }}
        onFilterFps={() => {
          setSearchQuery("120 FPS");
          setLimit(8);
          addToast("Filtr", "120 FPS o'yinlar qidirilmoqda.", "info");
        }}
        onFilterController={() => {
          setControllerOnly(true);
          setLimit(8);
          addToast("Filtr", "Faqat Geympad mos o'yinlar saralandi.", "info");
        }}
        onFilterVerified={() => {
          setFilterVerifiedOnly(true);
          setLimit(8);
          addToast("Filtr", "Tekshirilgan o'yinlar saralandi.", "success");
        }}
      />

      {/* Main Catalog */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full">
        {/* FilterBar Component */}
        <FilterBar
          categories={categories}
          selectedCategory={selectedCategory}
          filterVerifiedOnly={filterVerifiedOnly}
          controllerOnly={controllerOnly}
          searchQuery={searchQuery}
          onSelectCategory={(cat) => {
            setSelectedCategory(cat);
            setLimit(8);
          }}
          onToggleVerified={() => {
            setFilterVerifiedOnly((prev) => !prev);
            setLimit(8);
          }}
          onToggleController={() => {
            setControllerOnly((prev) => !prev);
            setLimit(8);
          }}
          onResetFilters={handleReset}
        />

        {/* Catalog Header */}
        <div className="mt-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <Layers className="w-5 h-5 text-indigo-400" />
              O'yinlar ro'yxati ({games.length} / {totalCount} ko'rsatilmoqda)
            </h2>
            {selectedCategory !== "Barchasi" && (
              <span className="text-xs text-slate-400">
                Kategoriya: <strong className="text-white">{selectedCategory}</strong>
              </span>
            )}
          </div>

          {isLoading && games.length === 0 ? (
            <div className="text-center py-20 text-slate-400 text-sm animate-pulse">
              Backend ma'lumotlari yuklanmoqda...
            </div>
          ) : games.length === 0 ? (
            <div className="text-center py-16 border border-dashed border-slate-800 rounded-2xl bg-slate-900/20">
              <Gamepad2 className="w-12 h-12 text-slate-600 mx-auto mb-3" />
              <h3 className="text-base font-semibold text-white">Hech qanday o'yin topilmadi</h3>
              <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto">
                Qidiruv so'zini o'zgartiring yoki filtrlarni tozalang.
              </p>
              <button
                onClick={handleReset}
                className="mt-4 px-4 py-2 text-xs font-semibold rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white transition cursor-pointer"
              >
                Filtrlarni tozalash
              </button>
            </div>
          ) : (
            <>
              {/* Games Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {games.map((game) => (
                  <GameCard
                    key={game.id}
                    game={game}
                    isCopied={copiedId === game.id}
                    onSelect={(g) => setSelectedGame(g)}
                    onShare={(g, e) => handleShare(g, e)}
                    onQuickDownload={(g, e) => {
                      e.stopPropagation();
                      handleDownload(g, "ipa");
                    }}
                  />
                ))}
              </div>

              {/* Load More Pagination Bar */}
              <div className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-slate-900/40 border border-slate-800">
                <div className="text-xs text-slate-400">
                  Backend orqali jami <strong className="text-white">{totalCount}</strong> tadan{" "}
                  <strong className="text-indigo-400">{games.length}</strong> tasi ko'rsatilmoqda
                </div>

                <div className="flex items-center gap-3">
                  {hasMore && (
                    <button
                      onClick={() => setLimit((prev) => prev + 8)}
                      className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-lg shadow-indigo-600/25 transition active:scale-95 cursor-pointer"
                    >
                      <ChevronDown className="w-4 h-4" />
                      Yana 8 ta ko'rsatish
                    </button>
                  )}
                  {limit > 8 && (
                    <button
                      onClick={() => setLimit(8)}
                      className="px-4 py-2.5 rounded-xl border border-slate-800 hover:border-slate-700 bg-slate-900 text-slate-300 text-xs font-semibold transition cursor-pointer"
                    >
                      Kamaytirish (8 taga)
                    </button>
                  )}
                </div>
              </div>
            </>
          )}
        </div>

        {/* Installation Guide Component */}
        <InstallationGuide />
      </main>

      {/* Modals */}
      <GameModal
        game={selectedGame}
        downloadingGameId={downloadingGameId}
        downloadProgress={downloadProgress}
        onClose={() => setSelectedGame(null)}
        onShare={(g) => handleShare(g)}
        onDownload={(g, type) => handleDownload(g, type)}
      />

      <GuideModal isOpen={isGuideOpen} onClose={() => setIsGuideOpen(false)} />

      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        onSuccess={(user, msg) => {
          setCurrentUser(user);
          addToast("Xush kelibsiz", `${msg} Salom, ${user.name}!`, "success");
        }}
      />

      {/* Footer Component */}
      <Footer
        onOpenGuide={() => setIsGuideOpen(true)}
        onFilterCategory={(cat) => {
          setSelectedCategory(cat);
          setLimit(8);
        }}
      />
    </div>
  );
}
