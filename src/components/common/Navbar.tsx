import React, { useState } from 'react';
import { 
  UtensilsCrossed, 
  Search, 
  Sparkles, 
  CalendarDays, 
  ShoppingCart, 
  Bookmark, 
  PlusCircle, 
  Menu,
  X,
  ChefHat,
  Heart,
  BookOpen
} from 'lucide-react';

export type NavTab = 'discover' | 'pantry' | 'planner' | 'grocery' | 'collections';

interface NavbarProps {
  activeTab: NavTab;
  onSelectTab: (tab: NavTab) => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  favoritesCount: number;
  groceryCount: number;
  onOpenCreateModal: () => void;
  onOpenPantryModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  onSelectTab,
  searchQuery,
  onSearchChange,
  favoritesCount,
  groceryCount,
  onOpenCreateModal,
  onOpenPantryModal,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems: { id: NavTab; label: string; icon: React.ReactNode; badge?: number; action?: () => void }[] = [
    { id: 'discover', label: 'Discover', icon: <UtensilsCrossed className="w-4 h-4" /> },
    { 
      id: 'pantry', 
      label: 'Pantry Matcher', 
      icon: <Sparkles className="w-4 h-4 text-amber-500" />,
      action: onOpenPantryModal 
    },
    { id: 'planner', label: 'Meal Planner', icon: <CalendarDays className="w-4 h-4" /> },
    { 
      id: 'grocery', 
      label: 'Grocery List', 
      icon: <ShoppingCart className="w-4 h-4" />, 
      badge: groceryCount 
    },
    { 
      id: 'collections', 
      label: 'My Recipe Book', 
      icon: <Bookmark className="w-4 h-4" />, 
      badge: favoritesCount 
    },
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#FAF8F5]/90 backdrop-blur-md border-b border-stone-200/60 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-4">
          
          {/* Brand Logo */}
          <div 
            onClick={() => onSelectTab('discover')}
            className="flex items-center gap-3 cursor-pointer group select-none"
          >
            <div className="w-11 h-11 rounded-2xl bg-sage-800 flex items-center justify-center text-white shadow-soft group-hover:scale-105 transition-transform duration-200">
              <ChefHat className="w-6 h-6 text-cream-100" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-serif text-2xl font-bold tracking-tight text-charcoal-900">
                  Treat Tales
                </span>
                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-terracotta-100 text-terracotta-700">
                  Recipee
                </span>
              </div>
              <p className="text-[11px] font-medium text-stone-500 hidden sm:block">
                Modern Food & Cooking Discovery
              </p>
            </div>
          </div>

          {/* Desktop Search Bar */}
          <div className="hidden md:flex flex-1 max-w-md mx-4">
            <div className="relative w-full">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="Search 1,000+ recipes, ingredients, chefs..."
                className="w-full pl-10 pr-4 py-2.5 bg-white border border-stone-200/80 rounded-full text-sm placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-sage-600/30 focus:border-sage-600 shadow-soft transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => onSearchChange('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-stone-400 hover:text-stone-700 bg-stone-100 px-1.5 py-0.5 rounded"
                >
                  Clear
                </button>
              )}
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    if (item.action) {
                      item.action();
                    } else {
                      onSelectTab(item.id);
                    }
                  }}
                  className={`relative flex items-center gap-2 px-3.5 py-2 rounded-full text-sm font-medium transition-all ${
                    isActive
                      ? 'bg-sage-800 text-white shadow-soft font-semibold'
                      : 'text-stone-600 hover:text-charcoal-900 hover:bg-stone-100/80'
                  }`}
                >
                  {item.icon}
                  <span>{item.label}</span>
                  {typeof item.badge === 'number' && item.badge > 0 && (
                    <span
                      className={`inline-flex items-center justify-center text-[11px] font-bold px-1.5 py-0.2 rounded-full min-w-5 h-5 ${
                        isActive
                          ? 'bg-terracotta-500 text-white'
                          : 'bg-sage-100 text-sage-800'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
            <a
              href="/taraif-al-taam/"
              className="relative flex items-center gap-2 px-3.5 py-2 rounded-full text-sm font-medium text-stone-600 hover:text-charcoal-900 hover:bg-stone-100/80 transition-all"
            >
              <BookOpen className="w-4 h-4" />
              <span>طرائف الطعام</span>
            </a>
          </nav>

          {/* Action Buttons */}
          <div className="flex items-center gap-2.5">
            <button
              onClick={onOpenCreateModal}
              className="hidden sm:inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-terracotta-500 hover:bg-terracotta-600 active:scale-95 text-white text-sm font-semibold shadow-soft hover:shadow-soft-lg transition-all duration-200"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Create Recipe</span>
            </button>

            {/* Mobile menu toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2.5 rounded-2xl bg-white border border-stone-200/80 text-charcoal-900 hover:bg-stone-50 transition-colors shadow-soft"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>

        {/* Mobile Search Bar */}
        <div className="pb-3 md:hidden">
          <div className="relative w-full">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search recipes, ingredients..."
              className="w-full pl-10 pr-4 py-2 bg-white border border-stone-200 rounded-full text-sm placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-sage-600/30"
            />
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-stone-200/80 bg-white/95 backdrop-blur-md px-4 py-4 space-y-2 shadow-soft-xl animate-slide-down">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  if (item.action) {
                    item.action();
                  } else {
                    onSelectTab(item.id);
                  }
                  setMobileMenuOpen(false);
                }}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-2xl text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-sage-800 text-white font-semibold'
                    : 'text-stone-700 hover:bg-stone-50'
                }`}
              >
                <div className="flex items-center gap-3">
                  {item.icon}
                  <span>{item.label}</span>
                </div>
                {typeof item.badge === 'number' && item.badge > 0 && (
                  <span
                    className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                      isActive ? 'bg-terracotta-500 text-white' : 'bg-sage-100 text-sage-800'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}

          <a
            href="/taraif-al-taam/"
            className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-medium text-stone-700 hover:bg-stone-50 transition-all"
          >
            <BookOpen className="w-4 h-4" />
            <span>طرائف الطعام (Cookbook)</span>
          </a>

          <button
            onClick={() => {
              onOpenCreateModal();
              setMobileMenuOpen(false);
            }}
            className="w-full flex items-center justify-center gap-2 mt-3 px-4 py-3 rounded-2xl bg-terracotta-500 text-white text-sm font-semibold shadow-soft"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Create Custom Recipe</span>
          </button>
        </div>
      )}
    </header>
  );
};
