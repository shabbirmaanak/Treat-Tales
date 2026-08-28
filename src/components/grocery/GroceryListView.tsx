import React, { useState } from 'react';
import { 
  ShoppingCart, 
  Plus, 
  Trash2, 
  Check, 
  Copy, 
  Printer, 
  CheckCircle2, 
  ShoppingBag
} from 'lucide-react';
import { GroceryItem, AisleType } from '../../types/recipe';

interface GroceryListViewProps {
  items: GroceryItem[];
  onToggleItem: (id: string) => void;
  onDeleteItem: (id: string) => void;
  onClearCompleted: () => void;
  onAddItem: (item: GroceryItem) => void;
}

const AISLES: AisleType[] = [
  'Produce',
  'Meat & Seafood',
  'Dairy & Eggs',
  'Pantry & Spices',
  'Grains & Pasta',
  'Bakery',
  'Baking',
  'Condiments'
];

export const GroceryListView: React.FC<GroceryListViewProps> = ({
  items,
  onToggleItem,
  onDeleteItem,
  onClearCompleted,
  onAddItem,
}) => {
  const [newItemName, setNewItemName] = useState('');
  const [newItemAmount, setNewItemAmount] = useState('1');
  const [newItemUnit, setNewItemUnit] = useState('item');
  const [newItemAisle, setNewItemAisle] = useState<AisleType>('Produce');
  const [copied, setCopied] = useState(false);

  const handleAddNewItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newItemName.trim()) return;

    const item: GroceryItem = {
      id: `grocery-custom-${Date.now()}`,
      name: newItemName.trim(),
      amount: Number(newItemAmount) || 1,
      unit: newItemUnit.trim() || 'item',
      aisle: newItemAisle,
      checked: false,
    };

    onAddItem(item);
    setNewItemName('');
    setNewItemAmount('1');
  };

  const handleCopyClipboard = () => {
    if (items.length === 0) return;

    const groupedText = AISLES.map(aisle => {
      const aisleItems = items.filter(i => i.aisle === aisle);
      if (aisleItems.length === 0) return null;

      const lines = aisleItems.map(
        i => `  [${i.checked ? 'x' : ' '}] ${i.amount} ${i.unit} ${i.name}`
      ).join('\n');

      return `--- ${aisle.toUpperCase()} ---\n${lines}`;
    }).filter(Boolean).join('\n\n');

    const fullText = `🌿 TREAT TALES GROCERY SHOPPING LIST\n\n${groupedText}\n\nGenerated via Treat Tales Recipe Book`;
    navigator.clipboard.writeText(fullText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  const totalCount = items.length;
  const completedCount = items.filter(i => i.checked).length;
  const progressPercent = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  return (
    <div className="py-6 space-y-8 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-[#173A2A] via-sage-800 to-[#102B1E] text-white p-6 sm:p-10 rounded-[2.5rem] shadow-soft-xl border border-sage-700/40 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2 max-w-xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-white/10 backdrop-blur-md border border-white/15 text-cream-100">
            <ShoppingCart className="w-3.5 h-3.5 text-amber-300" />
            <span>Smart Supermarket Checklist</span>
          </div>
          <h1 className="font-serif text-2xl sm:text-4xl font-bold text-white">
            Aisle-Organized Grocery List
          </h1>
          <p className="text-xs sm:text-sm text-sage-100/80 leading-relaxed">
            All ingredients are automatically sorted by supermarket department. Check items off smoothly as you shop.
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2.5 flex-wrap w-full md:w-auto">
          <button
            onClick={handleCopyClipboard}
            disabled={totalCount === 0}
            className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white text-xs font-bold transition-all disabled:opacity-40"
          >
            {copied ? <CheckCircle2 className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
            <span>{copied ? 'Copied to Clipboard!' : 'Copy Text'}</span>
          </button>

          <button
            onClick={handlePrint}
            disabled={totalCount === 0}
            className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white text-xs font-bold transition-all disabled:opacity-40"
          >
            <Printer className="w-4 h-4" />
            <span>Print</span>
          </button>

          {completedCount > 0 && (
            <button
              onClick={onClearCompleted}
              className="flex items-center gap-1.5 px-4 py-2.5 rounded-full bg-terracotta-500 hover:bg-terracotta-600 text-white text-xs font-bold shadow-soft transition-all"
            >
              <Trash2 className="w-4 h-4" />
              <span>Clear Done ({completedCount})</span>
            </button>
          )}
        </div>
      </div>

      {/* Progress Bar Card */}
      {totalCount > 0 && (
        <div className="bg-white p-5 rounded-3xl border border-stone-200/80 shadow-soft space-y-2">
          <div className="flex items-center justify-between text-xs font-bold">
            <span className="text-charcoal-900 flex items-center gap-1.5">
              <ShoppingBag className="w-4 h-4 text-sage-800" />
              Shopping Progress
            </span>
            <span className="text-sage-800">
              {completedCount} of {totalCount} items bagged ({progressPercent}%)
            </span>
          </div>
          <div className="w-full h-2.5 bg-stone-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-emerald-600 rounded-full transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
      )}

      {/* Add Custom Item Box */}
      <form
        onSubmit={handleAddNewItem}
        className="bg-white p-5 rounded-3xl border border-stone-200/80 shadow-soft space-y-3"
      >
        <h3 className="font-serif font-bold text-charcoal-900 text-sm">Add Item Manually</h3>
        
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-2.5">
          <input
            type="text"
            required
            value={newItemName}
            onChange={(e) => setNewItemName(e.target.value)}
            placeholder="Item name (e.g. Organic Honey, Almond milk)..."
            className="sm:col-span-5 px-3.5 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-sage-600/30"
          />

          <input
            type="number"
            min="0.1"
            step="0.1"
            value={newItemAmount}
            onChange={(e) => setNewItemAmount(e.target.value)}
            placeholder="Qty"
            className="sm:col-span-2 px-3.5 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-sage-600/30"
          />

          <input
            type="text"
            value={newItemUnit}
            onChange={(e) => setNewItemUnit(e.target.value)}
            placeholder="Unit (cups, g, bottle)"
            className="sm:col-span-2 px-3.5 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-sage-600/30"
          />

          <select
            value={newItemAisle}
            onChange={(e) => setNewItemAisle(e.target.value as any)}
            className="sm:col-span-2 px-3.5 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs font-medium text-charcoal-900 focus:outline-none focus:ring-2 focus:ring-sage-600/30"
          >
            {AISLES.map(a => (
              <option key={a} value={a}>{a}</option>
            ))}
          </select>

          <button
            type="submit"
            className="sm:col-span-1 py-2 px-3 bg-sage-800 text-white rounded-xl text-xs font-bold hover:bg-sage-900 transition-colors flex items-center justify-center gap-1 shadow-soft"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>
      </form>

      {/* Aisle Grouped Grocery Items */}
      {totalCount > 0 ? (
        <div className="space-y-6">
          {AISLES.map(aisle => {
            const aisleItems = items.filter(i => i.aisle === aisle);
            if (aisleItems.length === 0) return null;

            const aisleIcons: Record<AisleType, string> = {
              'Produce': '🥬',
              'Meat & Seafood': '🥩',
              'Dairy & Eggs': '🧀',
              'Pantry & Spices': '🧂',
              'Grains & Pasta': '🌾',
              'Bakery': '🥖',
              'Baking': '🧁',
              'Condiments': '🍯'
            };

            return (
              <div
                key={aisle}
                className="bg-white rounded-3xl p-6 border border-stone-200/80 shadow-soft space-y-4"
              >
                <div className="flex items-center justify-between pb-3 border-b border-stone-100">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">{aisleIcons[aisle]}</span>
                    <h3 className="font-serif font-bold text-charcoal-900 text-base">
                      {aisle}
                    </h3>
                  </div>
                  <span className="text-xs text-stone-400 font-medium">
                    {aisleItems.length} items
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {aisleItems.map(item => (
                    <div
                      key={item.id}
                      onClick={() => onToggleItem(item.id)}
                      className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                        item.checked
                          ? 'bg-sage-50/60 border-sage-200 text-stone-400 line-through'
                          : 'bg-stone-50/50 border-stone-200/70 text-charcoal-900 hover:border-sage-300 hover:bg-white'
                      }`}
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <div
                          className={`w-5 h-5 rounded-lg border flex items-center justify-center transition-colors flex-shrink-0 ${
                            item.checked
                              ? 'bg-emerald-600 border-emerald-600 text-white'
                              : 'border-stone-300 bg-white'
                          }`}
                        >
                          {item.checked && <Check className="w-3.5 h-3.5" />}
                        </div>

                        <div className="min-w-0">
                          <p className="text-xs sm:text-sm font-semibold truncate">
                            {item.name}
                          </p>
                          {item.recipeOrigin && (
                            <p className="text-[10px] text-stone-400 truncate">
                              From: {item.recipeOrigin}
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center gap-2 flex-shrink-0">
                        <span className="text-xs font-bold text-sage-900 bg-white px-2 py-0.5 rounded-lg border border-stone-200/60">
                          {item.amount} {item.unit}
                        </span>

                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onDeleteItem(item.id);
                          }}
                          className="p-1 rounded-lg text-stone-300 hover:text-rose-500 hover:bg-rose-50 transition-colors"
                          title="Delete item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

              </div>
            );
          })}
        </div>
      ) : (
        /* Empty State */
        <div className="bg-white rounded-3xl p-12 text-center border border-stone-200/80 shadow-soft space-y-4 max-w-lg mx-auto">
          <div className="w-16 h-16 rounded-full bg-sage-50 text-sage-800 mx-auto flex items-center justify-center">
            <ShoppingCart className="w-8 h-8" />
          </div>
          <div className="space-y-1">
            <h3 className="font-serif text-xl font-bold text-charcoal-900">Your Shopping List is Empty</h3>
            <p className="text-xs text-stone-500">
              Add ingredients from recipe pages, your weekly meal plan, or manually type staples above.
            </p>
          </div>
        </div>
      )}

    </div>
  );
};
