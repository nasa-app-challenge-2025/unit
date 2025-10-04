'use client';

import { Cloud, MapPin, Search, Thermometer, Droplets, Wind, Eye, Sun } from 'lucide-react';
import { useState } from 'react';
import { WeatherData } from '@/lib/weather';
import * as Dialog from '@radix-ui/react-dialog';
import DetailedConditions from './weather/DetailedConditions';
import HourlyForecast from './weather/HourlyForecast';
import DailyForecast from './weather/DailyForecast';

interface WeatherCardProps {
  weather: WeatherData;
  onSearch: () => void;
}

export default function WeatherCard({ weather, onSearch }: WeatherCardProps) {
  const [sheetType, setSheetType] = useState<'details' | 'hourly' | 'daily' | null>(null);

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
        onClick={() => setSheetType('details')}
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
            <div className="text-sm text-muted-foreground">Feels like {weather.feelsLike}°C</div>
            <div className="text-sm text-muted-foreground">H:{weather.high}° L:{weather.low}°</div>
          </div>
        </div>
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Droplets className="w-4 h-4" />
            <span className="hidden sm:inline">Humidity {weather.humidity}%</span>
            <span className="sm:hidden">{weather.humidity}%</span>
          </div>
          <div className="flex items-center gap-1">
            <Wind className="w-4 h-4" />
            <span className="hidden sm:inline">Wind {weather.windSpeed}m/s</span>
            <span className="sm:hidden">{weather.windSpeed}m/s</span>
          </div>
        </div>
        <div className="mt-4 text-center">
          <span className="text-xs text-muted-foreground">▼ Tap for details</span>
        </div>
        <div className="flex justify-between mt-6">
          <button className="text-xs underline" onClick={e => {e.stopPropagation(); setSheetType('hourly')}}>Hourly Forecast</button>
          <button className="text-xs underline" onClick={e => {e.stopPropagation(); setSheetType('daily')}}>10-Day Forecast</button>
        </div>
      </div>
      {/* Sheet (Slideover) UI */}
      <Dialog.Root open={!!sheetType} onOpenChange={open => !open && setSheetType(null)}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-black/40 z-40" />
          <Dialog.Content className={`fixed left-0 right-0 bottom-0 z-50 bg-background rounded-t-2xl shadow-lg transition-all duration-300 ${sheetType === 'daily' ? 'h-[80vh]' : 'h-[60vh]'} overflow-y-auto`}>
            <div className="p-4">
              <button className="absolute right-4 top-4 text-muted-foreground" onClick={() => setSheetType(null)}>Close</button>
              {sheetType === 'details' && <DetailedConditions current={weather.current} city={weather.city} />}
              {sheetType === 'hourly' && <HourlyForecast forecast={weather.hourly} />}
              {sheetType === 'daily' && <DailyForecast forecast={weather.daily} />}
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  );
}
