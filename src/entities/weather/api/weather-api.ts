import { WeatherForecastResponse, ForecastItem } from '../model/types';

// fetch가 서버/클라이언트 환경에 맞게 동작하도록 설정
let fetchFn: any;
if (typeof window === 'undefined') {
  fetchFn = (await import('node-fetch')).default;
} else {
  fetchFn = fetch;
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';

function kelvinToCelsius(k: number): number {
  return Math.round(k - 273.15);
}

function convertForecastItemToCelsius(item: ForecastItem): ForecastItem {
  return {
    ...item,
    main: {
      ...item.main,
      temp: kelvinToCelsius(item.main.temp),
      feels_like: kelvinToCelsius(item.main.feels_like),
      temp_min: kelvinToCelsius(item.main.temp_min),
      temp_max: kelvinToCelsius(item.main.temp_max),
    },
  };
}

export class WeatherAPI {
  static async getWeatherByCoords(
    lat: number,
    lon: number
  ): Promise<WeatherForecastResponse> {
    const response = await fetchFn(
      `${API_BASE_URL}/public/v1/weathering/lat-and-lon?lat=${lat}&lon=${lon}`
    );
    if (!response.ok) throw new Error(`API Error: ${response.status}`);
    const data: WeatherForecastResponse = await response.json();
    return { ...data, list: data.list.map(convertForecastItemToCelsius) };
  }

  static async getWeatherByCity(
    cityName: string
  ): Promise<WeatherForecastResponse> {
    const response = await fetchFn(
      `${API_BASE_URL}/public/v1/weathering/city-name?cityName=${encodeURIComponent(cityName)}`
    );
    if (!response.ok) throw new Error(`API Error: ${response.status}`);
    const data: WeatherForecastResponse = await response.json();
    return { ...data, list: data.list.map(convertForecastItemToCelsius) };
  }
}
