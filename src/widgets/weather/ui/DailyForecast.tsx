'use client';

import { ForecastItem } from '@/entities/weather/model/types';
import Image from 'next/image';

interface DailyForecastProps {
  forecast: ForecastItem[];
}

export function DailyForecast({ forecast }: DailyForecastProps) {
  // 매일 오전 9시 데이터만 필터링하여 일별 예보 생성
  const dailyData = forecast.filter(item => item.dt_txt.includes('09:00:00'));

  const formatDate = (dt: number) => {
    return new Date(dt * 1000).toLocaleDateString('ko-KR', {
      weekday: 'short',
      day: 'numeric',
    });
  };

  return (
    <div className='glass-dark rounded-2xl p-6'>
      <h2 className='text-lg font-semibold mb-4'>🗓️ 10일 예보</h2>
      <div className='space-y-4'>
        {dailyData.map((item, index) => (
          <div
            key={index}
            className='flex items-center justify-between text-sm'
          >
            <div className='w-1/4 font-medium text-muted-foreground'>
              {formatDate(item.dt)}
            </div>
            <div className='w-1/4 flex justify-center'>
              <Image
                src={`https://openweathermap.org/img/wn/${item.weather[0].icon}.png`}
                alt={item.weather[0].description}
                width={30}
                height={30}
              />
            </div>
            <div className='w-1/4 text-center text-muted-foreground'>
              {item.main.temp_min}°
            </div>
            <div className='w-1/4 text-right font-semibold'>
              {item.main.temp_max}°
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
