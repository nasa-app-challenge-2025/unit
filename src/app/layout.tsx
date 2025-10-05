import type { Metadata } from 'next';
import './globals.css';
import { WeatherProvider } from '@/shared/context/WeatherContext';
import DynamicBackground from './DynamicBackground';
import localFont from 'next/font/local';

// Pretendard 폰트 설정
const pretendard = localFont({
  src: '../shared/assets/fonts/PretendardVariable.woff2',
  display: 'swap',
  weight: '45 920',
  variable: '--font-pretendard',
});

export const metadata: Metadata = {
  title: 'Weathering - From Earth Data to Action',
  description:
    '단순 날씨 정보가 아닌, 사용자 맞춤형 행동 가이드를 제공하는 날씨 앱',
};

export default function RootLayout({
                                     children,
                                   }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang='ko' className={pretendard.variable}>
    <body>
    <WeatherProvider>
      <DynamicBackground>{children}</DynamicBackground>
    </WeatherProvider>
    </body>
    </html>
  );
}
