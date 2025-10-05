'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import {
  ArrowLeft,
  Thermometer,
  Droplets,
  Wind,
  Eye,
  Sunrise,
  Sunset,
} from 'lucide-react';
import { useLocationStore } from '@/entities/location/model/location-store';
import { WeatherAPI } from '@/entities/weather/api/weather-api';
import { WeatherForecastResponse } from '@/entities/weather/model/types';
import { Loader } from '@/shared/ui/loader';
import { Button } from '@/shared/ui/button';

// 상세 정보 섹션을 위한 컴포넌트
const DetailSection = ({
                         title,
                         icon,
                         children,
                       }: {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}) => (
  <div>
    <h2 className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
      {icon}
      <span>{title}</span>
    </h2>
    <div className="grid grid-cols-2 gap-x-8 gap-y-4">{children}</div>
  </div>
);

// 각 데이터 항목을 위한 컴포넌트
const DataPoint = ({
                     label,
                     value,
                   }: {
  label: string;
  value: string | number;
}) => (
  <div>
    <div className="text-sm text-muted-foreground">{label}</div>
    <div className="text-2xl font-semibold">{value}</div>
  </div>
);

export default function WeatherDetailPage() {
  const router = useRouter();
  const { latitude, longitude } = useLocationStore();

  const [forecast, setForecast] = useState<WeatherForecastResponse | null>(
    null,
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchWeather = useCallback(async (lat: number, lon: number) => {
    setLoading(true);
    setError(null);
    try {
      const data = await WeatherAPI.getWeatherByCoords(lat, lon);
      setForecast(data);
    } catch (err) {
      setError('상세 날씨 정보를 불러오는데 실패했습니다.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    let lat = latitude;
    let lon = longitude;

    if (!lat || !lon) {
      const savedLat = localStorage.getItem('latitude');
      const savedLon = localStorage.getItem('longitude');
      if (savedLat && savedLon) {
        lat = parseFloat(savedLat);
        lon = parseFloat(savedLon);
      }
    }

    if (lat && lon) {
      fetchWeather(lat, lon);
    } else {
      router.push('/');
    }
  }, [latitude, longitude, router, fetchWeather]);

  const formatTime = (timestamp: number) => {
    return new Date(timestamp * 1000).toLocaleTimeString('ko-KR', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    });
  };

  if (loading) return <Loader message="상세 정보를 불러오는 중..." />;
  if (error || !forecast) {
    return (
      <div className="min-h-screen weather-bg cloudy flex flex-col items-center justify-center p-4">
        <p className="text-destructive mb-4">{error || '데이터가 없습니다.'}</p>
        <Button onClick={() => router.back()}>뒤로가기</Button>
      </div>
    );
  }

  const current = forecast.list[0];

  return (
    <div className="flex flex-col flex-1 p-4 max-w-md mx-auto sm:max-w-lg md:max-w-2xl">
      {/* --- 수정된 헤더 --- */}
      <header className="flex items-center justify-between text-white mb-6 sticky top-0 z-10 bg-background/50 backdrop-blur-sm -mx-4 px-4 py-2">
        {/* 이 버튼이 왼쪽 상단의 화살표이며, 클릭 시 router.back()을 호출하여 뒤로 갑니다. */}
        <button
          onClick={() => router.back()}
          className="p-2 rounded-full hover:bg-white/10 transition-colors"
        >
          <ArrowLeft />
        </button>
        <h1 className="text-xl font-semibold">상세 정보</h1>
        <div className="w-10 h-10"></div> {/* 간격 맞춤용 빈 div */}
      </header>

      <main className="flex-1 overflow-y-auto space-y-8 glass-dark rounded-2xl p-6">
        <DetailSection title="온도" icon={<Thermometer size={16} />}>
          <DataPoint label="현재" value={`${Math.round(current.main.temp)}°C`} />
          <DataPoint label="체감" value={`${Math.round(current.main.feels_like)}°C`} />
          <DataPoint label="최저" value={`${Math.round(current.main.temp_min)}°C`} />
          <DataPoint label="최고" value={`${Math.round(current.main.temp_max)}°C`} />
        </DetailSection>

        <DetailSection title="바람" icon={<Wind size={16} />}>
          <DataPoint label="속도" value={`${current.wind.speed} m/s`} />
          <DataPoint label="방향" value={`${current.wind.deg}°`} />
        </DetailSection>

        <DetailSection title="습도 & 기압" icon={<Droplets size={16} />}>
          <DataPoint label="습도" value={`${current.main.humidity}%`} />
          <DataPoint label="기압" value={`${current.main.pressure} hPa`} />
        </DetailSection>

        <DetailSection title="구름 & 가시거리" icon={<Eye size={16} />}>
          <DataPoint label="구름" value={`${current.clouds.all}%`} />
          <DataPoint label="가시거리" value={`${(current.visibility / 1000).toFixed(1)} km`} />
        </DetailSection>

        <DetailSection title="일출 & 일몰" icon={<Sunrise size={16} />}>
          <DataPoint label="일출" value={formatTime(forecast.city.sunrise)} />
          <DataPoint label="일몰" value={formatTime(forecast.city.sunset)} />
        </DetailSection>
      </main>
    </div>
  );
}

