"use client";

import dynamic from "next/dynamic";

const PlaceMap = dynamic(() => import("@/components/Map"), {
  ssr: false,
  loading: () => (
    <div style={{ height: "300px", width: "100%", background: "var(--color-bg-secondary)", borderRadius: "12px", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <span className="spinner"></span> Đang tải bản đồ...
    </div>
  )
});

interface PlaceMapWrapperProps {
  lat: number;
  lng: number;
  name: string;
  address: string;
}

export default function PlaceMapWrapper(props: PlaceMapWrapperProps) {
  return <PlaceMap {...props} />;
}
