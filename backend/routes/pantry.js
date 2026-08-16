import { Router } from "express";
import { v4 as uuid } from "uuid";
import db from "../db.js";
import { requireAuth } from "../middleware/auth.js";

const router = Router();
router.use(requireAuth);

router.get("/", (req, res) => {
  const items = db
    .prepare("SELECT id, name FROM pantry_items WHERE user_id = ? ORDER BY created_at ASC")
    .all(req.userId);
  res.json(items);
});

router.post("/", (req, res) => {
  const name = String(req.body?.name || "").trim().toLowerCase();
  if (!name) return res.status(400).json({ error: "An ingredient name is required." });

  const existing = db
    .prepare("SELECT id FROM pantry_items WHERE user_id = ? AND name = ?")
    .get(req.userId, name);
  if (existing) return res.status(409).json({ error: "That's already in your pantry." });

  const id = uuid();
  db.prepare("INSERT INTO pantry_items (id, user_id, name, created_at) VALUES (?, ?, ?, ?)").run(
    id,
    req.userId,
    name,
    new Date().toISOString()
  );
  res.status(201).json({ id, name });
});

router.delete("/:id", (req, res) => {
  const existing = db
    .prepare("SELECT id FROM pantry_items WHERE id = ? AND user_id = ?")
    .get(req.params.id, req.userId);
  if (!existing) return res.status(404).json({ error: "That item could not be found." });

  db.prepare("DELETE FROM pantry_items WHERE id = ? AND user_id = ?").run(req.params.id, req.userId);
  res.json({ ok: true });
});

export default router;
