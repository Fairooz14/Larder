import Database from "better-sqlite3";
import path from "node:path";
import fs from "node:fs";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dataDir = path.join(__dirname, "data", "db");
if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });

const db = new Database(path.join(dataDir, "larder.db"));
db.pragma("journal_mode = WAL");
db.pragma("foreign_keys = ON");

db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id TEXT PRIMARY KEY,
    username TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    created_at TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS pantry_items (
    id TEXT PRIMARY KEY,
    user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    created_at TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS favorites (
    id TEXT PRIMARY KEY,
    user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    recipe_id TEXT NOT NULL,
    title TEXT NOT NULL,
    image TEXT,
    created_at TEXT NOT NULL,
    UNIQUE(user_id, recipe_id)
  );

  CREATE TABLE IF NOT EXISTS recipe_cache (
    recipe_id TEXT PRIMARY KEY,
    payload TEXT NOT NULL,
    cached_at TEXT NOT NULL
  );

  CREATE INDEX IF NOT EXISTS idx_pantry_user ON pantry_items(user_id);
  CREATE INDEX IF NOT EXISTS idx_favorites_user ON favorites(user_id);
`);

export default db;
