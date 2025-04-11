"use client";

import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import markerIconPng from "leaflet/dist/images/marker-icon.png";
import markerShadowPng from "leaflet/dist/images/marker-shadow.png";

const customIcon = L.icon({
  iconUrl: markerIconPng.src,
  shadowUrl: markerShadowPng.src,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

type Beach = {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
  slug: string;
  location: string;
};

const BeachMap = () => {
  const [beaches, setBeaches] = useState<Beach[]>([]);

  useEffect(() => {
    // Fetch the beaches from your API endpoint
    fetch("/api/beaches")
      .then((res) => res.json())
      .then((data) => setBeaches(data))
      .catch((err) => console.error("Error fetching beaches:", err));
  }, []);

  return (
    <div className="bg-[#FCF6E1] relative flex justify-center items-center w-full py-24">
      <div className="w-full max-w-5xl rounded-2xl overflow-hidden shadow-lg border border-gray-300 z-0">
        <MapContainer
          center={[44.682, -63.744]} // Default center (Nova Scotia)
          zoom={7}
          className="h-[500px] sm:h-[600px] md:h-[700px] w-full z-0"
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          {beaches.map((beach) => (
            <Marker
              key={beach.id}
              position={[beach.latitude, beach.longitude]}
              icon={customIcon}
            >
              <Popup>
                <a href={`/beaches/${beach.slug}`} className="text-cyan-500 text-xl underline">
                  {beach.name}
                </a>
                <p>{beach.location}</p>

              </Popup>

            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
};

export default BeachMap;




