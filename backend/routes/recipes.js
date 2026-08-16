// import { Router } from "express";
// import fetch from "node-fetch";
// import db from "../db.js";
// import { requireAuth } from "../middleware/auth.js";
// import { mockRecipes } from "../data/mockRecipes.js";

// const router = Router();
// router.use(requireAuth);

// function isLive() {
//   const key = process.env.SPOONACULAR_API_KEY;
//   return Boolean(key && key.trim() && key.trim().toLowerCase() !== "demo");
// }

// function normalize(list) {
//   return list.map((s) => String(s).trim().toLowerCase()).filter(Boolean);
// }

// function scoreMockRecipes(pantry) {
//   const pantryNames = normalize(pantry);
//   return mockRecipes
//     .map((r) => {
//       const used = r.ingredients.filter((ing) =>
//         pantryNames.some((p) => ing.includes(p) || p.includes(ing))
//       );
//       const missed = r.ingredients.filter((ing) => !used.includes(ing));
//       return {
//         id: r.id,
//         title: r.title,
//         image: r.image,
//         usedIngredientCount: used.length,
//         missedIngredientCount: missed.length,
//         missedIngredients: missed,
//       };
//     })
//     .sort(
//       (a, b) => b.usedIngredientCount - a.usedIngredientCount || a.missedIngredientCount - b.missedIngredientCount
//     );
// }

// // POST /api/recipes/search  { ingredients: ["egg", "rice", ...] }
// router.post("/search", async (req, res) => {
//   const ingredients = Array.isArray(req.body?.ingredients) ? req.body.ingredients : [];
//   if (ingredients.length === 0) {
//     return res.status(400).json({ error: "Add at least one ingredient first." });
//   }

//   if (!isLive()) {
//     return res.json({ mode: "mock", results: scoreMockRecipes(ingredients) });
//   }

//   try {
//     const key = process.env.SPOONACULAR_API_KEY.trim();
//     const url = new URL("https://api.spoonacular.com/recipes/findByIngredients");
//     url.searchParams.set("ingredients", ingredients.join(","));
//     url.searchParams.set("number", "16");
//     url.searchParams.set("ranking", "1");
//     url.searchParams.set("ignorePantry", "true");
//     url.searchParams.set("apiKey", key);

//     const resp = await fetch(url);
//     if (!resp.ok) throw new Error(`Spoonacular responded ${resp.status}`);
//     const data = await resp.json();

//     const results = data.map((r) => ({
//       id: String(r.id),
//       title: r.title,
//       image: r.image,
//       usedIngredientCount: r.usedIngredientCount,
//       missedIngredientCount: r.missedIngredientCount,
//       missedIngredients: (r.missedIngredients || []).map((m) => m.name),
//     }));
//     res.json({ mode: "live", results });
//   } catch (err) {
//     console.error("Spoonacular search failed, falling back to mock:", err.message);
//     res.json({ mode: "mock", results: scoreMockRecipes(ingredients), fallback: true });
//   }
// });

// // GET /api/recipes/:id
// router.get("/:id", async (req, res) => {
//   const { id } = req.params;

//   if (id.startsWith("mock-")) {
//     const recipe = mockRecipes.find((r) => r.id === id);
//     if (!recipe) return res.status(404).json({ error: "That recipe could not be found." });
//     return res.json(recipe);
//   }

//   const cached = db.prepare("SELECT payload FROM recipe_cache WHERE recipe_id = ?").get(id);
//   if (cached) return res.json(JSON.parse(cached.payload));

//   if (!isLive()) {
//     return res.status(404).json({ error: "That recipe could not be found." });
//   }

//   try {
//     const key = process.env.SPOONACULAR_API_KEY.trim();
//     const url = new URL(`https://api.spoonacular.com/recipes/${encodeURIComponent(id)}/information`);
//     url.searchParams.set("apiKey", key);
//     const resp = await fetch(url);
//     if (!resp.ok) throw new Error(`Spoonacular responded ${resp.status}`);
//     const data = await resp.json();

//     const recipe = {
//       id: String(data.id),
//       title: data.title,
//       image: data.image,
//       readyInMinutes: data.readyInMinutes,
//       servings: data.servings,
//       ingredients: (data.extendedIngredients || []).map((i) => i.original),
//       instructions: (data.analyzedInstructions?.[0]?.steps || []).map((s) => s.step),
//       sourceUrl: data.sourceUrl,
//     };

//     db.prepare(
//       "INSERT OR REPLACE INTO recipe_cache (recipe_id, payload, cached_at) VALUES (?, ?, ?)"
//     ).run(id, JSON.stringify(recipe), new Date().toISOString());

//     res.json(recipe);
//   } catch (err) {
//     res.status(502).json({ error: "Could not reach the recipe service. Try again shortly." });
//   }
// });

// export default router;


import { Router } from "express";
import fetch from "node-fetch";
import db from "../db.js";
import { requireAuth } from "../middleware/auth.js";
import { mockRecipes } from "../data/mockRecipes.js";

const router = Router();
router.use(requireAuth);

function isLive() {
  const key = process.env.SPOONACULAR_API_KEY;
  return Boolean(key && key.trim() && key.trim().toLowerCase() !== "demo");
}

// Spoonacular image URLs end in a size suffix like "-312x231.jpg", which is
// too small once stretched across the recipe modal's image panel. Swap in
// a larger size Spoonacular already generates, so it stays sharp instead
// of blurring when scaled up.
function upsizeImage(url) {
  if (!url) return url;
  return url.replace(/-\d+x\d+(\.\w+)$/, "-636x393$1");
}

function normalize(list) {
  return list.map((s) => String(s).trim().toLowerCase()).filter(Boolean);
}

function scoreMockRecipes(pantry) {
  const pantryNames = normalize(pantry);
  return mockRecipes
    .map((r) => {
      const used = r.ingredients.filter((ing) =>
        pantryNames.some((p) => ing.includes(p) || p.includes(ing))
      );
      const missed = r.ingredients.filter((ing) => !used.includes(ing));
      return {
        id: r.id,
        title: r.title,
        image: r.image,
        usedIngredientCount: used.length,
        missedIngredientCount: missed.length,
        missedIngredients: missed,
      };
    })
    .sort(
      (a, b) => b.usedIngredientCount - a.usedIngredientCount || a.missedIngredientCount - b.missedIngredientCount
    );
}

// POST /api/recipes/search  { ingredients: ["egg", "rice", ...] }
router.post("/search", async (req, res) => {
  const ingredients = Array.isArray(req.body?.ingredients) ? req.body.ingredients : [];
  if (ingredients.length === 0) {
    return res.status(400).json({ error: "Add at least one ingredient first." });
  }

  if (!isLive()) {
    return res.json({ mode: "mock", results: scoreMockRecipes(ingredients) });
  }

  try {
    const key = process.env.SPOONACULAR_API_KEY.trim();
    const url = new URL("https://api.spoonacular.com/recipes/findByIngredients");
    url.searchParams.set("ingredients", ingredients.join(","));
    url.searchParams.set("number", "16");
    url.searchParams.set("ranking", "1");
    url.searchParams.set("ignorePantry", "true");
    url.searchParams.set("apiKey", key);

    const resp = await fetch(url);
    if (!resp.ok) throw new Error(`Spoonacular responded ${resp.status}`);
    const data = await resp.json();

    const results = data.map((r) => ({
      id: String(r.id),
      title: r.title,
      image: upsizeImage(r.image),
      usedIngredientCount: r.usedIngredientCount,
      missedIngredientCount: r.missedIngredientCount,
      missedIngredients: (r.missedIngredients || []).map((m) => m.name),
    }));
    res.json({ mode: "live", results });
  } catch (err) {
    console.error("Spoonacular search failed, falling back to mock:", err.message);
    res.json({ mode: "mock", results: scoreMockRecipes(ingredients), fallback: true });
  }
});

// GET /api/recipes/:id
router.get("/:id", async (req, res) => {
  const { id } = req.params;

  if (id.startsWith("mock-")) {
    const recipe = mockRecipes.find((r) => r.id === id);
    if (!recipe) return res.status(404).json({ error: "That recipe could not be found." });
    return res.json(recipe);
  }

  const cached = db.prepare("SELECT payload FROM recipe_cache WHERE recipe_id = ?").get(id);
  if (cached) return res.json(JSON.parse(cached.payload));

  if (!isLive()) {
    return res.status(404).json({ error: "That recipe could not be found." });
  }

  try {
    const key = process.env.SPOONACULAR_API_KEY.trim();
    const url = new URL(`https://api.spoonacular.com/recipes/${encodeURIComponent(id)}/information`);
    url.searchParams.set("apiKey", key);
    const resp = await fetch(url);
    if (!resp.ok) throw new Error(`Spoonacular responded ${resp.status}`);
    const data = await resp.json();

    const recipe = {
      id: String(data.id),
      title: data.title,
      image: upsizeImage(data.image),
      readyInMinutes: data.readyInMinutes,
      servings: data.servings,
      ingredients: (data.extendedIngredients || []).map((i) => i.original),
      instructions: (data.analyzedInstructions?.[0]?.steps || []).map((s) => s.step),
      sourceUrl: data.sourceUrl,
    };

    db.prepare(
      "INSERT OR REPLACE INTO recipe_cache (recipe_id, payload, cached_at) VALUES (?, ?, ?)"
    ).run(id, JSON.stringify(recipe), new Date().toISOString());

    res.json(recipe);
  } catch (err) {
    res.status(502).json({ error: "Could not reach the recipe service. Try again shortly." });
  }
});

export default router;