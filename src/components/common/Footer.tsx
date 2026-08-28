import React, { useState } from 'react';
import { ChefHat, Heart, Sparkles, Send, Globe, Share2, MessageCircle } from 'lucide-react';

interface FooterProps {
  onSelectCategory?: (cat: string) => void;
  onOpenPantryModal?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onSelectCategory, onOpenPantryModal }) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <footer className="mt-24 border-t border-stone-200/80 bg-white text-stone-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 pb-12 border-b border-stone-100">
          
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-sage-800 flex items-center justify-center text-white shadow-soft">
                <ChefHat className="w-5 h-5 text-cream-100" />
              </div>
              <span className="font-serif text-2xl font-bold tracking-tight text-charcoal-900">
                Treat Tales
              </span>
            </div>
            <p className="text-sm text-stone-500 max-w-sm leading-relaxed">
              Elevating home cooking through intuitive recipe discovery, smart pantry matching, dynamic serving scaling, and step-by-step interactive cooking guidance.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <span className="w-9 h-9 rounded-full bg-stone-100 flex items-center justify-center text-stone-600 hover:bg-sage-800 hover:text-white transition-colors cursor-pointer">
                <Globe className="w-4 h-4" />
              </span>
              <span className="w-9 h-9 rounded-full bg-stone-100 flex items-center justify-center text-stone-600 hover:bg-sage-800 hover:text-white transition-colors cursor-pointer">
                <Share2 className="w-4 h-4" />
              </span>
              <span className="w-9 h-9 rounded-full bg-stone-100 flex items-center justify-center text-stone-600 hover:bg-sage-800 hover:text-white transition-colors cursor-pointer">
                <MessageCircle className="w-4 h-4" />
              </span>
            </div>
          </div>

          {/* Quick Categories */}
          <div className="space-y-3">
            <h4 className="font-serif font-bold text-charcoal-900 text-base">Explore Recipes</h4>
            <ul className="space-y-2 text-sm">
              <li><button onClick={() => onSelectCategory?.('Breakfast')} className="hover:text-sage-700 transition-colors">🥞 Breakfast & Brunch</button></li>
              <li><button onClick={() => onSelectCategory?.('High Protein')} className="hover:text-sage-700 transition-colors">🥩 High Protein Meals</button></li>
              <li><button onClick={() => onSelectCategory?.('Quick Meals')} className="hover:text-sage-700 transition-colors">⏱️ Under 20-Min Dinners</button></li>
              <li><button onClick={() => onSelectCategory?.('Pasta & Grains')} className="hover:text-sage-700 transition-colors">🍝 Italian Pasta Classics</button></li>
              <li><button onClick={() => onSelectCategory?.('Plant-Based')} className="hover:text-sage-700 transition-colors">🥑 Vegan & Plant-Based</button></li>
              <li><button onClick={() => onSelectCategory?.('Desserts')} className="hover:text-sage-700 transition-colors">🍰 Artisan Desserts</button></li>
            </ul>
          </div>

          {/* Smart Features */}
          <div className="space-y-3">
            <h4 className="font-serif font-bold text-charcoal-900 text-base">Smart Tools</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <button onClick={onOpenPantryModal} className="flex items-center gap-1.5 text-sage-800 font-medium hover:underline">
                  <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                  <span>Pantry Matcher</span>
                </button>
              </li>
              <li><span>📅 7-Day Meal Planning</span></li>
              <li><span>🛒 Smart Grocery Aisle List</span></li>
              <li><span>⚖️ Dynamic Servings Scaler</span></li>
              <li><span>🎙️ Voice Cooking Assistant</span></li>
              <li><span>⏱️ Interactive Timers</span></li>
            </ul>
          </div>

          {/* Newsletter Box */}
          <div className="space-y-3">
            <h4 className="font-serif font-bold text-charcoal-900 text-base">The Weekly Menu</h4>
            <p className="text-xs text-stone-500 leading-relaxed">
              Get chef-curated recipes, seasonal produce guides, and cooking tricks delivered every Sunday.
            </p>
            {subscribed ? (
              <div className="p-3 bg-sage-50 border border-sage-200 rounded-2xl text-xs text-sage-800 font-medium flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-emerald-600" />
                <span>You are on the chef's VIP list! 🌿</span>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-2">
                <div className="relative">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-sage-600/30 focus:bg-white"
                  />
                  <button
                    type="submit"
                    className="absolute right-1.5 top-1/2 -translate-y-1/2 p-1.5 bg-sage-800 text-white rounded-lg hover:bg-sage-900 transition-colors"
                  >
                    <Send className="w-3 h-3" />
                  </button>
                </div>
              </form>
            )}
          </div>

        </div>

        {/* Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-400">
          <p>© 2026 Treat Tales (Recipee Concept). Crafted with passion for mindful cooking.</p>
          <div className="flex items-center gap-1 text-stone-400">
            <span>Made for food lovers</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
            <span>worldwide</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
