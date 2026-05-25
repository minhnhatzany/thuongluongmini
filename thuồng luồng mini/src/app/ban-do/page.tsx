import MapWrapper from "@/components/MapWrapper";

export const metadata = {
  title: "Bản đồ Thuồng Luồng Mini",
  description: "Bản đồ các địa điểm ăn uống, vui chơi tại Tuyên Quang",
};

export default function MapPage() {
  return (
    <div style={{width: "100%", height: "100%"}}>
      <MapWrapper />
    </div>
  );
}
