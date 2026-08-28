import React, { useState } from 'react';
import { Search, Clock, Flame, CalendarDays, Plus } from 'lucide-react';
import { Modal } from '../common/Modal';
import { Recipe, DayOfWeek, MealSlot } from '../../types/recipe';

interface AssignMealModalProps {
  isOpen: boolean;
  onClose: () => void;
  recipes: Recipe[];
  targetDay: DayOfWeek;
  targetSlot: MealSlot;
  onSelectRecipe: (recipe: Recipe) => void;
}

export const AssignMealModal: React.FC<AssignMealModalProps> = ({
  isOpen,
  onClose,
  recipes,
  targetDay,
  targetSlot,
  onSelectRecipe,
}) => {
  const [search, setSearch] = useState('');

  const filtered = recipes.filter(r =>
    r.title.toLowerCase().includes(search.toLowerCase()) ||
    r.cuisine.toLowerCase().includes(search.toLowerCase()) ||
    r.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      maxWidth="3xl"
      title={
        <div className="flex items-center gap-2">
          <CalendarDays className="w-5 h-5 text-sage-800" />
          <span className="font-serif font-bold text-base sm:text-lg text-charcoal-900">
            Schedule Recipe for {targetDay} — {targetSlot}
          </span>
        </div>
      }
    >
      <div className="p-6 space-y-6">
        
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search recipes by title, cuisine, or category..."
            className="w-full pl-10 pr-4 py-2.5 bg-stone-50 border border-stone-200 rounded-2xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-sage-600/30"
          />
        </div>

        {/* Recipe list */}
        <div className="max-h-96 overflow-y-auto space-y-3 pr-1">
          {filtered.map(recipe => (
            <div
              key={recipe.id}
              onClick={() => {
                onSelectRecipe(recipe);
                onClose();
              }}
              className="p-3 rounded-2xl bg-white border border-stone-200/80 hover:border-sage-400 hover:shadow-soft transition-all cursor-pointer flex items-center justify-between gap-4"
            >
              <div className="flex items-center gap-3.5 min-w-0">
                <img
                  src={recipe.image}
                  alt={recipe.title}
                  className="w-14 h-14 rounded-xl object-cover flex-shrink-0"
                />
                <div className="min-w-0">
                  <h4 className="font-serif font-bold text-xs sm:text-sm text-charcoal-900 truncate">
                    {recipe.title}
                  </h4>
                  <div className="flex items-center gap-2 text-[11px] text-stone-400 mt-0.5">
                    <span>{recipe.cuisine}</span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" /> {recipe.totalTime}m
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Flame className="w-3 h-3 text-terracotta-500" /> {recipe.macros.calories} kcal
                    </span>
                  </div>
                </div>
              </div>

              <button className="px-3.5 py-1.5 rounded-xl bg-sage-800 hover:bg-sage-900 text-white text-xs font-bold shadow-soft flex items-center gap-1 flex-shrink-0">
                <Plus className="w-3.5 h-3.5" />
                <span>Select</span>
              </button>
            </div>
          ))}
        </div>

      </div>
    </Modal>
  );
};
