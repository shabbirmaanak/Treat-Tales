import React from 'react';
import { ArrowUpDown, SlidersHorizontal, Utensils, Sparkles, RotateCcw } from 'lucide-react';
import { Recipe, FilterState } from '../../types/recipe';
import { RecipeCard } from './RecipeCard';

interface RecipeGridProps {
  recipes: Recipe[];
  favorites: string[];
  onToggleFavorite: (recipeId: string, e: React.MouseEvent) => void;
  onOpenRecipe: (recipe: Recipe) => void;
  onQuickAddToPlan: (recipe: Recipe, e: React.MouseEvent) => void;
  filters: FilterState;
  onChangeFilters: (filters: FilterState) => void;
  onResetFilters: () => void;
  onOpenPantryModal: () => void;
  showFilterSidebar: boolean;
  onToggleFilterSidebar: () => void;
}

export const RecipeGrid: React.FC<RecipeGridProps> = ({
  recipes,
  favorites,
  onToggleFavorite,
  onOpenRecipe,
  onQuickAddToPlan,
  filters,
  onChangeFilters,
  onResetFilters,
  onOpenPantryModal,
  showFilterSidebar,
  onToggleFilterSidebar,
}) => {
  return (
    <div className="space-y-6">
      
      {/* Top Controls Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-stone-200/70 shadow-soft">
        
        {/* Count & Active Category */}
        <div className="flex items-center gap-3">
          <button
            onClick={onToggleFilterSidebar}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold border transition-all ${
              showFilterSidebar
                ? 'bg-sage-800 text-white border-sage-800 shadow-soft'
                : 'bg-stone-50 border-stone-200 text-stone-700 hover:bg-stone-100'
            }`}
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span>Filters</span>
            {filters.dietary.length > 0 || filters.maxTime > 0 || filters.maxCalories > 0 || filters.cuisine !== 'All' || filters.difficulty !== 'All' ? (
              <span className="w-2 h-2 rounded-full bg-terracotta-500" />
            ) : null}
          </button>

          <p className="text-xs sm:text-sm font-medium text-stone-500">
            Showing <strong className="text-charcoal-900 font-bold">{recipes.length}</strong> recipes
            {filters.category !== 'All' && <span> in <strong className="text-sage-800">{filters.category}</strong></span>}
          </p>
        </div>

        {/* Sort and Pantry button */}
        <div className="flex items-center gap-2 self-end sm:self-auto">
          <div className="flex items-center gap-1.5 text-xs text-stone-500">
            <ArrowUpDown className="w-3.5 h-3.5 text-stone-400" />
            <span className="hidden sm:inline">Sort:</span>
            <select
              value={filters.sortBy}
              onChange={(e) => onChangeFilters({ ...filters, sortBy: e.target.value as any })}
              className="bg-stone-50 border border-stone-200 text-charcoal-900 rounded-xl px-2.5 py-1.5 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-sage-600/30"
            >
              <option value="popular">Most Popular</option>
              <option value="rating">Highest Rated</option>
              <option value="quickest">Quickest Prep</option>
              <option value="calories">Lowest Calories</option>
              <option value="newest">Recently Added</option>
            </select>
          </div>
        </div>

      </div>

      {/* Grid or Empty State */}
      {recipes.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {recipes.map((recipe) => (
            <RecipeCard
              key={recipe.id}
              recipe={recipe}
              isFavorite={favorites.includes(recipe.id)}
              onToggleFavorite={onToggleFavorite}
              onOpenRecipe={onOpenRecipe}
              onQuickAddToPlan={onQuickAddToPlan}
            />
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="bg-white rounded-3xl p-12 text-center border border-stone-200/80 shadow-soft space-y-4 max-w-lg mx-auto my-8">
          <div className="w-16 h-16 rounded-full bg-sage-50 text-sage-800 mx-auto flex items-center justify-center">
            <Utensils className="w-8 h-8" />
          </div>
          <div className="space-y-1">
            <h3 className="font-serif text-xl font-bold text-charcoal-900">No Recipes Match Your Filters</h3>
            <p className="text-xs text-stone-500">
              Try adjusting your cooking time, dietary filters, or search terms to discover more meals.
            </p>
          </div>
          <div className="pt-2 flex items-center justify-center gap-3">
            <button
              onClick={onResetFilters}
              className="flex items-center gap-1.5 px-4 py-2.5 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-semibold transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset All Filters</span>
            </button>
            <button
              onClick={onOpenPantryModal}
              className="flex items-center gap-1.5 px-4 py-2.5 rounded-full bg-terracotta-500 hover:bg-terracotta-600 text-white text-xs font-semibold shadow-soft transition-colors"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Try Pantry Matcher</span>
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
