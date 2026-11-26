import { NextRequest, NextResponse } from "next/server";
import { GAMES_DATA, CATEGORIES } from "@/app/data/games";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category") || "Barchasi";
  const search = searchParams.get("search")?.toLowerCase().trim() || "";
  const verifiedOnly = searchParams.get("verified") === "true";
  const controllerOnly = searchParams.get("controller") === "true";
  const limit = parseInt(searchParams.get("limit") || "8", 10);
  const page = parseInt(searchParams.get("page") || "1", 10);

  // Filter games on backend
  let filtered = GAMES_DATA.filter((game) => {
    const matchesCategory = category === "Barchasi" || game.category === category;
    const matchesSearch =
      !search ||
      game.title.toLowerCase().includes(search) ||
      game.description.toLowerCase().includes(search) ||
      game.category.toLowerCase().includes(search);
    const matchesVerified = verifiedOnly ? game.playcoverVerified : true;
    const matchesController = controllerOnly ? game.controllerSupported : true;

    return matchesCategory && matchesSearch && matchesVerified && matchesController;
  });

  const total = filtered.length;
  const startIndex = (page - 1) * limit;
  const paginatedGames = filtered.slice(0, startIndex + limit);

  return NextResponse.json({
    success: true,
    total,
    page,
    limit,
    hasMore: startIndex + limit < total,
    categories: CATEGORIES,
    games: paginatedGames,
  });
}
