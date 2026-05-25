import { CATEGORIES, getPlacesByCategory } from "@/lib/data";
import PlaceCard from "@/components/PlaceCard";

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
