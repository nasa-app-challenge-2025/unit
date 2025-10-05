'use client';

import React, { createContext, useState, useContext, ReactNode } from 'react';

// Context에서 공유할 값들의 타입 정의
interface WeatherContextType {
  weatherCondition: string;
  sunrise: number;
  sunset: number;
  setWeatherInfo: (condition: string, sunrise: number, sunset: number) => void;
}

const WeatherContext = createContext<WeatherContextType | undefined>(undefined);

export function WeatherProvider({ children }: { children: ReactNode }) {
  const [weatherCondition, setWeatherCondition] = useState('clear');
  const [sunrise, setSunrise] = useState(0);
  const [sunset, setSunset] = useState(0);

  const setWeatherInfo = (condition: string, sunrise: number, sunset: number) => {
    setWeatherCondition(condition);
    setSunrise(sunrise);
    setSunset(sunset);
  };

  return (
    <WeatherContext.Provider value={{ weatherCondition, sunrise, sunset, setWeatherInfo }}>
      {children}
    </WeatherContext.Provider>
  );
}

export function useWeather() {
  const context = useContext(WeatherContext);
  if (context === undefined) {
    throw new Error('useWeather must be used within a WeatherProvider');
  }
  return context;
}
