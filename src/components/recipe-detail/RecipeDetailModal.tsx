import React, { useState, useEffect } from 'react';
import { 
  Heart, 
  Clock, 
  Flame, 
  Star, 
  Users, 
  Scale, 
  ShoppingCart, 
  Play, 
  Plus, 
  Check, 
  ChefHat, 
  Sparkles, 
  CalendarDays, 
  Share2, 
  CheckCircle2, 
  MessageSquareQuote,
  Layers,
  BookmarkPlus
} from 'lucide-react';
import { Modal } from '../common/Modal';
import { Recipe, GroceryItem } from '../../types/recipe';
import { CookingModeModal } from './CookingModeModal';
import { storageService } from '../../services/storage';

interface RecipeDetailModalProps {
  recipe: Recipe | null;
  isOpen: boolean;
  onClose: () => void;
  isFavorite: boolean;
  onToggleFavorite: (recipeId: string) => void;
  onAddToGrocery: (items: GroceryItem[]) => void;
  onOpenMealPlanAssign: (recipe: Recipe) => void;
  onOpenCollectionAssign?: (recipe: Recipe) => void;
}

export const RecipeDetailModal: React.FC<RecipeDetailModalProps> = ({
  recipe,
  isOpen,
  onClose,
  isFavorite,
  onToggleFavorite,
  onAddToGrocery,
  onOpenMealPlanAssign,
  onOpenCollectionAssign,
}) => {
  const [servings, setServings] = useState(4);
  const [isMetric, setIsMetric] = useState(false);
  const [checkedIngredients, setCheckedIngredients] = useState<string[]>([]);
  const [isCookingModeOpen, setIsCookingModeOpen] = useState(false);
  const [userNote, setUserNote] = useState('');
  const [isNoteSaved, setIsNoteSaved] = useState(false);

  useEffect(() => {
    if (recipe) {
      setServings(recipe.servings || 4);
      setCheckedIngredients([]);
      // Load user notes
      const notes = storageService.getUserNotes();
      setUserNote(notes[recipe.id] || '');
      setIsNoteSaved(false);
    }
  }, [recipe]);

  if (!recipe || !isOpen) return null;

  const originalServings = recipe.servings || 4;
  const multiplier = servings / originalServings;

  const toggleIngredientCheck = (id: string) => {
    setCheckedIngredients(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const handleAddAllToGrocery = () => {
    const itemsToAdd: GroceryItem[] = recipe.ingredients.map(ing => ({
      id: `grocery-${Date.now()}-${ing.id}`,
      name: ing.name,
      amount: Number((isMetric ? ing.metricAmount : ing.amount * multiplier).toFixed(1)),
      unit: isMetric ? ing.metricUnit : ing.unit,
      aisle: ing.aisle,
      checked: false,
      recipeOrigin: recipe.title
    }));
    onAddToGrocery(itemsToAdd);
  };

  const handleSaveNote = () => {
    storageService.saveUserNote(recipe.id, userNote);
    setIsNoteSaved(true);
    setTimeout(() => setIsNoteSaved(false), 2000);
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} maxWidth="5xl" showCloseButton={false}>
        <div className="relative bg-[#FAF8F5]">
          
          {/* Hero Header Banner */}
          <div className="relative h-72 sm:h-96 w-full overflow-hidden bg-stone-900">
            <img
              src={recipe.coverImage || recipe.image}
              alt={recipe.title}
              className="w-full h-full object-cover opacity-90"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950/90 via-charcoal-950/40 to-black/30" />

            {/* Top Navigation Row */}
            <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10">
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-white/90 backdrop-blur-md text-charcoal-900 shadow-soft">
                  {recipe.category}
                </span>
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-black/50 backdrop-blur-md text-white border border-white/20">
                  {recipe.cuisine}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => onToggleFavorite(recipe.id)}
                  className="w-10 h-10 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center text-stone-700 hover:text-rose-500 shadow-soft transition-transform active:scale-90"
                  aria-label="Favorite"
                >
                  <Heart
                    className={`w-5 h-5 ${
                      isFavorite ? 'text-rose-500 fill-rose-500' : 'text-stone-700'
                    }`}
                  />
                </button>

                <button
                  onClick={onClose}
                  className="px-3.5 py-2 rounded-full bg-white/90 backdrop-blur-md text-charcoal-900 text-xs font-bold hover:bg-white shadow-soft transition-colors"
                >
                  Close ✕
                </button>
              </div>
            </div>

            {/* Bottom Hero Info */}
            <div className="absolute bottom-6 left-6 right-6 text-white space-y-3">
              <div className="flex flex-wrap items-center gap-3 text-xs text-stone-200">
                <span className="flex items-center gap-1 bg-black/40 backdrop-blur-md px-3 py-1 rounded-full">
                  <Clock className="w-3.5 h-3.5 text-cream-200" />
                  Prep: {recipe.prepTime}m | Cook: {recipe.cookTime}m ({recipe.totalTime}m total)
                </span>
                <span className="flex items-center gap-1 bg-black/40 backdrop-blur-md px-3 py-1 rounded-full">
                  <Flame className="w-3.5 h-3.5 text-terracotta-400" />
                  {recipe.macros.calories} Calories
                </span>
                <span className="flex items-center gap-1 bg-black/40 backdrop-blur-md px-3 py-1 rounded-full font-semibold">
                  <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                  {recipe.rating} ({recipe.reviewCount} reviews)
                </span>
              </div>

              <h1 className="font-serif text-2xl sm:text-4xl font-bold text-white leading-tight">
                {recipe.title}
              </h1>
            </div>
          </div>

          {/* Body Content */}
          <div className="p-6 sm:p-8 space-y-8">
            
            {/* Author Bar & Action CTAs */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-stone-200/80">
              <div className="flex items-center gap-3">
                <img
                  src={recipe.author.avatar}
                  alt={recipe.author.name}
                  className="w-12 h-12 rounded-full object-cover border-2 border-sage-800 shadow-soft"
                />
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="font-serif font-bold text-charcoal-900 text-base">
                      {recipe.author.name}
                    </span>
                    {recipe.author.verified && (
                      <span className="w-4 h-4 rounded-full bg-sage-800 text-white flex items-center justify-center text-[10px]">
                        ✓
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-stone-500">{recipe.author.role}</p>
                </div>
              </div>

              {/* Primary Action Buttons */}
              <div className="flex items-center gap-2.5 flex-wrap">
                <button
                  onClick={() => setIsCookingModeOpen(true)}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-emerald-700 hover:bg-emerald-800 active:scale-95 text-white text-xs sm:text-sm font-bold shadow-soft-lg transition-all"
                >
                  <Play className="w-4 h-4 fill-white" />
                  <span>Start Cooking Assistant</span>
                </button>

                <button
                  onClick={() => onOpenMealPlanAssign(recipe)}
                  className="flex items-center gap-1.5 px-4 py-2.5 rounded-full bg-white border border-stone-200 hover:bg-stone-50 text-charcoal-900 text-xs sm:text-sm font-semibold shadow-soft transition-colors"
                >
                  <CalendarDays className="w-4 h-4 text-sage-800" />
                  <span>Add to Meal Plan</span>
                </button>

                {onOpenCollectionAssign && (
                  <button
                    onClick={() => onOpenCollectionAssign(recipe)}
                    className="p-2.5 rounded-full bg-white border border-stone-200 hover:bg-stone-50 text-charcoal-900 shadow-soft transition-colors"
                    title="Add to Custom Recipe Collection"
                  >
                    <BookmarkPlus className="w-4 h-4 text-stone-700" />
                  </button>
                )}
              </div>
            </div>

            {/* Description */}
            <p className="text-sm sm:text-base text-stone-600 leading-relaxed font-normal">
              {recipe.description}
            </p>

            {/* Nutritional Breakdown Radar/Cards */}
            <div className="space-y-3">
              <h3 className="font-serif font-bold text-charcoal-900 text-base">
                Nutritional Profile (Per Serving)
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                <div className="bg-white p-3.5 rounded-2xl border border-stone-200/80 shadow-soft text-center space-y-1">
                  <span className="text-[11px] font-semibold text-stone-400 uppercase tracking-wider">Calories</span>
                  <p className="font-serif text-xl font-bold text-charcoal-900">{recipe.macros.calories}</p>
                  <span className="text-[10px] text-stone-400">kcal</span>
                </div>
                <div className="bg-white p-3.5 rounded-2xl border border-stone-200/80 shadow-soft text-center space-y-1">
                  <span className="text-[11px] font-semibold text-emerald-600 uppercase tracking-wider">Protein</span>
                  <p className="font-serif text-xl font-bold text-emerald-800">{recipe.macros.protein}g</p>
                  <span className="text-[10px] text-stone-400">High Protein</span>
                </div>
                <div className="bg-white p-3.5 rounded-2xl border border-stone-200/80 shadow-soft text-center space-y-1">
                  <span className="text-[11px] font-semibold text-amber-600 uppercase tracking-wider">Carbs</span>
                  <p className="font-serif text-xl font-bold text-charcoal-900">{recipe.macros.carbs}g</p>
                  <span className="text-[10px] text-stone-400">Clean energy</span>
                </div>
                <div className="bg-white p-3.5 rounded-2xl border border-stone-200/80 shadow-soft text-center space-y-1">
                  <span className="text-[11px] font-semibold text-terracotta-600 uppercase tracking-wider">Fats</span>
                  <p className="font-serif text-xl font-bold text-charcoal-900">{recipe.macros.fat}g</p>
                  <span className="text-[10px] text-stone-400">Healthy lipids</span>
                </div>
                <div className="bg-white p-3.5 rounded-2xl border border-stone-200/80 shadow-soft text-center space-y-1">
                  <span className="text-[11px] font-semibold text-sage-600 uppercase tracking-wider">Fiber</span>
                  <p className="font-serif text-xl font-bold text-charcoal-900">{recipe.macros.fiber || 3}g</p>
                  <span className="text-[10px] text-stone-400">Dietary fiber</span>
                </div>
              </div>
            </div>

            {/* Grid for Ingredients and Instructions */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-4">
              
              {/* Left Column: Scalable Ingredients */}
              <div className="lg:col-span-5 space-y-5">
                <div className="flex items-center justify-between pb-2 border-b border-stone-200">
                  <h3 className="font-serif font-bold text-charcoal-900 text-lg">Ingredients</h3>
                  
                  {/* Metric Toggle */}
                  <div className="flex items-center gap-1 text-xs font-semibold bg-stone-100 p-1 rounded-xl">
                    <button
                      onClick={() => setIsMetric(false)}
                      className={`px-2.5 py-1 rounded-lg transition-all ${
                        !isMetric ? 'bg-white shadow-soft text-charcoal-900' : 'text-stone-500'
                      }`}
                    >
                      US
                    </button>
                    <button
                      onClick={() => setIsMetric(true)}
                      className={`px-2.5 py-1 rounded-lg transition-all ${
                        isMetric ? 'bg-white shadow-soft text-charcoal-900' : 'text-stone-500'
                      }`}
                    >
                      Metric
                    </button>
                  </div>
                </div>

                {/* Servings Scaler Widget */}
                <div className="bg-white p-4 rounded-2xl border border-stone-200/80 shadow-soft flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs font-bold text-charcoal-900">
                    <Users className="w-4 h-4 text-sage-800" />
                    <span>Serving Size</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      disabled={servings <= 1}
                      onClick={() => setServings(prev => Math.max(1, prev - 1))}
                      className="w-8 h-8 rounded-full bg-stone-100 hover:bg-stone-200 disabled:opacity-40 text-charcoal-900 font-bold flex items-center justify-center transition-colors"
                    >
                      -
                    </button>
                    <span className="font-serif font-bold text-base text-charcoal-900 w-8 text-center">
                      {servings}
                    </span>
                    <button
                      disabled={servings >= 16}
                      onClick={() => setServings(prev => Math.min(16, prev + 1))}
                      className="w-8 h-8 rounded-full bg-stone-100 hover:bg-stone-200 disabled:opacity-40 text-charcoal-900 font-bold flex items-center justify-center transition-colors"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Ingredients Checklist */}
                <div className="space-y-2">
                  {recipe.ingredients.map((ing) => {
                    const isChecked = checkedIngredients.includes(ing.id);
                    const displayAmount = isMetric
                      ? `${(ing.metricAmount * multiplier).toFixed(ing.metricAmount >= 10 ? 0 : 1)} ${ing.metricUnit}`
                      : `${(ing.amount * multiplier).toFixed(ing.amount >= 10 ? 0 : 1)} ${ing.unit}`;

                    return (
                      <div
                        key={ing.id}
                        onClick={() => toggleIngredientCheck(ing.id)}
                        className={`p-3 rounded-2xl border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                          isChecked
                            ? 'bg-sage-50/70 border-sage-200 text-stone-400 line-through'
                            : 'bg-white border-stone-200/80 text-charcoal-900 hover:border-sage-300'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-5 h-5 rounded-lg border flex items-center justify-center transition-colors ${
                              isChecked
                                ? 'bg-sage-800 border-sage-800 text-white'
                                : 'border-stone-300 bg-white'
                            }`}
                          >
                            {isChecked && <Check className="w-3.5 h-3.5" />}
                          </div>
                          <span className="text-xs sm:text-sm font-medium">{ing.name}</span>
                        </div>

                        <span className="text-xs font-bold text-sage-900 whitespace-nowrap">
                          {displayAmount}
                        </span>
                      </div>
                    );
                  })}
                </div>

                {/* Add to Grocery List CTA */}
                <button
                  onClick={handleAddAllToGrocery}
                  className="w-full py-3 rounded-2xl bg-stone-100 hover:bg-stone-200 text-charcoal-900 text-xs font-bold transition-colors flex items-center justify-center gap-2 border border-stone-200/80 shadow-soft"
                >
                  <ShoppingCart className="w-4 h-4 text-sage-800" />
                  <span>Add Ingredients to Grocery List</span>
                </button>

                {/* Substitutions & Allergens */}
                {recipe.substitutions && recipe.substitutions.length > 0 && (
                  <div className="bg-amber-50/80 border border-amber-200/70 rounded-2xl p-4 space-y-2">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-amber-900">
                      <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                      <span>Substitutions & Dietary Swaps</span>
                    </div>
                    {recipe.substitutions.map((sub, idx) => (
                      <p key={idx} className="text-xs text-amber-900/80 leading-relaxed">
                        <strong>{sub.original} → {sub.replacement}:</strong> {sub.tip}
                      </p>
                    ))}
                  </div>
                )}

              </div>

              {/* Right Column: Step-by-Step Instructions */}
              <div className="lg:col-span-7 space-y-5">
                <div className="flex items-center justify-between pb-2 border-b border-stone-200">
                  <h3 className="font-serif font-bold text-charcoal-900 text-lg">Instructions</h3>
                  <span className="text-xs text-stone-400 font-medium">
                    {recipe.instructions.length} Steps
                  </span>
                </div>

                <div className="space-y-4">
                  {recipe.instructions.map((step) => (
                    <div
                      key={step.stepNumber}
                      className="bg-white p-5 rounded-3xl border border-stone-200/80 shadow-soft space-y-2.5 hover:border-sage-300 transition-all"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="w-6 h-6 rounded-full bg-sage-800 text-white text-xs font-bold flex items-center justify-center">
                            {step.stepNumber}
                          </span>
                          {step.title && (
                            <h4 className="font-serif font-bold text-charcoal-900 text-sm sm:text-base">
                              {step.title}
                            </h4>
                          )}
                        </div>

                        {step.timerMinutes && (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-terracotta-50 text-terracotta-700 border border-terracotta-200">
                            <Clock className="w-3 h-3" />
                            {step.timerMinutes} mins
                          </span>
                        )}
                      </div>

                      <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                        {step.instruction}
                      </p>

                      {step.tip && (
                        <div className="p-3 rounded-xl bg-sage-50/70 border border-sage-100 text-xs text-sage-900 flex items-start gap-2">
                          <Sparkles className="w-3.5 h-3.5 text-sage-600 flex-shrink-0 mt-0.5" />
                          <span><strong>Chef Tip:</strong> {step.tip}</span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                {/* Personal Notes Box */}
                <div className="bg-white p-5 rounded-3xl border border-stone-200/80 shadow-soft space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="font-serif font-bold text-charcoal-900 text-sm flex items-center gap-2">
                      <MessageSquareQuote className="w-4 h-4 text-sage-800" />
                      <span>Your Personal Recipe Notes</span>
                    </h4>
                    {isNoteSaved && (
                      <span className="text-xs text-emerald-600 font-bold flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        Saved!
                      </span>
                    )}
                  </div>

                  <textarea
                    value={userNote}
                    onChange={(e) => setUserNote(e.target.value)}
                    placeholder="Add adjustments (e.g., 'Used smoked paprika instead', 'Cooked 2 mins less on salmon skin')..."
                    className="w-full p-3 bg-stone-50 border border-stone-200 rounded-2xl text-xs placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-sage-600/30 focus:bg-white resize-none h-20"
                  />

                  <div className="flex justify-end">
                    <button
                      onClick={handleSaveNote}
                      className="px-4 py-2 rounded-xl bg-sage-800 text-white text-xs font-bold hover:bg-sage-900 transition-colors shadow-soft"
                    >
                      Save Note
                    </button>
                  </div>
                </div>

              </div>

            </div>

          </div>

        </div>
      </Modal>

      {/* Full-Screen Distraction Free Cooking Assistant */}
      <CookingModeModal
        recipe={recipe}
        isOpen={isCookingModeOpen}
        onClose={() => setIsCookingModeOpen(false)}
        scaledServings={servings}
      />
    </>
  );
};
