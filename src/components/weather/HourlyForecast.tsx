'use client';

import { ForecastItem } from '@/lib/api/weather';
import { Cloud, Sun, CloudRain, CloudSnow } from 'lucide-react';

interface HourlyForecastProps {
  forecast: ForecastItem[];
}

export default function HourlyForecast({ forecast }: HourlyForecastProps) {
  const getWeatherIcon = (iconCode: string) => {
    if (iconCode.includes('01')) return <Sun className="w-6 h-6 text-yellow-400" />;
    if (iconCode.includes('09') || iconCode.includes('10')) return <CloudRain className="w-6 h-6 text-blue-400" />;
    if (iconCode.includes('13')) return <CloudSnow className="w-6 h-6 text-blue-200" />;
    return <Cloud className="w-6 h-6 text-gray-400" />;
  };

  const formatTime = (dt: number) => {
    const date = new Date(dt * 1000);
    return date.getHours() + 'h';
  };

  // Show only first 8 items (24 hours)
  const hourlyData = forecast.slice(0, 8);

  return (
    <div className="glass-dark rounded-2xl p-6">
      <h2 className="text-lg font-semibold mb-4">🕒 Hourly Forecast</h2>

      <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
        {hourlyData.map((item, index) => (
          <div key={index} className="flex flex-col items-center min-w-[80px] gap-2">
            <div className="text-sm text-muted-foreground">
              {index === 0 ? 'Now' : formatTime(item.dt)}
            </div>
            {getWeatherIcon(item.weather[0].icon)}
            <div className="text-lg font-semibold">
              {Math.round(item.main.temp)}°
            </div>
            {item.pop > 0 && (
              <div className="text-xs text-blue-400">
                {Math.round(item.pop * 100)}%
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
