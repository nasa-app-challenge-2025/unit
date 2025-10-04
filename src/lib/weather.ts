export interface WeatherData {
  location: string;
  temperature: number;
  feelsLike: number;
  condition: string;
  humidity: number;
  windSpeed: number;
  visibility: number;
  uvIndex: number;
  sunrise: string;
  sunset: string;
  high: number;
  low: number;
  pressure: number;
  description: string;
  icon: string;
}

export interface OpenWeatherResponse {
  name: string;
  main: {
    temp: number;
    feels_like: number;
    humidity: number;
    pressure: number;
    temp_max: number;
    temp_min: number;
  };
  weather: Array<{
    main: string;
    description: string;
    icon: string;
  }>;
  wind: {
    speed: number;
  };
  visibility: number;
  sys: {
    sunrise: number;
    sunset: number;
  };
  coord: {
    lat: number;
    lon: number;
  };
}

export class WeatherService {
  private apiKey: string;
  private baseUrl = 'https://api.openweathermap.org/data/2.5';

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  async getCurrentWeather(lat: number, lon: number): Promise<WeatherData> {
    try {
      const response = await fetch(
        `${this.baseUrl}/weather?lat=${lat}&lon=${lon}&appid=${this.apiKey}&units=metric&lang=kr`
      );
      
      if (!response.ok) {
        throw new Error(`Weather API error: ${response.status}`);
      }

      const data: OpenWeatherResponse = await response.json();
      return this.transformWeatherData(data);
    } catch (error) {
      console.error('Error fetching weather data:', error);
      throw error;
    }
  }

  async getWeatherByCity(cityName: string): Promise<WeatherData> {
    try {
      const response = await fetch(
        `${this.baseUrl}/weather?q=${encodeURIComponent(cityName)}&appid=${this.apiKey}&units=metric&lang=kr`
      );
      
      if (!response.ok) {
        throw new Error(`Weather API error: ${response.status}`);
      }

      const data: OpenWeatherResponse = await response.json();
      return this.transformWeatherData(data);
    } catch (error) {
      console.error('Error fetching weather data:', error);
      throw error;
    }
  }

  private transformWeatherData(data: OpenWeatherResponse): WeatherData {
    const formatTime = (timestamp: number) => {
      return new Date(timestamp * 1000).toLocaleTimeString('ko-KR', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
      });
    };

    const getCondition = (weatherMain: string) => {
      const conditionMap: { [key: string]: string } = {
        'Clear': '맑음',
        'Clouds': '흐림',
        'Rain': '비',
        'Snow': '눈',
        'Thunderstorm': '뇌우',
        'Drizzle': '이슬비',
        'Mist': '안개',
        'Fog': '안개',
        'Haze': '실안개',
        'Dust': '먼지',
        'Sand': '모래',
        'Ash': '재',
        'Squall': '돌풍',
        'Tornado': '토네이도'
      };
      return conditionMap[weatherMain] || weatherMain;
    };

    return {
      location: data.name,
      temperature: Math.round(data.main.temp),
      feelsLike: Math.round(data.main.feels_like),
      condition: getCondition(data.weather[0].main),
      humidity: data.main.humidity,
      windSpeed: data.wind.speed,
      visibility: Math.round(data.visibility / 1000), // Convert to km
      uvIndex: 0, // UV index requires separate API call
      sunrise: formatTime(data.sys.sunrise),
      sunset: formatTime(data.sys.sunset),
      high: Math.round(data.main.temp_max),
      low: Math.round(data.main.temp_min),
      pressure: data.main.pressure,
      description: data.weather[0].description,
      icon: data.weather[0].icon
    };
  }
}

// Mock weather service for development
export class MockWeatherService {
  async getCurrentWeather(lat: number, lon: number): Promise<WeatherData> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    return {
      location: '서울특별시 마포구',
      temperature: 25,
      feelsLike: 23,
      condition: '흐림',
      humidity: 65,
      windSpeed: 3.5,
      visibility: 10,
      uvIndex: 5,
      sunrise: '06:23',
      sunset: '18:45',
      high: 27,
      low: 18,
      pressure: 1013,
      description: '구름이 많음',
      icon: '04d'
    };
  }

  async getWeatherByCity(cityName: string): Promise<WeatherData> {
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    return {
      location: cityName,
      temperature: 22,
      feelsLike: 20,
      condition: '맑음',
      humidity: 50,
      windSpeed: 2.1,
      visibility: 15,
      uvIndex: 7,
      sunrise: '06:30',
      sunset: '18:30',
      high: 25,
      low: 15,
      pressure: 1015,
      description: '맑음',
      icon: '01d'
    };
  }
}
