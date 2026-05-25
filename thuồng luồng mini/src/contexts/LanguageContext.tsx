"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

type Language = "vi" | "en" | "ko";

const DICTIONARY: Record<Language, Record<string, string>> = {
  vi: {
    "nav.home": "Trang chủ",
    "nav.places": "Địa điểm",
    "nav.itinerary": "Lộ trình",
    "nav.map": "Bản đồ",
    "nav.login": "Đăng nhập",
    "nav.profile": "Hồ sơ",
    "home.hero.title": "Khám phá Tuyên Quang",
    "home.hero.desc": "Tìm kiếm các địa điểm ăn uống, vui chơi và du lịch hấp dẫn nhất.",
    "home.search": "Bạn muốn đi đâu hôm nay?",
    "home.category": "Danh mục",
    "home.featured": "Địa điểm nổi bật",
    "home.new": "Mới khai trương",
    "btn.explore": "Khám phá ngay",
    "btn.viewAll": "Xem tất cả",
    "footer.desc": "Cẩm nang du lịch Tuyên Quang nhỏ gọn trong túi bạn."
  },
  en: {
    "nav.home": "Home",
    "nav.places": "Places",
    "nav.itinerary": "Itinerary",
    "nav.map": "Map",
    "nav.login": "Login",
    "nav.profile": "Profile",
    "home.hero.title": "Discover Tuyen Quang",
    "home.hero.desc": "Find the best dining, entertainment, and travel spots.",
    "home.search": "Where do you want to go today?",
    "home.category": "Categories",
    "home.featured": "Featured Places",
    "home.new": "Newly Opened",
    "btn.explore": "Explore Now",
    "btn.viewAll": "View All",
    "footer.desc": "Your pocket guide to Tuyen Quang tourism."
  },
  ko: {
    "nav.home": "홈",
    "nav.places": "장소",
    "nav.itinerary": "일정",
    "nav.map": "지도",
    "nav.login": "로그인",
    "nav.profile": "프로필",
    "home.hero.title": "뚜옌꽝 둘러보기",
    "home.hero.desc": "최고의 식당, 엔터테인먼트, 여행지를 찾아보세요.",
    "home.search": "오늘 어디로 가고 싶으신가요?",
    "home.category": "카테고리",
    "home.featured": "추천 장소",
    "home.new": "새로 오픈",
    "btn.explore": "지금 탐색하기",
    "btn.viewAll": "모두 보기",
    "footer.desc": "내 주머니 속 뚜옌꽝 관광 가이드."
  }
};

interface LanguageContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Language>("vi");

  useEffect(() => {
    const savedLang = localStorage.getItem("tlm_lang") as Language;
    if (savedLang && ["vi", "en", "ko"].includes(savedLang)) {
      setLangState(savedLang);
    }
  }, []);

  const setLang = (newLang: Language) => {
    setLangState(newLang);
    localStorage.setItem("tlm_lang", newLang);
  };

  const t = (key: string) => {
    return DICTIONARY[lang][key] || DICTIONARY["vi"][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
