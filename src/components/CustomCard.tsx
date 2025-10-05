'use client';

import { Plus, AlertTriangle, CheckCircle, XCircle, Heart, Plane, Mountain, Car, Activity } from 'lucide-react';
import Link from 'next/link'; // next/link에서 Link를 import합니다.

interface CustomCardProps {
  type: string;
  title: string;
  status?: 'good' | 'warning' | 'danger';
  message?: string;
  action?: string;
  onClick?: () => void;
}

export default function CustomCard({ type, title, status, message, action, onClick }: CustomCardProps) {

  const getIcon = () => {
    switch (type) {
      case 'add':
        return <Plus className="w-8 h-8 text-muted-foreground" />;
      case 'asthma':
      case 'copd':
      case 'cardiovascular':
      case 'heart':
      case 'migraine':
      case 'allergy':
        return <Heart className="w-6 h-6 text-red-400" />;
      case 'drone':
        return <Plane className="w-6 h-6 text-blue-400" />;
      case 'hiking':
        return <Mountain className="w-6 h-6 text-green-400" />;
      case 'carwash':
      case 'car':
        return <Car className="w-6 h-6 text-purple-400" />;
      default:
        return <Activity className="w-6 h-6 text-gray-400" />;
    }
  };

  const getStatusIcon = () => {
    switch (status) {
      case 'good':
        return <CheckCircle className="w-4 h-4 text-green-400" />;
      case 'warning':
        return <AlertTriangle className="w-4 h-4 text-yellow-400" />;
      case 'danger':
        return <XCircle className="w-4 h-4 text-red-400" />;
      default:
        return null;
    }
  };

  const getStatusColor = () => {
    switch (status) {
      case 'good':
        return 'border-green-400/30 bg-green-400/5';
      case 'warning':
        return 'border-yellow-400/30 bg-yellow-400/5';
      case 'danger':
        return 'border-red-400/30 bg-red-400/5';
      default:
        return 'border-border';
    }
  };

  // '카드 추가' 버튼은 페이지 이동이 필요 없으므로 기존 div와 onClick을 유지합니다.
  if (type === 'add') {
    return (
      <div
        className="glass-dark rounded-2xl p-4 cursor-pointer transition-all duration-300 hover:border-primary/50 border-2 border-dashed border-muted-foreground/30 aspect-square"
        onClick={onClick}
      >
        <div className="flex flex-col items-center justify-center text-center space-y-2 h-full">
          {getIcon()}
          <span className="text-sm font-semibold text-muted-foreground">{title}</span>
        </div>
      </div>
    );
  }

  // 일반 정보 카드는 Link 컴포넌트로 감싸서 클릭 시 페이지 이동이 되도록 합니다.
  return (
    <Link href={`/widget/${type}`} className="block">
      <div
        className={`glass-dark rounded-2xl p-4 cursor-pointer transition-all duration-300 hover:scale-105 border ${getStatusColor()} aspect-square flex flex-col justify-between h-full`}
      >
        <div>
          <div className="flex items-start justify-between mb-2">
            <div className="flex items-center gap-2">
              {getIcon()}
              <span className="font-semibold text-md">{title}</span>
            </div>
            {getStatusIcon()}
          </div>

          {message && (
            <div className="text-xs text-muted-foreground">
              {status === 'warning' && '⚠️ '}
              {status === 'danger' && '🚨 '}
              {message}
            </div>
          )}
        </div>

        {action && (
          <div className="text-xs font-medium text-primary mt-1">
            {action}
          </div>
        )}
      </div>
    </Link>
  );
}