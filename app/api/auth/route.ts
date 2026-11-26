import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { action, email, password, name } = body;

    if (!email || !password) {
      return NextResponse.json(
        { success: false, error: "Email va parol kiritilishi shart" },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { success: false, error: "Parol kamida 6 ta belgidan iborat bo'lishi kerak" },
        { status: 400 }
      );
    }

    // Generate avatar url from username or email
    const username = name || email.split("@")[0];
    const user = {
      id: "usr_" + Math.random().toString(36).substring(2, 9),
      name: username,
      email: email,
      avatar: `https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(username)}`,
      role: "Gamer",
      joinedAt: new Date().toISOString(),
    };

    return NextResponse.json({
      success: true,
      message:
        action === "register"
          ? "Ro'yxatdan muvaffaqiyatli o'tdingiz!"
          : "Tizimga muvaffaqiyatli kirdingiz!",
      user,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Serverda xatolik yuz berdi" },
      { status: 500 }
    );
  }
}
