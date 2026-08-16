import React, { useState } from "react";
import { motion } from "framer-motion";
import { Plus, X, ChefHat } from "lucide-react";

const CHIP_COLORS = ["var(--cherry)", "var(--olive)"];

export default function PantryPanel({ pantry, onAdd, onRemove, onSearch, searching }) {
  const [value, setValue] = useState("");

  function submit(e) {
    e.preventDefault();
    const name = value.trim();
    if (!name) return;
    onAdd(name);
    setValue("");
  }

  return (
    <section id="pantry" className="lr-pantry">
      <motion.p
        className="lr-eyebrow"
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        Step one
      </motion.p>
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
      >
        What's in your <em>kitchen</em> right now?
      </motion.h2>

      <form className="lr-pantry-form" onSubmit={submit}>
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="e.g. garlic, rice, spinach…"
          aria-label="Add an ingredient"
        />
        <button type="submit" className="lr-add-btn" aria-label="Add ingredient">
          <Plus size={18} />
        </button>
      </form>

      <div className="lr-chip-row">
        {pantry.length === 0 && (
          <span className="lr-chip-empty">Nothing added yet, start typing above.</span>
        )}
        {pantry.map((item, i) => (
          <motion.span
            key={item.id}
            className="lr-chip"
            style={{ background: CHIP_COLORS[i % CHIP_COLORS.length] }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            {item.name}
            <button onClick={() => onRemove(item.id)} aria-label={`Remove ${item.name}`}>
              <X size={12} />
            </button>
          </motion.span>
        ))}
      </div>

      <motion.button
        className="lr-cta lr-find-btn"
        onClick={onSearch}
        disabled={pantry.length === 0 || searching}
        whileHover={{ scale: pantry.length ? 1.03 : 1 }}
        whileTap={{ scale: pantry.length ? 0.97 : 1 }}
      >
        <ChefHat size={17} />
        {searching ? "Searching the kitchen…" : "Find recipes"}
      </motion.button>
    </section>
  );
}
