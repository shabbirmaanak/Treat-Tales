import React from 'react';
import { Heart, Clock, Flame, Star, ChefHat, Plus, Utensils, Sparkles } from 'lucide-react';
import { Recipe } from '../../types/recipe';

interface RecipeCardProps {
  recipe: Recipe;
  isFavorite: boolean;
  onToggleFavorite: (recipeId: string, e: React.MouseEvent) => void;
  onOpenRecipe: (recipe: Recipe) => void;
  onQuickAddToPlan?: (recipe: Recipe, e: React.MouseEvent) => void;
}

export const RecipeCard: React.FC<RecipeCardProps> = ({
  recipe,
  isFavorite,
  onToggleFavorite,
  onOpenRecipe,
  onQuickAddToPlan,
}) => {
  return (
    <div
      onClick={() => onOpenRecipe(recipe)}
      className="group relative bg-white rounded-3xl overflow-hidden border border-stone-200/70 shadow-soft hover:shadow-soft-xl transition-all duration-300 transform hover:-translate-y-1 flex flex-col cursor-pointer"
    >
      {/* Image & Overlay Header */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-stone-100">
        <img
          src={recipe.image}
          alt={recipe.title}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950/60 via-transparent to-black/20" />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 flex items-center gap-1.5 flex-wrap">
          <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-white/90 backdrop-blur-md text-charcoal-900 shadow-soft">
            {recipe.category}
          </span>
          {recipe.isTrending && (
            <span className="px-2 py-1 rounded-full text-[10px] font-bold bg-terracotta-500 text-white shadow-soft flex items-center gap-0.5">
              <Sparkles className="w-2.5 h-2.5" />
              Trending
            </span>
          )}
        </div>

        {/* Favorite Heart Button */}
        <button
          onClick={(e) => onToggleFavorite(recipe.id, e)}
          className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center text-stone-600 hover:text-rose-500 shadow-soft transition-all duration-200 active:scale-90 hover:scale-110"
          aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
        >
          <Heart
            className={`w-4 h-4 transition-colors ${
              isFavorite ? 'text-rose-500 fill-rose-500' : 'text-stone-500'
            }`}
          />
        </button>

        {/* Bottom Overlay Meta */}
        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white text-xs">
          <div className="flex items-center gap-2">
            <span className="flex items-center gap-1 font-medium bg-black/40 backdrop-blur-md px-2 py-0.5 rounded-full">
              <Clock className="w-3 h-3 text-cream-200" />
              {recipe.totalTime}m
            </span>
            <span className="flex items-center gap-1 font-medium bg-black/40 backdrop-blur-md px-2 py-0.5 rounded-full">
              <Flame className="w-3 h-3 text-terracotta-400" />
              {recipe.macros.calories} kcal
            </span>
          </div>

          <div className="flex items-center gap-1 bg-black/50 backdrop-blur-md px-2 py-0.5 rounded-full font-bold">
            <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
            <span>{recipe.rating}</span>
          </div>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2 text-[11px] font-semibold text-sage-800">
            <span>{recipe.cuisine}</span>
            <span>•</span>
            <span className="text-stone-400">{recipe.difficulty}</span>
            <span>•</span>
            <span className="text-stone-500">{recipe.macros.protein}g Protein</span>
          </div>

          <h3 className="font-serif text-lg font-bold text-charcoal-900 group-hover:text-sage-800 transition-colors line-clamp-1">
            {recipe.title}
          </h3>

          <p className="text-xs text-stone-500 line-clamp-2 leading-relaxed">
            {recipe.subtitle || recipe.description}
          </p>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1">
          {recipe.dietary.slice(0, 2).map((tag) => (
            <span
              key={tag}
              className="text-[10px] font-medium px-2 py-0.5 rounded-md bg-stone-100 text-stone-600"
            >
              {tag}
            </span>
          ))}
          {recipe.dietary.length > 2 && (
            <span className="text-[10px] font-medium px-1.5 py-0.5 rounded-md bg-stone-100 text-stone-400">
              +{recipe.dietary.length - 2}
            </span>
          )}
        </div>

        {/* Footer: Chef info & Quick actions */}
        <div className="pt-3 border-t border-stone-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img
              src={recipe.author.avatar}
              alt={recipe.author.name}
              className="w-6 h-6 rounded-full object-cover"
            />
            <span className="text-xs font-medium text-stone-600 truncate max-w-[110px]">
              {recipe.author.name}
            </span>
          </div>

          <div className="flex items-center gap-1">
            {onQuickAddToPlan && (
              <button
                onClick={(e) => onQuickAddToPlan(recipe, e)}
                title="Add to Weekly Meal Plan"
                className="p-1.5 rounded-xl bg-stone-100 hover:bg-sage-100 hover:text-sage-800 text-stone-600 transition-colors"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            )}
            <span className="text-xs font-bold text-sage-800 group-hover:underline pl-1">
              View →
            </span>
          </div>
        </div>

      </div>
    </div>
  );
};
