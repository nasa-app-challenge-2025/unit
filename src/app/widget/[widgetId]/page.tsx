'use client';

import { useParams, useRouter } from 'next/navigation';
import { ArrowLeft, Menu, Bell, Search } from 'lucide-react';
import { useWeather } from '@/shared/context/WeatherContext';

// 상세 페이지에 표시될 대기오염 물질 데이터 예시입니다.
// 실제로는 API를 통해 받아와야 합니다.
const MOCK_POLLUTANTS = [
  { name: '초미세먼지 (PM2.5)', value: '45 µg/m³', level: '나쁨' },
  { name: '미세먼지 (PM10)', value: '146 µg/m³', level: '나쁨' },
  { name: '일산화탄소 (CO)', value: '0.6 ppm', level: '좋음' },
  { name: '이산화질소 (NO₂)', value: '0.026 ppm', level: '보통' },
  { name: '오존 (O₃)', value: '0.040 ppm', level: '보통' },
];

// 각 오염물질 등급에 따른 색상을 정의합니다.
const getLevelColor = (level: string) => {
  switch (level) {
    case '나쁨':
      return 'text-red-400';
    case '보통':
      return 'text-yellow-400';
    case '좋음':
      return 'text-green-400';
    default:
      return 'text-muted-foreground';
  }
};

export default function WidgetDetailPage() {
  const router = useRouter(); // 페이지 이동을 위한 훅
  const params = useParams(); // URL 파라미터(widgetId)를 가져오는 훅
  const { weatherCondition } = useWeather(); // 배경화면을 위한 날씨 상태

  const widgetId = params.widgetId; // URL에서 위젯 ID(예: 'asthma')를 가져옵니다.

  // 위젯 ID에 따라 제목을 동적으로 설정합니다.
  const getTitle = () => {
    if (widgetId === 'asthma') return '천식 관리 - 주의';
    // 다른 위젯 ID에 대한 제목 추가
    return '상세 정보';
  };

  return (
    <div className="flex flex-col flex-1">
      {/* 상세 페이지 헤더 */}
      <header className="flex items-center justify-between p-4 text-white sticky top-0 z-10 bg-background/50 backdrop-blur-sm">
        <button onClick={() => router.back()} className="p-2">
          <ArrowLeft />
        </button>
        <div className='text-center'>
          <div className="text-sm text-muted-foreground">2025년 10월 5일 일요일</div>
          <h1 className="text-lg font-semibold">Information</h1>
        </div>
        <div className="flex items-center gap-2">
          <button className="p-2"><Search /></button>
          <button className="p-2"><Bell /></button>
        </div>
      </header>

      {/* 메인 콘텐츠 */}
      <main className="flex-1 overflow-y-auto px-4 py-6 space-y-6 max-w-md mx-auto sm:max-w-lg md:max-w-2xl">
        {/* 상단 정보 카드 */}
        <div className="glass-dark rounded-2xl p-6">
          <div className="flex items-center justify-between mb-4">
            <div className='flex items-center gap-4'>
              <div className='text-center'>
                <div className='text-yellow-400 text-sm'>유해지수</div>
                <div className='text-3xl font-bold'>115점</div>
                <div className='text-xs text-muted-foreground'>야외 활동 자제</div>
              </div>
              <div className='text-7xl'>⚠️</div>
            </div>
            <div className='text-right'>
              <h2 className='text-xl font-bold'>{getTitle()}</h2>
              <p className='text-sm text-muted-foreground'>서울특별시 마포구</p>
              <p className='text-xs text-muted-foreground mt-1'>2025년 10월 5일 11:00 am 기준</p>
            </div>
            <button>
              <Menu size={20} />
            </button>
          </div>
        </div>

        {/* 오염물질 목록 */}
        <div className="space-y-3">
          {MOCK_POLLUTANTS.map((pollutant) => (
            <div key={pollutant.name} className="glass-dark rounded-lg p-4 flex items-center justify-between">
              <span className='font-semibold'>{pollutant.name}</span>
              <div className='text-right'>
                <div>{pollutant.value}</div>
                <div className={`text-sm ${getLevelColor(pollutant.level)}`}>{pollutant.level}</div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}