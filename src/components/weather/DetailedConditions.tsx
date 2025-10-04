'use client';

import { ForecastItem, CityInfo } from '@/lib/api/weather';
import { Thermometer, Droplets, Wind, Eye, Sun, Gauge } from 'lucide-react';

interface DetailedConditionsProps {
  current: ForecastItem;
  city: CityInfo;
}

export default function DetailedConditions({ current, city }: DetailedConditionsProps) {
  const formatTime = (timestamp: number) => {
    return new Date(timestamp * 1000).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    });
  };

  return (
    <div className="glass-dark rounded-2xl p-6">
      <h2 className="text-lg font-semibold mb-6">📊 Details</h2>

      <div className="space-y-6">
        {/* Temperature */}
        <div>
          <div className="flex items-center gap-2 mb-3 text-muted-foreground">
            <Thermometer className="w-4 h-4" />
            <span className="text-sm font-medium">Temperature</span>
          </div>
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div>
              <div className="text-muted-foreground">Current</div>
              <div className="text-lg font-semibold">{Math.round(current.main.temp)}°C</div>
            </div>
            <div>
              <div className="text-muted-foreground">Feels Like</div>
              <div className="text-lg font-semibold">{Math.round(current.main.feels_like)}°C</div>
            </div>
            <div>
              <div className="text-muted-foreground">Min</div>
              <div className="text-lg font-semibold">{Math.round(current.main.temp_min)}°C</div>
            </div>
            <div>
              <div className="text-muted-foreground">Max</div>
              <div className="text-lg font-semibold">{Math.round(current.main.temp_max)}°C</div>
            </div>
          </div>
        </div>

        {/* Wind */}
        <div>
          <div className="flex items-center gap-2 mb-3 text-muted-foreground">
            <Wind className="w-4 h-4" />
            <span className="text-sm font-medium">Wind</span>
          </div>
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div>
              <div className="text-muted-foreground">Speed</div>
              <div className="text-lg font-semibold">{current.wind.speed} m/s</div>
            </div>
            <div>
              <div className="text-muted-foreground">Direction</div>
              <div className="text-lg font-semibold">{current.wind.deg}°</div>
            </div>
          </div>
        </div>

        {/* Humidity & Pressure */}
        <div>
          <div className="flex items-center gap-2 mb-3 text-muted-foreground">
            <Droplets className="w-4 h-4" />
            <span className="text-sm font-medium">Humidity & Pressure</span>
          </div>
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div>
              <div className="text-muted-foreground">Humidity</div>
              <div className="text-lg font-semibold">{current.main.humidity}%</div>
            </div>
            <div>
              <div className="text-muted-foreground">Pressure</div>
              <div className="text-lg font-semibold">{current.main.pressure} hPa</div>
            </div>
          </div>
        </div>

        {/* Visibility & Clouds */}
        <div>
          <div className="flex items-center gap-2 mb-3 text-muted-foreground">
            <Eye className="w-4 h-4" />
            <span className="text-sm font-medium">Clouds & Visibility</span>
          </div>
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div>
              <div className="text-muted-foreground">Clouds</div>
              <div className="text-lg font-semibold">{current.clouds.all}%</div>
            </div>
            <div>
              <div className="text-muted-foreground">Visibility</div>
              <div className="text-lg font-semibold">{(current.visibility / 1000).toFixed(1)} km</div>
            </div>
          </div>
        </div>

        {/* Sun */}
        <div>
          <div className="flex items-center gap-2 mb-3 text-muted-foreground">
            <Sun className="w-4 h-4" />
            <span className="text-sm font-medium">Sun</span>
          </div>
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div>
              <div className="text-muted-foreground">Sunrise</div>
              <div className="text-lg font-semibold">{formatTime(city.sunrise)}</div>
            </div>
            <div>
              <div className="text-muted-foreground">Sunset</div>
              <div className="text-lg font-semibold">{formatTime(city.sunset)}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
