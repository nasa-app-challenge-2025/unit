'use client';

import { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
import { useLocationStore } from '@/entities/location/model/location-store';
import { Button } from '@/shared/ui/button';
import { Loader } from '@/shared/ui/loader';

export default function SearchPage() {
  const router = useRouter();
  const { setLocation } = useLocationStore();
  const [selectedLocation, setSelectedLocation] = useState<{
    lat: number;
    lon: number;
    address: string;
  } | null>(null);

  const LocationMap = useMemo(
    () =>
      dynamic(
        () =>
          import('@/features/select-map-location/ui/LocationMap').then(
            mod => mod.LocationMap
          ),
        {
          ssr: false,
          loading: () => <Loader message='지도를 불러오는 중...' />,
        }
      ),
    []
  );

  const handleLocationSelect = (lat: number, lon: number, address: string) => {
    setSelectedLocation({ lat, lon, address });
  };

  const handleConfirm = () => {
    if (selectedLocation) {
      setLocation(selectedLocation.lat, selectedLocation.lon);
      router.push('/');
    }
  };

  return (
    <div className='relative min-h-screen weather-bg cloudy'>
      <div className='absolute inset-0 z-0'>
        <LocationMap onLocationSelect={handleLocationSelect} />
      </div>

      {selectedLocation && (
        <div className='absolute bottom-0 left-0 right-0 z-10 p-4 bg-gradient-to-t from-black/80 via-black/60 to-transparent'>
          <div className='glass-dark p-4 rounded-lg text-center'>
            <p className='font-semibold'>{selectedLocation.address}</p>
            <p className='text-sm text-muted-foreground'>
              위도: {selectedLocation.lat.toFixed(4)}, 경도:{' '}
              {selectedLocation.lon.toFixed(4)}
            </p>
            <Button onClick={handleConfirm} className='w-full mt-4'>
              이 위치로 날씨 보기
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
