import { useEffect } from "react";
import L from "leaflet";

const MapAllLocations = ({ locations }) => {
  useEffect(() => {
    if (!locations || locations.length === 0) return;

    const map = L.map("map").setView([locations[0].lat, locations[0].lng], 10);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: '&copy; OpenStreetMap contributors',
    }).addTo(map);

    // Tạo một icon tùy chỉnh
    const customIcon = L.icon({
      iconUrl: 'https://cdn-icons-png.flaticon.com/512/684/684908.png',
      iconSize: [32, 32], // Kích thước icon
      iconAnchor: [16, 32], // Điểm neo của icon, giúp căn chỉnh đúng
      popupAnchor: [0, -32], // Điểm để hiển thị popup
    });

    const bounds = [];

    locations.forEach((loc) => {
      if (!loc.lat || !loc.lng) return;

      // Thêm marker với icon tùy chỉnh
      const marker = L.marker([loc.lat, loc.lng], { icon: customIcon }).addTo(map);
      marker.bindPopup(`<b>${loc.location_name}</b><br>${loc.address}`);
      bounds.push([loc.lat, loc.lng]);
    });

    if (bounds.length > 0) {
      map.fitBounds(bounds); // Tự động điều chỉnh khung bản đồ để hiển thị hết tất cả các marker
    }

    return () => {
      map.remove(); // cleanup khi component bị unmount
    };
  }, [locations]);

  return <div id="map" style={{ height: "500px", width: "100%" }} />;
};

export default MapAllLocations;
