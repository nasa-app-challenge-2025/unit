# Weathering - From Earth Data to Action

단순 날씨 정보가 아닌, 사용자 맞춤형 행동 가이드를 제공하는 날씨 앱입니다.

## 🌟 주요 기능

- **실시간 날씨 정보**: OpenWeatherMap API를 통한 정확한 날씨 데이터
- **맞춤형 카드 시스템**: 천식 관리, 드론 비행, 등산 안전 등 개인화된 정보
- **다크 모드 테마**: 구름 같은 배경 효과와 글래스모피즘 디자인
- **반응형 디자인**: 모바일과 데스크톱에서 최적화된 사용자 경험
- **GPS 위치 서비스**: 현재 위치 기반 자동 날씨 정보 제공

## 🚀 시작하기

### 1. 의존성 설치

```bash
npm install
```

### 2. 환경 변수 설정

`.env.local` 파일을 생성하고 OpenWeatherMap API 키를 추가하세요:

```env
NEXT_PUBLIC_OPENWEATHER_API_KEY=your_api_key_here
```

API 키는 [OpenWeatherMap](https://openweathermap.org/api)에서 무료로 발급받을 수 있습니다.

### 3. 개발 서버 실행

```bash
npm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000)을 열어 앱을 확인하세요.

## 🎨 디자인 특징

- **다크 모드**: 구름 같은 텍스처 배경과 네온 블루/그린 강조색
- **글래스모피즘**: 반투명 카드와 블러 효과
- **애니메이션**: 부드러운 호버 효과와 배경 움직임
- **한국어 최적화**: Pretendard 폰트 사용

## 📱 사용법

1. **위치 권한 허용**: GPS를 통한 현재 위치 기반 날씨 정보
2. **날씨 카드 확인**: 기본 날씨 정보와 상세 정보
3. **맞춤 카드 추가**: 건강 관리, 직업별 정보, 활동 목적 등
4. **실시간 알림**: 중요 날씨 변화 및 건강 경고

## 🛠️ 기술 스택

- **Frontend**: Next.js 15, TypeScript, Tailwind CSS
- **Icons**: Lucide React
- **API**: OpenWeatherMap
- **Font**: Pretendard (한국어 최적화)

## 📄 라이선스

이 프로젝트는 MIT 라이선스 하에 있습니다.

## 🤝 기여하기

버그 리포트나 기능 제안은 언제든 환영합니다!