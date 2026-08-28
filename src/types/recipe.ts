export type CuisineType = 
  | 'Italian'
  | 'Japanese'
  | 'Mediterranean'
  | 'Mexican'
  | 'Thai'
  | 'American'
  | 'French'
  | 'Middle Eastern'
  | 'Indian'
  | 'Global Fusion';

export type DietaryTag = 
  | 'Vegetarian'
  | 'Vegan'
  | 'Gluten-Free'
  | 'Dairy-Free'
  | 'Keto'
  | 'Low Carb'
  | 'High Protein'
  | 'Nut-Free'
  | 'Quick & Easy';

export type MealCategory = 
  | 'All'
  | 'Breakfast'
  | 'Healthy'
  | 'Quick Meals'
  | 'Pasta & Grains'
  | 'High Protein'
  | 'Bowls & Salads'
  | 'Desserts'
  | 'Baking'
  | 'Plant-Based'
  | 'Soups & Stews';

export type DifficultyLevel = 'Easy' | 'Medium' | 'Master';

export type AisleType = 'Produce' | 'Dairy & Eggs' | 'Meat & Seafood' | 'Pantry & Spices' | 'Bakery' | 'Baking' | 'Grains & Pasta' | 'Condiments';

export interface Ingredient {
  id: string;
  name: string;
  amount: number;
  unit: string;
  metricAmount: number;
  metricUnit: string;
  aisle: AisleType;
  notes?: string;
  optional?: boolean;
}

export interface InstructionStep {
  stepNumber: number;
  title?: string;
  instruction: string;
  timerMinutes?: number;
  tip?: string;
  mediaUrl?: string;
}

export interface NutritionMacros {
  calories: number;
  protein: number; // in grams
  carbs: number; // in grams
  fat: number; // in grams
  fiber?: number; // in grams
  sugar?: number; // in grams
}

export interface RecipeAuthor {
  name: string;
  avatar: string;
  role: string;
  verified?: boolean;
}

export interface RecipeSubstitution {
  original: string;
  replacement: string;
  tip: string;
}

export interface Recipe {
  id: string;
  title: string;
  subtitle?: string;
  description: string;
  image: string;
  coverImage?: string;
  prepTime: number; // minutes
  cookTime: number; // minutes
  totalTime: number; // minutes
  servings: number;
  difficulty: DifficultyLevel;
  rating: number;
  reviewCount: number;
  category: MealCategory;
  cuisine: CuisineType;
  dietary: DietaryTag[];
  tags: string[];
  macros: NutritionMacros;
  author: RecipeAuthor;
  ingredients: Ingredient[];
  instructions: InstructionStep[];
  substitutions?: RecipeSubstitution[];
  chefTips?: string[];
  isFeatured?: boolean;
  isTrending?: boolean;
  isCustom?: boolean;
  createdAt: string;
  userNotes?: string;
  userRating?: number;
}

export interface FilterState {
  search: string;
  category: MealCategory;
  cuisine: CuisineType | 'All';
  maxTime: number; // 0 means any
  maxCalories: number; // 0 means any
  difficulty: DifficultyLevel | 'All';
  dietary: DietaryTag[];
  sortBy: 'popular' | 'rating' | 'quickest' | 'calories' | 'newest';
}

export type DayOfWeek = 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday';
export type MealSlot = 'Breakfast' | 'Lunch' | 'Dinner' | 'Snack';

export interface PlannedMeal {
  id: string;
  day: DayOfWeek;
  slot: MealSlot;
  recipeId: string;
  recipeTitle: string;
  recipeImage: string;
  servings: number;
  calories: number;
  prepTime: number;
}

export interface GroceryItem {
  id: string;
  name: string;
  amount: number;
  unit: string;
  aisle: AisleType;
  checked: boolean;
  recipeOrigin?: string;
  notes?: string;
}

export interface RecipeCollection {
  id: string;
  name: string;
  description: string;
  coverImage?: string;
  icon?: string;
  recipeIds: string[];
  isDefault?: boolean;
  createdAt: string;
}

export interface ToastMessage {
  id: string;
  title: string;
  description?: string;
  type?: 'success' | 'info' | 'warning' | 'heart';
}
