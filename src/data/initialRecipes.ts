import { Recipe } from '../types/recipe';

export const INITIAL_RECIPES: Recipe[] = [
  {
    id: 'rec-1',
    title: 'Creamy Tuscan Sun-Dried Tomato Salmon',
    subtitle: 'Crispy skin salmon in a velvety garlic, spinach & parmesan cream reduction',
    description: 'A luxurious 25-minute restaurant-quality seafood dish featuring tender Atlantic salmon seared to golden perfection, bathed in a rich garlic cream sauce bursting with tangy sun-dried tomatoes, wilted baby spinach, and aged parmesan.',
    image: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=1200&q=80',
    coverImage: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=1600&q=80',
    prepTime: 10,
    cookTime: 15,
    totalTime: 25,
    servings: 4,
    difficulty: 'Easy',
    rating: 4.9,
    reviewCount: 428,
    category: 'High Protein',
    cuisine: 'Italian',
    dietary: ['Gluten-Free', 'High Protein', 'Keto', 'Low Carb'],
    tags: ['Salmon', 'Cream Sauce', 'Quick Dinner', 'Keto-Friendly', 'Gourmet'],
    isFeatured: true,
    isTrending: true,
    createdAt: '2026-08-01',
    author: {
      name: 'Chef Elena Rossi',
      avatar: 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&w=200&q=80',
      role: 'Executive Chef & Food Stylist',
      verified: true
    },
    macros: {
      calories: 520,
      protein: 42,
      carbs: 8,
      fat: 36,
      fiber: 3,
      sugar: 4
    },
    ingredients: [
      { id: 'ing-1', name: 'Atlantic Salmon Fillets', amount: 4, unit: 'fillets (6 oz each)', metricAmount: 680, metricUnit: 'g', aisle: 'Meat & Seafood' },
      { id: 'ing-2', name: 'Olive Oil', amount: 2, unit: 'tbsp', metricAmount: 30, metricUnit: 'ml', aisle: 'Pantry & Spices' },
      { id: 'ing-3', name: 'Unsalted Butter', amount: 2, unit: 'tbsp', metricAmount: 30, metricUnit: 'g', aisle: 'Dairy & Eggs' },
      { id: 'ing-4', name: 'Garlic Cloves', amount: 4, unit: 'cloves (minced)', metricAmount: 4, metricUnit: 'cloves', aisle: 'Produce' },
      { id: 'ing-5', name: 'Sun-Dried Tomatoes in Oil', amount: 0.5, unit: 'cup (sliced)', metricAmount: 90, metricUnit: 'g', aisle: 'Pantry & Spices' },
      { id: 'ing-6', name: 'Heavy Cream', amount: 1, unit: 'cup', metricAmount: 240, metricUnit: 'ml', aisle: 'Dairy & Eggs' },
      { id: 'ing-7', name: 'Baby Spinach', amount: 3, unit: 'cups (packed)', metricAmount: 120, metricUnit: 'g', aisle: 'Produce' },
      { id: 'ing-8', name: 'Fresh Grated Parmesan', amount: 0.5, unit: 'cup', metricAmount: 50, metricUnit: 'g', aisle: 'Dairy & Eggs' },
      { id: 'ing-9', name: 'Fresh Basil Leaves', amount: 0.25, unit: 'cup (chopped)', metricAmount: 15, metricUnit: 'g', aisle: 'Produce' },
      { id: 'ing-10', name: 'Sea Salt & Cracked Black Pepper', amount: 1, unit: 'tsp', metricAmount: 5, metricUnit: 'g', aisle: 'Pantry & Spices' }
    ],
    instructions: [
      {
        stepNumber: 1,
        title: 'Season & Prep Salmon',
        instruction: 'Pat salmon fillets dry with paper towels. Season both sides generously with sea salt and freshly cracked black pepper.',
        tip: 'Drying the salmon skin thoroughly ensures an ultra-crispy sear without sticking.'
      },
      {
        stepNumber: 2,
        title: 'Pan Sear Salmon',
        instruction: 'Heat olive oil and 1 tbsp butter in a large skillet over medium-high heat. Place salmon skin-side down and sear for 5 minutes without moving, then flip and cook for 3-4 minutes until golden and just cooked through. Transfer to a warm plate.',
        timerMinutes: 8,
        tip: 'Do not crowd the skillet; give each fillet room to breathe.'
      },
      {
        stepNumber: 3,
        title: 'Sauté Aromatics',
        instruction: 'Melt the remaining 1 tbsp butter in the same skillet. Add minced garlic and sliced sun-dried tomatoes; sauté for 1 minute until fragrant.',
        timerMinutes: 1
      },
      {
        stepNumber: 4,
        title: 'Simmer Cream Reduction',
        instruction: 'Pour in heavy cream, reduce heat to gentle medium-low, and bring to a simmer for 3 minutes. Stir in grated parmesan until smoothly melted.',
        timerMinutes: 3
      },
      {
        stepNumber: 5,
        title: 'Wilt Greens & Combine',
        instruction: 'Add fresh baby spinach and chopped basil; cook for 1-2 minutes until spinach is tender and wilted. Return salmon fillets to the skillet, spoon creamy sauce over top, and serve immediately.',
        timerMinutes: 2
      }
    ],
    substitutions: [
      { original: 'Heavy Cream', replacement: 'Full-fat coconut cream or cashew cream', tip: 'Keeps the dish 100% dairy-free with similar velvety richness.' },
      { original: 'Salmon', replacement: 'Pan-seared chicken breast or large tiger shrimp', tip: 'Equally delicious; adjust chicken cooking time to 6-7 mins per side.' }
    ],
    chefTips: [
      'Use sun-dried tomatoes packed in olive oil for maximum flavor intensity.',
      'Serve alongside steamed asparagus, cauliflower mash, or crusty sourdough bread.'
    ]
  },
  {
    id: 'rec-2',
    title: 'Artisanal Sourdough Avocado & Poached Egg Toast',
    subtitle: 'Whipped feta, microgreens, Aleppo chili flakes & balsamic glaze',
    description: 'Elevate your brunch routine with toasted artisanal sourdough layered with creamy lemon-dill whipped feta, buttery Hass avocado slices, golden runny poached eggs, crunchy toasted pepitas, and a tangy pomegranate balsamic drizzle.',
    image: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=1200&q=80',
    coverImage: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=1600&q=80',
    prepTime: 10,
    cookTime: 5,
    totalTime: 15,
    servings: 2,
    difficulty: 'Easy',
    rating: 4.8,
    reviewCount: 312,
    category: 'Breakfast',
    cuisine: 'Mediterranean',
    dietary: ['Vegetarian', 'Quick & Easy'],
    tags: ['Brunch', 'Avocado Toast', 'Poached Eggs', 'Healthy Breakfast', '15 Min'],
    isFeatured: true,
    isTrending: true,
    createdAt: '2026-08-05',
    author: {
      name: 'Chef Julian Reed',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
      role: 'Brunch Specialist',
      verified: true
    },
    macros: {
      calories: 380,
      protein: 16,
      carbs: 32,
      fat: 22,
      fiber: 7,
      sugar: 3
    },
    ingredients: [
      { id: 'ing-21', name: 'Rustic Sourdough Slices', amount: 2, unit: 'thick slices', metricAmount: 140, metricUnit: 'g', aisle: 'Bakery' },
      { id: 'ing-22', name: 'Ripe Hass Avocados', amount: 1.5, unit: 'avocados', metricAmount: 220, metricUnit: 'g', aisle: 'Produce' },
      { id: 'ing-23', name: 'Free-Range Large Eggs', amount: 2, unit: 'eggs', metricAmount: 2, metricUnit: 'eggs', aisle: 'Dairy & Eggs' },
      { id: 'ing-24', name: 'Greek Feta Cheese', amount: 3, unit: 'tbsp (crumbled)', metricAmount: 45, metricUnit: 'g', aisle: 'Dairy & Eggs' },
      { id: 'ing-25', name: 'Fresh Lemon Juice', amount: 1, unit: 'tbsp', metricAmount: 15, metricUnit: 'ml', aisle: 'Produce' },
      { id: 'ing-26', name: 'White Vinegar', amount: 1, unit: 'tbsp', metricAmount: 15, metricUnit: 'ml', aisle: 'Pantry & Spices' },
      { id: 'ing-27', name: 'Microgreens / Radish Sprouts', amount: 0.5, unit: 'cup', metricAmount: 20, metricUnit: 'g', aisle: 'Produce' },
      { id: 'ing-28', name: 'Toasted Pumpkin Seeds (Pepitas)', amount: 1, unit: 'tbsp', metricAmount: 12, metricUnit: 'g', aisle: 'Pantry & Spices' },
      { id: 'ing-29', name: 'Aleppo Pepper / Red Chili Flakes', amount: 0.5, unit: 'tsp', metricAmount: 2, metricUnit: 'g', aisle: 'Pantry & Spices' },
      { id: 'ing-30', name: 'Flaky Maldon Sea Salt', amount: 1, unit: 'pinch', metricAmount: 2, metricUnit: 'g', aisle: 'Pantry & Spices' }
    ],
    instructions: [
      {
        stepNumber: 1,
        title: 'Toast the Bread',
        instruction: 'Drizzle sourdough slices with olive oil and toast on a hot cast iron grill or toaster until crunchy and golden.',
        timerMinutes: 3
      },
      {
        stepNumber: 2,
        title: 'Whip Avocado & Feta',
        instruction: 'In a bowl, mash 1 avocado with crumbled feta, lemon juice, salt, and black pepper until creamy with rustic chunks remaining. Slice the remaining half avocado into thin fans.',
        tip: 'Lemon juice adds zesty brightness and prevents the avocado from browning.'
      },
      {
        stepNumber: 3,
        title: 'Poach the Eggs',
        instruction: 'Bring a pot of water to a gentle simmer with 1 tbsp white vinegar. Swirl water into a whirlpool and gently drop cracked eggs into the center. Poach for 3 minutes for jammy, runny yolks.',
        timerMinutes: 3,
        tip: 'Straining egg whites in a fine mesh sieve before dropping prevents whispy whites.'
      },
      {
        stepNumber: 4,
        title: 'Assemble & Garnish',
        instruction: 'Generously spread whipped avocado-feta over toasted sourdough. Top with avocado fans, the warm poached eggs, microgreens, toasted pepitas, flaky sea salt, and Aleppo chili flakes.',
        timerMinutes: 2
      }
    ],
    substitutions: [
      { original: 'Sourdough', replacement: 'Gluten-free seeded loaf or sweet potato toast', tip: 'Great gluten-free alternative.' },
      { original: 'Poached Eggs', replacement: 'Pan-fried spiced tofu or burrata', tip: 'Wonderful vegan or alternative vegetarian topper.' }
    ],
    chefTips: ['Crack eggs into small ramekins first to gently slide them into the simmering water.']
  },
  {
    id: 'rec-3',
    title: 'Authentic Roman Spaghetti Carbonara',
    subtitle: 'Classic egg yolk, crispy guanciale, pecorino romano & toasted black pepper',
    description: 'The definitive Roman culinary masterpiece made with zero cream. Crispy cured pork jowl tossed with al dente bronze-cut spaghetti in a glossy emulsion of farm fresh egg yolks, sharp Pecorino Romano, and coarse freshly ground black pepper.',
    image: 'https://images.unsplash.com/photo-1612874742237-6526221588e3?auto=format&fit=crop&w=1200&q=80',
    coverImage: 'https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=1600&q=80',
    prepTime: 10,
    cookTime: 15,
    totalTime: 25,
    servings: 3,
    difficulty: 'Medium',
    rating: 4.95,
    reviewCount: 640,
    category: 'Pasta & Grains',
    cuisine: 'Italian',
    dietary: ['High Protein'],
    tags: ['Pasta', 'Italian Classic', 'Carbonara', 'Traditional', 'Quick Comfort'],
    isFeatured: true,
    isTrending: true,
    createdAt: '2026-08-10',
    author: {
      name: 'Chef Marco Bellini',
      avatar: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=200&q=80',
      role: 'Master Pasta Artisan',
      verified: true
    },
    macros: {
      calories: 610,
      protein: 26,
      carbs: 64,
      fat: 28,
      fiber: 3,
      sugar: 2
    },
    ingredients: [
      { id: 'ing-31', name: 'Spaghetti / Bucatini Pasta', amount: 350, unit: 'g', metricAmount: 350, metricUnit: 'g', aisle: 'Grains & Pasta' },
      { id: 'ing-32', name: 'Guanciale (or thick Pancetta)', amount: 150, unit: 'g (cubed)', metricAmount: 150, metricUnit: 'g', aisle: 'Meat & Seafood' },
      { id: 'ing-33', name: 'Fresh Egg Yolks', amount: 4, unit: 'large yolks', metricAmount: 4, metricUnit: 'yolks', aisle: 'Dairy & Eggs' },
      { id: 'ing-34', name: 'Whole Fresh Egg', amount: 1, unit: 'large egg', metricAmount: 1, metricUnit: 'egg', aisle: 'Dairy & Eggs' },
      { id: 'ing-35', name: 'Pecorino Romano DOP (Grated)', amount: 1, unit: 'cup', metricAmount: 90, metricUnit: 'g', aisle: 'Dairy & Eggs' },
      { id: 'ing-36', name: 'Freshly Cracked Black Pepper', amount: 1.5, unit: 'tbsp', metricAmount: 8, metricUnit: 'g', aisle: 'Pantry & Spices' },
      { id: 'ing-37', name: 'Reserved Pasta Cooking Water', amount: 0.5, unit: 'cup', metricAmount: 120, metricUnit: 'ml', aisle: 'Pantry & Spices' }
    ],
    instructions: [
      {
        stepNumber: 1,
        title: 'Crisp the Guanciale',
        instruction: 'In a cold skillet, add cubed guanciale and place over medium heat. Render the pork fat until the pieces are golden and crispy outside, tender inside (around 7-8 minutes). Remove from heat and preserve rendered liquid fat.',
        timerMinutes: 8,
        tip: 'Starting in a cold pan allows maximum fat rendering without burning the meat.'
      },
      {
        stepNumber: 2,
        title: 'Boil Pasta to Al Dente',
        instruction: 'Cook spaghetti in salted boiling water until 1.5 minutes shy of al dente. Reserve 1/2 cup of starchy pasta water before draining.',
        timerMinutes: 9
      },
      {
        stepNumber: 3,
        title: 'Prepare the Carbonara Cream (Carbocrema)',
        instruction: 'In a glass or stainless bowl, whisk 4 yolks, 1 whole egg, grated Pecorino Romano, and 1 tbsp of freshly toasted cracked black pepper into a thick paste. Whisk in 2 tbsp of the rendered warm pork fat.',
        tip: 'Tempering the egg mixture with a touch of warm pork fat prevents eggs from scrambling.'
      },
      {
        stepNumber: 4,
        title: 'Glossy Emulsion Toss',
        instruction: 'Transfer hot pasta straight into the pan with crispy guanciale off the heat. Pour the egg-cheese mixture and a splash of pasta water over the hot pasta, tossing vigorously until an ultra-creamy, glossy sauce coats every strand.',
        timerMinutes: 2,
        tip: 'Never return the pan to direct flame once eggs are added!'
      }
    ],
    substitutions: [
      { original: 'Guanciale', replacement: 'Thick cut pancetta or smoked applewood bacon', tip: 'Very close in flavor and easier to source in local markets.' }
    ],
    chefTips: ['The starch in the pasta water is the secret binder that creates a silky sauce without cream.']
  },
  {
    id: 'rec-4',
    title: 'Honey Chipotle Grilled Chicken Burrito Bowl',
    subtitle: 'Cilantro lime brown rice, charred sweet corn, black beans & guacamole',
    description: 'A vibrant, protein-packed meal prep bowl loaded with juicy chipotle-marinated grilled chicken thigh, fluffy cilantro lime rice, fire-roasted sweet corn, seasoned black beans, pico de gallo, and fresh handmade guacamole.',
    image: 'https://images.unsplash.com/photo-1543339308-43e59d6b73a6?auto=format&fit=crop&w=1200&q=80',
    coverImage: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=1600&q=80',
    prepTime: 15,
    cookTime: 15,
    totalTime: 30,
    servings: 4,
    difficulty: 'Easy',
    rating: 4.88,
    reviewCount: 512,
    category: 'Bowls & Salads',
    cuisine: 'Mexican',
    dietary: ['High Protein', 'Gluten-Free', 'Dairy-Free'],
    tags: ['Meal Prep', 'High Protein', 'Burrito Bowl', 'Chipotle', 'Healthy Lunch'],
    isFeatured: false,
    isTrending: true,
    createdAt: '2026-08-12',
    author: {
      name: 'Chef Carlos Mendez',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
      role: 'Latin Culinary Innovator',
      verified: true
    },
    macros: {
      calories: 540,
      protein: 44,
      carbs: 58,
      fat: 16,
      fiber: 9,
      sugar: 6
    },
    ingredients: [
      { id: 'ing-41', name: 'Boneless Chicken Thighs / Breast', amount: 600, unit: 'g', metricAmount: 600, metricUnit: 'g', aisle: 'Meat & Seafood' },
      { id: 'ing-42', name: 'Chipotle Peppers in Adobo Sauce', amount: 2, unit: 'tbsp (minced)', metricAmount: 30, metricUnit: 'g', aisle: 'Condiments' },
      { id: 'ing-43', name: 'Honey', amount: 1.5, unit: 'tbsp', metricAmount: 25, metricUnit: 'g', aisle: 'Pantry & Spices' },
      { id: 'ing-44', name: 'Cooked Brown Rice / Jasmine Rice', amount: 3, unit: 'cups', metricAmount: 450, metricUnit: 'g', aisle: 'Grains & Pasta' },
      { id: 'ing-45', name: 'Fresh Cilantro', amount: 0.5, unit: 'cup (chopped)', metricAmount: 20, metricUnit: 'g', aisle: 'Produce' },
      { id: 'ing-46', name: 'Fresh Limes', amount: 2, unit: 'whole', metricAmount: 2, metricUnit: 'limes', aisle: 'Produce' },
      { id: 'ing-47', name: 'Black Beans (Rinsed)', amount: 1, unit: 'can (15 oz)', metricAmount: 400, metricUnit: 'g', aisle: 'Pantry & Spices' },
      { id: 'ing-48', name: 'Sweet Corn Kernels (Charred)', amount: 1, unit: 'cup', metricAmount: 150, metricUnit: 'g', aisle: 'Produce' },
      { id: 'ing-49', name: 'Ripe Avocados (Mashed)', amount: 2, unit: 'whole', metricAmount: 300, metricUnit: 'g', aisle: 'Produce' },
      { id: 'ing-50', name: 'Cherry Tomatoes & Red Onion (Diced)', amount: 1, unit: 'cup', metricAmount: 150, metricUnit: 'g', aisle: 'Produce' }
    ],
    instructions: [
      {
        stepNumber: 1,
        title: 'Marinate the Chicken',
        instruction: 'Whisk together chipotle adobo sauce, honey, 1 tbsp olive oil, lime juice, ground cumin, and garlic powder. Coat the chicken thoroughly.',
        timerMinutes: 5
      },
      {
        stepNumber: 2,
        title: 'Grill or Pan-Sear',
        instruction: 'Sear chicken in a cast-iron skillet over medium-high heat for 6-7 minutes per side until charred on the outside and internal temperature reaches 165°F (74°C). Rest for 5 minutes, then slice into bite-sized strips.',
        timerMinutes: 14,
        tip: 'Resting the chicken locks in all the flavorful natural juices.'
      },
      {
        stepNumber: 3,
        title: 'Season Cilantro Lime Rice',
        instruction: 'Toss warm cooked brown rice with finely chopped fresh cilantro, lime juice, and a pinch of salt.',
        timerMinutes: 2
      },
      {
        stepNumber: 4,
        title: 'Build the Fiesta Bowls',
        instruction: 'Divide cilantro lime rice into 4 bowls. Arrange sliced chicken, black beans, charred corn, diced pico de gallo, and a generous scoop of guacamole.',
        timerMinutes: 3
      }
    ],
    substitutions: [
      { original: 'Chicken Thighs', replacement: 'Extra firm pressed tofu or black bean patties', tip: 'Creates a 100% plant-based protein bowl.' }
    ],
    chefTips: ['Char canned or fresh corn kernels in a dry smoking pan for 3 minutes to get that smoky taqueria flavor.']
  },
  {
    id: 'rec-5',
    title: 'Japanese Miso Glazed Black Cod (or Salmon)',
    subtitle: 'Sweet saikyo miso, mirin, sake marinade with steamed edamame rice',
    description: 'Inspired by Nobu’s world-famous dish, silky black cod fillets are marinated in a sweet, savory umami-packed saikyo miso, sake, and mirin glaze, then broiled until caramelized and flaky.',
    image: 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=1200&q=80',
    coverImage: 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=1600&q=80',
    prepTime: 15,
    cookTime: 12,
    totalTime: 27,
    servings: 2,
    difficulty: 'Medium',
    rating: 4.92,
    reviewCount: 380,
    category: 'High Protein',
    cuisine: 'Japanese',
    dietary: ['High Protein', 'Dairy-Free', 'Nut-Free'],
    tags: ['Japanese', 'Miso Glazed', 'Fish', 'Nobu Style', 'Umami'],
    isFeatured: true,
    isTrending: false,
    createdAt: '2026-08-14',
    author: {
      name: 'Chef Kenji Takahashi',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
      role: 'Tokyo Culinary Master',
      verified: true
    },
    macros: {
      calories: 460,
      protein: 38,
      carbs: 22,
      fat: 24,
      fiber: 2,
      sugar: 14
    },
    ingredients: [
      { id: 'ing-51', name: 'Black Cod / Salmon Fillets', amount: 2, unit: 'fillets (7 oz)', metricAmount: 400, metricUnit: 'g', aisle: 'Meat & Seafood' },
      { id: 'ing-52', name: 'White Miso Paste (Shiro Miso)', amount: 3, unit: 'tbsp', metricAmount: 60, metricUnit: 'g', aisle: 'Condiments' },
      { id: 'ing-53', name: 'Mirin (Japanese Sweet Rice Wine)', amount: 2, unit: 'tbsp', metricAmount: 30, metricUnit: 'ml', aisle: 'Condiments' },
      { id: 'ing-54', name: 'Cooking Sake', amount: 2, unit: 'tbsp', metricAmount: 30, metricUnit: 'ml', aisle: 'Condiments' },
      { id: 'ing-55', name: 'Cane Sugar or Honey', amount: 1.5, unit: 'tbsp', metricAmount: 20, metricUnit: 'g', aisle: 'Pantry & Spices' },
      { id: 'ing-56', name: 'Toasted Sesame Oil', amount: 1, unit: 'tsp', metricAmount: 5, metricUnit: 'ml', aisle: 'Condiments' },
      { id: 'ing-57', name: 'Green Onions (Thinly Sliced)', amount: 2, unit: 'stalks', metricAmount: 30, metricUnit: 'g', aisle: 'Produce' }
    ],
    instructions: [
      {
        stepNumber: 1,
        title: 'Whisk the Saikyo Miso Glaze',
        instruction: 'In a small saucepan, bring sake and mirin to a rapid boil for 45 seconds to evaporate alcohol. Whisk in white miso paste and sugar until silky smooth and completely dissolved. Let cool.',
        timerMinutes: 2
      },
      {
        stepNumber: 2,
        title: 'Marinate the Fish',
        instruction: 'Coat fish fillets thoroughly in the miso marinade. Let marinate for at least 30 minutes (or up to 24 hours in the fridge for restaurant intensity).',
        timerMinutes: 30
      },
      {
        stepNumber: 3,
        title: 'Broil to Caramelization',
        instruction: 'Wipe excess marinade from top (to prevent burning). Place fillets on a foil-lined baking sheet and broil under high heat for 8-10 minutes until deeply caramelized with slight charred edges and tender flakes.',
        timerMinutes: 10,
        tip: 'Keep a close eye during broiling since sugar in miso caramelizes quickly!'
      },
      {
        stepNumber: 4,
        title: 'Serve with Scallions',
        instruction: 'Garnish with sliced scallions, toasted sesame seeds, and pickled ginger. Serve alongside warm jasmine rice.',
        timerMinutes: 1
      }
    ],
    substitutions: [
      { original: 'Black Cod', replacement: 'Atlantic Salmon, Halibut, or King Oyster Mushrooms', tip: 'Salmon absorbs the sweet miso glaze with identical broiling times.' }
    ],
    chefTips: ['Use white miso (shiro miso) for a delicate sweet profile rather than darker red miso.']
  },
  {
    id: 'rec-6',
    title: 'Thai Coconut Curry with Crispy Tofu & Bamboo',
    subtitle: 'Aromatic lemongrass, kaffir lime leaves, bell peppers & Thai basil',
    description: 'A soothing, fragrant authentic Thai green curry loaded with golden crispy tofu cubes, tender bamboo shoots, baby corn, and red bell peppers simmered in creamy coconut milk infused with fresh Thai basil.',
    image: 'https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?auto=format&fit=crop&w=1200&q=80',
    coverImage: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=1600&q=80',
    prepTime: 15,
    cookTime: 20,
    totalTime: 35,
    servings: 4,
    difficulty: 'Easy',
    rating: 4.87,
    reviewCount: 290,
    category: 'Plant-Based',
    cuisine: 'Thai',
    dietary: ['Vegan', 'Vegetarian', 'Gluten-Free', 'Dairy-Free'],
    tags: ['Thai Curry', 'Vegan', 'Coconut', 'Comfort Food', 'Spicy'],
    isFeatured: false,
    isTrending: true,
    createdAt: '2026-08-16',
    author: {
      name: 'Chef Siriporn Chai',
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&q=80',
      role: 'Southeast Asian Cuisine Lead',
      verified: true
    },
    macros: {
      calories: 420,
      protein: 18,
      carbs: 24,
      fat: 30,
      fiber: 6,
      sugar: 5
    },
    ingredients: [
      { id: 'ing-61', name: 'Extra Firm Tofu (Pressed & Cubed)', amount: 400, unit: 'g', metricAmount: 400, metricUnit: 'g', aisle: 'Produce' },
      { id: 'ing-62', name: 'Thai Green Curry Paste', amount: 3, unit: 'tbsp', metricAmount: 45, metricUnit: 'g', aisle: 'Condiments' },
      { id: 'ing-63', name: 'Full-Fat Coconut Milk', amount: 1, unit: 'can (14 oz)', metricAmount: 400, metricUnit: 'ml', aisle: 'Pantry & Spices' },
      { id: 'ing-64', name: 'Vegetable Broth', amount: 0.75, unit: 'cup', metricAmount: 180, metricUnit: 'ml', aisle: 'Pantry & Spices' },
      { id: 'ing-65', name: 'Red Bell Pepper (Sliced)', amount: 1, unit: 'large', metricAmount: 150, metricUnit: 'g', aisle: 'Produce' },
      { id: 'ing-66', name: 'Bamboo Shoots & Baby Corn', amount: 1, unit: 'cup', metricAmount: 150, metricUnit: 'g', aisle: 'Pantry & Spices' },
      { id: 'ing-67', name: 'Fresh Thai Basil Leaves', amount: 1, unit: 'cup (packed)', metricAmount: 30, metricUnit: 'g', aisle: 'Produce' },
      { id: 'ing-68', name: 'Coconut Sugar / Brown Sugar', amount: 1, unit: 'tbsp', metricAmount: 15, metricUnit: 'g', aisle: 'Pantry & Spices' },
      { id: 'ing-69', name: 'Soy Sauce or Tamari', amount: 1.5, unit: 'tbsp', metricAmount: 22, metricUnit: 'ml', aisle: 'Condiments' },
      { id: 'ing-70', name: 'Fresh Lime', amount: 1, unit: 'whole', metricAmount: 1, metricUnit: 'lime', aisle: 'Produce' }
    ],
    instructions: [
      {
        stepNumber: 1,
        title: 'Pan Fry Tofu Cubes',
        instruction: 'Toss cubed tofu with cornstarch and a pinch of salt. Pan-fry in coconut oil over medium-high heat for 6-8 minutes until golden and crunchy on all sides. Set aside.',
        timerMinutes: 8
      },
      {
        stepNumber: 2,
        title: 'Fry the Curry Paste',
        instruction: 'In a deep wok or pot, heat 1 tbsp coconut oil over medium heat. Fry green curry paste for 1-2 minutes until aromatic and oils start to separate.',
        timerMinutes: 2
      },
      {
        stepNumber: 3,
        title: 'Simmer the Curry',
        instruction: 'Pour in full-fat coconut milk and vegetable broth. Add sliced bell peppers, bamboo shoots, and baby corn. Simmer gently for 8 minutes until veggies are tender-crisp.',
        timerMinutes: 8
      },
      {
        stepNumber: 4,
        title: 'Finish & Garnish',
        instruction: 'Stir in crispy tofu, soy sauce, coconut sugar, and fresh lime juice. Turn off heat and fold in fresh Thai basil leaves. Serve with fragrant jasmine rice.',
        timerMinutes: 2
      }
    ],
    substitutions: [
      { original: 'Tofu', replacement: 'Chicken breast, shrimp, or chickpeas', tip: 'All work splendidly with the fragrant green curry base.' }
    ],
    chefTips: ['Do not boil the curry vigorously after adding coconut milk to prevent sauce curdling.']
  },
  {
    id: 'rec-7',
    title: 'Decadent Molten Dark Chocolate Lava Cakes',
    subtitle: '70% Valrhona dark chocolate, gooey center, fresh raspberries & vanilla bean gelato',
    description: 'Individual warm chocolate cakes with delicate crisp edges and a flowing warm molten chocolate center. Easy to whip up in 20 minutes for the ultimate dessert experience.',
    image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=1200&q=80',
    coverImage: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=1600&q=80',
    prepTime: 10,
    cookTime: 12,
    totalTime: 22,
    servings: 4,
    difficulty: 'Medium',
    rating: 4.96,
    reviewCount: 890,
    category: 'Desserts',
    cuisine: 'French',
    dietary: ['Vegetarian', 'Quick & Easy'],
    tags: ['Chocolate', 'Lava Cake', 'Baking', 'Date Night', 'Dessert'],
    isFeatured: true,
    isTrending: true,
    createdAt: '2026-08-18',
    author: {
      name: 'Chef Amélie Laurent',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80',
      role: 'Master French Chocolatier',
      verified: true
    },
    macros: {
      calories: 410,
      protein: 7,
      carbs: 42,
      fat: 26,
      fiber: 4,
      sugar: 28
    },
    ingredients: [
      { id: 'ing-71', name: '70% Bittersweet Dark Chocolate', amount: 170, unit: 'g (chopped)', metricAmount: 170, metricUnit: 'g', aisle: 'Baking' },
      { id: 'ing-72', name: 'Unsalted Butter', amount: 0.5, unit: 'cup (1 stick)', metricAmount: 115, metricUnit: 'g', aisle: 'Dairy & Eggs' },
      { id: 'ing-73', name: 'Powdered Sugar', amount: 0.5, unit: 'cup', metricAmount: 60, metricUnit: 'g', aisle: 'Baking' },
      { id: 'ing-74', name: 'Large Eggs', amount: 2, unit: 'whole', metricAmount: 2, metricUnit: 'eggs', aisle: 'Dairy & Eggs' },
      { id: 'ing-75', name: 'Large Egg Yolks', amount: 2, unit: 'yolks', metricAmount: 2, metricUnit: 'yolks', aisle: 'Dairy & Eggs' },
      { id: 'ing-76', name: 'All-Purpose Flour (or 1:1 GF Flour)', amount: 6, unit: 'tbsp', metricAmount: 45, metricUnit: 'g', aisle: 'Baking' },
      { id: 'ing-77', name: 'Pure Vanilla Extract', amount: 1, unit: 'tsp', metricAmount: 5, metricUnit: 'ml', aisle: 'Baking' },
      { id: 'ing-78', name: 'Espresso Powder', amount: 0.5, unit: 'tsp', metricAmount: 2, metricUnit: 'g', aisle: 'Baking' },
      { id: 'ing-79', name: 'Fresh Raspberries & Powdered Sugar for Dusting', amount: 1, unit: 'cup', metricAmount: 100, metricUnit: 'g', aisle: 'Produce' }
    ],
    instructions: [
      {
        stepNumber: 1,
        title: 'Prep Ramekins & Oven',
        instruction: 'Preheat oven to 425°F (220°C). Butter four 6-oz ramekins thoroughly and dust inside with cocoa powder.',
        tip: 'Cocoa powder helps the cakes release effortlessly and leaves a gorgeous chocolate finish.'
      },
      {
        stepNumber: 2,
        title: 'Melt Chocolate & Butter',
        instruction: 'Melt chopped dark chocolate and butter together in a heatproof bowl set over simmering water (or microwave in 20-sec intervals). Whisk until smooth and glossy.',
        timerMinutes: 3
      },
      {
        stepNumber: 3,
        title: 'Whisk Batter',
        instruction: 'Whisk in powdered sugar until blended. Add whole eggs, egg yolks, vanilla extract, and espresso powder. Gently fold in flour until just combined.',
        timerMinutes: 2
      },
      {
        stepNumber: 4,
        title: 'Bake to Molten Perfection',
        instruction: 'Divide batter evenly between ramekins. Bake for exactly 12-13 minutes until the sides are firm and set, but the center is still soft and jiggly.',
        timerMinutes: 12,
        tip: 'Overbaking will result in a standard brownie rather than a molten center.'
      },
      {
        stepNumber: 5,
        title: 'Invert & Serve',
        instruction: 'Let cool for 1 minute. Run a thin knife around edges and invert onto plates. Dust with powdered sugar, top with fresh raspberries and vanilla gelato.',
        timerMinutes: 1
      }
    ],
    substitutions: [
      { original: 'All-Purpose Flour', replacement: '1:1 Gluten-Free Bob’s Red Mill flour', tip: 'Bakes into identical molten texture with zero gluten.' }
    ],
    chefTips: ['Make the batter hours ahead and refrigerate in ramekins; simply bake when guests are ready for dessert!']
  },
  {
    id: 'rec-8',
    title: 'Mediterranean Lemon Herb Orzo Salad',
    subtitle: 'Persian cucumbers, kalamata olives, marinated chickpeas, dill & feta',
    description: 'A refreshing 20-minute Mediterranean grain salad packed with al dente orzo pasta, crisp cucumbers, sweet cherry tomatoes, rich kalamata olives, protein-rich chickpeas, creamy sheep’s milk feta, and a bright lemon-oregano vinaigrette.',
    image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=1200&q=80',
    coverImage: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=1600&q=80',
    prepTime: 12,
    cookTime: 8,
    totalTime: 20,
    servings: 4,
    difficulty: 'Easy',
    rating: 4.84,
    reviewCount: 220,
    category: 'Healthy',
    cuisine: 'Mediterranean',
    dietary: ['Vegetarian', 'Quick & Easy', 'High Protein'],
    tags: ['Salad', 'Mediterranean', 'Meal Prep', 'Quick Lunch', 'Summer'],
    isFeatured: false,
    isTrending: true,
    createdAt: '2026-08-20',
    author: {
      name: 'Chef Zoe Vassilakis',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
      role: 'Mediterranean Wellness Chef',
      verified: true
    },
    macros: {
      calories: 360,
      protein: 14,
      carbs: 48,
      fat: 14,
      fiber: 7,
      sugar: 4
    },
    ingredients: [
      { id: 'ing-81', name: 'Orzo Pasta', amount: 250, unit: 'g', metricAmount: 250, metricUnit: 'g', aisle: 'Grains & Pasta' },
      { id: 'ing-82', name: 'Persian Cucumbers (Diced)', amount: 2, unit: 'whole', metricAmount: 180, metricUnit: 'g', aisle: 'Produce' },
      { id: 'ing-83', name: 'Cherry Tomatoes (Halved)', amount: 1.5, unit: 'cups', metricAmount: 220, metricUnit: 'g', aisle: 'Produce' },
      { id: 'ing-84', name: 'Kalamata Olives (Pitted & Sliced)', amount: 0.5, unit: 'cup', metricAmount: 80, metricUnit: 'g', aisle: 'Pantry & Spices' },
      { id: 'ing-85', name: 'Chickpeas (Rinsed & Drained)', amount: 1, unit: 'can (15 oz)', metricAmount: 400, metricUnit: 'g', aisle: 'Pantry & Spices' },
      { id: 'ing-86', name: 'Greek Feta Cheese (Crumbled)', amount: 0.75, unit: 'cup', metricAmount: 100, metricUnit: 'g', aisle: 'Dairy & Eggs' },
      { id: 'ing-87', name: 'Fresh Dill & Mint (Chopped)', amount: 0.5, unit: 'cup', metricAmount: 20, metricUnit: 'g', aisle: 'Produce' },
      { id: 'ing-88', name: 'Extra Virgin Olive Oil', amount: 3, unit: 'tbsp', metricAmount: 45, metricUnit: 'ml', aisle: 'Pantry & Spices' },
      { id: 'ing-89', name: 'Fresh Lemon Juice & Zest', amount: 2, unit: 'tbsp', metricAmount: 30, metricUnit: 'ml', aisle: 'Produce' }
    ],
    instructions: [
      {
        stepNumber: 1,
        title: 'Cook & Cool Orzo',
        instruction: 'Cook orzo pasta in salted boiling water for 8 minutes until al dente. Drain and rinse under cold water to stop cooking; toss with 1 tsp olive oil.',
        timerMinutes: 8
      },
      {
        stepNumber: 2,
        title: 'Whisk Lemon Vinaigrette',
        instruction: 'In a large salad bowl, whisk together extra virgin olive oil, fresh lemon juice, lemon zest, minced garlic, dried oregano, salt, and black pepper.',
        timerMinutes: 2
      },
      {
        stepNumber: 3,
        title: 'Toss & Marinate',
        instruction: 'Add cooked orzo, diced cucumbers, halved cherry tomatoes, sliced olives, drained chickpeas, fresh herbs, and crumbled feta. Toss well and chill for 10 minutes before serving.',
        timerMinutes: 10
      }
    ],
    substitutions: [
      { original: 'Feta Cheese', replacement: 'Vegan almond-based feta or diced avocado', tip: 'Keeps the dish 100% plant-based.' }
    ],
    chefTips: ['Gets even tastier after sitting in the fridge overnight as orzo absorbs the herbal dressing.']
  },
  {
    id: 'rec-9',
    title: 'Crispy Garlic Butter Smash Burger',
    subtitle: 'Double beef patties, secret special sauce, caramelized onions & brioche bun',
    description: 'Juicy, lacy-edged smashed beef patties seared on screaming hot cast iron, topped with gooey melted American cheese, sweet buttery caramelized onions, and house special sauce in a toasted brioche bun.',
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=1200&q=80',
    coverImage: 'https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=1600&q=80',
    prepTime: 15,
    cookTime: 10,
    totalTime: 25,
    servings: 2,
    difficulty: 'Easy',
    rating: 4.94,
    reviewCount: 780,
    category: 'Quick Meals',
    cuisine: 'American',
    dietary: ['High Protein', 'Quick & Easy'],
    tags: ['Smash Burger', 'Comfort Food', 'Burgers', 'Cheat Meal', 'Double Patty'],
    isFeatured: false,
    isTrending: true,
    createdAt: '2026-08-22',
    author: {
      name: 'Chef Marcus Brody',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
      role: 'Street Food Maestro',
      verified: true
    },
    macros: {
      calories: 680,
      protein: 46,
      carbs: 40,
      fat: 38,
      fiber: 2,
      sugar: 7
    },
    ingredients: [
      { id: 'ing-91', name: '80/20 Ground Beef Chuck', amount: 340, unit: 'g (divided into 4 balls)', metricAmount: 340, metricUnit: 'g', aisle: 'Meat & Seafood' },
      { id: 'ing-92', name: 'American Cheese / Sharp Cheddar', amount: 4, unit: 'slices', metricAmount: 4, metricUnit: 'slices', aisle: 'Dairy & Eggs' },
      { id: 'ing-93', name: 'Brioche Burger Buns', amount: 2, unit: 'whole', metricAmount: 2, metricUnit: 'buns', aisle: 'Bakery' },
      { id: 'ing-94', name: 'Yellow Onion (Thinly Shaved)', amount: 1, unit: 'medium', metricAmount: 120, metricUnit: 'g', aisle: 'Produce' },
      { id: 'ing-95', name: 'Mayonnaise, Mustard & Relish (Special Sauce)', amount: 3, unit: 'tbsp', metricAmount: 45, metricUnit: 'g', aisle: 'Condiments' },
      { id: 'ing-96', name: 'Dill Pickle Slices', amount: 6, unit: 'chips', metricAmount: 30, metricUnit: 'g', aisle: 'Condiments' }
    ],
    instructions: [
      {
        stepNumber: 1,
        title: 'Toast Buns with Butter',
        instruction: 'Butter the brioche cut sides and toast in a hot skillet for 2 minutes until deep golden. Set aside.',
        timerMinutes: 2
      },
      {
        stepNumber: 2,
        title: 'Smash the Patties',
        instruction: 'Heat cast iron skillet until smoking hot. Place beef balls onto dry skillet. Top with shaved onions and smash down firmly with a sturdy spatula into ultra-thin patties with lacy edges. Season with salt and pepper.',
        timerMinutes: 2,
        tip: 'Pressing firmly during the first 30 seconds creates that signature crispy caramelized crust.'
      },
      {
        stepNumber: 3,
        title: 'Flip & Melt Cheese',
        instruction: 'Flip patties after 2.5 minutes. Immediately place cheese slices on top. Cook for 1 more minute until cheese is completely melted.',
        timerMinutes: 2
      },
      {
        stepNumber: 4,
        title: 'Assemble the Double Burgers',
        instruction: 'Spread special sauce on bottom and top buns. Layer pickles, stack two cheesy smashed patties together, cap with the top bun, and enjoy!',
        timerMinutes: 1
      }
    ],
    substitutions: [
      { original: 'Ground Beef', replacement: 'Plant-based Impossible/Beyond burger meat', tip: 'Smashes cleanly with identical timing.' }
    ],
    chefTips: ['Keep the beef balls chilled until the moment they hit the sizzling pan for maximum sear.']
  },
  {
    id: 'rec-10',
    title: 'Fluffy Japanese Soufflé Pancakes',
    subtitle: 'Cloud-like towering pancakes with whipped butter & pure maple syrup',
    description: 'Ultra-airy, delicate Japanese soufflé pancakes that jiggle on your plate. Made with stiff meringue folds and gently steam-cooked in covered pans for a breakfast sensation.',
    image: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?auto=format&fit=crop&w=1200&q=80',
    coverImage: 'https://images.unsplash.com/photo-1528207776546-365bb710ee93?auto=format&fit=crop&w=1600&q=80',
    prepTime: 15,
    cookTime: 12,
    totalTime: 27,
    servings: 2,
    difficulty: 'Master',
    rating: 4.91,
    reviewCount: 410,
    category: 'Breakfast',
    cuisine: 'Japanese',
    dietary: ['Vegetarian'],
    tags: ['Pancakes', 'Souffle', 'Breakfast', 'Fluffy', 'Brunch'],
    isFeatured: false,
    isTrending: false,
    createdAt: '2026-08-23',
    author: {
      name: 'Chef Aoi Tanaka',
      avatar: 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&w=200&q=80',
      role: 'Tokyo Patissier',
      verified: true
    },
    macros: {
      calories: 340,
      protein: 12,
      carbs: 44,
      fat: 12,
      fiber: 1,
      sugar: 18
    },
    ingredients: [
      { id: 'ing-101', name: 'Egg Yolks', amount: 2, unit: 'large', metricAmount: 2, metricUnit: 'yolks', aisle: 'Dairy & Eggs' },
      { id: 'ing-102', name: 'Egg Whites (Chilled)', amount: 3, unit: 'large', metricAmount: 3, metricUnit: 'whites', aisle: 'Dairy & Eggs' },
      { id: 'ing-103', name: 'Granulated Sugar', amount: 2.5, unit: 'tbsp', metricAmount: 35, metricUnit: 'g', aisle: 'Baking' },
      { id: 'ing-104', name: 'Whole Milk', amount: 2, unit: 'tbsp', metricAmount: 30, metricUnit: 'ml', aisle: 'Dairy & Eggs' },
      { id: 'ing-105', name: 'Cake Flour (Sifted)', amount: 4, unit: 'tbsp', metricAmount: 35, metricUnit: 'g', aisle: 'Baking' },
      { id: 'ing-106', name: 'Baking Powder', amount: 0.5, unit: 'tsp', metricAmount: 2, metricUnit: 'g', aisle: 'Baking' },
      { id: 'ing-107', name: 'Pure Vanilla Extract', amount: 1, unit: 'tsp', metricAmount: 5, metricUnit: 'ml', aisle: 'Baking' },
      { id: 'ing-108', name: 'Pure Maple Syrup & Fresh Berries', amount: 3, unit: 'tbsp', metricAmount: 45, metricUnit: 'ml', aisle: 'Pantry & Spices' }
    ],
    instructions: [
      {
        stepNumber: 1,
        title: 'Whisk Yolk Base',
        instruction: 'Whisk egg yolks, milk, and vanilla in a bowl until frothy. Sift in cake flour and baking powder; whisk gently into a smooth paste.',
        timerMinutes: 2
      },
      {
        stepNumber: 2,
        title: 'Beat Stiff Peak Meringue',
        instruction: 'In a separate clean glass bowl, whip cold egg whites with an electric whisk, gradually adding sugar in 3 batches until glossy, stiff peaks form.',
        timerMinutes: 4,
        tip: 'Stiff peaks are essential so the batter holds its towering shape on the griddle.'
      },
      {
        stepNumber: 3,
        title: 'Gentle Folding',
        instruction: 'Fold 1/3 of the meringue into the yolk mixture to lighten it, then gently fold in remaining meringue with a spatula in broad strokes without deflating.',
        timerMinutes: 2
      },
      {
        stepNumber: 4,
        title: 'Steam Cook on Low Heat',
        instruction: 'Grease a non-stick skillet and set to lowest heat. Scoop towering scoops of batter, add 1 tsp water to the pan, cover with lid, and steam for 5 minutes. Add another scoop on top, flip gently, add 1 tsp water, cover, and steam 5 more minutes.',
        timerMinutes: 10,
        tip: 'The trapped steam gently cooks the interior while keeping it cloud-soft.'
      }
    ],
    substitutions: [
      { original: 'Cake Flour', replacement: 'All-purpose flour + cornstarch (3:1 ratio)', tip: 'Mimics the low protein content of cake flour.' }
    ],
    chefTips: ['Cook on the lowest possible flame to ensure the centers set without burning the bottoms.']
  },
  {
    id: 'rec-11',
    title: 'Cozy Tuscan White Bean & Kale Ribollita Soup',
    subtitle: 'Creamy cannellini beans, lacinato kale, parmesan rind & garlic herb croutons',
    description: 'A deeply comforting traditional Tuscan stew made with simmering cannellini beans, earthy lacinato kale, sweet carrots, San Marzano tomatoes, rosemary, and torn day-old sourdough infused with parmesan broth.',
    image: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&w=1200&q=80',
    coverImage: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&w=1600&q=80',
    prepTime: 15,
    cookTime: 25,
    totalTime: 40,
    servings: 4,
    difficulty: 'Easy',
    rating: 4.89,
    reviewCount: 340,
    category: 'Soups & Stews',
    cuisine: 'Italian',
    dietary: ['Vegetarian', 'High Protein', 'Low Carb'],
    tags: ['Soup', 'Comfort Food', 'Beans', 'Tuscan', 'Healthy Dinner'],
    isFeatured: false,
    isTrending: false,
    createdAt: '2026-08-24',
    author: {
      name: 'Chef Elena Rossi',
      avatar: 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&w=200&q=80',
      role: 'Executive Chef & Food Stylist',
      verified: true
    },
    macros: {
      calories: 340,
      protein: 16,
      carbs: 52,
      fat: 9,
      fiber: 12,
      sugar: 6
    },
    ingredients: [
      { id: 'ing-111', name: 'Cannellini White Beans (Rinsed)', amount: 2, unit: 'cans (15 oz)', metricAmount: 800, metricUnit: 'g', aisle: 'Pantry & Spices' },
      { id: 'ing-112', name: 'Lacinato Tuscan Kale (Stemmed & Chopped)', amount: 1, unit: 'bunch', metricAmount: 200, metricUnit: 'g', aisle: 'Produce' },
      { id: 'ing-113', name: 'Carrot, Celery & Yellow Onion (Diced)', amount: 2, unit: 'cups', metricAmount: 250, metricUnit: 'g', aisle: 'Produce' },
      { id: 'ing-114', name: 'Garlic Cloves (Minced)', amount: 4, unit: 'cloves', metricAmount: 4, metricUnit: 'cloves', aisle: 'Produce' },
      { id: 'ing-115', name: 'San Marzano Crushed Tomatoes', amount: 1, unit: 'can (14 oz)', metricAmount: 400, metricUnit: 'g', aisle: 'Pantry & Spices' },
      { id: 'ing-116', name: 'Vegetable or Chicken Broth', amount: 4, unit: 'cups', metricAmount: 960, metricUnit: 'ml', aisle: 'Pantry & Spices' },
      { id: 'ing-117', name: 'Parmesan Cheese Rind', amount: 1, unit: 'piece', metricAmount: 1, metricUnit: 'rind', aisle: 'Dairy & Eggs' },
      { id: 'ing-118', name: 'Extra Virgin Olive Oil', amount: 2, unit: 'tbsp', metricAmount: 30, metricUnit: 'ml', aisle: 'Pantry & Spices' }
    ],
    instructions: [
      {
        stepNumber: 1,
        title: 'Sauté Soffritto Base',
        instruction: 'Heat olive oil in a Dutch oven over medium heat. Sauté diced carrot, celery, onion, and garlic with a pinch of sea salt for 7 minutes until softened.',
        timerMinutes: 7
      },
      {
        stepNumber: 2,
        title: 'Simmer Broth & Beans',
        instruction: 'Add crushed tomatoes, broth, parmesan rind, and half the cannellini beans. Mash the remaining half of the beans with a fork before adding to thicken the soup naturally. Simmer for 15 minutes.',
        timerMinutes: 15,
        tip: 'Mashing some beans creates a luscious, hearty texture without adding flour.'
      },
      {
        stepNumber: 3,
        title: 'Add Kale & Finish',
        instruction: 'Stir in chopped Tuscan kale and simmer for 5 more minutes until tender. Discard parmesan rind, ladle into warm bowls, and finish with a drizzle of robust olive oil and fresh grated cheese.',
        timerMinutes: 5
      }
    ],
    substitutions: [
      { original: 'Cannellini Beans', replacement: 'Great Northern beans or chickpeas', tip: 'Provides identical creamy texture and protein content.' }
    ],
    chefTips: ['Save parmesan cheese rinds in a freezer bag to enrich all your future soups and sauces.']
  },
  {
    id: 'rec-12',
    title: 'Crispy Lemon Pepper Air Fryer Wings',
    subtitle: 'Ultra-crunchy skin, clarified lemon pepper butter & creamy ranch',
    description: 'Juicy on the inside and extraordinarily crunchy on the outside without deep frying. Tossed in a zesty, buttery lemon pepper glaze and served with homemade herb ranch.',
    image: 'https://images.unsplash.com/photo-1567620832903-9fc6debc209f?auto=format&fit=crop&w=1200&q=80',
    coverImage: 'https://images.unsplash.com/photo-1527477265882-930424561028?auto=format&fit=crop&w=1600&q=80',
    prepTime: 10,
    cookTime: 20,
    totalTime: 30,
    servings: 3,
    difficulty: 'Easy',
    rating: 4.93,
    reviewCount: 560,
    category: 'High Protein',
    cuisine: 'American',
    dietary: ['High Protein', 'Keto', 'Gluten-Free', 'Quick & Easy'],
    tags: ['Chicken Wings', 'Air Fryer', 'Keto', 'Game Day', 'Crispy'],
    isFeatured: false,
    isTrending: true,
    createdAt: '2026-08-25',
    author: {
      name: 'Chef Marcus Brody',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
      role: 'Street Food Maestro',
      verified: true
    },
    macros: {
      calories: 490,
      protein: 45,
      carbs: 2,
      fat: 34,
      fiber: 0,
      sugar: 0
    },
    ingredients: [
      { id: 'ing-121', name: 'Chicken Wings (Flats & Drumettes)', amount: 900, unit: 'g (approx 16 wings)', metricAmount: 900, metricUnit: 'g', aisle: 'Meat & Seafood' },
      { id: 'ing-122', name: 'Baking Powder (Aluminum-Free)', amount: 1, unit: 'tbsp', metricAmount: 12, metricUnit: 'g', aisle: 'Baking' },
      { id: 'ing-123', name: 'Garlic Powder & Onion Powder', amount: 1, unit: 'tsp', metricAmount: 5, metricUnit: 'g', aisle: 'Pantry & Spices' },
      { id: 'ing-124', name: 'Unsalted Butter (Melted)', amount: 3, unit: 'tbsp', metricAmount: 45, metricUnit: 'g', aisle: 'Dairy & Eggs' },
      { id: 'ing-125', name: 'Lemon Pepper Seasoning', amount: 1.5, unit: 'tbsp', metricAmount: 15, metricUnit: 'g', aisle: 'Pantry & Spices' },
      { id: 'ing-126', name: 'Fresh Lemon Zest', amount: 1, unit: 'tsp', metricAmount: 3, metricUnit: 'g', aisle: 'Produce' }
    ],
    instructions: [
      {
        stepNumber: 1,
        title: 'Toss with Baking Powder',
        instruction: 'Thoroughly pat chicken wings bone-dry with paper towels. Toss with aluminum-free baking powder, garlic powder, and 1/2 tsp salt.',
        tip: 'Baking powder alters the skin surface pH, causing tiny bubbles to form that bake into glass-like crunch.'
      },
      {
        stepNumber: 2,
        title: 'Air Fry to Crispy Gold',
        instruction: 'Arrange wings in a single layer in the air fryer basket at 380°F (195°C) for 15 minutes, flipping halfway. Increase temp to 400°F (205°C) for 5 final minutes for extreme crispiness.',
        timerMinutes: 20
      },
      {
        stepNumber: 3,
        title: 'Toss in Warm Glaze',
        instruction: 'Whisk melted butter, lemon pepper seasoning, and fresh lemon zest in a large mixing bowl. Add hot wings directly and toss until glistening.',
        timerMinutes: 1
      }
    ],
    substitutions: [
      { original: 'Chicken Wings', replacement: 'Crispy cauliflower florets', tip: 'Delicious vegetarian alternative; air fry at 390°F for 14 minutes.' }
    ],
    chefTips: ['Ensure you use baking powder, NOT baking soda!']
  }
];

export const PANTRY_COMMON_INGREDIENTS = [
  'Garlic', 'Olive Oil', 'Butter', 'Lemon', 'Eggs', 'Chicken Breast', 'Salmon', 
  'Avocado', 'Pasta', 'Heavy Cream', 'Parmesan', 'Baby Spinach', 'Cherry Tomatoes', 
  'Black Beans', 'Brown Rice', 'Tofu', 'Soy Sauce', 'Sourdough', 'Flour', 'Dark Chocolate'
];
