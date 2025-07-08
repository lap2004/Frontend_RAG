"use client";

import { Geist_Mono, Roboto } from "next/font/google";
import "./globals.css";
import { EmotionProvider } from "../emotion/provider";

const roboto = Roboto({
  subsets: ["latin", "vietnamese"],
  weight: ["400", "500", "700"],
  display: "swap",
  variable: "--font-roboto",     // để Tailwind dùng nếu cần
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={roboto.className}>
      <body
        className={`${roboto.className} antialiased`}
      >
        <EmotionProvider>
          {children}
        </EmotionProvider>
      </body>
    </html>
  );
}
