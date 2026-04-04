export const quickMeals = [
  {
    id: 'm-001',
    name: 'Peanut Butter Banana Wrap',
    prepTime: 3,
    tag: 'No heat required',
    description: 'One banana, two tablespoons peanut butter, a tortilla. Roll it. Done.',
    why: 'Potassium and protein. Steady energy that won\'t crash you an hour later.',
    ingredients: ['1 tortilla', '2 tbsp peanut butter', '1 banana'],
  },
  {
    id: 'm-002',
    name: 'Yogurt Power Bowl',
    prepTime: 2,
    tag: 'Under 2 minutes',
    description: 'Greek yogurt, frozen berries thawed for 30 seconds, a handful of granola.',
    why: 'Protein and probiotics. Good for your gut and your energy.',
    ingredients: ['1 cup Greek yogurt', 'Handful frozen berries', 'Handful granola'],
  },
  {
    id: 'm-003',
    name: 'Egg & Avocado Toast',
    prepTime: 5,
    tag: '5 minutes',
    description: 'Two eggs any style, half an avocado mashed on toast. Salt and done.',
    why: 'Healthy fats and protein equal sustained energy. This is the formula.',
    ingredients: ['2 eggs', '½ avocado', '1-2 slices of bread', 'Salt'],
  },
  {
    id: 'm-004',
    name: 'The Emergency Snack Box',
    prepTime: 1,
    tag: 'No cooking ever',
    description: 'Almonds, an apple, and a slice of cheese. Assemble anywhere. Works in a parking lot.',
    why: 'Fat, fiber, and protein in one go. The trifecta that holds you for hours.',
    ingredients: ['Handful of almonds', '1 apple', '1-2 slices cheese'],
  },
  {
    id: 'm-005',
    name: 'Nut Butter Rice Cake Stack',
    prepTime: 2,
    tag: 'One hand friendly',
    description: 'Two rice cakes, almond or peanut butter, banana slices on top.',
    why: 'Light but filling. Good carbs with enough fat to keep you going.',
    ingredients: ['2 rice cakes', '2 tbsp nut butter', '½ banana'],
  },
];

export const hydrationData = {
  dailyGoal: 8,
  unit: 'glasses',
  tips: [
    'Keep a water bottle in every room where you spend time with your baby.',
    'Drink a glass of water every time you feed or nurse.',
    'Add lemon, mint, or cucumber if plain water feels like a chore right now.',
    'Three checkpoints: 8am, noon, 4pm. Three glasses. That\'s a real start.',
    'Herbal tea counts. Broth counts. You have more options than you think.',
  ],
  reminders: [
    { time: 'Morning', cue: 'Before your first coffee', note: 'One glass of water first. Then coffee.' },
    { time: 'Midday', cue: 'At every feed or nap transition', note: 'If baby drinks, you drink.' },
    { time: 'Afternoon', cue: 'Around 3-4pm', note: 'The slump is often dehydration.' },
    { time: 'Evening', cue: 'With dinner', note: 'Don\'t skip this one — you\'ll feel it overnight.' },
  ],
};

export const energyTips = [
  {
    id: 'e-001',
    title: 'The 2pm Wall',
    emoji: '⏰',
    body: 'That afternoon crash is real and it\'s predictable. A 10-minute walk outside does more than another coffee — the light and movement reset your cortisol without the crash that follows.',
    action: 'Next 2pm: try a 10-minute walk before reaching for caffeine.',
  },
  {
    id: 'e-002',
    title: 'Morning Momentum',
    emoji: '🌅',
    body: 'Eating within 90 minutes of waking stabilizes blood sugar and prevents the late-morning crash most parents know too well. It doesn\'t need to be much — even a banana and peanut butter counts.',
    action: 'Keep something grab-able on the counter tonight.',
  },
  {
    id: 'e-003',
    title: 'Movement Snacks',
    emoji: '⚡',
    body: '5 minutes of movement every 2 hours beats one 30-minute block for sustained energy throughout the day. That\'s the whole idea behind WellParent\'s design.',
    action: 'One movement snack today. That\'s all.',
  },
  {
    id: 'e-004',
    title: 'Sleep Debt Reality',
    emoji: '😴',
    body: 'You can\'t fully "catch up" on sleep, but two nights of 7+ hours starts reversing the cognitive fog most parents carry. When there\'s a window to sleep, take it.',
    action: 'One thing to drop tonight to get to bed 30 minutes earlier.',
  },
  {
    id: 'e-005',
    title: 'Protein at Every Meal',
    emoji: '🥚',
    body: 'Protein slows the absorption of carbs, which means more stable energy and fewer crashes. It doesn\'t have to be complicated — eggs, yogurt, nuts, cheese all count.',
    action: 'Add one protein source to your next meal.',
  },
];
