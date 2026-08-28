import React from 'react';
import { 
  Sparkles, 
  Clock, 
  Flame, 
  Star, 
  ArrowRight, 
  ChefHat, 
  Utensils, 
  CheckCircle,
  Search
} from 'lucide-react';
import { Recipe } from '../../types/recipe';

interface HeroSectionProps {
  featuredRecipe: Recipe;
  onOpenRecipe: (recipe: Recipe) => void;
  onOpenPantryModal: () => void;
  onQuickFilterTag: (tag: string) => void;
  recipesCount: number;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  featuredRecipe,
  onOpenRecipe,
  onOpenPantryModal,
  onQuickFilterTag,
  recipesCount,
}) => {
  return (
    <div className="relative pt-4 pb-10 sm:py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Hero Card Container */}
        <div className="relative bg-gradient-to-br from-[#1C4731] via-[#163D29] to-[#0E281B] rounded-[2.5rem] p-6 sm:p-10 lg:p-14 text-white overflow-hidden shadow-soft-xl border border-sage-800/40">
          
          {/* Subtle Decorative Background Elements */}
          <div className="absolute top-0 right-0 -mt-16 -mr-16 w-96 h-96 bg-sage-400/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-1/4 -mb-20 w-80 h-80 bg-terracotta-500/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            
            {/* Left Content Column */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-xs font-semibold text-cream-100">
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                <span>Smart Culinary Discovery Platform</span>
              </div>

              {/* Headline */}
              <div className="space-y-2">
                <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-[1.15]">
                  Turn Everyday Ingredients Into <span className="italic text-terracotta-300 font-medium">Extraordinary</span> Meals.
                </h1>
                <p className="text-sm sm:text-base text-sage-100/80 max-w-xl font-normal leading-relaxed">
                  Discover chef-crafted recipes, match what's in your pantry, scale portions dynamically, and cook with step-by-step guidance.
                </p>
              </div>

              {/* Quick Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  onClick={onOpenPantryModal}
                  className="flex items-center gap-2.5 px-6 py-3.5 rounded-full bg-terracotta-500 hover:bg-terracotta-600 active:scale-95 text-white font-semibold text-sm shadow-soft-lg transition-all duration-200"
                >
                  <Sparkles className="w-4 h-4 text-amber-200" />
                  <span>What's In My Fridge?</span>
                </button>
                <button
                  onClick={() => onOpenRecipe(featuredRecipe)}
                  className="flex items-center gap-2 px-6 py-3.5 rounded-full bg-white/10 hover:bg-white/20 active:scale-95 text-white font-semibold text-sm backdrop-blur-md border border-white/20 transition-all duration-200"
                >
                  <span>Featured Dish</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              {/* Quick Popular Tags */}
              <div className="pt-2 flex flex-wrap items-center gap-2">
                <span className="text-xs text-sage-200/80 font-medium mr-1">Trending:</span>
                {['Salmon', 'Carbonara', 'Air Fryer', 'Keto', '15 Min Brunch'].map((tag) => (
                  <button
                    key={tag}
                    onClick={() => onQuickFilterTag(tag)}
                    className="text-xs px-3 py-1 rounded-full bg-white/10 hover:bg-white/20 text-cream-100/90 border border-white/10 transition-colors"
                  >
                    #{tag}
                  </button>
                ))}
              </div>

              {/* Social Proof / Stats */}
              <div className="pt-4 flex items-center gap-6 sm:gap-8 border-t border-white/10 text-cream-100/80">
                <div>
                  <p className="font-serif text-xl sm:text-2xl font-bold text-white">{recipesCount}+</p>
                  <p className="text-xs text-sage-200/70">Tested Recipes</p>
                </div>
                <div className="h-8 w-px bg-white/15" />
                <div>
                  <p className="font-serif text-xl sm:text-2xl font-bold text-white">100%</p>
                  <p className="text-xs text-sage-200/70">Pantry Matching</p>
                </div>
                <div className="h-8 w-px bg-white/15" />
                <div>
                  <p className="font-serif text-xl sm:text-2xl font-bold text-white">4.9 ★</p>
                  <p className="text-xs text-sage-200/70">Chef Community</p>
                </div>
              </div>

            </div>

            {/* Right Featured Dish Card Showcase */}
            <div className="lg:col-span-5">
              <div 
                onClick={() => onOpenRecipe(featuredRecipe)}
                className="group relative bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-4 sm:p-5 cursor-pointer shadow-soft-xl hover:bg-white/15 transition-all duration-300 transform hover:-translate-y-1"
              >
                {/* Image Container with Floating Badges */}
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-inner">
                  <img
                    src={featuredRecipe.image}
                    alt={featuredRecipe.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                  
                  {/* Top Badges */}
                  <div className="absolute top-3 left-3 flex items-center gap-2">
                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-terracotta-500 text-white shadow-soft">
                      Recipe of the Day
                    </span>
                    <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-charcoal-900/80 backdrop-blur-md text-white">
                      {featuredRecipe.category}
                    </span>
                  </div>

                  {/* Rating Tag */}
                  <div className="absolute top-3 right-3 flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-md text-charcoal-900 text-xs font-bold shadow-soft">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    <span>{featuredRecipe.rating}</span>
                    <span className="text-stone-400 font-normal">({featuredRecipe.reviewCount})</span>
                  </div>

                  {/* Bottom Image Overlay Details */}
                  <div className="absolute bottom-3 left-3 right-3 text-white">
                    <div className="flex items-center gap-3 text-xs text-stone-200">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-cream-200" />
                        {featuredRecipe.totalTime} mins
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Flame className="w-3.5 h-3.5 text-terracotta-300" />
                        {featuredRecipe.macros.calories} kcal
                      </span>
                      <span>•</span>
                      <span>{featuredRecipe.difficulty}</span>
                    </div>
                  </div>
                </div>

                {/* Recipe Card Body */}
                <div className="pt-4 space-y-2">
                  <h3 className="font-serif text-lg sm:text-xl font-bold text-white group-hover:text-terracotta-200 transition-colors line-clamp-1">
                    {featuredRecipe.title}
                  </h3>
                  <p className="text-xs text-stone-300 line-clamp-2 leading-relaxed">
                    {featuredRecipe.subtitle || featuredRecipe.description}
                  </p>

                  {/* Chef row */}
                  <div className="pt-2 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <img
                        src={featuredRecipe.author.avatar}
                        alt={featuredRecipe.author.name}
                        className="w-7 h-7 rounded-full object-cover border border-white/30"
                      />
                      <span className="text-xs font-medium text-stone-200">
                        {featuredRecipe.author.name}
                      </span>
                    </div>
                    <span className="inline-flex items-center gap-1 text-xs font-bold text-terracotta-300 group-hover:translate-x-1 transition-transform">
                      <span>Cook this</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};
