"use client";

import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { Navigation } from 'lucide-react';

// Fix Leaflet missing marker icon in Next.js
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

interface MapProps {
  lat: number;
  lng: number;
  name: string;
  address: string;
}

export default function PlaceMap({ lat, lng, name, address }: MapProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <div style={{ height: "300px", width: "100%", background: "#f0f0f0", borderRadius: "12px", display: "flex", alignItems: "center", justifyContent: "center" }}>Đang tải bản đồ...</div>;

  return (
    <div style={{ position: "relative", width: "100%", height: "300px", borderRadius: "12px", overflow: "hidden", zIndex: 1 }}>
      <MapContainer center={[lat, lng]} zoom={15} style={{ height: '100%', width: '100%' }}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[lat, lng]}>
          <Popup>
            <strong>{name}</strong><br/>
            {address}
          </Popup>
        </Marker>
      </MapContainer>
      
      <a 
        href={`https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`}
        target="_blank"
        rel="noreferrer"
        className="btn btn--primary"
        style={{
          position: "absolute",
          bottom: "10px",
          right: "10px",
          zIndex: 400,
          boxShadow: "0 4px 10px rgba(0,0,0,0.3)"
        }}
      >
        <Navigation size={18} style={{marginRight: "5px"}}/>
        Chỉ đường
      </a>
    </div>
  );
}
