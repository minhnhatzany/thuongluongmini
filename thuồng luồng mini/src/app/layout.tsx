import type { Metadata, Viewport } from "next";
import { Outfit, Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SyncManager from "@/components/SyncManager";
import Chatbot from "@/components/Chatbot";
import { Providers } from "@/components/Providers";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
  variable: "--font-primary",
});

const inter = Inter({
  subsets: ["vietnamese", "latin"],
  weight: ["400", "500", "600"],
  display: "swap",
  variable: "--font-secondary",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://thuongluongmini-v2.pages.dev"),
  title: "Thuồng Luồng Mini - Khám phá Tuyên Quang",
  description: "Nền tảng review địa phương số 1 Tuyên Quang: quán ăn, cafe, điểm đi, lộ trình cho khách trong và ngoài tỉnh.",
  keywords: "Tuyên Quang, review, ăn uống, du lịch, Na Hang, Thác Bà, lộ trình, ẩm thực Tuyên Quang",
  openGraph: {
    title: "Thuồng Luồng Mini - Review & Khám phá Tuyên Quang",
    description: "Nền tảng review địa phương số 1 Tuyên Quang: quán ăn, cafe, điểm đi, lộ trình cho khách trong và ngoài tỉnh.",
    url: "https://thuongluongmini-v2.pages.dev",
    siteName: "Thuồng Luồng Mini",
    images: [
      {
        url: "/assets/logo.jpg",
        width: 512,
        height: 512,
        alt: "Thuồng Luồng Mini Logo"
      },
    ],
    locale: "vi_VN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Thuồng Luồng Mini - Review & Khám phá Tuyên Quang",
    description: "Nền tảng review địa phương số 1 Tuyên Quang.",
    images: ["/assets/logo.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" className={`${outfit.variable} ${inter.variable}`}>
      <head>
        <meta name="theme-color" content="#F4A261" media="(prefers-color-scheme: light)" />
        <meta name="theme-color" content="#1a1a2e" media="(prefers-color-scheme: dark)" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/assets/logo.jpg" />
        <script dangerouslySetInnerHTML={{
          __html: `
            if ('serviceWorker' in navigator) {
              window.addEventListener('load', function() {
                navigator.serviceWorker.register('/sw.js').then(function(registration) {
                  console.log('ServiceWorker registration successful');
                }, function(err) {
                  console.log('ServiceWorker registration failed: ', err);
                });
              });
            }
          `
        }} />
      </head>
      <body>
        <Providers>
          <div id="app">
            <SyncManager />
            <Header />
            <main className="page-container" id="main-content" style={{ minHeight: "80vh", paddingTop: "var(--header-height)" }} role="main">
              {children}
            </main>
            <Footer />
            <Chatbot />
          </div>
        </Providers>
      </body>
    </html>
  );
}
