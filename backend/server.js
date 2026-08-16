import "dotenv/config";
import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.js";
import pantryRoutes from "./routes/pantry.js";
import recipesRoutes from "./routes/recipes.js";
import favoritesRoutes from "./routes/favorites.js";

const app = express();
const PORT = process.env.PORT || 4000;
const CORS_ORIGIN = process.env.CORS_ORIGIN || "http://localhost:5173";

app.use(cors({ origin: CORS_ORIGIN }));
app.use(express.json({ limit: "1mb" }));

app.get("/api/health", (req, res) => {
  const live = Boolean(
    process.env.SPOONACULAR_API_KEY &&
      process.env.SPOONACULAR_API_KEY.trim() &&
      process.env.SPOONACULAR_API_KEY.trim().toLowerCase() !== "demo"
  );
  res.json({ ok: true, name: "Larder API", mode: live ? "live" : "mock" });
});

app.use("/api/auth", authRoutes);
app.use("/api/pantry", pantryRoutes);
app.use("/api/recipes", recipesRoutes);
app.use("/api/favorites", favoritesRoutes);

app.use((req, res) => res.status(404).json({ error: "Not found." }));

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: "Something went wrong on the server." });
});

app.listen(PORT, () => {
  console.log(`Larder API listening on http://localhost:${PORT}`);
});
