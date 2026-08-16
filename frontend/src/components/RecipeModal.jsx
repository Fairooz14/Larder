import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Clock, Users, Heart, ExternalLink } from "lucide-react";
import { api } from "../api.js";

export default function RecipeModal({ recipeId, initial, onClose, isFavorite, onToggleFavorite }) {
  const [recipe, setRecipe] = useState(initial || null);
  const [loading, setLoading] = useState(!initial?.instructions);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;
    if (!recipeId) return;
    setLoading(true);
    setError("");
    api
      .getRecipe(recipeId)
      .then((data) => {
        if (!cancelled) setRecipe(data);
      })
      .catch((err) => {
        if (!cancelled) setError(err.message || "Could not load that recipe.");
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [recipeId]);

  return (
    <AnimatePresence>
      {recipeId && (
        <motion.div
          className="lr-modal-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="lr-modal"
            initial={{ opacity: 0, y: 40, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.98 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
          >
            <button className="lr-modal-close" onClick={onClose} aria-label="Close">
              <X size={18} />
            </button>

            {loading && <div className="lr-modal-loading">Reading the recipe…</div>}
            {error && <div className="lr-modal-loading">{error}</div>}

            {recipe && !loading && (
              <div className="lr-modal-body">
                <div className="lr-modal-img-wrap">
                  <img src={recipe.image} alt={recipe.title} />
                </div>
                <div className="lr-modal-content">
                  <h2>{recipe.title}</h2>
                  <div className="lr-modal-meta">
                    {recipe.readyInMinutes && (
                      <span>
                        <Clock size={14} /> {recipe.readyInMinutes} min
                      </span>
                    )}
                    {recipe.servings && (
                      <span>
                        <Users size={14} /> {recipe.servings} servings
                      </span>
                    )}
                  </div>

                  <button
                    className={`lr-fav-btn ${isFavorite ? "is-fav" : ""}`}
                    onClick={() => onToggleFavorite(recipe)}
                  >
                    <Heart size={15} fill={isFavorite ? "currentColor" : "none"} />
                    {isFavorite ? "Saved to favorites" : "Save to favorites"}
                  </button>

                  <h4>Ingredients</h4>
                  <ul className="lr-modal-ingredients">
                    {(recipe.ingredients || []).map((ing, i) => (
                      <li key={i}>{ing}</li>
                    ))}
                  </ul>

                  <h4>Instructions</h4>
                  <ol className="lr-modal-steps">
                    {(recipe.instructions || []).map((step, i) => (
                      <li key={i}>{step}</li>
                    ))}
                  </ol>

                  {recipe.sourceUrl && (
                    <a href={recipe.sourceUrl} target="_blank" rel="noopener noreferrer" className="lr-source-link">
                      View original source <ExternalLink size={13} />
                    </a>
                  )}
                </div>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
