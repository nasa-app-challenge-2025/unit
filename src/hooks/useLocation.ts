'use client';

import { useState, useEffect } from 'react';

interface LocationData {
  lat: number;
  lon: number;
  city: string;
  country: string;
}

interface UseLocationReturn {
  location: LocationData | null;
  loading: boolean;
  error: string | null;
  requestLocation: () => void;
}

export function useLocation(): UseLocationReturn {
  const [location, setLocation] = useState<LocationData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const requestLocation = () => {
    if (!navigator.geolocation) {
      setError('이 브라우저는 위치 서비스를 지원하지 않습니다.');
      return;
    }

    setLoading(true);
    setError(null);

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const { latitude, longitude } = position.coords;
          
          // Reverse geocoding to get city name
          const response = await fetch(
            `https://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&limit=1&appid=${process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY || 'demo'}`
          );
          
          if (response.ok) {
            const data = await response.json();
            if (data.length > 0) {
              setLocation({
                lat: latitude,
                lon: longitude,
                city: data[0].name,
                country: data[0].country
              });
            } else {
              setLocation({
                lat: latitude,
                lon: longitude,
                city: '알 수 없는 위치',
                country: ''
              });
            }
          } else {
            // Fallback to coordinates only
            setLocation({
              lat: latitude,
              lon: longitude,
              city: '현재 위치',
              country: ''
            });
          }
        } catch (err) {
          console.error('Reverse geocoding failed:', err);
          setLocation({
            lat: latitude,
            lon: longitude,
            city: '현재 위치',
            country: ''
          });
        } finally {
          setLoading(false);
        }
      },
      (err) => {
        setError('위치 정보를 가져올 수 없습니다. 위치 권한을 허용해주세요.');
        setLoading(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 300000 // 5 minutes
      }
    );
  };

  useEffect(() => {
    // Auto-request location on mount
    requestLocation();
  }, []);

  return {
    location,
    loading,
    error,
    requestLocation
  };
}
