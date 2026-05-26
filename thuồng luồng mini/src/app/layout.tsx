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
  title: {
    default: "Thuồng Luồng Mini - Review Ăn Uống & Khám Phá Tuyên Quang",
    template: "%s | Thuồng Luồng Mini",
  },
  description: "Review quán ăn ngon, điểm vui chơi, du lịch Tuyên Quang. Khám phá ẩm thực địa phương, lộ trình du lịch Na Hang, Thác Bà, Lâm Bình. Thuồng Luồng Mini - Foodtour Tuyên Quang số 1.",
  keywords: [
    "Tuyên Quang", "review Tuyên Quang", "quán ăn ngon Tuyên Quang", "ăn uống Tuyên Quang",
    "du lịch Tuyên Quang", "Na Hang", "Thác Bà", "Lâm Bình",
    "Thuồng Luồng Mini", "thuong luong mini", "foodtour Tuyên Quang",
    "ẩm thực Tuyên Quang", "điểm check-in Tuyên Quang", "lộ trình du lịch Tuyên Quang",
    "quán cafe Tuyên Quang", "đặc sản Tuyên Quang", "review địa điểm Tuyên Quang"
  ],
  authors: [{ name: "Thuồng Luồng Mini", url: "https://thuongluongmini-v2.pages.dev" }],
  creator: "Thuồng Luồng Mini",
  publisher: "Thuồng Luồng Mini",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://thuongluongmini-v2.pages.dev",
  },
  openGraph: {
    title: "Thuồng Luồng Mini - Review Ăn Uống & Khám Phá Tuyên Quang",
    description: "Review quán ăn ngon, điểm vui chơi, du lịch Tuyên Quang. Khám phá ẩm thực địa phương, lộ trình du lịch Na Hang, Thác Bà, Lâm Bình.",
    url: "https://thuongluongmini-v2.pages.dev",
    siteName: "Thuồng Luồng Mini",
    images: [
      {
        url: "/assets/logo.jpg",
        width: 512,
        height: 512,
        alt: "Thuồng Luồng Mini - Review Tuyên Quang"
      },
    ],
    locale: "vi_VN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Thuồng Luồng Mini - Review Ăn Uống & Khám Phá Tuyên Quang",
    description: "Review quán ăn ngon, điểm vui chơi, du lịch Tuyên Quang số 1.",
    images: ["/assets/logo.jpg"],
  },
  other: {
    "geo.region": "VN-TQ",
    "geo.placename": "Tuyên Quang, Việt Nam",
    "geo.position": "21.8231;105.2179",
    "ICBM": "21.8231, 105.2179",
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
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no, viewport-fit=cover" />
        <meta name="theme-color" content="#F4A261" media="(prefers-color-scheme: light)" />
        <meta name="theme-color" content="#1a1a2e" media="(prefers-color-scheme: dark)" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/assets/logo.jpg" />
        <script dangerouslySetInnerHTML={{
          __html: `
            if ('serviceWorker' in navigator) {
              window.addEventListener('load', function() {
                navigator.serviceWorker.register('/sw.js');
              });
            }
          `
        }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              "name": "Thuồng Luồng Mini",
              "alternateName": "Thuong Luong Mini",
              "description": "Nền tảng review địa phương số 1 Tuyên Quang: quán ăn ngon, cafe, điểm vui chơi, du lịch Na Hang, lộ trình khám phá Tuyên Quang.",
              "url": "https://thuongluongmini-v2.pages.dev",
              "logo": "https://thuongluongmini-v2.pages.dev/assets/logo.jpg",
              "image": "https://thuongluongmini-v2.pages.dev/assets/logo.jpg",
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "Tuyên Quang",
                "addressRegion": "Tuyên Quang",
                "addressCountry": "VN"
              },
              "geo": {
                "@type": "GeoCoordinates",
                "latitude": 21.8231,
                "longitude": 105.2179
              },
              "areaServed": {
                "@type": "City",
                "name": "Tuyên Quang"
              },
              "sameAs": [
                "https://www.facebook.com/ThuongLuongMini",
                "https://www.tiktok.com/@thuongluongmini"
              ],
              "potentialAction": {
                "@type": "SearchAction",
                "target": {
                  "@type": "EntryPoint",
                  "urlTemplate": "https://thuongluongmini-v2.pages.dev/tim-kiem?q={search_term_string}"
                },
                "query-input": "required name=search_term_string"
              }
            })
          }}
        />
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
