'use client';

interface LoaderProps {
  message?: string;
}

export function Loader({ message = '정보를 불러오는 중...' }: LoaderProps) {
  return (
    <div className='min-h-screen weather-bg cloudy flex items-center justify-center'>
      <div className='text-center'>
        <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4'></div>
        <p className='text-muted-foreground'>{message}</p>
      </div>
    </div>
  );
}
