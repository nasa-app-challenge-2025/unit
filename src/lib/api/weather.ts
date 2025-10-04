// OpenWeatherMap 5-Day Forecast Response Type
export interface WeatherForecastResponse {
  cod: string;
  message: string;
  cnt: number;
  list: ForecastItem[];
  city: CityInfo;
}

export interface ForecastItem {
  dt: number;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    sea_level: number;
    grnd_level: number;
    humidity: number;
    temp_kf: number;
  };
  weather: Array<{
    id: number;
    main: string;
    description: string;
    icon: string;
  }>;
  clouds: {
    all: number;
  };
  wind: {
    speed: number;
    deg: number;
    gust: number;
  };
  visibility: number;
  pop: number;
  rain?: {
    '3h': number;
  };
  snow?: {
    '3h': number;
  };
  sys: {
    pod: string;
  };
  dt_txt: string;
}

export interface CityInfo {
  id: number;
  name: string;
  coord: {
    lat: number;
    lon: number;
  };
  country: string;
  population: number;
  timezone: number;
  sunrise: number;
  sunset: number;
}

// fetch가 서버 환경(Node.js)에서 사용될 때 node-fetch를 사용하도록 처리
let fetchFn: any;
if (typeof window === 'undefined') {
  // 서버 환경
  // node-fetch는 ESM이므로 동적 import 필요
  fetchFn = (await import('node-fetch')).default;
} else {
  // 클라이언트 환경
  fetchFn = fetch;
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';

function kelvinToCelsius(k: number): number {
  return Math.round((k - 273.15) * 10) / 10;
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

    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`);
    }

    const data: WeatherForecastResponse = await response.json();
    return {
      ...data,
      list: data.list.map(convertForecastItemToCelsius),
    };
  }

  static async getWeatherByCity(
    cityName: string
  ): Promise<WeatherForecastResponse> {
    const response = await fetchFn(
      `${API_BASE_URL}/public/v1/weathering/city-name?cityName=${encodeURIComponent(cityName)}`
    );

    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`);
    }

    const data: WeatherForecastResponse = await response.json();
    return {
      ...data,
      list: data.list.map(convertForecastItemToCelsius),
    };
  }
}