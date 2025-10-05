// 'use client';
//
// import React, { useState, useEffect, useCallback, useMemo } from 'react';
// import { ForecastItem } from '@/entities/weather/model/types';
// import {
//   PersonaAPI,
//   PersonaScore,
//   PersonaScoreRequest,
// } from '@/entities/persona/api/persona-api';
// import {
//   Plus,
//   AlertTriangle,
//   CheckCircle,
//   ShieldAlert,
//   Heart,
//   AirVent,
//   Wind,
//   Eye,
//   HeartPulse,
//   BrainCircuit,
//   Search,
//   Plane,
//   Mountain,
//   Car,
//   Activity,
//   Sun,
//   Droplets,
// } from 'lucide-react';
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
// } from '@/shared/ui/dialog';
// import {
//   Sheet,
//   SheetContent,
//   SheetHeader,
//   SheetTitle,
//   SheetDescription,
// } from '@/shared/ui/sheet';
//
// const cardCategories = [
//   {
//     id: 'health',
//     title: '🏥 건강 관리',
//     cards: [
//       {
//         id: 'ASTHMA',
//         title: '천식',
//         icon: Heart,
//         description: 'PM2.5, 오존, NO₂ 모니터링',
//       },
//       {
//         id: 'COPD',
//         title: 'COPD',
//         icon: AirVent,
//         description: '미세먼지, 오존 농도 추적',
//       },
//       {
//         id: 'RHINITIS',
//         title: '비염',
//         icon: Wind,
//         description: '꽃가루, 미세먼지 알림',
//       },
//       {
//         id: 'CONJUNCTIVITIS',
//         title: '결막염',
//         icon: Eye,
//         description: '대기질 악화 시 알림',
//       },
//       {
//         id: 'CARDIO',
//         title: '심혈관 질환',
//         icon: HeartPulse,
//         description: '기온변화, 오존 모니터링',
//       },
//       {
//         id: 'MIGRAINE',
//         title: '편두통',
//         icon: BrainCircuit,
//         description: '기압 변화 알림',
//       },
//     ],
//   },
//   {
//     id: 'work',
//     title: '💼 직업별 정보',
//     cards: [
//       {
//         id: 'farming',
//         title: '농업',
//         icon: Sun,
//         description: '파종/수확 가이드',
//       },
//       {
//         id: 'fishing',
//         title: '어업',
//         icon: Droplets,
//         description: '어장 정보',
//       },
//       {
//         id: 'drone',
//         title: '드론 조종',
//         icon: Plane,
//         description: '비행 조건 모니터링',
//       },
//       {
//         id: 'hiking',
//         title: '등산/야외 활동',
//         icon: Mountain,
//         description: '안전 지수 제공',
//       },
//       {
//         id: 'firefighter',
//         title: '소방관',
//         icon: Activity,
//         description: '화재 위험도 분석',
//       },
//     ],
//   },
//   {
//     id: 'activity',
//     title: '🎯 활동 목적',
//     cards: [
//       {
//         id: 'exercise',
//         title: '운동 최적 시간',
//         icon: Activity,
//         description: '운동하기 좋은 시간 추천',
//       },
//       {
//         id: 'carwash',
//         title: '세차 지수',
//         icon: Car,
//         description: '세차하기 좋은 날씨',
//       },
//       {
//         id: 'stargazing',
//         title: '별 관측',
//         icon: Sun,
//         description: '천체 관측 조건',
//       },
//       {
//         id: 'laundry',
//         title: '빨래 지수',
//         icon: Droplets,
//         description: '빨래 건조 조건',
//       },
//     ],
//   },
//   {
//     id: 'expert',
//     title: '📊 전문가 데이터',
//     cards: [
//       {
//         id: 'air_quality',
//         title: '대기질 종합 분석',
//         icon: Wind,
//         description: '상세한 대기질 데이터',
//       },
//       {
//         id: 'weather_dashboard',
//         title: '기상 데이터 대시보드',
//         icon: Sun,
//         description: '실시간 기상 정보',
//       },
//       {
//         id: 'raw_data',
//         title: '연구용 원시 데이터',
//         icon: Activity,
//         description: '원시 데이터 접근',
//       },
//     ],
//   },
// ];
//
// interface CustomCard extends PersonaScore {
//   koreanName: string;
// }
//
// interface PersonalizedHealthProps {
//   current: ForecastItem;
// }
//
// const AVAILABLE_PERSONAS = [
//   { id: 'ASTHMA', name: '천식', icon: <Heart size={28} /> },
//   { id: 'COPD', name: '만성폐쇄성폐질환', icon: <AirVent size={28} /> },
//   { id: 'RHINITIS', name: '비염', icon: <Wind size={28} /> },
//   { id: 'CONJUNCTIVITIS', name: '결막염', icon: <Eye size={28} /> },
//   { id: 'CARDIO', name: '심혈관질환', icon: <HeartPulse size={28} /> },
//   { id: 'MIGRAINE', name: '편두통', icon: <BrainCircuit size={28} /> },
// ];
//
// const getLevelInfo = (level: string) => {
//   if (!level) {
//     return { icon: null, color: 'border-border', scoreCircleColor: 'bg-muted' };
//   }
//   switch (level.toLowerCase()) {
//     case 'moderate':
//       return {
//         icon: <AlertTriangle className="h-4 w-4 text-yellow-400" />,
//         color: 'border-yellow-400/50 hover:border-yellow-400',
//         scoreCircleColor: 'bg-yellow-500',
//       };
//     case 'bad':
//     case 'high':
//     case 'very high':
//       return {
//         icon: <ShieldAlert className="h-4 w-4 text-red-400" />,
//         color: 'border-red-400/50 hover:border-red-400',
//         scoreCircleColor: 'bg-red-500',
//       };
//     default:
//       return {
//         icon: <CheckCircle className="h-4 w-4 text-green-400" />,
//         color: 'border-green-400/50 hover:border-green-400',
//         scoreCircleColor: 'bg-green-500',
//       };
//   }
// };
//
// export function PersonalizedHealth({ current }: PersonalizedHealthProps) {
//   const [customCards, setCustomCards] = useState<CustomCard[]>([]);
//   const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
//   const [isSheetOpen, setIsSheetOpen] = useState(false);
//   const [selectedCard, setSelectedCard] = useState<CustomCard | null>(null);
//   const [searchQuery, setSearchQuery] = useState('');
//
//   useEffect(() => {
//     const savedCards = localStorage.getItem('userPersonas');
//     if (savedCards) {
//       try {
//         setCustomCards(JSON.parse(savedCards));
//       } catch (e) {
//         console.error('Failed to parse userPersonas from localStorage', e);
//       }
//     }
//   }, []);
//
//   const fetchScores = useCallback(async () => {
//     if (customCards.length === 0 || !current) return;
//
//     const requestBody: PersonaScoreRequest = {
//       pm25_24h: 25, // TODO: 실제 데이터로 교체
//       o3_8h: 0.03,
//       heat: current.main.temp > 28,
//       pm10_24h: 45,
//       no2_1h: 0.02,
//       cold: current.main.temp < 5,
//       co_8h: 0.4,
//       so2: 0.002,
//       hcho: 0,
//       pollen_level: 'low',
//       dP: false,
//       storm: (current.weather[0]?.main || '').toLowerCase().includes('storm'),
//       dp: false,
//     };
//     try {
//       const scores = await PersonaAPI.getScores(requestBody);
//       setCustomCards(prev =>
//         prev.map(card => {
//           const newScore = scores.find(s => s.persona === card.persona);
//           return newScore ? { ...card, ...newScore } : card;
//         }),
//       );
//     } catch (error) {
//       console.error('Failed to fetch persona scores:', error);
//     }
//   }, [current, customCards]);
//
//   useEffect(() => {
//     localStorage.setItem('userPersonas', JSON.stringify(customCards));
//   }, [customCards]);
//
//   useEffect(() => {
//     const timer = setTimeout(() => {
//       fetchScores();
//     }, 500);
//     return () => clearTimeout(timer);
//   }, [fetchScores]);
//
//   const handleAddCard = (persona: { id: string; title: string }) => {
//     if (customCards.some(card => card.persona === persona.id)) {
//       setIsAddDialogOpen(false);
//       return;
//     }
//     const newCard: CustomCard = {
//       persona: persona.id,
//       koreanName: persona.title,
//       score: 0,
//       level: 'loading',
//     };
//     setCustomCards(prev => [...prev, newCard]);
//     setIsAddDialogOpen(false);
//   };
//
//   const handleCardClick = (card: CustomCard) => {
//     setSelectedCard(card);
//     setIsSheetOpen(true);
//   };
//
//   const filteredCategories = cardCategories
//     .map(category => ({
//       ...category,
//       cards: category.cards.filter(
//         card =>
//           (card.title || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
//           (card.description || '').toLowerCase().includes(searchQuery.toLowerCase()),
//       ),
//     }))
//     .filter(category => category.cards.length > 0);
//
//   return (
//     <>
//       {customCards.map(card => {
//         const levelInfo = getLevelInfo(card.level);
//         const personaInfo = AVAILABLE_PERSONAS.find(p => p.id === card.persona);
//         return (
//           <button
//             key={card.persona}
//             onClick={() => handleCardClick(card)}
//             className={`glass-dark aspect-square flex flex-col items-start justify-between p-4 rounded-2xl border transition-all duration-300 relative ${levelInfo.color}`}
//           >
//             <div className="absolute top-3 right-3">{levelInfo.icon}</div>
//             <div>
//               <div className="mb-2 text-primary">{personaInfo?.icon}</div>
//               <p className="font-semibold text-md text-left">{card.koreanName}</p>
//             </div>
//             <p className="text-xs text-muted-foreground">
//               {card.level ? card.level.toUpperCase() : 'LOADING...'}
//             </p>
//           </button>
//         );
//       })}
//
//       <button
//         onClick={() => setIsAddDialogOpen(true)}
//         className="glass-dark aspect-square flex flex-col items-center justify-center p-4 rounded-2xl hover:border-primary/50 border-2 border-dashed border-muted-foreground/30 transition-colors duration-300 text-muted-foreground"
//       >
//         <Plus className="h-8 w-8 mb-2" />
//         <span className="text-sm font-semibold">맞춤 기능 추가</span>
//       </button>
//
//       <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
//         <DialogContent className="max-w-md">
//           <DialogHeader>
//             <DialogTitle>맞춤 기능 선택</DialogTitle>
//           </DialogHeader>
//           <div className="relative my-4">
//             <input
//               type="text"
//               placeholder="위젯을 검색하세요"
//               value={searchQuery}
//               onChange={e => setSearchQuery(e.target.value)}
//               className="w-full px-4 py-3 pl-10 bg-input rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary/50"
//             />
//             <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
//           </div>
//           <div className="overflow-y-auto max-h-[60vh] space-y-6 pr-2">
//             {filteredCategories.map(category => (
//               <div key={category.id}>
//                 <h3 className="text-lg font-medium mb-3 text-muted-foreground">
//                   {category.title}
//                 </h3>
//                 <div className="grid grid-cols-1 gap-3">
//                   {category.cards.map(card => {
//                     const IconComponent = card.icon;
//                     return (
//                       <button
//                         key={card.id}
//                         onClick={() => handleAddCard(card)}
//                         className="flex items-center gap-3 p-4 rounded-lg border border-border hover:border-primary/50 hover:bg-primary/5 transition-all text-left"
//                       >
//                         <IconComponent className="w-6 h-6 text-primary" />
//                         <div>
//                           <div className="font-medium">{card.title}</div>
//                           <div className="text-sm text-muted-foreground">
//                             {card.description}
//                           </div>
//                         </div>
//                         <div className="ml-auto">
//                           <Plus className="w-5 h-5 text-muted-foreground" />
//                         </div>
//                       </button>
//                     );
//                   })}
//                 </div>
//               </div>
//             ))}
//           </div>
//         </DialogContent>
//       </Dialog>
//
//       <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
//         <SheetContent>
//           <SheetHeader>
//             <SheetTitle>{selectedCard?.koreanName} 상세 정보</SheetTitle>
//             <SheetDescription>
//               현재 날씨를 기반으로 한 상세 분석과 행동 요령을 확인하세요.
//             </SheetDescription>
//           </SheetHeader>
//           {/* 상세 정보 영역 */}
//         </SheetContent>
//       </Sheet>
//     </>
//   );
// }