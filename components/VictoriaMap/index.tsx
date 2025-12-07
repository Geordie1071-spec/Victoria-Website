"use client";

import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect } from "react";

export type Coordinate = {
  lat: string;
  lon: string;
  title?: string;
  distance?: number;
  wikipediaUrl?: string;
  isMain?: boolean;
};

// Fix icon issue by removing extra spaces
const blueIcon = L.icon({
  iconUrl:
    "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-blue.png", // Removed trailing spaces
  shadowUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const goldIcon = L.icon({
  iconUrl:
    "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-gold.png", // Removed trailing spaces
  shadowUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

// Fix bounds calculation
function FitBounds({ coords }: { coords: Coordinate[] }) {
  const map = useMap();

  useEffect(() => {
    if (coords.length > 0) {
      const bounds = coords.map(c => [Number(c.lat), Number(c.lon)]);
      map.fitBounds(bounds as L.LatLngBoundsExpression, { padding: [50, 50] });
    }
  }, [coords, map]);

  return null;
}

export default function VictoriaMap({ coords }: { coords: Coordinate[] }) {
  if (!coords || coords.length === 0) {
    return <div>No coordinates provided</div>;
  }

  return (
    <div className="rounded-xl overflow-hidden shadow-md w-full">
      <MapContainer
        center={[-37.8136, 144.9631]} 
        zoom={7} 
        style={{ width: "100%", height: "500px" }}
        className="z-[1] w-full"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <FitBounds coords={coords} />
        {coords.map((c, i) => (
          <Marker
            key={i}
            position={[Number(c.lat), Number(c.lon)]}
            icon={c.isMain ? goldIcon : blueIcon}
          >
            <Popup>
              <strong>{c.title || `Marker ${i + 1}`}</strong>
              {c.distance && (
                <div>{c.distance.toFixed(1)} km away</div>
              )}
              {c.wikipediaUrl && (
                <a
                  href={c.wikipediaUrl.startsWith('http') ? c.wikipediaUrl : `https://${c.wikipediaUrl}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: "#0077ff", fontWeight: 600 }}
                >
                  Wikipedia →
                </a>
              )}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}