'use client';

import { ForecastItem, CityInfo } from '@/entities/weather/model/types';
import { Thermometer, Droplets, Wind, Eye, Sun } from 'lucide-react';

interface DetailedConditionsProps {
  current: ForecastItem;
  city: CityInfo;
}

export function DetailedConditions({ current, city }: DetailedConditionsProps) {
  const formatTime = (timestamp: number) => {
    return new Date(timestamp * 1000).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    });
  };

  return (
    <div className='glass-dark rounded-2xl p-6'>
      <h2 className='text-lg font-semibold mb-6'>📊 상세 정보</h2>
      <div className='grid md:grid-cols-2 gap-6'>
        {/* Temperature, Wind, Humidity, etc. cards */}
        {/* Each section can be a separate component for more granularity */}
        <div>
          <div className='flex items-center gap-2 mb-3 text-muted-foreground'>
            <Thermometer className='w-4 h-4' />
            <span>온도</span>
          </div>
          <div className='grid grid-cols-2 gap-3 text-sm'>
            <div>
              <div className='text-muted-foreground'>현재</div>
              <div className='text-lg font-semibold'>{current.main.temp}°C</div>
            </div>
            <div>
              <div className='text-muted-foreground'>체감</div>
              <div className='text-lg font-semibold'>
                {current.main.feels_like}°C
              </div>
            </div>
            <div>
              <div className='text-muted-foreground'>최저</div>
              <div className='text-lg font-semibold'>
                {current.main.temp_min}°C
              </div>
            </div>
            <div>
              <div className='text-muted-foreground'>최고</div>
              <div className='text-lg font-semibold'>
                {current.main.temp_max}°C
              </div>
            </div>
          </div>
        </div>
        <div>
          <div className='flex items-center gap-2 mb-3 text-muted-foreground'>
            <Wind className='w-4 h-4' />
            <span>바람</span>
          </div>
          <div className='grid grid-cols-2 gap-3 text-sm'>
            <div>
              <div className='text-muted-foreground'>속도</div>
              <div className='text-lg font-semibold'>
                {current.wind.speed} m/s
              </div>
            </div>
            <div>
              <div className='text-muted-foreground'>방향</div>
              <div className='text-lg font-semibold'>{current.wind.deg}°</div>
            </div>
          </div>
        </div>
        <div>
          <div className='flex items-center gap-2 mb-3 text-muted-foreground'>
            <Droplets className='w-4 h-4' />
            <span>습도 & 기압</span>
          </div>
          <div className='grid grid-cols-2 gap-3 text-sm'>
            <div>
              <div className='text-muted-foreground'>습도</div>
              <div className='text-lg font-semibold'>
                {current.main.humidity}%
              </div>
            </div>
            <div>
              <div className='text-muted-foreground'>기압</div>
              <div className='text-lg font-semibold'>
                {current.main.pressure} hPa
              </div>
            </div>
          </div>
        </div>
        <div>
          <div className='flex items-center gap-2 mb-3 text-muted-foreground'>
            <Eye className='w-4 h-4' />
            <span>구름 & 가시거리</span>
          </div>
          <div className='grid grid-cols-2 gap-3 text-sm'>
            <div>
              <div className='text-muted-foreground'>구름</div>
              <div className='text-lg font-semibold'>{current.clouds.all}%</div>
            </div>
            <div>
              <div className='text-muted-foreground'>가시거리</div>
              <div className='text-lg font-semibold'>
                {(current.visibility / 1000).toFixed(1)} km
              </div>
            </div>
          </div>
        </div>
        <div>
          <div className='flex items-center gap-2 mb-3 text-muted-foreground'>
            <Sun className='w-4 h-4' />
            <span>일출 & 일몰</span>
          </div>
          <div className='grid grid-cols-2 gap-3 text-sm'>
            <div>
              <div className='text-muted-foreground'>일출</div>
              <div className='text-lg font-semibold'>
                {formatTime(city.sunrise)}
              </div>
            </div>
            <div>
              <div className='text-muted-foreground'>일몰</div>
              <div className='text-lg font-semibold'>
                {formatTime(city.sunset)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
