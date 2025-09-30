import React from 'react';
import { CardData } from '@/types';
import InfoCard from './InfoCard';

interface CardGridProps {
  items: CardData[];
  isLoading: boolean;
  onCardClick: (data: CardData) => void;
}

export default function CardGrid({ items, isLoading, onCardClick }: CardGridProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, index) => (
          <div
            key={index}
            className="p-6 rounded-xl backdrop-blur-md bg-white/10 border border-white/20 animate-pulse"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="h-6 bg-white/20 rounded w-32"></div>
                <div className="h-6 bg-white/20 rounded-full w-20"></div>
              </div>
              <div className="space-y-2">
                <div className="h-4 bg-white/20 rounded"></div>
                <div className="h-4 bg-white/20 rounded"></div>
                <div className="h-4 bg-white/20 rounded"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-white/70 text-lg">No items found for this category.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {items.map((item) => (
        <InfoCard key={item.id} data={item} onClick={() => onCardClick(item)} />
      ))}
    </div>
  );
}