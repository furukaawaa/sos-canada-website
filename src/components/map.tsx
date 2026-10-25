'use client';

import { useEffect, useRef } from 'react';

/**
 * ============================================
 * Leaflet Map
 * ============================================
 * Mapa interativo com marcadores customizados de aeroportos. Client-only (sem SSR).
 */

import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

interface Airport {
  code: string;
  name: string;
  city: string;
  country: string;
  latitude: string;
  longitude: string;
}

interface MapProps {
  airports: Airport[];
  selectedAirport: Airport | null;
  onSelectAirport: (airport: Airport) => void;
}

export default function Map({ airports, selectedAirport, onSelectAirport }: MapProps) {
  const mapRef = useRef<L.Map | null>(null);
  const markersRef = useRef<L.Marker[]>([]);

  useEffect(() => {
    if (!mapRef.current) {
      // Inicializar mapa
      mapRef.current = L.map('map').setView([0, 0], 2);

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors',
        maxZoom: 18,
      }).addTo(mapRef.current);
    }

    // Limpar marcadores antigos
    markersRef.current.forEach(marker => marker.remove());
    markersRef.current = [];

    // Adicionar novos marcadores
    airports.forEach(airport => {
      if (airport.latitude && airport.longitude) {
        const lat = parseFloat(airport.latitude);
        const lng = parseFloat(airport.longitude);

        const isSelected = selectedAirport?.code === airport.code;

        const icon = L.divIcon({
          className: 'custom-marker',
          html: `
            <div class="flex flex-col items-center">
              <div class="${isSelected ? 'bg-red-600' : 'bg-blue-600'} text-white rounded-full w-10 h-10 flex items-center justify-center font-bold text-xs shadow-lg border-2 border-white transform transition-transform ${isSelected ? 'scale-125' : 'scale-100'}">
                ${airport.code}
              </div>
              <div class="bg-white px-2 py-1 rounded shadow text-xs font-semibold mt-1 ${isSelected ? 'block' : 'hidden'}">
                ${airport.city}
              </div>
            </div>
          `,
          iconSize: [40, 40],
          iconAnchor: [20, 40],
        });

        const marker = L.marker([lat, lng], { icon })
          .addTo(mapRef.current!)
          .on('click', () => onSelectAirport(airport));

        markersRef.current.push(marker);
      }
    });

    // Centralizar no aeroporto selecionado
    if (selectedAirport && selectedAirport.latitude && selectedAirport.longitude) {
      const lat = parseFloat(selectedAirport.latitude);
      const lng = parseFloat(selectedAirport.longitude);
      mapRef.current?.setView([lat, lng], 6, { animate: true });
    } else if (airports.length > 0 && airports[0].latitude && airports[0].longitude) {
      const lat = parseFloat(airports[0].latitude);
      const lng = parseFloat(airports[0].longitude);
      mapRef.current?.setView([lat, lng], 4);
    }

    return () => {
      // Cleanup ao desmontar
      if (mapRef.current) {
        markersRef.current.forEach(marker => marker.remove());
      }
    };
  }, [airports, selectedAirport, onSelectAirport]);

  return <div id="map" className="w-full h-full rounded-lg" />;
}
