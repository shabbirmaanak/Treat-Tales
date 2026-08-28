import React, { useState } from 'react';
import { 
  Plus, 
  Trash2, 
  Sparkles, 
  Clock, 
  Flame, 
  ChefHat, 
  Image as ImageIcon,
  Check,
  X
} from 'lucide-react';
import { Modal } from '../common/Modal';
import { Recipe, Ingredient, InstructionStep, MealCategory, CuisineType, DietaryTag, DifficultyLevel } from '../../types/recipe';

interface RecipeCreatorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSaveRecipe: (recipe: Recipe) => void;
}

const SAMPLE_FOOD_IMAGES = [
  'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=1000&q=80',
  'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=1000&q=80',
  'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=1000&q=80',
  'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=1000&q=80',
  'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?auto=format&fit=crop&w=1000&q=80',
];

const CUISINES: CuisineType[] = ['Italian', 'Japanese', 'Mediterranean', 'Mexican', 'Thai', 'American', 'French', 'Middle Eastern', 'Indian', 'Global Fusion'];
const CATEGORIES: MealCategory[] = ['Breakfast', 'Healthy', 'Quick Meals', 'Pasta & Grains', 'High Protein', 'Bowls & Salads', 'Desserts', 'Baking', 'Plant-Based', 'Soups & Stews'];
const DIETARY_LIST: DietaryTag[] = ['Vegetarian', 'Vegan', 'Gluten-Free', 'Dairy-Free', 'Keto', 'Low Carb', 'High Protein', 'Quick & Easy'];

export const RecipeCreatorModal: React.FC<RecipeCreatorModalProps> = ({
  isOpen,
  onClose,
  onSaveRecipe,
}) => {
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(SAMPLE_FOOD_IMAGES[0]);
  const [prepTime, setPrepTime] = useState(15);
  const [cookTime, setCookTime] = useState(20);
  const [servings, setServings] = useState(4);
  const [difficulty, setDifficulty] = useState<DifficultyLevel>('Easy');
  const [category, setCategory] = useState<MealCategory>('Healthy');
  const [cuisine, setCuisine] = useState<CuisineType>('Mediterranean');
  const [selectedDietary, setSelectedDietary] = useState<DietaryTag[]>(['Healthy' as any]);
  const [calories, setCalories] = useState(450);
  const [protein, setProtein] = useState(28);
  const [carbs, setCarbs] = useState(40);
  const [fat, setFat] = useState(16);

  // Dynamic Ingredients List
  const [ingredients, setIngredients] = useState<Ingredient[]>([
    { id: '1', name: 'Fresh Garlic', amount: 3, unit: 'cloves', metricAmount: 3, metricUnit: 'cloves', aisle: 'Produce' },
    { id: '2', name: 'Extra Virgin Olive Oil', amount: 2, unit: 'tbsp', metricAmount: 30, metricUnit: 'ml', aisle: 'Pantry & Spices' },
    { id: '3', name: 'Sea Salt & Black Pepper', amount: 1, unit: 'tsp', metricAmount: 5, metricUnit: 'g', aisle: 'Pantry & Spices' },
  ]);

  // Dynamic Instructions List
  const [instructions, setInstructions] = useState<InstructionStep[]>([
    { stepNumber: 1, title: 'Prep the ingredients', instruction: 'Mince the garlic and chop fresh herbs finely.', timerMinutes: 5 },
    { stepNumber: 2, title: 'Sear & Sauté', instruction: 'Heat olive oil in skillet over medium flame and cook until fragrant.', timerMinutes: 10 },
  ]);

  const handleAddIngredient = () => {
    const newIng: Ingredient = {
      id: String(Date.now()),
      name: '',
      amount: 1,
      unit: 'cup',
      metricAmount: 100,
      metricUnit: 'g',
      aisle: 'Produce'
    };
    setIngredients([...ingredients, newIng]);
  };

  const handleUpdateIngredient = (index: number, field: keyof Ingredient, value: any) => {
    const updated = [...ingredients];
    updated[index] = { ...updated[index], [field]: value };
    setIngredients(updated);
  };

  const handleRemoveIngredient = (index: number) => {
    setIngredients(ingredients.filter((_, i) => i !== index));
  };

  const handleAddStep = () => {
    const newStep: InstructionStep = {
      stepNumber: instructions.length + 1,
      title: '',
      instruction: '',
      timerMinutes: 5
    };
    setInstructions([...instructions, newStep]);
  };

  const handleUpdateStep = (index: number, field: keyof InstructionStep, value: any) => {
    const updated = [...instructions];
    updated[index] = { ...updated[index], [field]: value };
    setInstructions(updated);
  };

  const handleRemoveStep = (index: number) => {
    const updated = instructions
      .filter((_, i) => i !== index)
      .map((s, i) => ({ ...s, stepNumber: i + 1 }));
    setInstructions(updated);
  };

  const toggleDietary = (tag: DietaryTag) => {
    setSelectedDietary(prev =>
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const newRecipe: Recipe = {
      id: `recipe-custom-${Date.now()}`,
      title: title.trim(),
      subtitle: subtitle.trim() || 'A delicious homemade creation',
      description: description.trim() || 'Handcrafted fresh recipe with wholesome ingredients.',
      image: image.trim() || SAMPLE_FOOD_IMAGES[0],
      prepTime: Number(prepTime),
      cookTime: Number(cookTime),
      totalTime: Number(prepTime) + Number(cookTime),
      servings: Number(servings),
      difficulty,
      rating: 5.0,
      reviewCount: 1,
      category,
      cuisine,
      dietary: selectedDietary,
      tags: [cuisine, category, 'Custom Recipe'],
      macros: {
        calories: Number(calories),
        protein: Number(protein),
        carbs: Number(carbs),
        fat: Number(fat),
      },
      author: {
        name: 'You (Chef in Residence)',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
        role: 'Home Artisan',
        verified: true
      },
      ingredients: ingredients.filter(i => i.name.trim() !== ''),
      instructions: instructions.filter(s => s.instruction.trim() !== ''),
      isCustom: true,
      createdAt: new Date().toISOString().split('T')[0]
    };

    onSaveRecipe(newRecipe);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} maxWidth="4xl">
      <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-8">
        
        {/* Header */}
        <div className="pb-4 border-b border-stone-100 flex items-center justify-between">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-terracotta-50 text-terracotta-700 border border-terracotta-200">
              <ChefHat className="w-3.5 h-3.5" />
              <span>Recipe Creator Studio</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-charcoal-900 mt-1">
              Add Your Own Signature Dish
            </h2>
          </div>
        </div>

        {/* Basic Details */}
        <div className="space-y-4">
          <h3 className="font-serif font-bold text-charcoal-900 text-base">General Information</h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-charcoal-900">Recipe Title *</label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Grandma's Secret Garlic Butter Penne"
                className="w-full px-4 py-2.5 bg-stone-50 border border-stone-200 rounded-2xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-sage-600/30 focus:bg-white"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-charcoal-900">Subtitle / Tagline</label>
              <input
                type="text"
                value={subtitle}
                onChange={(e) => setSubtitle(e.target.value)}
                placeholder="e.g. Crispy garlic chips, fresh oregano & aged pecorino"
                className="w-full px-4 py-2.5 bg-stone-50 border border-stone-200 rounded-2xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-sage-600/30 focus:bg-white"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-charcoal-900">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Tell the story behind this dish, flavors, and serving recommendations..."
              className="w-full px-4 py-2.5 bg-stone-50 border border-stone-200 rounded-2xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-sage-600/30 focus:bg-white h-20 resize-none"
            />
          </div>

          {/* Photo URL or Presets */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-charcoal-900">Cover Photo</label>
            <div className="flex items-center gap-3">
              <input
                type="url"
                value={image}
                onChange={(e) => setImage(e.target.value)}
                placeholder="https://images.unsplash.com/..."
                className="flex-1 px-4 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-sage-600/30"
              />
              <img
                src={image}
                alt="Preview"
                className="w-12 h-12 rounded-xl object-cover border border-stone-200 flex-shrink-0"
              />
            </div>
            {/* Quick Photo Presets */}
            <div className="flex items-center gap-2 pt-1">
              <span className="text-[11px] text-stone-400">Presets:</span>
              {SAMPLE_FOOD_IMAGES.map((img, i) => (
                <button
                  type="button"
                  key={i}
                  onClick={() => setImage(img)}
                  className="w-8 h-8 rounded-lg overflow-hidden border border-stone-300 hover:scale-105 transition-transform"
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Meta Badges */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
            <div>
              <label className="text-xs font-bold text-charcoal-900">Prep (mins)</label>
              <input
                type="number"
                min="1"
                value={prepTime}
                onChange={(e) => setPrepTime(Number(e.target.value))}
                className="w-full mt-1 px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs"
              />
            </div>
            <div>
              <label className="text-xs font-bold text-charcoal-900">Cook (mins)</label>
              <input
                type="number"
                min="1"
                value={cookTime}
                onChange={(e) => setCookTime(Number(e.target.value))}
                className="w-full mt-1 px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs"
              />
            </div>
            <div>
              <label className="text-xs font-bold text-charcoal-900">Servings</label>
              <input
                type="number"
                min="1"
                value={servings}
                onChange={(e) => setServings(Number(e.target.value))}
                className="w-full mt-1 px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs"
              />
            </div>
            <div>
              <label className="text-xs font-bold text-charcoal-900">Difficulty</label>
              <select
                value={difficulty}
                onChange={(e) => setDifficulty(e.target.value as any)}
                className="w-full mt-1 px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs"
              >
                <option value="Easy">Easy</option>
                <option value="Medium">Medium</option>
                <option value="Master">Master</option>
              </select>
            </div>
          </div>

          {/* Cuisines & Categories */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div>
              <label className="text-xs font-bold text-charcoal-900">Cuisine</label>
              <select
                value={cuisine}
                onChange={(e) => setCuisine(e.target.value as any)}
                className="w-full mt-1 px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs"
              >
                {CUISINES.map(c => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-xs font-bold text-charcoal-900">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as any)}
                className="w-full mt-1 px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs"
              >
                {CATEGORIES.map(c => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Dietary Badges */}
          <div className="space-y-1.5 pt-2">
            <label className="text-xs font-bold text-charcoal-900">Dietary & Lifestyle Tags</label>
            <div className="flex flex-wrap gap-1.5">
              {DIETARY_LIST.map((tag) => {
                const isSelected = selectedDietary.includes(tag);
                return (
                  <button
                    type="button"
                    key={tag}
                    onClick={() => toggleDietary(tag)}
                    className={`px-3 py-1 rounded-xl text-xs font-semibold transition-all ${
                      isSelected
                        ? 'bg-sage-800 text-white shadow-soft'
                        : 'bg-stone-50 text-stone-600 border border-stone-200'
                    }`}
                  >
                    {isSelected ? `✓ ${tag}` : `+ ${tag}`}
                  </button>
                );
              })}
            </div>
          </div>

        </div>

        {/* Dynamic Ingredients Section */}
        <div className="space-y-4 pt-4 border-t border-stone-100">
          <div className="flex items-center justify-between">
            <h3 className="font-serif font-bold text-charcoal-900 text-base">Ingredients</h3>
            <button
              type="button"
              onClick={handleAddIngredient}
              className="flex items-center gap-1 text-xs font-bold text-sage-800 hover:text-sage-900"
            >
              <Plus className="w-4 h-4" />
              <span>Add Ingredient</span>
            </button>
          </div>

          <div className="space-y-2.5">
            {ingredients.map((ing, idx) => (
              <div key={ing.id} className="grid grid-cols-1 sm:grid-cols-12 gap-2 items-center bg-stone-50 p-2.5 rounded-2xl border border-stone-200/70">
                <input
                  type="text"
                  required
                  placeholder="Ingredient name (e.g. Penne pasta)"
                  value={ing.name}
                  onChange={(e) => handleUpdateIngredient(idx, 'name', e.target.value)}
                  className="sm:col-span-5 px-3 py-1.5 bg-white border border-stone-200 rounded-xl text-xs"
                />
                <input
                  type="number"
                  min="0.1"
                  step="0.1"
                  value={ing.amount}
                  onChange={(e) => handleUpdateIngredient(idx, 'amount', Number(e.target.value))}
                  className="sm:col-span-2 px-3 py-1.5 bg-white border border-stone-200 rounded-xl text-xs"
                  placeholder="Amount"
                />
                <input
                  type="text"
                  value={ing.unit}
                  onChange={(e) => handleUpdateIngredient(idx, 'unit', e.target.value)}
                  className="sm:col-span-2 px-3 py-1.5 bg-white border border-stone-200 rounded-xl text-xs"
                  placeholder="Unit (cups, g, tbsp)"
                />
                <select
                  value={ing.aisle}
                  onChange={(e) => handleUpdateIngredient(idx, 'aisle', e.target.value as any)}
                  className="sm:col-span-2 px-2 py-1.5 bg-white border border-stone-200 rounded-xl text-xs"
                >
                  <option value="Produce">Produce</option>
                  <option value="Dairy & Eggs">Dairy</option>
                  <option value="Meat & Seafood">Meat</option>
                  <option value="Pantry & Spices">Pantry</option>
                  <option value="Grains & Pasta">Grains</option>
                  <option value="Bakery">Bakery</option>
                </select>
                <button
                  type="button"
                  onClick={() => handleRemoveIngredient(idx)}
                  className="sm:col-span-1 p-1.5 rounded-lg text-stone-400 hover:text-rose-600 transition-colors flex justify-center"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Dynamic Instructions Section */}
        <div className="space-y-4 pt-4 border-t border-stone-100">
          <div className="flex items-center justify-between">
            <h3 className="font-serif font-bold text-charcoal-900 text-base">Step-by-Step Instructions</h3>
            <button
              type="button"
              onClick={handleAddStep}
              className="flex items-center gap-1 text-xs font-bold text-sage-800 hover:text-sage-900"
            >
              <Plus className="w-4 h-4" />
              <span>Add Step</span>
            </button>
          </div>

          <div className="space-y-3">
            {instructions.map((step, idx) => (
              <div key={idx} className="bg-stone-50 p-3.5 rounded-2xl border border-stone-200/70 space-y-2">
                <div className="flex items-center justify-between gap-2">
                  <span className="w-6 h-6 rounded-full bg-sage-800 text-white text-xs font-bold flex items-center justify-center">
                    {step.stepNumber}
                  </span>
                  <input
                    type="text"
                    placeholder="Step Title (e.g. Sauté garlic & herbs)"
                    value={step.title || ''}
                    onChange={(e) => handleUpdateStep(idx, 'title', e.target.value)}
                    className="flex-1 px-3 py-1.5 bg-white border border-stone-200 rounded-xl text-xs font-semibold"
                  />
                  <div className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-stone-400" />
                    <input
                      type="number"
                      min="0"
                      value={step.timerMinutes || ''}
                      onChange={(e) => handleUpdateStep(idx, 'timerMinutes', Number(e.target.value))}
                      placeholder="Timer (min)"
                      className="w-20 px-2 py-1.5 bg-white border border-stone-200 rounded-xl text-xs"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => handleRemoveStep(idx)}
                    className="p-1.5 rounded-lg text-stone-400 hover:text-rose-600 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <textarea
                  required
                  placeholder="Detailed instruction text..."
                  value={step.instruction}
                  onChange={(e) => handleUpdateStep(idx, 'instruction', e.target.value)}
                  className="w-full p-2.5 bg-white border border-stone-200 rounded-xl text-xs resize-none h-16"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Submit Actions */}
        <div className="pt-6 border-t border-stone-100 flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2.5 rounded-full bg-stone-100 hover:bg-stone-200 text-charcoal-900 text-xs font-bold transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-7 py-2.5 rounded-full bg-terracotta-500 hover:bg-terracotta-600 text-white text-xs font-bold shadow-soft transition-all"
          >
            Publish Recipe
          </button>
        </div>

      </form>
    </Modal>
  );
};
