import React, { useState } from 'react';
import { 
  CalendarDays, 
  Plus, 
  Trash2, 
  Clock, 
  Flame, 
  ShoppingCart, 
  Sparkles, 
  ChevronRight,
  Utensils,
  Share2
} from 'lucide-react';
import { PlannedMeal, DayOfWeek, MealSlot, Recipe, GroceryItem } from '../../types/recipe';

interface MealPlannerViewProps {
  mealPlan: PlannedMeal[];
  onRemoveMeal: (id: string) => void;
  onOpenAssignModal: (day: DayOfWeek, slot: MealSlot) => void;
  onOpenRecipeById: (recipeId: string) => void;
  recipes: Recipe[];
  onExportToGrocery: (items: GroceryItem[]) => void;
}

const DAYS: DayOfWeek[] = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
const SLOTS: MealSlot[] = ['Breakfast', 'Lunch', 'Dinner', 'Snack'];

export const MealPlannerView: React.FC<MealPlannerViewProps> = ({
  mealPlan,
  onRemoveMeal,
  onOpenAssignModal,
  onOpenRecipeById,
  recipes,
  onExportToGrocery,
}) => {
  const [selectedDay, setSelectedDay] = useState<DayOfWeek>('Monday');

  // Compute daily macros and total weekly recipes
  const getDayMeals = (day: DayOfWeek) => mealPlan.filter(m => m.day === day);

  const getDayNutrition = (day: DayOfWeek) => {
    const meals = getDayMeals(day);
    const totalCal = meals.reduce((acc, m) => acc + m.calories, 0);
    return { totalCal, count: meals.length };
  };

  const handleExportWeekToGrocery = () => {
    const plannedRecipeIds = Array.from(new Set(mealPlan.map(m => m.recipeId)));
    const allIngredients: GroceryItem[] = [];

    plannedRecipeIds.forEach(id => {
      const rec = recipes.find(r => r.id === id);
      if (rec) {
        rec.ingredients.forEach(ing => {
          allIngredients.push({
            id: `planned-grocery-${Date.now()}-${ing.id}`,
            name: ing.name,
            amount: ing.amount,
            unit: ing.unit,
            aisle: ing.aisle,
            checked: false,
            recipeOrigin: `Meal Plan: ${rec.title}`
          });
        });
      }
    });

    onExportToGrocery(allIngredients);
  };

  return (
    <div className="py-6 space-y-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-sage-900 via-sage-800 to-[#1A3828] text-white p-6 sm:p-10 rounded-[2.5rem] shadow-soft-xl border border-sage-700/40 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2 max-w-xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-white/10 backdrop-blur-md border border-white/15 text-cream-100">
            <CalendarDays className="w-3.5 h-3.5 text-amber-300" />
            <span>Weekly Culinary Planner</span>
          </div>
          <h1 className="font-serif text-2xl sm:text-4xl font-bold text-white">
            Plan Your Week, Eat Healthier & Save Time
          </h1>
          <p className="text-xs sm:text-sm text-sage-100/80 leading-relaxed">
            Schedule your breakfasts, lunches, and dinners. Automatically track daily calorie totals and export a combined shopping list in one click.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full md:w-auto">
          <button
            disabled={mealPlan.length === 0}
            onClick={handleExportWeekToGrocery}
            className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-terracotta-500 hover:bg-terracotta-600 active:scale-95 disabled:opacity-40 disabled:pointer-events-none text-white text-xs sm:text-sm font-bold shadow-soft-lg transition-all"
          >
            <ShoppingCart className="w-4 h-4" />
            <span>Generate Grocery List ({mealPlan.length} meals)</span>
          </button>
        </div>
      </div>

      {/* Day Selector Pills for Mobile & Quick Navigation */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-2">
        {DAYS.map((day) => {
          const { totalCal, count } = getDayNutrition(day);
          const isSelected = selectedDay === day;
          return (
            <button
              key={day}
              onClick={() => setSelectedDay(day)}
              className={`flex-1 min-w-[110px] p-3 rounded-2xl border text-left transition-all duration-200 ${
                isSelected
                  ? 'bg-sage-800 text-white border-sage-800 shadow-soft scale-[1.02]'
                  : 'bg-white border-stone-200/80 text-stone-700 hover:bg-stone-50'
              }`}
            >
              <span className="block text-xs font-bold truncate">{day}</span>
              <span className={`block text-[11px] mt-0.5 ${isSelected ? 'text-cream-200' : 'text-stone-400'}`}>
                {count > 0 ? `${totalCal} kcal • ${count} meals` : 'No meals yet'}
              </span>
            </button>
          );
        })}
      </div>

      {/* Selected Day Meal Grid */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200/80 shadow-soft space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-stone-100">
          <div>
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-charcoal-900">
              {selectedDay}'s Menu
            </h2>
            <p className="text-xs text-stone-500 mt-0.5">
              Daily Target: {getDayNutrition(selectedDay).totalCal} kcal planned
            </p>
          </div>

          <span className="text-xs font-semibold px-3 py-1 rounded-full bg-sage-50 text-sage-800">
            {getDayMeals(selectedDay).length} Slots Filled
          </span>
        </div>

        {/* 4 Meal Slots Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {SLOTS.map((slot) => {
            const meal = mealPlan.find(m => m.day === selectedDay && m.slot === slot);

            return (
              <div
                key={slot}
                className="bg-stone-50 rounded-3xl p-4 border border-stone-200/70 flex flex-col justify-between min-h-[260px] space-y-4"
              >
                {/* Slot Header */}
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-stone-500">
                    {slot}
                  </span>
                  {meal && (
                    <button
                      onClick={() => onRemoveMeal(meal.id)}
                      className="p-1 rounded-lg text-stone-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                      title="Remove from meal plan"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>

                {/* Meal Content or Add Placeholder */}
                {meal ? (
                  <div
                    onClick={() => onOpenRecipeById(meal.recipeId)}
                    className="group bg-white rounded-2xl overflow-hidden border border-stone-200/80 shadow-soft cursor-pointer hover:border-sage-300 transition-all flex flex-col flex-1 justify-between"
                  >
                    <div className="relative aspect-[16/9] w-full overflow-hidden bg-stone-100">
                      <img
                        src={meal.recipeImage}
                        alt={meal.recipeTitle}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute bottom-2 left-2 flex items-center gap-1.5 text-[10px] text-white bg-black/60 backdrop-blur-md px-2 py-0.5 rounded-full font-medium">
                        <Flame className="w-3 h-3 text-terracotta-400" />
                        <span>{meal.calories} kcal</span>
                      </div>
                    </div>

                    <div className="p-3 space-y-1">
                      <h4 className="font-serif text-xs sm:text-sm font-bold text-charcoal-900 group-hover:text-sage-800 line-clamp-1">
                        {meal.recipeTitle}
                      </h4>
                      <p className="text-[11px] text-stone-400 flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        <span>{meal.prepTime} mins</span>
                        <span>•</span>
                        <span>{meal.servings} Servings</span>
                      </p>
                    </div>
                  </div>
                ) : (
                  <div
                    onClick={() => onOpenAssignModal(selectedDay, slot)}
                    className="flex-1 border-2 border-dashed border-stone-200 hover:border-sage-400 rounded-2xl flex flex-col items-center justify-center p-6 text-center cursor-pointer hover:bg-white transition-all space-y-2 group"
                  >
                    <div className="w-10 h-10 rounded-full bg-white group-hover:bg-sage-100 flex items-center justify-center text-stone-400 group-hover:text-sage-800 shadow-soft transition-colors">
                      <Plus className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-charcoal-900">Add {slot}</p>
                      <p className="text-[10px] text-stone-400">Choose from recipes</p>
                    </div>
                  </div>
                )}

              </div>
            );
          })}
        </div>

      </div>

    </div>
  );
};
