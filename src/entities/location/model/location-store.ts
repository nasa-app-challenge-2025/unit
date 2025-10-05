import { create } from 'zustand';

// 스토어에서 관리할 상태의 타입 정의
interface LocationState {
  latitude: number | null;
  longitude: number | null;
  setLocation: (lat: number, lon: number) => void; // 위치를 설정하는 액션
  clearLocation: () => void; // 설정된 위치를 초기화하는 액션
}

// Zustand 스토어 생성
export const useLocationStore = create<LocationState>(set => ({
  latitude: null,
  longitude: null,
  setLocation: (lat, lon) => set({ latitude: lat, longitude: lon }),
  clearLocation: () => set({ latitude: null, longitude: null }),
}));
