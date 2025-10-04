'use client';

import { ForecastItem } from '@/lib/api/weather';
import { Cloud, Sun, CloudRain } from 'lucide-react';

interface DailyForecastProps {
  forecast: ForecastItem[];
}

export default function DailyForecast({ forecast }: DailyForecastProps) {
  // Group by date
  const dailyData = forecast.reduce((acc, item) => {
    const date = new Date(item.dt * 1000).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      weekday: 'short'
    });

    if (!acc[date]) {
      acc[date] = {
        temps: [],
        pops: [],
        weather: item.weather[0],
        date: date
      };
    }

    acc[date].temps.push(item.main.temp);
    acc[date].pops.push(item.pop);

    return acc;
  }, {} as Record<string, any>);

  // Show up to 10 days
  const days = Object.values(dailyData).slice(0, 10);

  const getWeatherIcon = (iconCode: string) => {
    if (iconCode.includes('01')) return <Sun className="w-5 h-5 text-yellow-400" />;
    if (iconCode.includes('09') || iconCode.includes('10')) return <CloudRain className="w-5 h-5 text-blue-400" />;
    return <Cloud className="w-5 h-5 text-gray-400" />;
  };

  const getTempBar = (min: number, max: number) => {
    const range = max - min;
    const percentage = Math.min((range / 20) * 100, 100);
    return (
      <div className="flex-1 relative h-2 bg-gray-700 rounded-full overflow-hidden">
        <div
          className="absolute left-0 h-full bg-gradient-to-r from-blue-400 to-orange-400 rounded-full"
          style={{ width: `${percentage}%` }}
        />
      </div>
    );
  };

  return (
    <div className="glass-dark rounded-2xl p-6">
      <h2 className="text-lg font-semibold mb-4">📅 10일 예보</h2>

      <div className="space-y-3">
        {days.map((day, index) => {
          const minTemp = Math.round(Math.min(...day.temps));
          const maxTemp = Math.round(Math.max(...day.temps));
          const avgPop = Math.round(Math.max(...day.pops) * 100);

          return (
            <div key={index} className="flex items-center gap-3 text-sm">
              <div className="w-16 text-muted-foreground">
                {index === 0 ? 'Today' : day.date.split(' ')[1]}
              </div>
              <div className="w-8">
                {getWeatherIcon(day.weather.icon)}
              </div>
              <div className="w-12 text-right text-muted-foreground">
                {minTemp}°
              </div>
              {getTempBar(minTemp, maxTemp)}
              <div className="w-12 text-right font-semibold">
                {maxTemp}°
              </div>
              <div className="w-12 text-right text-blue-400">
                {avgPop}%
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}