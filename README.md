<p align="center">
  <img src="./logo.png" width="220" alt="Larder logo" />
</p>

<h1 align="center">Larder</h1>
<p align="center"><em>A pantry-first recipe finder.</em></p>

<p align="center">
  <img alt="License: MIT" src="https://img.shields.io/badge/license-MIT-75070C?style=flat-square">
  <img alt="Node" src="https://img.shields.io/badge/node-%3E%3D18-75070C?style=flat-square">
  <img alt="Frontend" src="https://img.shields.io/badge/frontend-React%20%2B%20Vite-4F6815?style=flat-square">
  <img alt="Backend" src="https://img.shields.io/badge/backend-Express%20%2B%20SQLite-4F6815?style=flat-square">
  <img alt="Recipes" src="https://img.shields.io/badge/recipes-Spoonacular%20API-FFEDAB?style=flat-square">
</p>

<br/>

Add what's actually in your kitchen, and find real recipes you can cook
right now, no grocery run required.

Color theme: Butter `#FFEDAB` · Cherry `#75070C` · Olive `#4F6815` · Oat `#F0E6DA`.

## What the app does

- **Real accounts.** Passwords hashed with bcrypt, sessions signed with
  JWT. Your pantry and favorites are yours alone, every route checks
  ownership before returning anything.
- **A running pantry list.** Add ingredients as you think of them, remove
  what you've used up.
- **Recipe matching.** Search ranks results by how many of your ingredients
  each recipe actually uses, and tells you exactly what you're missing.
- **Works immediately, no API key required.** Ships with a built-in set of
  15 recipes and a real matching algorithm, so it's fully functional the
  moment you download it.
- **Upgrades to live search automatically.** Add a free
  [Spoonacular API key](https://spoonacular.com/food-api/console#Dashboard)
  (150 requests/day free) to `backend/.env` and the app switches from the
  built-in dataset to real, live recipe search, no code changes needed.
- **Favorites**, saved per account, ready to revisit any time.

## How to use it

1. **Create an account** on the auth section (scroll down from the hero,
   or click "Start cooking").
2. **Add ingredients** to your pantry, one at a time.
3. Press **Find recipes**. Results are ranked by how many of your
   ingredients each one uses.
4. Click a recipe to see the full ingredient list and instructions.
5. **Save to favorites** to keep it for later.


## Known limitations

- The built-in recipe set is 15 recipes, enough to see the matching logic
  work well with common staples (egg, rice, garlic, onion, tomato, etc.),
  but it's not a full recipe database, that's what the optional
  Spoonacular integration is for.
- No "forgot password" flow, since no mail server is set up.
- SQLite is a single file on disk, make sure wherever you deploy this
  keeps it on persistent storage.

## License

Released under the [MIT License](./LICENSE). You're free to use, modify,
and share this code, just keep the original copyright notice attached.