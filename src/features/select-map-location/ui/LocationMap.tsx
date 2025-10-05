'use client';

import { useState } from 'react';
import {
  MapContainer,
  TileLayer,
  Marker,
  useMap,
  useMapEvents,
} from 'react-leaflet';
import L from 'leaflet';
import { setupLeafletIcons } from '@/shared/config/leaflet-config';
import { NominatimAPI } from '../api/nominatim-api';

setupLeafletIcons();

interface LocationMapProps {
  onLocationSelect: (lat: number, lon: number, address: string) => void;
}

function LocationMarker({
  onPositionChange,
}: {
  onPositionChange: (pos: L.LatLng) => void;
}) {
  const [position, setPosition] = useState<L.LatLng | null>(null);
  useMapEvents({
    click(e) {
      setPosition(e.latlng);
      onPositionChange(e.latlng);
    },
  });
  return position === null ? null : <Marker position={position}></Marker>;
}

function ChangeView({ center }: { center: [number, number] }) {
  const map = useMap();
  map.setView(center, map.getZoom());
  return null;
}

export function LocationMap({ onLocationSelect }: LocationMapProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [mapCenter, setMapCenter] = useState<[number, number]>([
    37.5796, 126.9772,
  ]);

  const handlePositionChange = async (pos: L.LatLng) => {
    const address = await NominatimAPI.getAddressFromCoords(pos.lat, pos.lng);
    onLocationSelect(pos.lat, pos.lng, address);
  };

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery) return;
    try {
      const result = await NominatimAPI.getCoordsFromAddress(searchQuery);
      if (result) {
        setMapCenter([result.lat, result.lon]);
        onLocationSelect(result.lat, result.lon, result.address);
      } else {
        alert('검색 결과가 없습니다.');
      }
    } catch (error: any) {
      alert(error.message);
    }
  };

  return (
    <div className='relative h-full w-full'>
      <div className='absolute top-4 left-1/2 -translate-x-1/2 z-[1000] w-[90%]'>
        <form onSubmit={handleSearch} className='flex items-center'>
          <input
            type='text'
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder='위치를 검색하세요.'
            className='w-full px-4 py-3 text-white bg-black/50 rounded-lg backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-white/50'
          />
        </form>
      </div>
      <MapContainer
        center={mapCenter}
        zoom={13}
        style={{ height: '100%', width: '100%' }}
      >
        <ChangeView center={mapCenter} />
        <TileLayer
          url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <LocationMarker onPositionChange={handlePositionChange} />
      </MapContainer>
    </div>
  );
}
