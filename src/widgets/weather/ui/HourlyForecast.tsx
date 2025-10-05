'use client';

import { ForecastItem } from '@/entities/weather/model/types';
import Image from 'next/image';

interface HourlyForecastProps {
  forecast: ForecastItem[];
}

export function HourlyForecast({ forecast }: HourlyForecastProps) {
  // 현재 시간 이후 24시간(8개) 데이터만 필터링
  const hourlyData = forecast.slice(0, 8);

  const formatTime = (dt: number) => {
    return new Date(dt * 1000).toLocaleTimeString('ko-KR', {
      hour: '2-digit',
      hour12: false,
    });
  };

  return (
    <div className='glass-dark rounded-2xl p-6'>
      <h2 className='text-lg font-semibold mb-4'>🕒 시간별 예보</h2>
      <div className='flex overflow-x-auto space-x-6 pb-2'>
        {hourlyData.map((item, index) => (
          <div
            key={index}
            className='flex flex-col items-center flex-shrink-0 w-20 text-center'
          >
            <div className='text-sm text-muted-foreground'>
              {formatTime(item.dt)}
            </div>
            <Image
              src={`https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}
              alt={item.weather[0].description}
              width={50}
              height={50}
            />
            <div className='font-semibold'>{item.main.temp}°C</div>
          </div>
        ))}
      </div>
    </div>
  );
}
