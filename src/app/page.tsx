'use client';

import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import WeatherCard from '@/components/WeatherCard';
import HourlyForecast from '@/components/weather/HourlyForecast';
import DailyForecast from '@/components/weather/DailyForecast';
import DetailedConditions from '@/components/weather/DetailedConditions';
import { useLocation } from '@/hooks/useLocation';
import { WeatherAPI, WeatherForecastResponse } from '@/lib/api/weather';

export default function Home() {
  const { location, loading: locationLoading, error: locationError, requestLocation } = useLocation();
  const [forecast, setForecast] = useState<WeatherForecastResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (location) {
      fetchWeather();
    }
  }, [location]);

  const fetchWeather = async () => {
    if (!location) return;

    setLoading(true);
    setError(null);

    try {
      const data = await WeatherAPI.getWeatherByCoords(location.lat, location.lon);
      setForecast(data);
    } catch (err) {
      setError('날씨 정보를 불러오는데 실패했습니다.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    console.log('Search clicked');
  };

  const handleMenu = () => {
    console.log('Menu clicked');
  };

  const handleCalendar = () => {
    console.log('Calendar clicked');
  };

  const handleNotification = () => {
    console.log('Notification clicked');
  };

  if (locationLoading || loading) {
    return (
      <div className="min-h-screen weather-bg cloudy flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">날씨 정보를 불러오는 중...</p>
        </div>
      </div>
    );
  }

  if (locationError || error) {
    return (
      <div className="min-h-screen weather-bg cloudy flex items-center justify-center">
        <div className="text-center">
          <p className="text-destructive mb-4">{locationError || error}</p>
          <button
            onClick={requestLocation}
            className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
          >
            다시 시도
          </button>
        </div>
      </div>
    );
  }

  if (!forecast) {
    return null;
  }

  const current = forecast.list[0];

  return (
    <div className="min-h-screen weather-bg cloudy">
      <Header
        onSearch={handleSearch}
        onMenu={handleMenu}
        onCalendar={handleCalendar}
        onNotification={handleNotification}
      />

      <main className="px-4 py-6 space-y-6 max-w-md mx-auto sm:max-w-lg md:max-w-2xl lg:max-w-4xl overflow-y-auto">
        {/* 기본 날씨 카드 */}
        <div className="glass-dark rounded-2xl p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">
                📍 {forecast.city.name}, {forecast.city.country}
              </span>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <div className="text-5xl font-bold">{Math.round(current.main.temp)}°C</div>
              <div className="text-muted-foreground mt-1">{current.weather[0].description}</div>
            </div>
            <div className="text-right">
              <div className="text-sm text-muted-foreground">체감 {Math.round(current.main.feels_like)}°C</div>
              <div className="text-sm text-muted-foreground">
                H:{Math.round(current.main.temp_max)}° L:{Math.round(current.main.temp_min)}°
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between mt-4 text-sm text-muted-foreground">
            <div>💧 {current.main.humidity}%</div>
            <div>🌬️ {current.wind.speed}m/s</div>
          </div>
        </div>

        {/* 시간별 예보 */}
        <HourlyForecast forecast={forecast.list} />

        {/* 10일 예보 */}
        <DailyForecast forecast={forecast.list} />

        {/* 상세 정보 */}
        <DetailedConditions current={current} city={forecast.city} />
      </main>
    </div>
  );
}
