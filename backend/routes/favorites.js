import { Router } from "express";
import { v4 as uuid } from "uuid";
import db from "../db.js";
import { requireAuth } from "../middleware/auth.js";

const router = Router();
router.use(requireAuth);

router.get("/", (req, res) => {
  const rows = db
    .prepare("SELECT id, recipe_id, title, image FROM favorites WHERE user_id = ? ORDER BY created_at DESC")
    .all(req.userId);
  res.json(rows.map((r) => ({ id: r.id, recipeId: r.recipe_id, title: r.title, image: r.image })));
});

router.post("/", (req, res) => {
  const { recipeId, title, image } = req.body || {};
  if (!recipeId || !title) return res.status(400).json({ error: "recipeId and title are required." });

  const existing = db
    .prepare("SELECT id FROM favorites WHERE user_id = ? AND recipe_id = ?")
    .get(req.userId, String(recipeId));
  if (existing) return res.status(409).json({ error: "Already in your favorites." });

  const id = uuid();
  db.prepare(
    "INSERT INTO favorites (id, user_id, recipe_id, title, image, created_at) VALUES (?, ?, ?, ?, ?, ?)"
  ).run(id, req.userId, String(recipeId), title, image || null, new Date().toISOString());

  res.status(201).json({ id, recipeId: String(recipeId), title, image: image || null });
});

router.delete("/:id", (req, res) => {
  const existing = db
    .prepare("SELECT id FROM favorites WHERE id = ? AND user_id = ?")
    .get(req.params.id, req.userId);
  if (!existing) return res.status(404).json({ error: "That favorite could not be found." });

  db.prepare("DELETE FROM favorites WHERE id = ? AND user_id = ?").run(req.params.id, req.userId);
  res.json({ ok: true });
});

export default router;
