'use client';

import { Search, Menu, Calendar, Bell } from 'lucide-react';
import Link from 'next/link';

interface HeaderProps {
  onMenuClick: () => void;
  onCalendarClick: () => void;
  onNotificationClick: () => void;
}

export function Header({
  onMenuClick,
  onCalendarClick,
  onNotificationClick,
}: HeaderProps) {
  return (
    <header className='flex items-center justify-between p-4 text-white'>
      <button onClick={onMenuClick} className='p-2'>
        <Menu />
      </button>
      <div className='flex items-center gap-2'>
        <Link href='/search' className='p-2'>
          <Search />
        </Link>
        <button onClick={onCalendarClick} className='p-2'>
          <Calendar />
        </button>
        <button onClick={onNotificationClick} className='p-2'>
          <Bell />
        </button>
      </div>
    </header>
  );
}
