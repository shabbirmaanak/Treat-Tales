import { Recipe, PlannedMeal, GroceryItem, RecipeCollection } from '../types/recipe';
import { INITIAL_RECIPES } from '../data/initialRecipes';

const STORAGE_KEYS = {
  RECIPES: 'treat_tales_recipes_v1',
  FAVORITES: 'treat_tales_favorites_v1',
  MEAL_PLAN: 'treat_tales_meal_plan_v1',
  GROCERY_LIST: 'treat_tales_grocery_v1',
  COLLECTIONS: 'treat_tales_collections_v1',
  SETTINGS: 'treat_tales_settings_v1',
  USER_NOTES: 'treat_tales_user_notes_v1',
};

const DEFAULT_COLLECTIONS: RecipeCollection[] = [
  {
    id: 'col-favs',
    name: 'All Favorites',
    description: 'Your saved favorite recipes for quick access',
    icon: 'heart',
    recipeIds: ['rec-1', 'rec-3', 'rec-7'],
    isDefault: true,
    createdAt: '2026-08-01',
  },
  {
    id: 'col-weeknights',
    name: 'Quick Weeknights',
    description: 'Delicious dinners under 30 minutes with minimal cleanup',
    icon: 'clock',
    recipeIds: ['rec-1', 'rec-2', 'rec-8', 'rec-9'],
    isDefault: true,
    createdAt: '2026-08-01',
  },
  {
    id: 'col-healthy',
    name: 'Healthy & High Protein',
    description: 'Nourishing whole-food meals to fuel your day',
    icon: 'sparkles',
    recipeIds: ['rec-1', 'rec-4', 'rec-5', 'rec-6', 'rec-8'],
    isDefault: true,
    createdAt: '2026-08-01',
  },
  {
    id: 'col-sweet',
    name: 'Sweet Tooth & Baking',
    description: 'Artisan desserts and weekend baking treats',
    icon: 'cookie',
    recipeIds: ['rec-7', 'rec-10'],
    isDefault: true,
    createdAt: '2026-08-01',
  }
];

export const storageService = {
  // Recipes
  getRecipes(): Recipe[] {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.RECIPES);
      if (!stored) {
        localStorage.setItem(STORAGE_KEYS.RECIPES, JSON.stringify(INITIAL_RECIPES));
        return INITIAL_RECIPES;
      }
      const parsed = JSON.parse(stored);
      // Merge with initial recipes in case new ones were added
      const existingIds = new Set(parsed.map((r: Recipe) => r.id));
      const missingInitial = INITIAL_RECIPES.filter(r => !existingIds.has(r.id));
      if (missingInitial.length > 0) {
        const merged = [...parsed, ...missingInitial];
        localStorage.setItem(STORAGE_KEYS.RECIPES, JSON.stringify(merged));
        return merged;
      }
      return parsed;
    } catch {
      return INITIAL_RECIPES;
    }
  },

  saveRecipe(recipe: Recipe): Recipe[] {
    const recipes = this.getRecipes();
    const index = recipes.findIndex(r => r.id === recipe.id);
    let updated: Recipe[];
    if (index >= 0) {
      updated = [...recipes];
      updated[index] = recipe;
    } else {
      updated = [recipe, ...recipes];
    }
    localStorage.setItem(STORAGE_KEYS.RECIPES, JSON.stringify(updated));
    return updated;
  },

  deleteRecipe(id: string): Recipe[] {
    const recipes = this.getRecipes();
    const updated = recipes.filter(r => r.id !== id);
    localStorage.setItem(STORAGE_KEYS.RECIPES, JSON.stringify(updated));
    return updated;
  },

  // Favorites
  getFavorites(): string[] {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.FAVORITES);
      return stored ? JSON.parse(stored) : ['rec-1', 'rec-3', 'rec-7'];
    } catch {
      return ['rec-1', 'rec-3', 'rec-7'];
    }
  },

  toggleFavorite(recipeId: string): { favorites: string[]; isFavorite: boolean } {
    const favorites = this.getFavorites();
    const index = favorites.indexOf(recipeId);
    let updated: string[];
    let isFavorite: boolean;
    if (index >= 0) {
      updated = favorites.filter(id => id !== recipeId);
      isFavorite = false;
    } else {
      updated = [...favorites, recipeId];
      isFavorite = true;
    }
    localStorage.setItem(STORAGE_KEYS.FAVORITES, JSON.stringify(updated));
    
    // Also sync with default favorites collection
    this.updateDefaultFavoritesCollection(updated);
    
    return { favorites: updated, isFavorite };
  },

  // Collections
  getCollections(): RecipeCollection[] {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.COLLECTIONS);
      if (!stored) {
        localStorage.setItem(STORAGE_KEYS.COLLECTIONS, JSON.stringify(DEFAULT_COLLECTIONS));
        return DEFAULT_COLLECTIONS;
      }
      return JSON.parse(stored);
    } catch {
      return DEFAULT_COLLECTIONS;
    }
  },

  saveCollection(collection: RecipeCollection): RecipeCollection[] {
    const collections = this.getCollections();
    const index = collections.findIndex(c => c.id === collection.id);
    let updated: RecipeCollection[];
    if (index >= 0) {
      updated = [...collections];
      updated[index] = collection;
    } else {
      updated = [...collections, collection];
    }
    localStorage.setItem(STORAGE_KEYS.COLLECTIONS, JSON.stringify(updated));
    return updated;
  },

  deleteCollection(id: string): RecipeCollection[] {
    const collections = this.getCollections();
    const updated = collections.filter(c => c.id !== id || c.isDefault);
    localStorage.setItem(STORAGE_KEYS.COLLECTIONS, JSON.stringify(updated));
    return updated;
  },

  toggleRecipeInCollection(collectionId: string, recipeId: string): RecipeCollection[] {
    const collections = this.getCollections();
    const updated = collections.map(col => {
      if (col.id === collectionId) {
        const has = col.recipeIds.includes(recipeId);
        return {
          ...col,
          recipeIds: has ? col.recipeIds.filter(id => id !== recipeId) : [...col.recipeIds, recipeId]
        };
      }
      return col;
    });
    localStorage.setItem(STORAGE_KEYS.COLLECTIONS, JSON.stringify(updated));
    return updated;
  },

  updateDefaultFavoritesCollection(favIds: string[]) {
    const collections = this.getCollections();
    const updated = collections.map(c => c.id === 'col-favs' ? { ...c, recipeIds: favIds } : c);
    localStorage.setItem(STORAGE_KEYS.COLLECTIONS, JSON.stringify(updated));
  },

  // Meal Plan
  getMealPlan(): PlannedMeal[] {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.MEAL_PLAN);
      if (!stored) {
        const initialPlan: PlannedMeal[] = [
          { id: 'mp-1', day: 'Monday', slot: 'Breakfast', recipeId: 'rec-2', recipeTitle: 'Artisanal Sourdough Avocado & Poached Egg Toast', recipeImage: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=400&q=80', servings: 2, calories: 380, prepTime: 15 },
          { id: 'mp-2', day: 'Monday', slot: 'Dinner', recipeId: 'rec-1', recipeTitle: 'Creamy Tuscan Sun-Dried Tomato Salmon', recipeImage: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=400&q=80', servings: 4, calories: 520, prepTime: 25 },
          { id: 'mp-3', day: 'Wednesday', slot: 'Dinner', recipeId: 'rec-3', recipeTitle: 'Authentic Roman Spaghetti Carbonara', recipeImage: 'https://images.unsplash.com/photo-1612874742237-6526221588e3?auto=format&fit=crop&w=400&q=80', servings: 3, calories: 610, prepTime: 25 },
          { id: 'mp-4', day: 'Friday', slot: 'Dinner', recipeId: 'rec-9', recipeTitle: 'Crispy Garlic Butter Smash Burger', recipeImage: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=400&q=80', servings: 2, calories: 680, prepTime: 25 },
        ];
        localStorage.setItem(STORAGE_KEYS.MEAL_PLAN, JSON.stringify(initialPlan));
        return initialPlan;
      }
      return JSON.parse(stored);
    } catch {
      return [];
    }
  },

  saveMealPlan(plan: PlannedMeal[]): PlannedMeal[] {
    localStorage.setItem(STORAGE_KEYS.MEAL_PLAN, JSON.stringify(plan));
    return plan;
  },

  addMealToPlan(meal: PlannedMeal): PlannedMeal[] {
    const current = this.getMealPlan();
    // Replace if slot already has meal or add new
    const filtered = current.filter(m => !(m.day === meal.day && m.slot === meal.slot));
    const updated = [...filtered, meal];
    localStorage.setItem(STORAGE_KEYS.MEAL_PLAN, JSON.stringify(updated));
    return updated;
  },

  removeMealFromPlan(id: string): PlannedMeal[] {
    const current = this.getMealPlan();
    const updated = current.filter(m => m.id !== id);
    localStorage.setItem(STORAGE_KEYS.MEAL_PLAN, JSON.stringify(updated));
    return updated;
  },

  // Grocery List
  getGroceryList(): GroceryItem[] {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.GROCERY_LIST);
      if (!stored) {
        const initialList: GroceryItem[] = [
          { id: 'g-1', name: 'Atlantic Salmon Fillets', amount: 4, unit: 'fillets', aisle: 'Meat & Seafood', checked: false, recipeOrigin: 'Creamy Tuscan Salmon' },
          { id: 'g-2', name: 'Heavy Cream', amount: 1, unit: 'cup', aisle: 'Dairy & Eggs', checked: false, recipeOrigin: 'Creamy Tuscan Salmon' },
          { id: 'g-3', name: 'Baby Spinach', amount: 3, unit: 'cups', aisle: 'Produce', checked: true, recipeOrigin: 'Creamy Tuscan Salmon' },
          { id: 'g-4', name: 'Sun-Dried Tomatoes in Oil', amount: 0.5, unit: 'cup', aisle: 'Pantry & Spices', checked: false, recipeOrigin: 'Creamy Tuscan Salmon' },
          { id: 'g-5', name: 'Rustic Sourdough Loaf', amount: 1, unit: 'loaf', aisle: 'Bakery', checked: false, recipeOrigin: 'Avocado Toast' },
          { id: 'g-6', name: 'Hass Avocados', amount: 3, unit: 'count', aisle: 'Produce', checked: false, recipeOrigin: 'Avocado Toast' },
          { id: 'g-7', name: 'Greek Feta Cheese', amount: 200, unit: 'g', aisle: 'Dairy & Eggs', checked: true, recipeOrigin: 'Avocado Toast' },
        ];
        localStorage.setItem(STORAGE_KEYS.GROCERY_LIST, JSON.stringify(initialList));
        return initialList;
      }
      return JSON.parse(stored);
    } catch {
      return [];
    }
  },

  saveGroceryList(items: GroceryItem[]): GroceryItem[] {
    localStorage.setItem(STORAGE_KEYS.GROCERY_LIST, JSON.stringify(items));
    return items;
  },

  addGroceryItems(newItems: GroceryItem[]): GroceryItem[] {
    const current = this.getGroceryList();
    const combined = [...current];
    for (const item of newItems) {
      const existing = combined.find(i => i.name.toLowerCase() === item.name.toLowerCase() && i.unit === item.unit);
      if (existing) {
        existing.amount += item.amount;
      } else {
        combined.push(item);
      }
    }
    localStorage.setItem(STORAGE_KEYS.GROCERY_LIST, JSON.stringify(combined));
    return combined;
  },

  toggleGroceryItem(id: string): GroceryItem[] {
    const current = this.getGroceryList();
    const updated = current.map(item => item.id === id ? { ...item, checked: !item.checked } : item);
    localStorage.setItem(STORAGE_KEYS.GROCERY_LIST, JSON.stringify(updated));
    return updated;
  },

  deleteGroceryItem(id: string): GroceryItem[] {
    const current = this.getGroceryList();
    const updated = current.filter(item => item.id !== id);
    localStorage.setItem(STORAGE_KEYS.GROCERY_LIST, JSON.stringify(updated));
    return updated;
  },

  clearCompletedGroceryItems(): GroceryItem[] {
    const current = this.getGroceryList();
    const updated = current.filter(item => !item.checked);
    localStorage.setItem(STORAGE_KEYS.GROCERY_LIST, JSON.stringify(updated));
    return updated;
  },

  // User Notes & Ratings
  getUserNotes(): Record<string, string> {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.USER_NOTES);
      return stored ? JSON.parse(stored) : {};
    } catch {
      return {};
    }
  },

  saveUserNote(recipeId: string, note: string): Record<string, string> {
    const current = this.getUserNotes();
    const updated = { ...current, [recipeId]: note };
    localStorage.setItem(STORAGE_KEYS.USER_NOTES, JSON.stringify(updated));
    return updated;
  }
};
