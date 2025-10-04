'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import WeatherCard from '@/components/WeatherCard';
import CustomCard from '@/components/CustomCard';
import AddCardModal from '@/components/AddCardModal';
import { useWeather } from '@/hooks/useWeather';
import { useLocation } from '@/hooks/useLocation';

interface CustomCardData {
  id: string;
  type: string;
  title: string;
  status?: 'good' | 'warning' | 'danger';
  message?: string;
  action?: string;
}

export default function Home() {
  const [isAddCardModalOpen, setIsAddCardModalOpen] = useState(false);
  const [customCards, setCustomCards] = useState<CustomCardData[]>([
    {
      id: 'asthma',
      type: 'asthma',
      title: '천식 관리',
      status: 'warning',
      message: '주의: 오존 농도 높음',
      action: '흡입기 휴대 필수'
    },
    {
      id: 'drone',
      type: 'drone',
      title: '드론 비행 지수',
      status: 'good',
      message: '양호: 비행 가능',
      action: '풍속 3m/s | 시정 10km'
    },
    {
      id: 'hiking',
      type: 'hiking',
      title: '등산 안전 지수',
      status: 'warning',
      message: '체감온도 주의',
      action: '오후 3시 이후 하산 권장'
    }
  ]);

  // Get location and weather data
  const { location, loading: locationLoading, error: locationError, requestLocation } = useLocation();
  const { weather, loading: weatherLoading, error: weatherError, refreshWeather } = useWeather(
    location?.lat,
    location?.lon
  );

  const handleSearch = () => {
    console.log('Search clicked');
  };

  const handleMenu = () => {
    console.log('Menu clicked');
  };

  const handleCalendar = () => {
    console.log('Calendar clicked');
  };

  const handleNotification = () => {
    console.log('Notification clicked');
  };

  const handleRefresh = () => {
    refreshWeather();
  };

  const handleAddCard = (cardType: string, cardData: any) => {
    const newCard: CustomCardData = {
      id: cardType,
      type: cardType,
      title: cardData.title,
      status: 'good',
      message: '새로 추가된 카드입니다',
      action: '설정을 완료해주세요'
    };
    setCustomCards(prev => [...prev, newCard]);
  };

  const handleCardClick = (cardId: string) => {
    console.log('Card clicked:', cardId);
  };

  // Show loading state
  if (locationLoading || weatherLoading) {
    return (
      <div className="min-h-screen weather-bg cloudy flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">날씨 정보를 불러오는 중...</p>
        </div>
      </div>
    );
  }

  // Show error state
  if (locationError || weatherError) {
    return (
      <div className="min-h-screen weather-bg cloudy flex items-center justify-center">
        <div className="text-center">
          <p className="text-destructive mb-4">{locationError || weatherError}</p>
          <button 
            onClick={requestLocation}
            className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
          >
            다시 시도
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen weather-bg cloudy">
      <Header 
        onSearch={handleSearch}
        onMenu={handleMenu}
        onCalendar={handleCalendar}
        onNotification={handleNotification}
      />
      
      <main className="px-4 py-6 space-y-6 max-w-md mx-auto sm:max-w-lg md:max-w-2xl lg:max-w-4xl">
        {/* Weather Card */}
        {weather && (
          <WeatherCard 
            weather={weather}
            onSearch={handleSearch}
          />
        )}

        {/* Custom Cards */}
        <div className="space-y-4">
          {customCards.map((card) => (
            <CustomCard
              key={card.id}
              type={card.type as any}
              title={card.title}
              status={card.status}
              message={card.message}
              action={card.action}
              onClick={() => handleCardClick(card.id)}
            />
          ))}
          
          {/* Add Card Button */}
          <CustomCard
            type="add"
            title="맞춤 기능 추가하기"
            onClick={() => setIsAddCardModalOpen(true)}
          />
        </div>
      </main>

      {/* Add Card Modal */}
      <AddCardModal
        isOpen={isAddCardModalOpen}
        onClose={() => setIsAddCardModalOpen(false)}
        onAddCard={handleAddCard}
      />
    </div>
  );
}
