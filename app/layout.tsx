import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "PlayCover Games Hub | iOS Games & Keymaps for Mac",
  description: "Apple Silicon (M1/M2/M3/M4) Mac kompyuterlarida iOS o'yinlarini PlayCover orqali qulay o'ynash uchun IPA va Keymap portali.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="uz" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} bg-slate-950 text-slate-100 min-h-screen selection:bg-indigo-500 selection:text-white antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
