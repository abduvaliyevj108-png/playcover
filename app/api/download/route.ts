import { NextRequest, NextResponse } from "next/server";
import { GAMES_DATA } from "@/app/data/games";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  const type = searchParams.get("type") || "ipa"; // "ipa" or "keymap"

  const game = GAMES_DATA.find((g) => g.id === id);
  if (!game) {
    return NextResponse.json({ success: false, error: "O'yin topilmadi" }, { status: 404 });
  }

  if (type === "keymap") {
    // Return real Keymap config JSON
    const playmapData = {
      gameId: game.id,
      gameTitle: game.title,
      version: game.version,
      targetPlatform: "PlayCover macOS (Apple Silicon)",
      mappings: {
        movement: { forward: "W", backward: "S", left: "A", right: "D" },
        actions: { attack: "MouseLeft", aim: "MouseRight", jump: "Space", reload: "R", skill: "E", ult: "Q" },
        sensitivity: 1.25,
        smoothing: true
      },
      exportDate: new Date().toISOString()
    };

    return new Response(JSON.stringify(playmapData, null, 2), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Content-Disposition": `attachment; filename="${game.id}.playmap"`,
      },
    });
  }

  // IPA download info file
  const infoText = `================================================
PlayCover Hub - O'rnatish paketi
O'yin: ${game.title}
Versiya: ${game.version}
Hajmi: ${game.size}
Tizim talabi: ${game.systemReq.chip}, ${game.systemReq.ram}
OS talabi: ${game.systemReq.macos}
Reyting: ${game.rating} / 5.0
Yuklanishlar: ${game.downloads}
================================================

O'RNATISH QADAMLARI:
1. PlayCover ilovasini oching (https://playcover.io).
2. Ushbu o'yinning rasmiy decryted .ipa paketini PlayCover oynasiga sudrab tashlang (Drag & Drop).
3. PlayCover o'yinni macOS ilovasi sifatida sozlaydi.
4. O'yinni ishga tushiring va saytimizdan yuklab olingan "${game.id}.playmap" tugmalar xaritasini import qiling.

Muvaffaqiyatli o'yinlar tilaymiz!`;

  return new Response(infoText, {
    status: 200,
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Content-Disposition": `attachment; filename="${game.id}-v${game.version}-PlayCover.txt"`,
    },
  });
}
