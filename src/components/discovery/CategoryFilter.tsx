import React from 'react';
import { MealCategory } from '../../types/recipe';

interface CategoryFilterProps {
  activeCategory: MealCategory;
  onSelectCategory: (category: MealCategory) => void;
}

interface CategoryItem {
  id: MealCategory;
  label: string;
  icon: string;
}

const CATEGORIES: CategoryItem[] = [
  { id: 'All', label: 'All Recipes', icon: '🍽️' },
  { id: 'Breakfast', label: 'Breakfast & Brunch', icon: '🥞' },
  { id: 'High Protein', label: 'High Protein', icon: '🥩' },
  { id: 'Quick Meals', label: 'Under 20 Mins', icon: '⏱️' },
  { id: 'Healthy', label: 'Healthy & Light', icon: '🥗' },
  { id: 'Pasta & Grains', label: 'Pasta & Grains', icon: '🍝' },
  { id: 'Bowls & Salads', label: 'Bowls & Greens', icon: '🥑' },
  { id: 'Plant-Based', label: 'Vegan & Plant', icon: '🌱' },
  { id: 'Soups & Stews', label: 'Soups & Stews', icon: '🍲' },
  { id: 'Desserts', label: 'Desserts & Sweets', icon: '🍰' },
];

export const CategoryFilter: React.FC<CategoryFilterProps> = ({
  activeCategory,
  onSelectCategory,
}) => {
  return (
    <div className="py-4 border-b border-stone-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2.5 overflow-x-auto no-scrollbar py-1">
          {CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => onSelectCategory(cat.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all duration-200 select-none ${
                  isActive
                    ? 'bg-sage-800 text-white shadow-soft scale-[1.02]'
                    : 'bg-white border border-stone-200/80 text-stone-700 hover:bg-stone-50 hover:border-stone-300'
                }`}
              >
                <span className="text-base leading-none">{cat.icon}</span>
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
