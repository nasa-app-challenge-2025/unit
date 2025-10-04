import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';

const pretendard = localFont({
  src: [
    {
      path: '../../node_modules/pretendard/dist/web/static/woff2/Pretendard-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../node_modules/pretendard/dist/web/static/woff2/Pretendard-Medium.woff2',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../../node_modules/pretendard/dist/web/static/woff2/Pretendard-SemiBold.woff2',
      weight: '600',
      style: 'normal',
    },
    {
      path: '../../node_modules/pretendard/dist/web/static/woff2/Pretendard-Bold.woff2',
      weight: '700',
      style: 'normal',
    },
  ],
  variable: '--font-pretendard',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Weathering - From Earth Data to Action',
  description: '단순 날씨 정보가 아닌, 사용자 맞춤형 행동 가이드를 제공하는 날씨 앱',
};

function getWeatherBackground(condition: string) {
  switch (condition.toLowerCase()) {
    case 'sunny':
    case 'clear':
      return 'bg-gradient-to-b from-yellow-200 via-blue-100 to-white';
    case 'rainy':
    case 'rain':
      return 'bg-gradient-to-b from-gray-700 via-blue-400 to-gray-900';
    case 'cloudy':
    case 'overcast':
      return 'bg-gradient-to-b from-gray-300 via-gray-400 to-gray-600';
    default:
      return 'bg-gradient-to-b from-gray-200 to-white';
  }
}

export default function RootLayout({
  children,
  weatherCondition = 'clear', // You should pass this prop from the page or context
}: Readonly<{
  children: React.ReactNode;
  weatherCondition?: string;
}>) {
  const bgClass = getWeatherBackground(weatherCondition);
  return (
    <html lang='ko'>
      <body className={`${pretendard.variable} antialiased ${bgClass}`}>{children}</body>
    </html>
  );
}
