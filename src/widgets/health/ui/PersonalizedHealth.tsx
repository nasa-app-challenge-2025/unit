'use client';

import React, { useState, useEffect } from 'react';
import { ForecastItem } from '@/entities/weather/model/types';
import {
  PersonaAPI,
  PersonaScore,
  PersonaScoreRequest,
} from '@/entities/persona/api/persona-api';
import {
  Plus,
  AlertTriangle,
  CheckCircle,
  ShieldAlert,
  Heart,
  AirVent,
  Wind,
  Eye,
  HeartPulse,
  BrainCircuit,
} from 'lucide-react';
import { Button } from '@/shared/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from '@/shared/ui/dialog';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from '@/shared/ui/sheet';

interface CustomCard extends PersonaScore {
  koreanName: string;
}

interface PersonalizedHealthProps {
  current: ForecastItem;
}

const AVAILABLE_PERSONAS = [
  { id: 'ASTHMA', name: '천식', icon: <Heart size={28} /> },
  { id: 'COPD', name: '만성폐쇄성폐질환', icon: <AirVent size={28} /> },
  { id: 'RHINITIS', name: '비염', icon: <Wind size={28} /> },
  { id: 'CONJUNCTIVITIS', name: '결막염', icon: <Eye size={28} /> },
  { id: 'CARDIO', name: '심혈관질환', icon: <HeartPulse size={28} /> },
  { id: 'MIGRAINE', name: '편두통', icon: <BrainCircuit size={28} /> },
];

const getLevelInfo = (level: string) => {
  switch (level.toLowerCase()) {
    case 'moderate':
      return {
        icon: <AlertTriangle className='h-4 w-4 text-yellow-400' />,
        color: 'border-yellow-400/50 hover:border-yellow-400',
        scoreCircleColor: 'bg-yellow-500',
      };
    case 'bad':
    case 'high':
    case 'very high':
      return {
        icon: <ShieldAlert className='h-4 w-4 text-red-400' />,
        color: 'border-red-400/50 hover:border-red-400',
        scoreCircleColor: 'bg-red-500',
      };
    default:
      return {
        icon: <CheckCircle className='h-4 w-4 text-green-400' />,
        color: 'border-green-400/50 hover:border-green-400',
        scoreCircleColor: 'bg-green-500',
      };
  }
};

export function PersonalizedHealth({ current }: PersonalizedHealthProps) {
  const [customCards, setCustomCards] = useState<CustomCard[]>([]);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState<CustomCard | null>(null);

  useEffect(() => {
    if (customCards.length === 0) return;
    const fetchScores = async () => {
      const requestBody: PersonaScoreRequest = {
        pm25_24h: 25,
        o3_8h: 0.03,
        heat: current.main.temp > 28,
        pm10_24h: 45,
        no2_1h: 0.02,
        cold: current.main.temp < 5,
        co_8h: 0.4,
        so2: 0.002,
        hcho: 0,
        pollen_level: 'low',
        dP: false,
        storm: (current.weather[0]?.main || '').toLowerCase().includes('storm'),
        dp: false,
      };
      try {
        const scores = await PersonaAPI.getScores(requestBody);
        setCustomCards(prev =>
          prev.map(card => {
            const newScore = scores.find(s => s.persona === card.persona);
            return newScore
              ? { ...card, score: newScore.score, level: newScore.level }
              : card;
          })
        );
      } catch (error) {
        console.error('페르소나 점수를 가져오는 데 실패했습니다:', error);
      }
    };
    fetchScores();
  }, [current, customCards.length]);

  const handleAddCard = (persona: { id: string; name: string }) => {
    if (customCards.some(card => card.persona === persona.id)) return;
    const newCard: CustomCard = {
      persona: persona.id,
      koreanName: persona.name,
      score: 0,
      level: 'loading',
    };
    setCustomCards([...customCards, newCard]);
  };

  const handleRemoveCard = (personaId: string) =>
    setCustomCards(customCards.filter(card => card.persona !== personaId));
  const handleCardClick = (card: CustomCard) => {
    setSelectedCard(card);
    setIsSheetOpen(true);
  };

  return (
    <>
      {customCards.map(card => {
        const levelInfo = getLevelInfo(card.level);
        const personaInfo = AVAILABLE_PERSONAS.find(p => p.id === card.persona);
        return (
          <button
            key={card.persona}
            onClick={() => handleCardClick(card)}
            className={`glass-light aspect-square flex flex-col items-start justify-between p-4 rounded-2xl border-2 transition-all duration-300 relative ${levelInfo.color}`}
          >
            <div className='absolute top-3 right-3'>{levelInfo.icon}</div>
            <div>
              <div className='mb-2'>{personaInfo?.icon}</div>
              <p className='font-semibold text-md text-left'>
                {card.koreanName}
              </p>
            </div>
            <p className='text-xs text-muted-foreground'>
              {card.level.toUpperCase()}
            </p>
          </button>
        );
      })}

      <button
        onClick={() => setIsAddDialogOpen(true)}
        className='glass-dark aspect-square flex flex-col items-center justify-center p-4 rounded-2xl hover:border-white/50 border-2 border-transparent transition-colors duration-300 text-muted-foreground'
      >
        <Plus className='h-8 w-8 mb-2' />
        <span className='text-sm font-semibold'>맞춤 기능 추가</span>
      </button>

      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        {/* Dialog Content */}
      </Dialog>

      <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
        {/* Sheet Content */}
      </Sheet>
    </>
  );
}
