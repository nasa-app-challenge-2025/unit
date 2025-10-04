'use client';

import { X, Heart, Plane, Mountain, Car, Activity, Sun, Droplets, Wind, Search, Plus } from 'lucide-react';
import { useState } from 'react';

interface AddCardModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddCard: (cardType: string, cardData: any) => void;
}

const cardCategories = [
  {
    id: 'health',
    title: '🏥 건강 관리',
    cards: [
      { id: 'asthma', title: '천식', icon: Heart, description: 'PM2.5, 오존, NO₂ 모니터링' },
      { id: 'copd', title: 'COPD', icon: Heart, description: '미세먼지, 오존 농도 추적' },
      { id: 'allergy', title: '알레르기성 비염', icon: Heart, description: '꽃가루, 미세먼지 알림' },
      { id: 'cardiovascular', title: '심혈관 질환', icon: Heart, description: '기온변화, 오존 모니터링' },
      { id: 'migraine', title: '편두통', icon: Heart, description: '기압 변화 알림' }
    ]
  },
  {
    id: 'work',
    title: '💼 직업별 정보',
    cards: [
      { id: 'farming', title: '농업', icon: Sun, description: '파종/수확 가이드' },
      { id: 'fishing', title: '어업', icon: Droplets, description: '어장 정보' },
      { id: 'drone', title: '드론 조종', icon: Plane, description: '비행 조건 모니터링' },
      { id: 'hiking', title: '등산/야외 활동', icon: Mountain, description: '안전 지수 제공' },
      { id: 'firefighter', title: '소방관', icon: Activity, description: '화재 위험도 분석' }
    ]
  },
  {
    id: 'activity',
    title: '🎯 활동 목적',
    cards: [
      { id: 'exercise', title: '운동 최적 시간', icon: Activity, description: '운동하기 좋은 시간 추천' },
      { id: 'carwash', title: '세차 지수', icon: Car, description: '세차하기 좋은 날씨' },
      { id: 'stargazing', title: '별 관측', icon: Sun, description: '천체 관측 조건' },
      { id: 'laundry', title: '빨래 지수', icon: Droplets, description: '빨래 건조 조건' }
    ]
  },
  {
    id: 'expert',
    title: '📊 전문가 데이터',
    cards: [
      { id: 'air_quality', title: '대기질 종합 분석', icon: Wind, description: '상세한 대기질 데이터' },
      { id: 'weather_dashboard', title: '기상 데이터 대시보드', icon: Sun, description: '실시간 기상 정보' },
      { id: 'raw_data', title: '연구용 원시 데이터', icon: Activity, description: '원시 데이터 접근' }
    ]
  }
];

export default function AddCardModal({ isOpen, onClose, onAddCard }: AddCardModalProps) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  if (!isOpen) return null;

  const filteredCategories = cardCategories.map(category => ({
    ...category,
    cards: category.cards.filter(card => 
      card.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      card.description.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter(category => category.cards.length > 0);

  const handleCardSelect = (cardId: string, cardTitle: string) => {
    onAddCard(cardId, { title: cardTitle, type: cardId });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
      <div 
        className="fixed inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      
      <div className="relative w-full max-w-md mx-4 bg-card rounded-t-2xl sm:rounded-2xl max-h-[85vh] sm:max-h-[80vh] overflow-hidden">
        <div className="sticky top-0 bg-card border-b border-border p-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">맞춤 기능 선택</h2>
            <button 
              onClick={onClose}
              className="p-2 rounded-full hover:bg-white/10 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          
          <div className="relative">
            <input
              type="text"
              placeholder="위젯을 검색하세요"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-3 pl-10 bg-input rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          </div>
        </div>

        <div className="overflow-y-auto max-h-[65vh] sm:max-h-[60vh] p-4 space-y-6">
          {filteredCategories.map((category) => (
            <div key={category.id}>
              <h3 className="text-lg font-medium mb-3 text-muted-foreground">
                {category.title}
              </h3>
              <div className="grid grid-cols-1 gap-3">
                {category.cards.map((card) => {
                  const IconComponent = card.icon;
                  return (
                    <button
                      key={card.id}
                      onClick={() => handleCardSelect(card.id, card.title)}
                      className="flex items-center gap-3 p-4 rounded-lg border border-border hover:border-primary/50 hover:bg-primary/5 transition-all text-left"
                    >
                      <IconComponent className="w-6 h-6 text-primary" />
                      <div>
                        <div className="font-medium">{card.title}</div>
                        <div className="text-sm text-muted-foreground">{card.description}</div>
                      </div>
                      <div className="ml-auto">
                        <Plus className="w-5 h-5 text-muted-foreground" />
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
