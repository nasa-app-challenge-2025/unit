import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https', // http 또는 https
        hostname: 'openweathermap.org', // 이미지를 가져올 도메인
        port: '', // 포트 번호가 있다면 지정
        pathname: '/img/wn/**', // 특정 경로 하위의 이미지만 허용
      },
    ],
  },
};

export default nextConfig;
