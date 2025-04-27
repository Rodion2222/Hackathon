import React, { useState, useEffect } from 'react';
import './../css/index.css';
import L from 'leaflet';

const MapPage = () => {
  const [selectedStop, setSelectedStop] = useState(null);
  const [,setStops] = useState([]);

  useEffect(() => {
    // Инициализация карты после загрузки компонента
    const initMap = () => {
      const map = L.map('map').setView([61.254035, 73.396172], 13);

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors'
      }).addTo(map);

      const greenIcon = L.icon({
        iconUrl: './Vector.svg',
        iconSize: [20, 20],
        iconAnchor: [0, 0],
        popupAnchor: [10, -3]
      });

      // Функция для загрузки остановок
      const fetchStopPoints = async () => {
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

          if (data.payload?.items?.length > 0) {
            setStops(data.payload.items);
            showStops(data.payload.items, greenIcon, map, setSelectedStop);
          }
        } catch (error) {
          console.error('Ошибка:', error);
        }
      };

      fetchStopPoints();
    };

    // Проверяем, загружена ли библиотека Leaflet
    if (typeof L !== 'undefined') {
      initMap();
    } else {
      // Если Leaflet не загружен, добавляем скрипт динамически
      const script = document.createElement('script');
      script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
      script.onload = initMap;
      document.head.appendChild(script);
    }
  }, []);

  return (
    <div className="map-container">
      <div id="map" style={{ height: '100vh', width: '100%' }}></div>
      
      {selectedStop && (
        <div className="stop-info-panel">
          <h2>{selectedStop.title}</h2>
          <p>Координаты: {selectedStop.latitude}, {selectedStop.longitude}</p>
          <button onClick={() => setSelectedStop(null)}>Закрыть</button>
        </div>
      )}
    </div>
  );
};

// Функция для отображения маркеров
function showStops(stops, icon, map, setSelectedStop) {
  const markers = [];
  stops.forEach(stop => {
    const marker = L.marker([stop.latitude, stop.longitude], { icon })
      .on('click', () => {
        setSelectedStop(stop);
      })
      .addTo(map);
    markers.push(marker);
  });

  const group = new L.featureGroup(markers);
  map.fitBounds(group.getBounds().pad(0.1));
}

export default MapPage;