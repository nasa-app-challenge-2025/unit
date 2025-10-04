'use client';

import { Cloud, MapPin, Search, Thermometer, Droplets, Wind, Eye, Sun } from 'lucide-react';
import { useState } from 'react';
import { WeatherData } from '@/lib/weather';

interface WeatherCardProps {
  weather: WeatherData;
  onSearch: () => void;
}

export default function WeatherCard({ weather, onSearch }: WeatherCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const getWeatherIcon = (condition: string) => {
    switch (condition.toLowerCase()) {
      case 'sunny':
      case 'clear':
        return <Sun className="w-8 h-8 text-yellow-400" />;
      case 'cloudy':
      case 'overcast':
        return <Cloud className="w-8 h-8 text-gray-400" />;
      case 'rainy':
      case 'rain':
        return <Droplets className="w-8 h-8 text-blue-400" />;
      default:
        return <Cloud className="w-8 h-8 text-gray-400" />;
    }
  };

  return (
    <div className="relative">
      {/* Main Weather Card */}
      <div 
        className="glass-dark rounded-2xl p-6 cursor-pointer transition-all duration-300 hover:scale-105"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">{weather.location}</span>
          </div>
          <button 
            onClick={(e) => {
              e.stopPropagation();
              onSearch();
            }}
            className="p-2 rounded-full hover:bg-white/10 transition-colors"
          >
            <Search className="w-4 h-4" />
          </button>
        </div>

        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            {getWeatherIcon(weather.condition)}
            <div>
              <div className="text-2xl sm:text-3xl font-bold">{weather.temperature}°C</div>
              <div className="text-sm text-muted-foreground">{weather.condition}</div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-sm text-muted-foreground">체감 {weather.feelsLike}°C</div>
            <div className="text-sm text-muted-foreground">H:{weather.high}° L:{weather.low}°</div>
          </div>
        </div>

        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Droplets className="w-4 h-4" />
            <span className="hidden sm:inline">습도 {weather.humidity}%</span>
            <span className="sm:hidden">{weather.humidity}%</span>
          </div>
          <div className="flex items-center gap-1">
            <Wind className="w-4 h-4" />
            <span className="hidden sm:inline">풍속 {weather.windSpeed}m/s</span>
            <span className="sm:hidden">{weather.windSpeed}m/s</span>
          </div>
        </div>

        {!isExpanded && (
          <div className="mt-4 text-center">
            <span className="text-xs text-muted-foreground">▼ 탭하여 자세히 보기</span>
          </div>
        )}
      </div>

      {/* Expanded Weather Details */}
      {isExpanded && (
        <div className="glass-dark rounded-2xl p-6 mt-4 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Thermometer className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm">현재 온도</span>
              </div>
              <div className="text-lg font-semibold">{weather.temperature}°C</div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Thermometer className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm">체감 온도</span>
              </div>
              <div className="text-lg font-semibold">{weather.feelsLike}°C</div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Thermometer className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm">최고/최저</span>
              </div>
              <div className="text-lg font-semibold">{weather.high}°C / {weather.low}°C</div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Droplets className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm">습도</span>
              </div>
              <div className="text-lg font-semibold">{weather.humidity}%</div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Wind className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm">풍속</span>
              </div>
              <div className="text-lg font-semibold">{weather.windSpeed}m/s</div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Eye className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm">가시거리</span>
              </div>
              <div className="text-lg font-semibold">{weather.visibility}km</div>
            </div>
          </div>

          <div className="pt-4 border-t border-border">
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2">
                <Sun className="w-4 h-4 text-yellow-400" />
                <span>일출: {weather.sunrise}</span>
              </div>
              <div className="flex items-center gap-2">
                <Sun className="w-4 h-4 text-orange-400" />
                <span>일몰: {weather.sunset}</span>
              </div>
            </div>
            <div className="mt-2 text-center">
              <span className="text-sm text-muted-foreground">자외선 지수: {weather.uvIndex} (보통)</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-2 pt-4">
            <button className="flex-1 py-2 px-4 bg-primary/20 text-primary rounded-lg text-sm font-medium hover:bg-primary/30 transition-colors">
              시간별 예보 →
            </button>
            <button className="flex-1 py-2 px-4 bg-primary/20 text-primary rounded-lg text-sm font-medium hover:bg-primary/30 transition-colors">
              주간 예보 →
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
