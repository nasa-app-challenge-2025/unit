'use client';

import { Plus, AlertTriangle, CheckCircle, XCircle, Heart, Plane, Mountain, Car } from 'lucide-react';

interface CustomCardProps {
  type: 'add' | 'asthma' | 'drone' | 'hiking' | 'car' | 'heart';
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
        return <Plus className="w-6 h-6 text-muted-foreground" />;
      case 'asthma':
        return <Heart className="w-6 h-6 text-red-400" />;
      case 'drone':
        return <Plane className="w-6 h-6 text-blue-400" />;
      case 'hiking':
        return <Mountain className="w-6 h-6 text-green-400" />;
      case 'car':
        return <Car className="w-6 h-6 text-purple-400" />;
      case 'heart':
        return <Heart className="w-6 h-6 text-pink-400" />;
      default:
        return <Plus className="w-6 h-6 text-muted-foreground" />;
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

  if (type === 'add') {
    return (
      <div 
        className="glass-dark rounded-2xl p-6 cursor-pointer transition-all duration-300 hover:scale-105 border-2 border-dashed border-muted-foreground/30 hover:border-primary/50"
        onClick={onClick}
      >
        <div className="flex flex-col items-center justify-center text-center space-y-3">
          {getIcon()}
          <div>
            <div className="font-medium text-lg">{title}</div>
            <div className="text-sm text-muted-foreground mt-1">
              나에게 필요한 정보를<br />
              선택해보세요
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div 
      className={`glass-dark rounded-2xl p-6 cursor-pointer transition-all duration-300 hover:scale-105 border ${getStatusColor()}`}
      onClick={onClick}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2">
          {getIcon()}
          <span className="font-medium text-lg">{title}</span>
        </div>
        {getStatusIcon()}
      </div>
      
      {message && (
        <div className="text-sm text-muted-foreground mb-2">
          {status === 'warning' && '⚠️ '}
          {status === 'danger' && '🚨 '}
          {message}
        </div>
      )}
      
      {action && (
        <div className="text-sm font-medium text-primary">
          💊 {action}
        </div>
      )}
    </div>
  );
}
