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
    <header className='flex items-center justify-between p-4 text-white relative z-10'>
      <button
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          console.log('Header: 메뉴 버튼 클릭됨');
          onMenuClick();
        }}
        className='p-2 hover:bg-white/10 rounded-lg transition-colors'
        type="button"
      >
        <Menu className="w-6 h-6" />
      </button>
      <div className='flex items-center gap-2'>
        <Link href='/search' className='p-2 hover:bg-white/10 rounded-lg transition-colors'>
          <Search className="w-6 h-6" />
        </Link>
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onCalendarClick();
          }}
          className='p-2 hover:bg-white/10 rounded-lg transition-colors'
          type="button"
        >
          <Calendar className="w-6 h-6" />
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onNotificationClick();
          }}
          className='p-2 hover:bg-white/10 rounded-lg transition-colors'
          type="button"
        >
          <Bell className="w-6 h-6" />
        </button>
      </div>
    </header>
  );
}