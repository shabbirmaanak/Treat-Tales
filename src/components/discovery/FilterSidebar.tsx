import React from 'react';
import { SlidersHorizontal, RotateCcw, Flame, Clock, ChefHat, Check } from 'lucide-react';
import { FilterState, CuisineType, DietaryTag, DifficultyLevel } from '../../types/recipe';

interface FilterSidebarProps {
  filters: FilterState;
  onChangeFilters: (filters: FilterState) => void;
  onResetFilters: () => void;
  activeCount: number;
}

const CUISINES: CuisineType[] = [
  'Italian',
  'Japanese',
  'Mediterranean',
  'Mexican',
  'Thai',
  'American',
  'French',
];

const DIETARY_OPTIONS: DietaryTag[] = [
  'Vegetarian',
  'Vegan',
  'Gluten-Free',
  'Dairy-Free',
  'Keto',
  'Low Carb',
  'High Protein',
  'Quick & Easy',
];

const DIFFICULTIES: DifficultyLevel[] = ['Easy', 'Medium', 'Master'];

export const FilterSidebar: React.FC<FilterSidebarProps> = ({
  filters,
  onChangeFilters,
  onResetFilters,
  activeCount,
}) => {
  const toggleDietary = (tag: DietaryTag) => {
    const exists = filters.dietary.includes(tag);
    const updated = exists
      ? filters.dietary.filter((t) => t !== tag)
      : [...filters.dietary, tag];
    onChangeFilters({ ...filters, dietary: updated });
  };

  return (
    <div className="bg-white rounded-3xl p-5 border border-stone-200/80 shadow-soft space-y-6">
      
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-stone-100">
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="w-4 h-4 text-sage-800" />
          <h3 className="font-serif font-bold text-charcoal-900 text-base">Filter Recipes</h3>
          {activeCount > 0 && (
            <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-terracotta-100 text-terracotta-700">
              {activeCount}
            </span>
          )}
        </div>
        {activeCount > 0 && (
          <button
            onClick={onResetFilters}
            className="flex items-center gap-1 text-xs text-stone-400 hover:text-charcoal-900 transition-colors"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Reset</span>
          </button>
        )}
      </div>

      {/* Max Prep & Cook Time */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs font-semibold text-charcoal-900">
          <span className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5 text-sage-700" />
            Max Cooking Time
          </span>
          <span className="text-sage-800 font-bold">
            {filters.maxTime === 0 ? 'Any Time' : `≤ ${filters.maxTime} mins`}
          </span>
        </div>
        <input
          type="range"
          min="0"
          max="60"
          step="5"
          value={filters.maxTime}
          onChange={(e) => onChangeFilters({ ...filters, maxTime: Number(e.target.value) })}
          className="w-full h-2 bg-stone-100 rounded-lg appearance-none cursor-pointer accent-sage-800"
        />
        <div className="flex justify-between text-[10px] text-stone-400 font-medium">
          <span>Any</span>
          <span>15m</span>
          <span>30m</span>
          <span>45m</span>
          <span>60m</span>
        </div>
      </div>

      {/* Max Calories */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs font-semibold text-charcoal-900">
          <span className="flex items-center gap-1">
            <Flame className="w-3.5 h-3.5 text-terracotta-500" />
            Max Calories
          </span>
          <span className="text-terracotta-600 font-bold">
            {filters.maxCalories === 0 ? 'Any' : `≤ ${filters.maxCalories} kcal`}
          </span>
        </div>
        <input
          type="range"
          min="0"
          max="800"
          step="50"
          value={filters.maxCalories}
          onChange={(e) => onChangeFilters({ ...filters, maxCalories: Number(e.target.value) })}
          className="w-full h-2 bg-stone-100 rounded-lg appearance-none cursor-pointer accent-terracotta-500"
        />
        <div className="flex justify-between text-[10px] text-stone-400 font-medium">
          <span>Any</span>
          <span>400</span>
          <span>600</span>
          <span>800+</span>
        </div>
      </div>

      {/* Difficulty */}
      <div className="space-y-2">
        <label className="text-xs font-semibold text-charcoal-900 flex items-center gap-1">
          <ChefHat className="w-3.5 h-3.5 text-sage-700" />
          Skill Level
        </label>
        <div className="grid grid-cols-4 gap-1.5">
          <button
            onClick={() => onChangeFilters({ ...filters, difficulty: 'All' })}
            className={`py-1.5 px-2 rounded-xl text-xs font-medium transition-all ${
              filters.difficulty === 'All'
                ? 'bg-sage-800 text-white font-semibold shadow-soft'
                : 'bg-stone-50 text-stone-600 hover:bg-stone-100'
            }`}
          >
            All
          </button>
          {DIFFICULTIES.map((d) => (
            <button
              key={d}
              onClick={() => onChangeFilters({ ...filters, difficulty: d })}
              className={`py-1.5 px-2 rounded-xl text-xs font-medium transition-all ${
                filters.difficulty === d
                  ? 'bg-sage-800 text-white font-semibold shadow-soft'
                  : 'bg-stone-50 text-stone-600 hover:bg-stone-100'
              }`}
            >
              {d}
            </button>
          ))}
        </div>
      </div>

      {/* Cuisine */}
      <div className="space-y-2">
        <label className="text-xs font-semibold text-charcoal-900">Cuisine Origin</label>
        <select
          value={filters.cuisine}
          onChange={(e) => onChangeFilters({ ...filters, cuisine: e.target.value as any })}
          className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs font-medium text-charcoal-900 focus:outline-none focus:ring-2 focus:ring-sage-600/30"
        >
          <option value="All">All Cuisines</option>
          {CUISINES.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>

      {/* Dietary Restrictions */}
      <div className="space-y-2">
        <label className="text-xs font-semibold text-charcoal-900">Dietary & Lifestyle</label>
        <div className="flex flex-wrap gap-1.5">
          {DIETARY_OPTIONS.map((tag) => {
            const isSelected = filters.dietary.includes(tag);
            return (
              <button
                key={tag}
                onClick={() => toggleDietary(tag)}
                className={`flex items-center gap-1 px-2.5 py-1 rounded-xl text-[11px] font-medium transition-all ${
                  isSelected
                    ? 'bg-sage-800 text-white shadow-soft font-semibold'
                    : 'bg-stone-50 text-stone-600 hover:bg-stone-100 border border-stone-200/60'
                }`}
              >
                {isSelected && <Check className="w-3 h-3 text-white" />}
                <span>{tag}</span>
              </button>
            );
          })}
        </div>
      </div>

    </div>
  );
};
