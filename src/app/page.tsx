'use client';

import { useState, useEffect } from 'react';

// FSD Layers
import { useLocationStore } from '@/entities/location/model/location-store';
import { useDeviceLocation } from '@/entities/location/model/use-device-location';
import { WeatherAPI } from '@/entities/weather/api/weather-api';
import { WeatherForecastResponse } from '@/entities/weather/model/types';
import { Header } from '@/widgets/header/ui/Header';
import { HourlyForecast } from '@/widgets/weather/ui/HourlyForecast';
import { DailyForecast } from '@/widgets/weather/ui/DailyForecast';
import { DetailedConditions } from '@/widgets/weather/ui/DetailedConditions';
import { PersonalizedHealth } from '@/widgets/health/ui/PersonalizedHealth';
import { Loader } from '@/shared/ui/loader';
import { Button } from '@/shared/ui/button';

export default function HomePage() {
  const {
    location: deviceLocation,
    loading: locationLoading,
    error: locationError,
    requestLocation,
  } = useDeviceLocation();
  const {
    latitude: selectedLat,
    longitude: selectedLon,
    clearLocation,
  } = useLocationStore();

  const [forecast, setForecast] = useState<WeatherForecastResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (selectedLat && selectedLon) {
      fetchWeather(selectedLat, selectedLon);
      clearLocation();
    } else if (deviceLocation) {
      fetchWeather(deviceLocation.lat, deviceLocation.lon);
    }
  }, [deviceLocation, selectedLat, selectedLon]);

  const fetchWeather = async (lat: number, lon: number) => {
    setLoading(true);
    setError(null);
    try {
      const data = await WeatherAPI.getWeatherByCoords(lat, lon);
      setForecast(data);
    } catch (err) {
      setError('날씨 정보를 불러오는데 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  if ((locationLoading && !selectedLat) || loading) {
    return <Loader />;
  }

  if (locationError || error) {
    return (
      <div className="min-h-screen weather-bg cloudy flex items-center justify-center p-4">
        <div className="text-center">
          <p className="text-destructive mb-4">{locationError || error}</p>
          <Button onClick={requestLocation}>위치 권한 재요청</Button>
        </div>
      </div>
    );
  }

  if (!forecast) return <Loader message="날씨 데이터가 없습니다." />;

  const current = forecast.list[0];

  return (
    <div className="flex flex-col flex-1">
      <Header
        onMenuClick={() => {}}
        onCalendarClick={() => {}}
        onNotificationClick={() => {}}
      />
      <main className="flex-1 overflow-y-auto px-4 py-6 space-y-6 max-w-md mx-auto sm:max-w-lg md:max-w-2xl lg:max-w-4xl">
        <div className="glass-dark rounded-2xl p-6">
          <div className="flex items-center justify-between mb-4">
          <span className="text-sm text-muted-foreground">
            📍 {forecast.city.name}, {forecast.city.country}
          </span>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <div className="text-5xl font-bold">{current.main.temp}°C</div>
              <div className="text-muted-foreground mt-1 capitalize">
                {current.weather[0].description}
              </div>
            </div>
            <div className="text-right text-sm text-muted-foreground">
              <div>체감 {current.main.feels_like}°C</div>
              <div>
                최고:{current.main.temp_max}° 최저:{current.main.temp_min}°
              </div>
            </div>
          </div>
        </div>

        <HourlyForecast forecast={forecast.list} />
        <DailyForecast forecast={forecast.list} />

        <div className="space-y-4">
          <h2 className="text-lg font-semibold px-2">👩‍⚕️ 맞춤 건강 정보</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <PersonalizedHealth current={current} />
          </div>
        </div>

        <DetailedConditions current={current} city={forecast.city} />
      </main>
    </div>
  );
}
