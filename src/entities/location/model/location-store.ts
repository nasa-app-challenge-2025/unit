import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

// 스토어에서 관리할 상태의 타입 정의
interface LocationState {
  latitude: number | null;
  longitude: number | null;
  address: string | null; // 👈 address 속성을 여기에 추가합니다.
  setLocation: (lat: number, lon: number, address?: string) => void; // 👈 setLocation에 address 파라미터 추가
  clearLocation: () => void;
}

// Zustand 스토어 생성
export const useLocationStore = create(
  persist<LocationState>(
    set => ({
      latitude: null,
      longitude: null,
      address: null, // 👈 address의 초기값을 null로 설정합니다.
      setLocation: (lat, lon, address = '알 수 없는 위치') =>
        set({ latitude: lat, longitude: lon, address: address }), // 👈 위치 설정 시 address도 함께 저장합니다.
      clearLocation: () =>
        set({ latitude: null, longitude: null, address: null }), // 👈 초기화 시 address도 null로 변경합니다.
    }),
    {
      name: 'selected-location-storage', // localStorage에 저장될 키 이름
      storage: createJSONStorage(() => localStorage), // (optional) localStorage에 저장하기
    }
  )
);