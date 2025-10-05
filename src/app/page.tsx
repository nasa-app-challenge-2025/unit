'use client';

import { useState, useEffect, useCallback } from 'react';
import { useDeviceLocation } from '@/entities/location/model/use-device-location';
import { useLocationStore } from '@/entities/location/model/location-store';
import { WeatherAPI } from '@/entities/weather/api/weather-api';
import { WeatherForecastResponse } from '@/entities/weather/model/types';
import { useWeather } from '@/shared/context/WeatherContext';
import { Loader } from '@/shared/ui/loader';
import { Header } from '@/widgets/header/ui/Header';
import { Sidebar } from '@/widgets/sidebar/ui/Sidebar';
import CustomCard from '@/components/CustomCard';
import AddCardModal from '@/components/AddCardModal';
import {
  Sheet,
  SheetContent,
} from '@/shared/ui/sheet';
import { WidgetDetailView } from '@/widgets/weather/ui/WidgetDetailView';
import { DetailedConditions } from '@/widgets/weather/ui/DetailedConditions';


// 카드 데이터의 타입을 정의합니다.
interface Card {
  id: string;
  type: string;
  title: string;
  status?: 'good' | 'warning' | 'danger';
  message?: string;
  action?: string;
}

export default function HomePage() {
  const { location: deviceLocation, loading: deviceLocationLoading } =
    useDeviceLocation();
  const {
    latitude: selectedLat,
    longitude: selectedLon,
    address: selectedAddress,
  } = useLocationStore();
  const { setWeatherInfo } = useWeather();
  const [forecast, setForecast] = useState<WeatherForecastResponse | null>(
    null
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [customCards, setCustomCards] = useState<Card[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isWidgetSheetOpen, setIsWidgetSheetOpen] = useState(false);
  const [selectedWidgetId, setSelectedWidgetId] = useState<string | null>(null);
  const [isDetailSheetOpen, setIsDetailSheetOpen] = useState(false);
  const [isCalendarSheetOpen, setIsCalendarSheetOpen] = useState(false);
  const [isNotificationSheetOpen, setIsNotificationSheetOpen] = useState(false);


  // 컴포넌트 마운트 시 저장된 카드 불러오기
  useEffect(() => {
    const savedCards = localStorage.getItem('customCards');
    if (savedCards) {
      setCustomCards(JSON.parse(savedCards));
    }
  }, []);

  // 날씨 데이터 가져오기
  const fetchWeather = useCallback(async (lat: number, lon: number) => {
    setLoading(true);
    setError(null);
    try {
      const data = await WeatherAPI.getWeatherByCoords(lat, lon);
      setForecast(data);
      if (data.list.length > 0 && data.city) {
        setWeatherInfo(
          data.list[0].weather[0].main,
          data.city.sunrise,
          data.city.sunset
        );
      }
    } catch (err) {
      setError('날씨 정보를 불러오는 데 실패했습니다.');
    } finally {
      setLoading(false);
    }
  }, [setWeatherInfo]);

  useEffect(() => {
    const lat = selectedLat ?? deviceLocation?.lat;
    const lon = selectedLon ?? deviceLocation?.lon;

    if (lat && lon) {
      fetchWeather(lat, lon);
    } else if (!deviceLocationLoading) {
      setError('위치 정보를 가져올 수 없습니다. 위치 권한을 확인해주세요.');
      setLoading(false);
    }
  }, [deviceLocation, selectedLat, selectedLon, deviceLocationLoading, fetchWeather]);


  // 카드 추가 로직
  const handleAddCard = (cardType: string, cardData: any) => {
    const newCard: Card = {
      id: `${cardType}-${Date.now()}`,
      type: cardType,
      title: cardData.title,
      status: 'good',
      message: '현재 상태 양호합니다.',
      action: '상세 정보를 확인하세요.',
    };
    const updatedCards = [...customCards, newCard];
    setCustomCards(updatedCards);
    localStorage.setItem('customCards', JSON.stringify(updatedCards));
  };

  // 날씨 아이콘 이모지 반환 함수
  const getWeatherEmoji = (condition: string) => {
    const emojiMap: { [key: string]: string } = {
      'Clear': '☀️',
      'Clouds': '☁️',
      'Rain': '🌧️',
      'Drizzle': '🌦️',
      'Thunderstorm': '⛈️',
      'Snow': '❄️',
      'Mist': '🌫️',
      'Smoke': '🌫️',
      'Haze': '🌫️',
      'Dust': '🌫️',
      'Fog': '🌫️',
      'Sand': '🌫️',
      'Ash': '🌫️',
      'Squall': '💨',
      'Tornado': '🌪️',
    };
    return emojiMap[condition] || '🌤️';
  };


  if (loading) return <Loader />;
  if (error) return <div className="flex items-center justify-center min-h-screen">{error}</div>;
  if (!forecast) return <Loader message="날씨 데이터가 없습니다." />;

  const current = forecast.list[0];

  return (
    <div className="p-4 max-w-md mx-auto">
      <Header
        onMenuClick={() => setIsSidebarOpen(true)}
        onCalendarClick={() => setIsCalendarSheetOpen(true)}
        onNotificationClick={() => setIsNotificationSheetOpen(true)}
      />
      {isSidebarOpen && (
        <div className='fixed inset-0 z-[100]'>
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="fixed top-32 right-4 bg-blue-500 text-white p-4 rounded-lg z-[200]"
          >
            사이드바 토글
          </button>
        </div>

      )}
      <main className="space-y-6 mt-4">
        {/* 현재 날씨 카드 */}
        <div
          className="glass-dark rounded-2xl p-6 text-center cursor-pointer transition-transform hover:scale-[1.02]"
          onClick={() => setIsDetailSheetOpen(true)}
        >
          <h1 className="text-xl font-semibold">{selectedAddress || forecast.city.name}</h1>
          <div className="text-7xl font-bold my-2">{current.main.temp}°C</div>
          <p className="capitalize">{current.weather[0].description}</p>
          <div className="text-sm flex justify-center gap-4 mt-2">
            <span>체감: {current.main.feels_like}°C</span>
            <span>최고: {current.main.temp_max}° / 최저: {current.main.temp_min}°</span>
          </div>
        </div>

        {/* 맞춤 위젯 섹션 */}
        <section>
          <h2 className="text-lg font-semibold mb-4">⭐ 맞춤 위젯</h2>
          <div className="grid grid-cols-2 gap-4">
            {customCards.map(card => (
              <CustomCard
                key={card.id}
                type={card.type}
                title={card.title}
                status={card.status}
                message={card.message}
                action={card.action}
                onClick={() => {
                  setSelectedWidgetId(card.type);
                  setIsWidgetSheetOpen(true);
                }}
              />
            ))}
            <CustomCard
              type="add"
              title="맞춤 기능 추가"
              onClick={() => setIsModalOpen(true)}
            />
          </div>
        </section>
      </main>


      {/* 맞춤 위젯 상세 정보 Sheet (상단) */}
      <Sheet open={isWidgetSheetOpen} onOpenChange={setIsWidgetSheetOpen}>
        <SheetContent side="top" className="h-full max-h-screen overflow-y-auto glass-dark border-0">
          {selectedWidgetId && <WidgetDetailView widgetId={selectedWidgetId} />}
        </SheetContent>
      </Sheet>

      {/* 기본 날씨 상세 정보 Sheet (하단) */}
      <Sheet open={isDetailSheetOpen} onOpenChange={setIsDetailSheetOpen}>
        <SheetContent side="bottom" className="rounded-t-2xl glass-dark border-0 max-h-[70vh] overflow-y-auto">
          {forecast && (
            <DetailedConditions
              current={forecast.list[0]}
              city={forecast.city}
            />
          )}
        </SheetContent>
      </Sheet>

      {/* 캘린더 Sheet - 주간 날씨 예보 */}
      <Sheet open={isCalendarSheetOpen} onOpenChange={setIsCalendarSheetOpen}>
        <SheetContent side="bottom" className="rounded-t-2xl glass-dark border-0 max-h-[80vh] overflow-y-auto">
          <div className="p-4">
            <h2 className="text-2xl font-bold mb-6">주간 날씨 예보</h2>
            <div className="space-y-4">
              {forecast && forecast.list.slice(0, 8).map((item, index) => {
                const date = new Date(item.dt * 1000);
                const day = date.toLocaleDateString('ko-KR', { weekday: 'short', month: 'short', day: 'numeric' });
                const time = date.toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' });

                return (
                  <div key={index} className="flex items-center justify-between p-4 glass rounded-xl">
                    <div className="flex-1">
                      <div className="font-semibold">{day}</div>
                      <div className="text-sm text-gray-400">{time}</div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-3xl">{getWeatherEmoji(item.weather[0].main)}</div>
                      <div className="text-right">
                        <div className="text-xl font-bold">{Math.round(item.main.temp)}°</div>
                        <div className="text-sm text-gray-400 capitalize">{item.weather[0].description}</div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </SheetContent>
      </Sheet>

      {/* 알림 설정 Sheet */}
      <Sheet open={isNotificationSheetOpen} onOpenChange={setIsNotificationSheetOpen}>
        <SheetContent side="bottom" className="rounded-t-2xl glass-dark border-0 max-h-[80vh] overflow-y-auto">
          <div className="p-4">
            <h2 className="text-2xl font-bold mb-6">날씨 알림 설정</h2>
            <div className="space-y-6">
              <div className="glass rounded-xl p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold">아침 날씨 알림</h3>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" />
                    <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
                <p className="text-sm text-gray-400">매일 아침 8시에 날씨 정보를 알려드립니다</p>
              </div>

              <div className="glass rounded-xl p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold">악천후 알림</h3>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" defaultChecked />
                    <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
                <p className="text-sm text-gray-400">폭우, 폭설 등 특보 발령 시 알려드립니다</p>
              </div>

              <div className="glass rounded-xl p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold">미세먼지 알림</h3>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" />
                    <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
                <p className="text-sm text-gray-400">미세먼지 나쁨 이상일 때 알려드립니다</p>
              </div>

              <div className="glass rounded-xl p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold">온도 급변 알림</h3>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" />
                    <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
                <p className="text-sm text-gray-400">전날 대비 5도 이상 차이날 때 알려드립니다</p>
              </div>

              <button className="w-full glass rounded-xl p-4 font-semibold hover:bg-white/10 transition-colors">
                알림 설정 저장
              </button>
            </div>
          </div>
        </SheetContent>
      </Sheet>

      <AddCardModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAddCard={handleAddCard}
      />
    </div>
  );
}