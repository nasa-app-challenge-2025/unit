'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Sun, Bell, Settings, UserCircle, X } from 'lucide-react';
import { useEffect } from 'react';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const menuItems = [
  { href: '/', icon: Home, label: 'Home' },
  { href: '/weather-detail', icon: Sun, label: 'Weather' },
  { href: '/notifications', icon: Bell, label: 'Alarm' },
  { href: '/settings', icon: Settings, label: 'Widget Settings' },
  { href: '/persona', icon: UserCircle, label: 'Persona' },
];

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  const pathname = usePathname();

  // body 스크롤 막기
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  return (
    <>
      {/* 오버레이 */}
      <div
        className={`fixed inset-0 bg-black/60 backdrop-blur-sm transition-all duration-300 ${
          isOpen ? 'opacity-100 visible z-[998]' : 'opacity-0 invisible'
        }`}
        onClick={onClose}
      />

      {/* 사이드바 */}
      <aside
        className={`fixed top-0 left-0 h-full w-[280px] bg-gray-900/95 backdrop-blur-md border-r border-white/10 shadow-2xl transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0 z-[999]' : '-translate-x-full z-[999]'
        }`}
      >
        {/* 헤더 */}
        <div className="p-6 border-b border-white/10 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-white">Menu</h2>
          <button
            onClick={onClose}
            className="p-2 rounded-lg opacity-70 transition-all hover:opacity-100 hover:bg-white/10"
            type="button"
          >
            <X className="h-5 w-5 text-white" />
          </button>
        </div>

        {/* 메뉴 */}
        <nav className="mt-6 px-3 pb-6">
          <ul className="flex flex-col space-y-2">
            {menuItems.map((item) => {
              const isActive = pathname === item.href;
              const Icon = item.icon;

              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={(e) => {
                      e.stopPropagation();
                      onClose();
                    }}
                    className={`flex items-center gap-4 p-3 rounded-lg transition-all duration-200 ${
                      isActive
                        ? 'bg-white/20 text-white shadow-lg'
                        : 'text-gray-300 hover:bg-white/10 hover:text-white'
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                    <span className="font-medium">{item.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </aside>
    </>
  );
}