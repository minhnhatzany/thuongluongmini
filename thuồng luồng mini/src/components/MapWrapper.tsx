"use client";

import dynamic from "next/dynamic";

const MapComponent = dynamic(() => import("@/components/MapComponent"), {
  ssr: false,
  loading: () => <div style={{ height: "100vh", width: "100%", background: "#f0f0f0", display: "flex", alignItems: "center", justifyContent: "center" }}>Đang tải bản đồ...</div>
});

export default function MapWrapper() {
  return <MapComponent />;
}
