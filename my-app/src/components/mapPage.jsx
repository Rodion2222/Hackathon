import React, { useEffect } from "react";
import "./../css/mapPage.css"; // Стили для карты

const MapPage = () => {
  useEffect(() => {
    // Скопируйте JavaScript-код из index.html
    const greenIcon = L.icon({
      iconUrl: './Vector.svg',
      iconSize: [20, 20],
      iconAnchor: [0, 0],
      popupAnchor: [10, -3]
    });

    const map = L.map('map').setView([61.254035, 73.396172], 13);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map);

    async function fetchStopPoints() {
      const url = 'https://its.admhmao.ru/ajax/request?com.rnis.portal.action.stop_point.list';
      const body = {
        headers: {
          meta: {
            filters: {
              withBoundingBox: {
                left_top: { latitude: 61.30, longitude: 73.20 },
                right_bottom: { latitude: 61.20, longitude: 73.50 }
              },
              withZoom: 16,
              withSource: "inventarisation_active",
              withComponents: ["kiutr"]
            },
            response_data: [
              "items/uuid",
              "items/title",
              "items/latitude",
              "items/longitude"
            ]
          }
        },
        payload: {}
      };

      try {
        const response = await fetch(url, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body)
        });
        const data = await response.json();

        if (data.payload?.items) {
          data.payload.items.forEach(stop => {
            L.marker([stop.latitude, stop.longitude], { icon: greenIcon })
              .bindPopup(stop.title)
              .addTo(map);
          });
        }
      } catch (error) {
        console.error("Ошибка загрузки остановок:", error);
      }
    }

    fetchStopPoints();

    return () => {
      map.remove(); // Очистка при размонтировании
    };
  }, []);

  return (
    <div>
      <div id="map"></div>
      <div id="status"></div>
    </div>
  );
};

export default MapPage;