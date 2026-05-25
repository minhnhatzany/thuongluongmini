"use client";

import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { PLACES } from "@/lib/data";
import Link from "next/link";

// Fix for default Leaflet icon in React
const customIcon = new L.Icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

export default function MapComponent() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <div style={{ height: "100vh", width: "100%", background: "#f0f0f0" }}>Đang tải bản đồ...</div>;

  return (
    <MapContainer 
      center={[21.8220, 105.2150]} // Tuyen Quang City center
      zoom={14} 
      style={{ height: "calc(100vh - var(--header-height) - var(--mobile-nav-height))", width: "100%", zIndex: 1 }}
    >
      {/* Google Maps Tile Layer (using Google's free tile servers) */}
      <TileLayer
        url="https://mt1.google.com/vt/lyrs=m&x={x}&y={y}&z={z}"
        attribution='&copy; Google Maps'
      />
      
      {PLACES.map((place: any) => {
        if (!place.coordinates || !place.coordinates.lat || !place.coordinates.lng) return null;
        return (
          <Marker 
            key={place.id} 
            position={[place.coordinates.lat, place.coordinates.lng]}
            icon={customIcon}
          >
            <Popup>
              <div style={{minWidth: "200px"}}>
                <h3 style={{fontSize: "1rem", fontWeight: 700, margin: "0 0 5px 0"}}>{place.name}</h3>
                <p style={{fontSize: "0.85rem", margin: "0 0 10px 0", color: "#666"}}>{place.address}</p>
                <Link 
                  href={`/dia-diem/${place.id}`}
                  style={{display: "inline-block", background: "var(--color-primary)", color: "white", padding: "5px 10px", borderRadius: "5px", textDecoration: "none", fontSize: "0.85rem", fontWeight: "bold"}}
                >
                  Xem chi tiết
                </Link>
              </div>
            </Popup>
          </Marker>
        );
      })}
    </MapContainer>
  );
}
