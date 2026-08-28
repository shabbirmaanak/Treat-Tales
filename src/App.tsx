import React, { useState, useEffect, useMemo } from 'react';
import { 
  Recipe, 
  FilterState, 
  MealCategory, 
  PlannedMeal, 
  GroceryItem, 
  RecipeCollection, 
  ToastMessage, 
  DayOfWeek, 
  MealSlot 
} from './types/recipe';
import { storageService } from './services/storage';
import { Navbar, NavTab } from './components/common/Navbar';
import { Footer } from './components/common/Footer';
import { Toast } from './components/common/Toast';
import { HeroSection } from './components/discovery/HeroSection';
import { CategoryFilter } from './components/discovery/CategoryFilter';
import { FilterSidebar } from './components/discovery/FilterSidebar';
import { RecipeGrid } from './components/discovery/RecipeGrid';
import { PantryMatcherModal } from './components/pantry/PantryMatcherModal';
import { RecipeDetailModal } from './components/recipe-detail/RecipeDetailModal';
import { MealPlannerView } from './components/meal-planner/MealPlannerView';
import { AssignMealModal } from './components/meal-planner/AssignMealModal';
import { GroceryListView } from './components/grocery/GroceryListView';
import { RecipeCreatorModal } from './components/recipe-creator/RecipeCreatorModal';
import { CollectionsView } from './components/collections/CollectionsView';
import { AssignCollectionModal } from './components/collections/AssignCollectionModal';

export const App: React.FC = () => {
  // App State
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [collections, setCollections] = useState<RecipeCollection[]>([]);
  const [mealPlan, setMealPlan] = useState<PlannedMeal[]>([]);
  const [groceryList, setGroceryList] = useState<GroceryItem[]>([]);
  const [activeTab, setActiveTab] = useState<NavTab>('discover');
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Modals & Panels
  const [activeRecipe, setActiveRecipe] = useState<Recipe | null>(null);
  const [isPantryModalOpen, setIsPantryModalOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [assignMealContext, setAssignMealContext] = useState<{ day: DayOfWeek; slot: MealSlot } | null>(null);
  const [assignCollectionRecipe, setAssignCollectionRecipe] = useState<Recipe | null>(null);
  const [showFilterSidebar, setShowFilterSidebar] = useState(false);

  // Filters
  const [filters, setFilters] = useState<FilterState>({
    search: '',
    category: 'All',
    cuisine: 'All',
    maxTime: 0,
    maxCalories: 0,
    difficulty: 'All',
    dietary: [],
    sortBy: 'popular',
  });

  // Initialize data on mount
  useEffect(() => {
    setRecipes(storageService.getRecipes());
    setFavorites(storageService.getFavorites());
    setCollections(storageService.getCollections());
    setMealPlan(storageService.getMealPlan());
    setGroceryList(storageService.getGroceryList());
  }, []);

  // Toast Helper
  const showToast = (title: string, description?: string, type: ToastMessage['type'] = 'success') => {
    const newToast: ToastMessage = {
      id: `toast-${Date.now()}-${Math.random()}`,
      title,
      description,
      type,
    };
    setToasts((prev) => [...prev, newToast]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== newToast.id));
    }, 3500);
  };

  const handleDismissToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Favorite Toggle
  const handleToggleFavorite = (recipeId: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    const res = storageService.toggleFavorite(recipeId);
    setFavorites(res.favorites);
    setCollections(storageService.getCollections());
    const rec = recipes.find((r) => r.id === recipeId);
    if (res.isFavorite) {
      showToast('Added to Favorites ❤️', rec ? rec.title : undefined, 'heart');
    } else {
      showToast('Removed from Favorites', rec ? rec.title : undefined, 'info');
    }
  };

  // Recipe Saved / Created
  const handleSaveCustomRecipe = (newRecipe: Recipe) => {
    const updated = storageService.saveRecipe(newRecipe);
    setRecipes(updated);
    showToast('Recipe Published! 🌿', newRecipe.title, 'success');
  };

  // Grocery Handlers
  const handleAddToGrocery = (newItems: GroceryItem[]) => {
    const updated = storageService.addGroceryItems(newItems);
    setGroceryList(updated);
    showToast(
      `Added ${newItems.length} items to Grocery List 🛒`,
      'Items organized by supermarket aisle.',
      'success'
    );
  };

  const handleToggleGroceryItem = (id: string) => {
    const updated = storageService.toggleGroceryItem(id);
    setGroceryList(updated);
  };

  const handleDeleteGroceryItem = (id: string) => {
    const updated = storageService.deleteGroceryItem(id);
    setGroceryList(updated);
  };

  const handleClearCompletedGrocery = () => {
    const updated = storageService.clearCompletedGroceryItems();
    setGroceryList(updated);
    showToast('Cleared Completed Items', undefined, 'info');
  };

  const handleAddSingleGroceryItem = (item: GroceryItem) => {
    const updated = storageService.addGroceryItems([item]);
    setGroceryList(updated);
    showToast(`Added "${item.name}" to Grocery List`, undefined, 'success');
  };

  // Meal Plan Handlers
  const handleRemoveMealFromPlan = (id: string) => {
    const updated = storageService.removeMealFromPlan(id);
    setMealPlan(updated);
    showToast('Removed meal from schedule', undefined, 'info');
  };

  const handleAssignMeal = (recipe: Recipe) => {
    if (!assignMealContext) return;
    const meal: PlannedMeal = {
      id: `mp-${Date.now()}`,
      day: assignMealContext.day,
      slot: assignMealContext.slot,
      recipeId: recipe.id,
      recipeTitle: recipe.title,
      recipeImage: recipe.image,
      servings: recipe.servings,
      calories: recipe.macros.calories,
      prepTime: recipe.totalTime,
    };
    const updated = storageService.addMealToPlan(meal);
    setMealPlan(updated);
    showToast(`Scheduled for ${meal.day} ${meal.slot}! 📅`, recipe.title, 'success');
    setAssignMealContext(null);
  };

  const handleQuickAddToPlan = (recipe: Recipe, e: React.MouseEvent) => {
    e.stopPropagation();
    setAssignMealContext({ day: 'Monday', slot: 'Dinner' });
  };

  // Collections Handlers
  const handleCreateCollection = (name: string, description: string) => {
    const newCol: RecipeCollection = {
      id: `col-${Date.now()}`,
      name,
      description: description || 'Custom recipe collection',
      recipeIds: [],
      createdAt: new Date().toISOString().split('T')[0],
    };
    const updated = storageService.saveCollection(newCol);
    setCollections(updated);
    showToast(`Collection "${name}" Created! 📁`, undefined, 'success');
  };

  const handleDeleteCollection = (id: string) => {
    const updated = storageService.deleteCollection(id);
    setCollections(updated);
    showToast('Collection deleted', undefined, 'info');
  };

  const handleToggleRecipeInCollection = (collectionId: string, recipeId: string) => {
    const updated = storageService.toggleRecipeInCollection(collectionId, recipeId);
    setCollections(updated);
    const col = collections.find((c) => c.id === collectionId);
    showToast(`Updated Collection "${col?.name || 'Folder'}"`, undefined, 'info');
  };

  // Reset Filters
  const handleResetFilters = () => {
    setFilters({
      search: '',
      category: 'All',
      cuisine: 'All',
      maxTime: 0,
      maxCalories: 0,
      difficulty: 'All',
      dietary: [],
      sortBy: 'popular',
    });
  };

  // Filtered and Sorted Recipes for Discover Tab
  const filteredRecipes = useMemo(() => {
    return recipes
      .filter((recipe) => {
        // Search query
        if (filters.search) {
          const q = filters.search.toLowerCase();
          const matchTitle = recipe.title.toLowerCase().includes(q);
          const matchCuisine = recipe.cuisine.toLowerCase().includes(q);
          const matchCategory = recipe.category.toLowerCase().includes(q);
          const matchIng = recipe.ingredients.some((i) => i.name.toLowerCase().includes(q));
          const matchTag = recipe.tags.some((t) => t.toLowerCase().includes(q));
          const matchAuthor = recipe.author.name.toLowerCase().includes(q);
          if (!matchTitle && !matchCuisine && !matchCategory && !matchIng && !matchTag && !matchAuthor) {
            return false;
          }
        }

        // Category
        if (filters.category !== 'All' && recipe.category !== filters.category) {
          return false;
        }

        // Cuisine
        if (filters.cuisine !== 'All' && recipe.cuisine !== filters.cuisine) {
          return false;
        }

        // Max Time
        if (filters.maxTime > 0 && recipe.totalTime > filters.maxTime) {
          return false;
        }

        // Max Calories
        if (filters.maxCalories > 0 && recipe.macros.calories > filters.maxCalories) {
          return false;
        }

        // Difficulty
        if (filters.difficulty !== 'All' && recipe.difficulty !== filters.difficulty) {
          return false;
        }

        // Dietary
        if (filters.dietary.length > 0) {
          const hasAllDietary = filters.dietary.every((d) => recipe.dietary.includes(d));
          if (!hasAllDietary) return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (filters.sortBy === 'rating') return b.rating - a.rating;
        if (filters.sortBy === 'quickest') return a.totalTime - b.totalTime;
        if (filters.sortBy === 'calories') return a.macros.calories - b.macros.calories;
        if (filters.sortBy === 'newest') return (b.createdAt || '').localeCompare(a.createdAt || '');
        // default: popular (featured + review count)
        return (b.reviewCount || 0) - (a.reviewCount || 0);
      });
  }, [recipes, filters]);

  const featuredRecipe = useMemo(() => {
    return recipes.find((r) => r.isFeatured) || recipes[0] || ({} as Recipe);
  }, [recipes]);

  const activeFilterCount =
    (filters.cuisine !== 'All' ? 1 : 0) +
    (filters.difficulty !== 'All' ? 1 : 0) +
    (filters.maxTime > 0 ? 1 : 0) +
    (filters.maxCalories > 0 ? 1 : 0) +
    filters.dietary.length;

  return (
    <div className="min-h-screen bg-[#FAF8F5] flex flex-col selection:bg-sage-200 selection:text-sage-900">
      
      {/* Toast Notifications */}
      <Toast toasts={toasts} onDismiss={handleDismissToast} />

      {/* Global Navbar */}
      <Navbar
        activeTab={activeTab}
        onSelectTab={(tab) => {
          setActiveTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        searchQuery={filters.search}
        onSearchChange={(q) => {
          setFilters((prev) => ({ ...prev, search: q }));
          if (activeTab !== 'discover') setActiveTab('discover');
        }}
        favoritesCount={favorites.length}
        groceryCount={groceryList.filter((i) => !i.checked).length}
        onOpenCreateModal={() => setIsCreateModalOpen(true)}
        onOpenPantryModal={() => setIsPantryModalOpen(true)}
      />

      {/* Main Tab Content */}
      <main className="flex-1">
        {activeTab === 'discover' && (
          <div className="space-y-6">
            {/* Hero Section */}
            {featuredRecipe.id && !filters.search && filters.category === 'All' && (
              <HeroSection
                featuredRecipe={featuredRecipe}
                onOpenRecipe={(rec) => setActiveRecipe(rec)}
                onOpenPantryModal={() => setIsPantryModalOpen(true)}
                onQuickFilterTag={(tag) => {
                  setFilters((prev) => ({ ...prev, search: tag }));
                }}
                recipesCount={recipes.length}
              />
            )}

            {/* Category Carousel Pills */}
            <CategoryFilter
              activeCategory={filters.category}
              onSelectCategory={(cat) => setFilters((prev) => ({ ...prev, category: cat }))}
            />

            {/* Discovery Grid + Filter Sidebar Area */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                
                {/* Collapsible Filter Sidebar */}
                {showFilterSidebar && (
                  <div className="lg:col-span-3 sticky top-24">
                    <FilterSidebar
                      filters={filters}
                      onChangeFilters={(newFilters) => setFilters(newFilters)}
                      onResetFilters={handleResetFilters}
                      activeCount={activeFilterCount}
                    />
                  </div>
                )}

                {/* Recipe Grid Column */}
                <div className={showFilterSidebar ? 'lg:col-span-9' : 'lg:col-span-12'}>
                  <RecipeGrid
                    recipes={filteredRecipes}
                    favorites={favorites}
                    onToggleFavorite={handleToggleFavorite}
                    onOpenRecipe={(rec) => setActiveRecipe(rec)}
                    onQuickAddToPlan={handleQuickAddToPlan}
                    filters={filters}
                    onChangeFilters={(newFilters) => setFilters(newFilters)}
                    onResetFilters={handleResetFilters}
                    onOpenPantryModal={() => setIsPantryModalOpen(true)}
                    showFilterSidebar={showFilterSidebar}
                    onToggleFilterSidebar={() => setShowFilterSidebar(!showFilterSidebar)}
                  />
                </div>

              </div>
            </div>
          </div>
        )}

        {/* Meal Planner Tab */}
        {activeTab === 'planner' && (
          <MealPlannerView
            mealPlan={mealPlan}
            onRemoveMeal={handleRemoveMealFromPlan}
            onOpenAssignModal={(day, slot) => setAssignMealContext({ day, slot })}
            onOpenRecipeById={(id) => {
              const r = recipes.find((x) => x.id === id);
              if (r) setActiveRecipe(r);
            }}
            recipes={recipes}
            onExportToGrocery={handleAddToGrocery}
          />
        )}

        {/* Grocery List Tab */}
        {activeTab === 'grocery' && (
          <GroceryListView
            items={groceryList}
            onToggleItem={handleToggleGroceryItem}
            onDeleteItem={handleDeleteGroceryItem}
            onClearCompleted={handleClearCompletedGrocery}
            onAddItem={handleAddSingleGroceryItem}
          />
        )}

        {/* Collections Tab */}
        {activeTab === 'collections' && (
          <CollectionsView
            collections={collections}
            recipes={recipes}
            favorites={favorites}
            onToggleFavorite={handleToggleFavorite}
            onOpenRecipe={(rec) => setActiveRecipe(rec)}
            onQuickAddToPlan={handleQuickAddToPlan}
            onCreateCollection={handleCreateCollection}
            onDeleteCollection={handleDeleteCollection}
          />
        )}
      </main>

      {/* Global Footer */}
      <Footer
        onSelectCategory={(cat) => {
          setFilters((prev) => ({ ...prev, category: cat as MealCategory }));
          setActiveTab('discover');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenPantryModal={() => setIsPantryModalOpen(true)}
      />

      {/* Recipe Detail Modal */}
      <RecipeDetailModal
        recipe={activeRecipe}
        isOpen={Boolean(activeRecipe)}
        onClose={() => setActiveRecipe(null)}
        isFavorite={activeRecipe ? favorites.includes(activeRecipe.id) : false}
        onToggleFavorite={(id) => handleToggleFavorite(id)}
        onAddToGrocery={handleAddToGrocery}
        onOpenMealPlanAssign={(rec) => {
          setActiveRecipe(null);
          setAssignMealContext({ day: 'Monday', slot: 'Dinner' });
        }}
        onOpenCollectionAssign={(rec) => setAssignCollectionRecipe(rec)}
      />

      {/* Pantry Matcher Modal */}
      <PantryMatcherModal
        isOpen={isPantryModalOpen}
        onClose={() => setIsPantryModalOpen(false)}
        recipes={recipes}
        onOpenRecipe={(rec) => setActiveRecipe(rec)}
        onAddMissingToGrocery={handleAddToGrocery}
      />

      {/* Recipe Creator Studio Modal */}
      <RecipeCreatorModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSaveRecipe={handleSaveCustomRecipe}
      />

      {/* Schedule Meal Plan Modal */}
      {assignMealContext && (
        <AssignMealModal
          isOpen={Boolean(assignMealContext)}
          onClose={() => setAssignMealContext(null)}
          recipes={recipes}
          targetDay={assignMealContext.day}
          targetSlot={assignMealContext.slot}
          onSelectRecipe={handleAssignMeal}
        />
      )}

      {/* Save to Collection Modal */}
      {assignCollectionRecipe && (
        <AssignCollectionModal
          isOpen={Boolean(assignCollectionRecipe)}
          onClose={() => setAssignCollectionRecipe(null)}
          recipe={assignCollectionRecipe}
          collections={collections}
          onToggleRecipeInCollection={handleToggleRecipeInCollection}
        />
      )}
    </div>
  );
};

export default App;
