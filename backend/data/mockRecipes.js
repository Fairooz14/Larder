// A small built-in recipe dataset so the app works immediately with zero
// setup. Once a real SPOONACULAR_API_KEY is set in backend/.env, the app
// automatically switches to live results from the Spoonacular API instead.

function img(seed, bg, fg) {
  return `https://placehold.co/640x480/${bg}/${fg}?text=${encodeURIComponent(seed)}&font=playfair-display`;
}

const CHERRY = "75070C";
const OLIVE = "4F6815";
const BUTTER = "FFEDAB";
const OAT = "F0E6DA";

export const mockRecipes = [
  {
    id: "mock-1",
    title: "Garlic Butter Rice",
    image: img("Garlic Butter Rice", OLIVE, BUTTER),
    readyInMinutes: 25,
    servings: 4,
    ingredients: ["rice", "butter", "garlic", "onion", "salt", "black pepper"],
    instructions: [
      "Rinse the rice until the water runs mostly clear.",
      "Melt the butter in a pot over medium heat, add the chopped onion and garlic, cook until fragrant.",
      "Add the rice and stir for a minute to coat it in the butter.",
      "Add water, salt, and pepper, bring to a boil, then cover and simmer on low for 15 minutes.",
      "Rest off the heat for 5 minutes, fluff with a fork, and serve.",
    ],
  },
  {
    id: "mock-2",
    title: "Tomato Basil Pasta",
    image: img("Tomato Basil Pasta", CHERRY, OAT),
    readyInMinutes: 30,
    servings: 3,
    ingredients: ["pasta", "tomato", "garlic", "olive oil", "basil", "parmesan", "salt"],
    instructions: [
      "Cook the pasta in salted boiling water until al dente, reserve a cup of the pasta water.",
      "Warm olive oil in a pan, add sliced garlic, cook until golden.",
      "Add chopped tomatoes and a splash of the pasta water, simmer until it breaks down into a sauce.",
      "Toss in the drained pasta and torn basil leaves, coating everything well.",
      "Finish with grated parmesan and a crack of black pepper.",
    ],
  },
  {
    id: "mock-3",
    title: "Spinach & Egg Skillet",
    image: img("Spinach Egg Skillet", OLIVE, OAT),
    readyInMinutes: 15,
    servings: 2,
    ingredients: ["egg", "spinach", "garlic", "butter", "salt", "black pepper", "bread"],
    instructions: [
      "Melt butter in a skillet, add chopped garlic and cook until fragrant.",
      "Add spinach in batches, letting it wilt down.",
      "Make two wells in the spinach, crack in the eggs, and cover the pan until the whites set.",
      "Season with salt and pepper, serve straight from the skillet with toasted bread.",
    ],
  },
  {
    id: "mock-4",
    title: "Lemon Chickpea Salad",
    image: img("Lemon Chickpea Salad", BUTTER, CHERRY),
    readyInMinutes: 10,
    servings: 2,
    ingredients: ["chickpeas", "lemon", "olive oil", "onion", "salt", "black pepper", "parsley"],
    instructions: [
      "Drain and rinse the chickpeas.",
      "Whisk lemon juice, olive oil, salt, and pepper together in a bowl.",
      "Add the chickpeas, thinly sliced onion, and chopped parsley, toss well.",
      "Let it sit for 10 minutes before serving so the flavors settle in.",
    ],
  },
  {
    id: "mock-5",
    title: "Cheesy Baked Potatoes",
    image: img("Cheesy Baked Potatoes", CHERRY, BUTTER),
    readyInMinutes: 55,
    servings: 4,
    ingredients: ["potato", "cheese", "butter", "salt", "black pepper", "onion"],
    instructions: [
      "Prick the potatoes and bake at 200°C (400°F) for about 45 minutes, until tender.",
      "Split them open, fluff the inside with a fork, and add a knob of butter.",
      "Top with grated cheese and chopped onion, return to the oven until the cheese melts.",
      "Season with salt and pepper before serving.",
    ],
  },
  {
    id: "mock-6",
    title: "Chicken & Rice One-Pot",
    image: img("Chicken Rice One Pot", OLIVE, BUTTER),
    readyInMinutes: 40,
    servings: 4,
    ingredients: ["chicken", "rice", "onion", "garlic", "butter", "salt", "black pepper"],
    instructions: [
      "Season the chicken with salt and pepper, sear in butter until golden, then set aside.",
      "In the same pot, cook chopped onion and garlic until soft.",
      "Add the rice and stir to coat, then add water and bring to a simmer.",
      "Nestle the chicken back into the pot, cover, and cook on low until the rice is tender and chicken is cooked through.",
    ],
  },
  {
    id: "mock-7",
    title: "Simple Bean Soup",
    image: img("Simple Bean Soup", OLIVE, OAT),
    readyInMinutes: 35,
    servings: 4,
    ingredients: ["beans", "onion", "garlic", "tomato", "olive oil", "salt", "black pepper"],
    instructions: [
      "Warm olive oil in a pot, cook chopped onion and garlic until soft.",
      "Add chopped tomato and cook until it starts to break down.",
      "Add the beans and enough water to cover, simmer for 20 minutes.",
      "Mash some of the beans against the side of the pot to thicken the soup slightly, season and serve.",
    ],
  },
  {
    id: "mock-8",
    title: "Classic French Toast",
    image: img("Classic French Toast", BUTTER, CHERRY),
    readyInMinutes: 15,
    servings: 2,
    ingredients: ["bread", "egg", "milk", "butter", "cinnamon"],
    instructions: [
      "Whisk eggs, milk, and a pinch of cinnamon together in a shallow dish.",
      "Dip each slice of bread into the mixture, coating both sides.",
      "Melt butter in a pan and fry the slices until golden on each side.",
      "Serve warm, with whatever you like on top.",
    ],
  },
  {
    id: "mock-9",
    title: "Roasted Garlic Tomato Soup",
    image: img("Roasted Tomato Soup", CHERRY, BUTTER),
    readyInMinutes: 45,
    servings: 4,
    ingredients: ["tomato", "garlic", "onion", "olive oil", "basil", "salt", "black pepper"],
    instructions: [
      "Roast halved tomatoes, whole garlic cloves, and quartered onion with olive oil at 200°C (400°F) for 30 minutes.",
      "Blend everything together with a little water until smooth.",
      "Warm through in a pot, season with salt and pepper.",
      "Finish with torn basil leaves before serving.",
    ],
  },
  {
    id: "mock-10",
    title: "Buttery Garlic Bread",
    image: img("Buttery Garlic Bread", OLIVE, BUTTER),
    readyInMinutes: 15,
    servings: 4,
    ingredients: ["bread", "butter", "garlic", "parsley", "salt"],
    instructions: [
      "Mash softened butter with minced garlic, chopped parsley, and a pinch of salt.",
      "Spread generously over sliced bread.",
      "Bake at 200°C (400°F) for about 10 minutes, until golden at the edges.",
    ],
  },
  {
    id: "mock-11",
    title: "Onion & Cheese Omelette",
    image: img("Onion Cheese Omelette", BUTTER, OLIVE),
    readyInMinutes: 10,
    servings: 1,
    ingredients: ["egg", "onion", "cheese", "butter", "salt", "black pepper"],
    instructions: [
      "Whisk the eggs with salt and pepper.",
      "Melt butter in a pan, soften the chopped onion.",
      "Pour in the eggs, let the edges set, then sprinkle cheese over half.",
      "Fold the omelette over and slide onto a plate.",
    ],
  },
  {
    id: "mock-12",
    title: "Pantry Fried Rice",
    image: img("Pantry Fried Rice", OLIVE, OAT),
    readyInMinutes: 20,
    servings: 3,
    ingredients: ["rice", "egg", "onion", "garlic", "butter", "salt"],
    instructions: [
      "Use day-old rice if you have it, it fries up better than fresh.",
      "Melt butter in a hot pan, cook chopped onion and garlic until fragrant.",
      "Push everything to one side, scramble the egg in the empty space, then mix together.",
      "Add the rice, breaking up any clumps, and fry until heated through and slightly crisp in places.",
    ],
  },
  {
    id: "mock-13",
    title: "Lemon Garlic Chicken",
    image: img("Lemon Garlic Chicken", CHERRY, OAT),
    readyInMinutes: 35,
    servings: 4,
    ingredients: ["chicken", "lemon", "garlic", "olive oil", "salt", "black pepper"],
    instructions: [
      "Season the chicken with salt and pepper.",
      "Sear in olive oil until golden on both sides.",
      "Add minced garlic and lemon juice, scrape up any browned bits from the pan.",
      "Reduce heat, cover, and cook through, spooning the sauce over occasionally.",
    ],
  },
  {
    id: "mock-14",
    title: "Milk & Butter Mashed Potatoes",
    image: img("Mashed Potatoes", OAT, CHERRY),
    readyInMinutes: 30,
    servings: 4,
    ingredients: ["potato", "milk", "butter", "salt", "black pepper"],
    instructions: [
      "Boil peeled, chopped potatoes in salted water until fork-tender.",
      "Drain well, then mash with warm milk and butter until smooth.",
      "Season generously with salt and pepper.",
    ],
  },
  {
    id: "mock-15",
    title: "Chickpea & Spinach Curry",
    image: img("Chickpea Spinach Curry", OLIVE, BUTTER),
    readyInMinutes: 30,
    servings: 4,
    ingredients: ["chickpeas", "spinach", "onion", "garlic", "tomato", "olive oil", "salt"],
    instructions: [
      "Cook chopped onion and garlic in olive oil until soft.",
      "Add chopped tomato and cook until it breaks down into a sauce.",
      "Stir in the chickpeas and a splash of water, simmer for 10 minutes.",
      "Add spinach and cook just until wilted, season with salt to taste.",
    ],
  },
];
