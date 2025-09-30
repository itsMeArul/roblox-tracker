import React from 'react';
import { CardData } from '@/types';
import CurrencyDisplay from './CurrencyDisplay';

interface InfoCardProps {
  data: CardData;
  onClick: () => void;
}

export default function InfoCard({ data, onClick }: InfoCardProps) {
  const formatDate = (dateString: string) => {
    try {
      if (!dateString || dateString === '' || dateString === 'undefined' || dateString === 'null') {
        return 'Date unavailable';
      }

      const date = new Date(dateString);

      // Check if date is valid
      if (isNaN(date.getTime())) {
        return 'Invalid date format';
      }

      const formattedDate = date.toLocaleDateString('en-US', {
        month: '2-digit',
        day: '2-digit',
        year: 'numeric'
      });
      const formattedTime = date.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
      });
      return `${formattedDate} at ${formattedTime} UTC`;
    } catch (error) {
      console.warn('Date formatting error:', error, 'for date:', dateString);
      return 'Date format error';
    }
  };

  const getStatusColor = () => {
    if (data.id.startsWith('roblox-')) return 'bg-blue-500';
    if (data.updateStatus) return 'bg-green-500';
    return 'bg-red-500';
  };

  const getStatusText = () => {
    if (data.id.startsWith('roblox-')) return 'Official';
    return data.updateStatus ? 'Updated' : 'Outdated';
  };

  const getCostColor = () => {
    if (data.cost === 'Free' || data.cost === 'Official') return 'text-green-400';
    return 'text-yellow-400';
  };

  return (
    <div
      onClick={onClick}
      className="group cursor-pointer p-6 rounded-xl backdrop-blur-md bg-white/10 border border-white/20
                 hover:bg-white/20 hover:border-white/40 transition-all duration-300
                 hover:scale-105 hover:shadow-2xl hover:shadow-black/20"
    >
      <div className="flex flex-col space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-bold text-white group-hover:text-white/90 transition-colors">
            {data.name}
          </h3>
          <span className="px-3 py-1 text-xs font-medium bg-gradient-to-r from-purple-500 to-pink-500
                         text-white rounded-full shadow-lg capitalize">
            {data.platform}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <span className={`px-2 py-1 text-xs font-medium text-white rounded-full ${getStatusColor()}`}>
            {getStatusText()}
          </span>
          {data.detected !== undefined && (
            <span className={`px-2 py-1 text-xs font-medium text-white rounded-full ${
              data.detected ? 'bg-red-500' : 'bg-green-500'
            }`}>
              {data.detected ? 'Detected' : 'Undetected'}
            </span>
          )}
        </div>

        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-white/70 text-sm">Version:</span>
            <span className="text-white font-medium">{data.version}</span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-white/70 text-sm">Updated:</span>
            <span className="text-white font-medium">{formatDate(data.last_update)}</span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-white/70 text-sm">Cost:</span>
            <CurrencyDisplay usdPrice={data.cost} className={getCostColor()} />
          </div>
        </div>

        <div className="pt-2 border-t border-white/10">
          <span className="text-white/60 text-xs group-hover:text-white/80 transition-colors">
            Click for details →
          </span>
        </div>
      </div>
    </div>
  );
}