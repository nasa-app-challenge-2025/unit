'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Sun, Bell, Settings, UserCircle, X } from 'lucide-react';
import { cn } from '@/shared/lib/utils';

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

  if (!isOpen) return null;

  return (
    <>
      {/* 오버레이 */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60] transition-opacity duration-300"
        onClick={onClose}
        style={{ opacity: isOpen ? 1 : 0 }}
      />

      {/* 사이드바 */}
      <div
        className={cn(
          "fixed top-0 left-0 h-full w-[280px] bg-gray-900/95 backdrop-blur-md border-r border-white/10 z-[70] transition-transform duration-300 ease-in-out",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {/* 헤더 */}
        <div className="p-6 border-b border-white/10 relative">
          <h2 className="text-2xl font-bold text-white">Menu</h2>
          <button
            onClick={onClose}
            className="absolute right-4 top-6 rounded-sm opacity-70 transition-opacity hover:opacity-100 focus:outline-none"
          >
            <X className="h-5 w-5 text-white" />
            <span className="sr-only">Close</span>
          </button>
        </div>

        {/* 메뉴 */}
        <nav className="mt-6 px-3 pb-6">
          <ul className="flex flex-col space-y-2">
            {menuItems.map(item => {
              const isActive = pathname === item.href;

              return (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    onClick={onClose}
                    className={cn(
                      'flex items-center gap-4 p-3 rounded-lg transition-all duration-200 cursor-pointer',
                      isActive
                        ? 'bg-white/20 text-white shadow-lg'
                        : 'text-gray-300 hover:bg-white/10 hover:text-white'
                    )}
                  >
                    <item.icon className="h-5 w-5" />
                    <span className="font-medium">{item.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </>
  );
}