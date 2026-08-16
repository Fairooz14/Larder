import React from "react";
import { motion } from "framer-motion";
import { X } from "lucide-react";

export default function FavoritesPanel({ favorites, onOpen, onRemove, panelRef }) {
  return (
    <section id="favorites" ref={panelRef} className="lr-favorites">
      <motion.p className="lr-eyebrow" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
        Saved
      </motion.p>
      <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
        Your <em>favorites</em>
      </motion.h2>

      {favorites.length === 0 ? (
        <p className="lr-favorites-empty">
          Nothing saved yet. Open a recipe and tap "Save to favorites" to keep it here.
        </p>
      ) : (
        <div className="lr-favorites-row">
          {favorites.map((f) => (
            <div key={f.id} className="lr-fav-card" onClick={() => onOpen(f.recipeId, f)}>
              <img src={f.image} alt={f.title} />
              <div className="lr-fav-card-title">{f.title}</div>
              <button
                className="lr-fav-remove"
                onClick={(e) => {
                  e.stopPropagation();
                  onRemove(f.id);
                }}
                aria-label={`Remove ${f.title} from favorites`}
              >
                <X size={14} />
              </button>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
