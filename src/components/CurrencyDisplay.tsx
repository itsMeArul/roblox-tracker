"use client";

import React, { useState, useEffect } from 'react';

interface CurrencyDisplayProps {
  usdPrice: string;
  className?: string;
}

export default function CurrencyDisplay({ usdPrice, className = '' }: CurrencyDisplayProps) {
  const [showIDR, setShowIDR] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const USD_TO_IDR = 16700;

  // Auto-switch to IDR after 5 seconds
  useEffect(() => {
    if (usdPrice !== 'Free' && usdPrice !== 'Official' && usdPrice.includes('$')) {
      const timer = setTimeout(() => {
        setIsAnimating(true);
        setTimeout(() => {
          setShowIDR(true);
          setIsAnimating(false);
        }, 300);
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [usdPrice]);

  const handleClick = () => {
    if (usdPrice === 'Free' || usdPrice === 'Official' || !usdPrice.includes('$')) return;

    setIsAnimating(true);
    setTimeout(() => {
      setShowIDR(!showIDR);
      setIsAnimating(false);
    }, 300);
  };

  const convertToIDR = (price: string) => {
    if (price === 'Free' || price === 'Official') return price;

    const match = price.match(/\$(\d+(?:\.\d+)?)/);
    if (match) {
      const usdAmount = parseFloat(match[1]);
      const idrAmount = Math.round(usdAmount * USD_TO_IDR);
      return `Rp ${idrAmount.toLocaleString('id-ID')}`;
    }
    return price;
  };

  const displayPrice = showIDR ? convertToIDR(usdPrice) : usdPrice;
  const isClickable = usdPrice !== 'Free' && usdPrice !== 'Official' && usdPrice.includes('$');

  return (
    <span
      className={`font-bold transition-all duration-300 ${isAnimating ? 'opacity-50 scale-95' : 'opacity-100 scale-100'} ${isClickable ? 'cursor-pointer hover:scale-105' : ''} ${className}`}
      onClick={handleClick}
      title={isClickable ? 'Click to toggle currency' : undefined}
    >
      {displayPrice}
      {isClickable && (
        <span className="ml-1 text-xs opacity-60">
          ({showIDR ? 'IDR' : 'USD'})
        </span>
      )}
    </span>
  );
}