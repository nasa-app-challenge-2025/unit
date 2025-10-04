'use client';

import { Search, Menu, Calendar, Bell } from 'lucide-react';
import { useState } from 'react';

interface HeaderProps {
  onSearch: () => void;
  onMenu: () => void;
  onCalendar: () => void;
  onNotification: () => void;
}

export default function Header({ onSearch, onMenu, onCalendar, onNotification }: HeaderProps) {
  const [currentDate] = useState(new Date());

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      weekday: 'long'
    });
  };

  return (
    <header className="sticky top-0 z-50 glass-dark border-b border-border/50">
      <div className="px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 sm:gap-3">
            <button 
              onClick={onMenu}
              className="p-2 rounded-full hover:bg-white/10 transition-colors"
            >
              <Menu className="w-5 h-5" />
            </button>
            <div>
              <div className="text-xs sm:text-sm text-muted-foreground">
                {formatDate(currentDate)}
              </div>
              <div className="text-base sm:text-lg font-semibold">Weathering</div>
            </div>
          </div>
          
          <div className="flex items-center gap-1 sm:gap-2">
            <button 
              onClick={onCalendar}
              className="p-2 rounded-full hover:bg-white/10 transition-colors"
            >
              <Calendar className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
            <button 
              onClick={onNotification}
              className="p-2 rounded-full hover:bg-white/10 transition-colors relative"
            >
              <Bell className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="absolute -top-1 -right-1 w-2 h-2 sm:w-3 sm:h-3 bg-red-500 rounded-full"></span>
            </button>
            <button 
              onClick={onSearch}
              className="p-2 rounded-full hover:bg-white/10 transition-colors"
            >
              <Search className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
