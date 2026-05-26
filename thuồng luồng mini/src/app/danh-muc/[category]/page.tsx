import { CATEGORIES, getPlacesByCategory } from "@/lib/data";
import PlaceCard from "@/components/PlaceCard";
import type { Metadata } from "next";

const CATEGORY_META: Record<string, { title: string; description: string }> = {
  "an-uong": {
    title: "Quán Ăn Ngon Tuyên Quang - Review Ẩm Thực Địa Phương",
    description: "Tổng hợp quán ăn ngon, quán nhậu, nhà hàng, cafe tại Tuyên Quang. Review chi tiết, đánh giá thực tế từ Thuồng Luồng Mini.",
  },
  "vui-choi": {
    title: "Địa Điểm Vui Chơi Tuyên Quang - Check-in Đẹp",
    description: "Khám phá các địa điểm vui chơi, giải trí, check-in đẹp tại Tuyên Quang. Đánh giá thực tế từ Thuồng Luồng Mini.",
  },
  "du-lich": {
    title: "Du Lịch Tuyên Quang - Na Hang, Thác Bà, Lâm Bình",
    description: "Điểm du lịch nổi tiếng Tuyên Quang: Na Hang, Thác Bà, Lâm Bình, Núi Dùm. Lộ trình, kinh nghiệm từ Thuồng Luồng Mini.",
  },
  "luu-tru": {
    title: "Khách Sạn, Nhà Nghỉ Tuyên Quang - Lưu Trú Giá Tốt",
    description: "Tổng hợp khách sạn, nhà nghỉ, homestay tại Tuyên Quang. Review chi tiết, giá cả từ Thuồng Luồng Mini.",
  },
  "trang-phuc": {
    title: "Shop Thời Trang Tuyên Quang - Mua Sắm Địa Phương",
    description: "Shop thời trang, quần áo, phụ kiện tại Tuyên Quang. Review từ Thuồng Luồng Mini.",
  },
};

export async function generateMetadata(props: any): Promise<Metadata> {
  const params = await props.params;
  const categoryId = params.category;
  const meta = CATEGORY_META[categoryId];
  if (!meta) return {};
  return {
    title: meta.title,
    description: meta.description,
    alternates: {
      canonical: `https://thuongluongmini-v2.pages.dev/danh-muc/${categoryId}`,
    },
    openGraph: {
      title: meta.title,
      description: meta.description,
      url: `https://thuongluongmini-v2.pages.dev/danh-muc/${categoryId}`,
    },
  };
}

export async function generateStaticParams() {
  return CATEGORIES.map((cat: any) => ({
    category: cat.id,
  }));
}

export default async function CategoryPage(props: any) {
  const params = await props.params;
  const categoryId = params.category;
  
  const category = CATEGORIES.find((c: any) => c.id === categoryId);
  const places = getPlacesByCategory(categoryId);

  if (!category) {
    return <div className="container" style={{paddingTop: "40px"}}><h2>Danh mục không tồn tại</h2></div>;
  }

  return (
    <div className="page-container">
      <div className="category-header" style={{background: `linear-gradient(135deg, ${category.color}, #1F2937)`}}>
        <div className="container">
          <div className="category-header__icon">{category.icon}</div>
          <h1 className="category-header__title">{category.name}</h1>
          <p className="category-header__desc">{category.description}</p>
        </div>
      </div>

      <div className="container" style={{padding: "var(--space-6) 0"}}>
        <div className="places-grid">
          {places.length > 0 ? (
            places.map((place: any) => <PlaceCard key={place.id} place={place} />)
          ) : (
            <div className="empty-state">
              <div className="empty-state__icon">🔍</div>
              <h2>Chưa có địa điểm nào</h2>
              <p>Chúng mình đang cập nhật dữ liệu cho khu vực này, bạn quay lại sau nhé!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
