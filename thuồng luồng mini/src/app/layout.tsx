import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MobileNav from "@/components/MobileNav";
import SyncManager from "@/components/SyncManager";
import Chatbot from "@/components/Chatbot";

const nunito = Nunito({
  subsets: ["vietnamese", "latin"],
  weight: ["400", "600", "700", "800", "900"],
  display: "swap",
  variable: "--font-nunito",
});

export const metadata: Metadata = {
  title: "Thuồng Luồng Mini - Khám phá Tuyên Quang",
  description: "Nền tảng review địa phương số 1 Tuyên Quang: quán ăn, cafe, điểm đi, lộ trình cho khách trong và ngoài tỉnh.",
  keywords: "Tuyên Quang, review, ăn uống, du lịch, Na Hang, Thác Bà, lộ trình, ẩm thực Tuyên Quang",
  openGraph: {
    title: "Thuồng Luồng Mini - Review & Khám phá Tuyên Quang",
    description: "Nền tảng review địa phương số 1 Tuyên Quang: quán ăn, cafe, điểm đi, lộ trình cho khách trong và ngoài tỉnh.",
    url: "https://thuongluongmini.pages.dev",
    siteName: "Thuồng Luồng Mini",
    images: [
      {
        url: "https://thuongluongmini.pages.dev/assets/logo.jpg",
        width: 512,
        height: 512,
      },
    ],
    locale: "vi_VN",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" className={nunito.variable}>
      <head>
        <meta name="theme-color" content="#F4A261" media="(prefers-color-scheme: light)" />
        <meta name="theme-color" content="#1a1a2e" media="(prefers-color-scheme: dark)" />
      </head>
      <body>
        <div id="app">
          <SyncManager />
          <Header />
          <main className="page-container" id="main-content" style={{ minHeight: "80vh", paddingTop: "var(--header-height)" }} role="main">
            {children}
          </main>
          <Footer />
          <MobileNav />
          <Chatbot />
        </div>
      </body>
    </html>
  );
}
