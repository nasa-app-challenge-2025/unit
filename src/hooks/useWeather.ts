'use client';

import { useState, useEffect } from 'react';
import { WeatherData, WeatherService, MockWeatherService } from '@/lib/weather';

interface UseWeatherReturn {
  weather: WeatherData | null;
  loading: boolean;
  error: string | null;
  refreshWeather: () => void;
}

export function useWeather(lat?: number, lon?: number, cityName?: string): UseWeatherReturn {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Use mock service for development
  const weatherService = new MockWeatherService();
  // const weatherService = new WeatherService(process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY || '');

  const fetchWeather = async () => {
    if (!lat || !lon) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const weatherData = await weatherService.getCurrentWeather(lat, lon);
      setWeather(weatherData);
    } catch (err) {
      setError(err instanceof Error ? err.message : '날씨 정보를 가져오는데 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  const fetchWeatherByCity = async () => {
    if (!cityName) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const weatherData = await weatherService.getWeatherByCity(cityName);
      setWeather(weatherData);
    } catch (err) {
      setError(err instanceof Error ? err.message : '날씨 정보를 가져오는데 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (cityName) {
      fetchWeatherByCity();
    } else if (lat && lon) {
      fetchWeather();
    }
  }, [lat, lon, cityName]);

  const refreshWeather = () => {
    if (cityName) {
      fetchWeatherByCity();
    } else if (lat && lon) {
      fetchWeather();
    }
  };

  return {
    weather,
    loading,
    error,
    refreshWeather
  };
}
