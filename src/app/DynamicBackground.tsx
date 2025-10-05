'use client';
import React from 'react';
import { useWeather } from '@/shared/context/WeatherContext';

export default function DynamicBackground({ children }: { children: React.ReactNode }) {
  const { weatherCondition } = useWeather();

  const getBackgroundClass = () => {
    const condition = weatherCondition?.toLowerCase() || '';
    switch (condition) {
      case 'rain':
      case 'drizzle':
      case 'thunderstorm':
        return 'rainy';
      case 'clouds':
        return 'cloudy';
      case 'clear':
        return 'sunny';
      case 'snow':
        return 'snowy';
      default:
        return 'cloudy';
    }
  };

  return (
    <div className={`weather-bg ${getBackgroundClass()} min-h-screen flex flex-col`}>
      {children}
    </div>
  );
}
