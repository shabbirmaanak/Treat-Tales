import React from 'react';
import { Bookmark, Check, Plus } from 'lucide-react';
import { Modal } from '../common/Modal';
import { Recipe, RecipeCollection } from '../../types/recipe';

interface AssignCollectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  recipe: Recipe | null;
  collections: RecipeCollection[];
  onToggleRecipeInCollection: (collectionId: string, recipeId: string) => void;
}

export const AssignCollectionModal: React.FC<AssignCollectionModalProps> = ({
  isOpen,
  onClose,
  recipe,
  collections,
  onToggleRecipeInCollection,
}) => {
  if (!recipe || !isOpen) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      maxWidth="md"
      title={
        <div className="flex items-center gap-2">
          <Bookmark className="w-5 h-5 text-sage-800" />
          <span className="font-serif font-bold text-base text-charcoal-900">
            Save to Collections
          </span>
        </div>
      }
    >
      <div className="p-6 space-y-4">
        <p className="text-xs text-stone-500">
          Select folders to organize <strong>"{recipe.title}"</strong>:
        </p>

        <div className="space-y-2">
          {collections.map(col => {
            const hasRecipe = col.recipeIds.includes(recipe.id);

            return (
              <div
                key={col.id}
                onClick={() => onToggleRecipeInCollection(col.id, recipe.id)}
                className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                  hasRecipe
                    ? 'bg-sage-50 border-sage-300 text-sage-900'
                    : 'bg-white border-stone-200/80 text-charcoal-900 hover:bg-stone-50'
                }`}
              >
                <div>
                  <h4 className="font-serif font-bold text-xs sm:text-sm">{col.name}</h4>
                  <p className="text-[10px] text-stone-400">{col.recipeIds.length} saved</p>
                </div>

                <div
                  className={`w-6 h-6 rounded-lg border flex items-center justify-center transition-colors ${
                    hasRecipe
                      ? 'bg-sage-800 border-sage-800 text-white'
                      : 'border-stone-300 bg-white'
                  }`}
                >
                  {hasRecipe && <Check className="w-3.5 h-3.5" />}
                </div>
              </div>
            );
          })}
        </div>

        <div className="pt-2 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-full bg-sage-800 text-white text-xs font-bold shadow-soft"
          >
            Done
          </button>
        </div>
      </div>
    </Modal>
  );
};
