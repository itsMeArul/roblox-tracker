import React from 'react';

interface CategoryTabsProps {
  categories: string[];
  activeCategory: string;
  onSelectCategory: (category: string) => void;
}

export default function CategoryTabs({ categories, activeCategory, onSelectCategory }: CategoryTabsProps) {
  return (
    <div className="flex flex-wrap gap-2 mb-8 justify-center">
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => onSelectCategory(category)}
          className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 capitalize backdrop-blur-md
            ${activeCategory === category
              ? 'bg-white/30 text-white border border-white/40 shadow-lg'
              : 'bg-white/10 text-white/80 border border-white/20 hover:bg-white/20 hover:text-white'
            }`}
        >
          {category}
        </button>
      ))}
    </div>
  );
}