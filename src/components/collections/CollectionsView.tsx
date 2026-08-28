import React, { useState } from 'react';
import { 
  Bookmark, 
  Plus, 
  FolderHeart, 
  Clock, 
  Sparkles, 
  Cookie, 
  Utensils, 
  Trash2,
  FolderPlus,
  Heart
} from 'lucide-react';
import { Recipe, RecipeCollection } from '../../types/recipe';
import { RecipeCard } from '../discovery/RecipeCard';

interface CollectionsViewProps {
  collections: RecipeCollection[];
  recipes: Recipe[];
  favorites: string[];
  onToggleFavorite: (recipeId: string, e: React.MouseEvent) => void;
  onOpenRecipe: (recipe: Recipe) => void;
  onQuickAddToPlan: (recipe: Recipe, e: React.MouseEvent) => void;
  onCreateCollection: (name: string, description: string) => void;
  onDeleteCollection: (id: string) => void;
}

export const CollectionsView: React.FC<CollectionsViewProps> = ({
  collections,
  recipes,
  favorites,
  onToggleFavorite,
  onOpenRecipe,
  onQuickAddToPlan,
  onCreateCollection,
  onDeleteCollection,
}) => {
  const [activeCollectionId, setActiveCollectionId] = useState<string>(collections[0]?.id || 'col-favs');
  const [isCreatingFolder, setIsCreatingFolder] = useState(false);
  const [newFolderName, setNewFolderName] = useState('');
  const [newFolderDesc, setNewFolderDesc] = useState('');

  const activeCollection = collections.find(c => c.id === activeCollectionId) || collections[0];

  // Resolve recipe objects
  const collectionRecipes = activeCollection
    ? recipes.filter(r => activeCollection.recipeIds.includes(r.id))
    : [];

  const handleCreateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newFolderName.trim()) return;
    onCreateCollection(newFolderName.trim(), newFolderDesc.trim());
    setNewFolderName('');
    setNewFolderDesc('');
    setIsCreatingFolder(false);
  };

  const getIcon = (iconName?: string) => {
    switch (iconName) {
      case 'heart': return <FolderHeart className="w-5 h-5 text-rose-500" />;
      case 'clock': return <Clock className="w-5 h-5 text-amber-500" />;
      case 'sparkles': return <Sparkles className="w-5 h-5 text-emerald-500" />;
      case 'cookie': return <Cookie className="w-5 h-5 text-terracotta-500" />;
      default: return <Bookmark className="w-5 h-5 text-sage-700" />;
    }
  };

  return (
    <div className="py-6 space-y-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-[#1E3025] via-sage-800 to-[#122218] text-white p-6 sm:p-10 rounded-[2.5rem] shadow-soft-xl border border-sage-700/40 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2 max-w-xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-white/10 backdrop-blur-md border border-white/15 text-cream-100">
            <Bookmark className="w-3.5 h-3.5 text-rose-400 fill-rose-400" />
            <span>Personal Cookbook & Saved Collections</span>
          </div>
          <h1 className="font-serif text-2xl sm:text-4xl font-bold text-white">
            Your Culinary Collections
          </h1>
          <p className="text-xs sm:text-sm text-sage-100/80 leading-relaxed">
            Curate custom recipe folders, bookmark family favorites, and organize weeknight go-to meals all in one place.
          </p>
        </div>

        <button
          onClick={() => setIsCreatingFolder(true)}
          className="flex items-center gap-2 px-6 py-3.5 rounded-full bg-terracotta-500 hover:bg-terracotta-600 active:scale-95 text-white text-xs sm:text-sm font-bold shadow-soft-lg transition-all"
        >
          <FolderPlus className="w-4 h-4" />
          <span>New Collection Folder</span>
        </button>
      </div>

      {/* Create New Folder Inline Modal / Form */}
      {isCreatingFolder && (
        <form
          onSubmit={handleCreateSubmit}
          className="bg-white p-6 rounded-3xl border border-stone-200/80 shadow-soft space-y-4 animate-slide-down"
        >
          <div className="flex items-center justify-between">
            <h3 className="font-serif font-bold text-charcoal-900 text-base">
              Create New Recipe Collection
            </h3>
            <button
              type="button"
              onClick={() => setIsCreatingFolder(false)}
              className="text-xs text-stone-400 hover:text-charcoal-900"
            >
              Cancel
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input
              type="text"
              required
              value={newFolderName}
              onChange={(e) => setNewFolderName(e.target.value)}
              placeholder="Folder Name (e.g. Italian Date Nights, Sunday Brunch)..."
              className="px-4 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-sage-600/30"
            />
            <input
              type="text"
              value={newFolderDesc}
              onChange={(e) => setNewFolderDesc(e.target.value)}
              placeholder="Short description (e.g. My favorite quick pasta recipes)..."
              className="px-4 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-sage-600/30"
            />
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="px-5 py-2.5 rounded-full bg-sage-800 hover:bg-sage-900 text-white text-xs font-bold shadow-soft"
            >
              Create Folder
            </button>
          </div>
        </form>
      )}

      {/* Collection Tab Selector Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {collections.map(col => {
          const isSelected = activeCollectionId === col.id;
          const count = col.recipeIds.length;

          return (
            <div
              key={col.id}
              onClick={() => setActiveCollectionId(col.id)}
              className={`p-5 rounded-3xl border transition-all cursor-pointer flex flex-col justify-between space-y-3 relative group ${
                isSelected
                  ? 'bg-sage-800 text-white border-sage-800 shadow-soft-lg scale-[1.02]'
                  : 'bg-white border-stone-200/80 text-charcoal-900 hover:border-sage-300 hover:shadow-soft'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className={`p-2.5 rounded-2xl ${isSelected ? 'bg-white/15' : 'bg-stone-100'}`}>
                  {getIcon(col.icon)}
                </div>

                {!col.isDefault && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onDeleteCollection(col.id);
                    }}
                    className={`p-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity ${
                      isSelected ? 'text-white/60 hover:text-white' : 'text-stone-400 hover:text-rose-600'
                    }`}
                    title="Delete collection"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              <div className="space-y-1">
                <h3 className="font-serif font-bold text-base line-clamp-1">{col.name}</h3>
                <p className={`text-xs line-clamp-2 ${isSelected ? 'text-sage-100/80' : 'text-stone-500'}`}>
                  {col.description}
                </p>
              </div>

              <div className="pt-2 border-t border-white/10 flex items-center justify-between text-xs font-semibold">
                <span className={isSelected ? 'text-cream-200' : 'text-stone-400'}>
                  {count} {count === 1 ? 'recipe' : 'recipes'}
                </span>
                <span className={isSelected ? 'text-terracotta-300 font-bold' : 'text-sage-800 font-bold'}>
                  View →
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Active Collection Recipes Grid */}
      <div className="space-y-6 pt-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-charcoal-900">
              {activeCollection?.name}
            </h2>
            <p className="text-xs text-stone-500">
              Showing {collectionRecipes.length} saved dishes
            </p>
          </div>
        </div>

        {collectionRecipes.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {collectionRecipes.map(recipe => (
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
          <div className="bg-white rounded-3xl p-12 text-center border border-stone-200/80 shadow-soft space-y-3 max-w-lg mx-auto">
            <div className="w-14 h-14 rounded-full bg-sage-50 text-sage-800 mx-auto flex items-center justify-center">
              <Bookmark className="w-7 h-7" />
            </div>
            <h3 className="font-serif text-lg font-bold text-charcoal-900">No Recipes in this Collection</h3>
            <p className="text-xs text-stone-500">
              Explore recipes on the Discover page and tap the bookmark or heart icon to save recipes to this collection.
            </p>
          </div>
        )}
      </div>

    </div>
  );
};
