'use client';

import { useState, useEffect } from 'react';
// 👇 여기가 수정되었습니다! '@shared/store' -> '@entities/location/model'
import { useLocationStore } from '@/entities/location/model/location-store';
import { Loader } from '@/shared/ui/loader';
import { Menu } from 'lucide-react';

// 이 컴포넌트가 props로 무엇을 받을지 타입을 정의합니다.
interface WidgetDetailViewProps {
  widgetId: string;
}

// 대기오염 물질 데이터 예시입니다. (실제로는 API를 통해 받아와야 합니다)
const MOCK_POLLUTANTS = [
  { name: '초미세먼지 (PM2.5)', value: '45 µg/m³', level: '나쁨' },
  { name: '미세먼지 (PM10)', value: '146 µg/m³', level: '나쁨' },
  { name: '일산화탄소 (CO)', value: '0.6 ppm', level: '좋음' },
  { name: '이산화질소 (NO₂)', value: '0.026 ppm', level: '보통' },
  { name: '오존 (O₃)', value: '0.040 ppm', level: '보통' },
];

// 각 오염물질 등급에 따른 색상을 반환하는 함수입니다.
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

// 페이지가 아닌 재사용 가능한 컴포넌트로 수정했습니다.
export function WidgetDetailView({ widgetId }: WidgetDetailViewProps) {
  const { address: selectedAddress } = useLocationStore();

  // 위젯 ID에 따라 제목을 동적으로 설정합니다.
  const getTitle = () => {
    if (widgetId === 'asthma') return '천식 관리 - 주의';
    if (widgetId === 'copd') return 'COPD - 주의';
    if (widgetId === 'allergy') return '알레르기성 비염 - 주의';
    // 다른 위젯 ID에 대한 제목을 추가할 수 있습니다.
    return '상세 정보';
  };

  return (
    <main className="flex-1 overflow-y-auto px-4 py-6 space-y-6 max-w-md mx-auto sm:max-w-lg md:max-w-2xl">
      {/* 상단 정보 카드 */}
      <div className="glass-dark rounded-2xl p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-4">
            <div className="text-center">
              <div className="text-yellow-400 text-sm">유해지수</div>
              <div className="text-3xl font-bold">115점</div>
              <div className="text-xs text-muted-foreground">야외 활동 자제</div>
            </div>
            <div className="text-7xl">⚠️</div>
          </div>
          <div className="text-right flex-shrink-0 ml-4">
            <h2 className="text-xl font-bold">{getTitle()}</h2>
            <p className="text-sm text-muted-foreground">{selectedAddress || '현재 위치'}</p>
            <p className="text-xs text-muted-foreground mt-1">
              {new Date().toLocaleString('ko-KR', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
              })}{' '}
              기준
            </p>
          </div>
        </div>
      </div>

      {/* 오염물질 목록 */}
      <div className="space-y-3">
        {MOCK_POLLUTANTS.map(pollutant => (
          <div
            key={pollutant.name}
            className="glass-dark rounded-lg p-4 flex items-center justify-between"
          >
            <span className="font-semibold">{pollutant.name}</span>
            <div className="text-right">
              <div>{pollutant.value}</div>
              <div className={`text-sm ${getLevelColor(pollutant.level)}`}>
                {pollutant.level}
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}