import React, { useState, useMemo } from 'react';
import { 
  Sparkles, 
  Plus, 
  X, 
  Check, 
  Utensils, 
  ArrowRight, 
  ShoppingCart, 
  ChefHat,
  Flame,
  Clock
} from 'lucide-react';
import { Modal } from '../common/Modal';
import { Recipe, GroceryItem } from '../../types/recipe';
import { PANTRY_COMMON_INGREDIENTS } from '../../data/initialRecipes';

interface PantryMatcherModalProps {
  isOpen: boolean;
  onClose: () => void;
  recipes: Recipe[];
  onOpenRecipe: (recipe: Recipe) => void;
  onAddMissingToGrocery: (items: GroceryItem[]) => void;
}

export const PantryMatcherModal: React.FC<PantryMatcherModalProps> = ({
  isOpen,
  onClose,
  recipes,
  onOpenRecipe,
  onAddMissingToGrocery,
}) => {
  const [selectedIngredients, setSelectedIngredients] = useState<string[]>([
    'Garlic', 'Olive Oil', 'Butter', 'Lemon', 'Eggs', 'Salmon', 'Parmesan', 'Baby Spinach'
  ]);
  const [customInput, setCustomInput] = useState('');

  const toggleIngredient = (name: string) => {
    setSelectedIngredients(prev =>
      prev.includes(name) ? prev.filter(i => i !== name) : [...prev, name]
    );
  };

  const handleAddCustom = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = customInput.trim();
    if (clean && !selectedIngredients.some(i => i.toLowerCase() === clean.toLowerCase())) {
      setSelectedIngredients(prev => [...prev, clean]);
      setCustomInput('');
    }
  };

  const removeIngredient = (name: string) => {
    setSelectedIngredients(prev => prev.filter(i => i !== name));
  };

  const clearAll = () => setSelectedIngredients([]);

  // Calculate Match Score for each recipe
  const matchedRecipes = useMemo(() => {
    if (selectedIngredients.length === 0) return [];

    const lowerPantry = selectedIngredients.map(i => i.toLowerCase());

    return recipes
      .map(recipe => {
        let matchedCount = 0;
        const total = recipe.ingredients.length;
        const missing: typeof recipe.ingredients = [];
        const matched: typeof recipe.ingredients = [];

        recipe.ingredients.forEach(ing => {
          const ingNameLower = ing.name.toLowerCase();
          const has = lowerPantry.some(p => ingNameLower.includes(p) || p.includes(ingNameLower.split(' ')[0]));
          if (has) {
            matchedCount++;
            matched.push(ing);
          } else {
            missing.push(ing);
          }
        });

        const matchPercent = Math.round((matchedCount / total) * 100);

        return {
          recipe,
          matchedCount,
          total,
          matchPercent,
          missing,
          matched
        };
      })
      .filter(item => item.matchPercent > 0)
      .sort((a, b) => b.matchPercent - a.matchPercent);
  }, [recipes, selectedIngredients]);

  return (
    <Modal isOpen={isOpen} onClose={onClose} maxWidth="5xl">
      <div className="p-6 sm:p-8 space-y-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-stone-100">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-amber-50 text-amber-800 border border-amber-200">
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              <span>Smart Pantry & Fridge Matcher</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-charcoal-900">
              What’s In Your Kitchen Right Now?
            </h2>
            <p className="text-xs sm:text-sm text-stone-500">
              Select or type the ingredients you have at home. We'll find recipes you can cook instantly with zero food waste.
            </p>
          </div>

          {selectedIngredients.length > 0 && (
            <button
              onClick={clearAll}
              className="text-xs font-semibold text-stone-400 hover:text-charcoal-900 self-start sm:self-center"
            >
              Clear All ({selectedIngredients.length})
            </button>
          )}
        </div>

        {/* Selected Active Pantry Pills */}
        <div className="space-y-3">
          <div className="flex items-center justify-between text-xs font-bold text-charcoal-900">
            <span>Your Selected Ingredients ({selectedIngredients.length}):</span>
          </div>

          <div className="flex flex-wrap gap-2 min-h-10 p-3 bg-stone-50 rounded-2xl border border-stone-200/70">
            {selectedIngredients.map((item) => (
              <span
                key={item}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-sage-800 text-white shadow-soft animate-scale-in"
              >
                <span>{item}</span>
                <button
                  onClick={() => removeIngredient(item)}
                  className="hover:bg-sage-900 rounded-full p-0.5"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))}

            {selectedIngredients.length === 0 && (
              <p className="text-xs text-stone-400 italic py-1">
                No ingredients selected yet. Tap tags below or type your own!
              </p>
            )}
          </div>

          {/* Add custom ingredient input */}
          <form onSubmit={handleAddCustom} className="flex gap-2">
            <input
              type="text"
              value={customInput}
              onChange={(e) => setCustomInput(e.target.value)}
              placeholder="Type any ingredient (e.g. Greek yogurt, Cilantro, Lentils)..."
              className="flex-1 px-4 py-2 bg-white border border-stone-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-sage-600/30"
            />
            <button
              type="submit"
              className="px-4 py-2 rounded-xl bg-sage-800 text-white text-xs font-bold hover:bg-sage-900 transition-colors flex items-center gap-1"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add</span>
            </button>
          </form>
        </div>

        {/* Quick Pantry Suggestion Tags */}
        <div className="space-y-2">
          <p className="text-xs font-bold text-stone-500">Popular Staples (Click to Toggle):</p>
          <div className="flex flex-wrap gap-1.5">
            {PANTRY_COMMON_INGREDIENTS.map((item) => {
              const isSelected = selectedIngredients.includes(item);
              return (
                <button
                  key={item}
                  onClick={() => toggleIngredient(item)}
                  className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
                    isSelected
                      ? 'bg-sage-100 text-sage-800 border border-sage-300 ring-2 ring-sage-600/20'
                      : 'bg-white border border-stone-200 text-stone-600 hover:bg-stone-50'
                  }`}
                >
                  {isSelected ? `✓ ${item}` : `+ ${item}`}
                </button>
              );
            })}
          </div>
        </div>

        {/* Matched Results */}
        <div className="pt-4 border-t border-stone-100 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-serif text-lg font-bold text-charcoal-900">
              Compatible Recipes Found ({matchedRecipes.length})
            </h3>
            <span className="text-xs text-stone-400">Ordered by highest ingredient match</span>
          </div>

          {matchedRecipes.length > 0 ? (
            <div className="space-y-4">
              {matchedRecipes.map(({ recipe, matchedCount, total, matchPercent, missing }) => (
                <div
                  key={recipe.id}
                  className="p-4 sm:p-5 rounded-3xl bg-white border border-stone-200/80 shadow-soft hover:border-sage-300 transition-all flex flex-col md:flex-row gap-5 items-start md:items-center justify-between"
                >
                  {/* Image & Title */}
                  <div className="flex items-center gap-4 flex-1">
                    <img
                      src={recipe.image}
                      alt={recipe.title}
                      className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl object-cover shadow-soft flex-shrink-0"
                    />
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-sage-50 text-sage-800">
                          {recipe.category}
                        </span>
                        <span className="text-xs text-stone-400 flex items-center gap-1">
                          <Clock className="w-3 h-3" /> {recipe.totalTime}m
                        </span>
                      </div>
                      <h4 className="font-serif text-base sm:text-lg font-bold text-charcoal-900">
                        {recipe.title}
                      </h4>
                      <p className="text-xs text-stone-500">
                        {matchedCount} of {total} ingredients ready in your pantry
                      </p>
                    </div>
                  </div>

                  {/* Match Progress Bar & Actions */}
                  <div className="w-full md:w-auto flex flex-col sm:flex-row items-start sm:items-center gap-4">
                    <div className="w-full sm:w-36 space-y-1">
                      <div className="flex justify-between text-xs font-bold">
                        <span className="text-stone-600">Match</span>
                        <span className={matchPercent >= 80 ? 'text-emerald-600' : matchPercent >= 50 ? 'text-amber-600' : 'text-stone-500'}>
                          {matchPercent}%
                        </span>
                      </div>
                      <div className="w-full h-2 bg-stone-100 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all duration-500 ${
                            matchPercent >= 80 ? 'bg-emerald-500' : matchPercent >= 50 ? 'bg-amber-500' : 'bg-stone-400'
                          }`}
                          style={{ width: `${matchPercent}%` }}
                        />
                      </div>
                      {missing.length > 0 ? (
                        <p className="text-[10px] text-terracotta-600 truncate max-w-xs">
                          Missing: {missing.map(m => m.name).slice(0, 2).join(', ')}{missing.length > 2 ? '...' : ''}
                        </p>
                      ) : (
                        <p className="text-[10px] text-emerald-600 font-bold">100% Ready to Cook!</p>
                      )}
                    </div>

                    <div className="flex items-center gap-2 w-full sm:w-auto">
                      {missing.length > 0 && (
                        <button
                          onClick={() => {
                            const groceryItems: GroceryItem[] = missing.map(m => ({
                              id: `pantry-miss-${Date.now()}-${m.id}`,
                              name: m.name,
                              amount: m.amount,
                              unit: m.unit,
                              aisle: m.aisle,
                              checked: false,
                              recipeOrigin: recipe.title
                            }));
                            onAddMissingToGrocery(groceryItems);
                          }}
                          className="px-3 py-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-semibold transition-colors flex items-center gap-1"
                          title="Add missing items to Grocery List"
                        >
                          <ShoppingCart className="w-3.5 h-3.5" />
                          <span className="hidden sm:inline">Add Missing</span>
                        </button>
                      )}

                      <button
                        onClick={() => {
                          onOpenRecipe(recipe);
                          onClose();
                        }}
                        className="flex-1 sm:flex-none px-4 py-2 rounded-xl bg-sage-800 hover:bg-sage-900 text-white text-xs font-bold shadow-soft transition-colors flex items-center justify-center gap-1"
                      >
                        <span>Cook</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                </div>
              ))}
            </div>
          ) : (
            <div className="p-8 text-center bg-stone-50 rounded-3xl border border-stone-200/60 space-y-2">
              <Utensils className="w-8 h-8 text-stone-400 mx-auto" />
              <p className="text-sm font-semibold text-charcoal-900">Select more ingredients above</p>
              <p className="text-xs text-stone-400 max-w-sm mx-auto">
                Add standard staples like Garlic, Olive Oil, Eggs, or Salmon to see matched culinary creations.
              </p>
            </div>
          )}
        </div>

      </div>
    </Modal>
  );
};
