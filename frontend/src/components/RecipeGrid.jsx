import React from "react";
import { motion } from "framer-motion";
import RecipeCard from "./RecipeCard.jsx";

export default function RecipeGrid({ results, onOpenRecipe, hasSearched, mode }) {
  return (
    <section id="results" className="lr-results">
      {hasSearched && (
        <motion.p
          className="lr-eyebrow"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          {mode === "live" ? "Live results" : "From the built-in recipe set"}
        </motion.p>
      )}

      {!hasSearched && (
        <div className="lr-results-empty">
          <p>Add a few ingredients above and press "Find recipes" to see what you can make.</p>
        </div>
      )}

      {hasSearched && results.length === 0 && (
        <div className="lr-results-empty">
          <p>Nothing matched closely. Try adding a few more staples like onion, garlic, or salt.</p>
        </div>
      )}

      {results.length > 0 && (
        <div className="lr-recipe-grid">
          {results.map((r, i) => (
            <RecipeCard key={r.id} recipe={r} onOpen={onOpenRecipe} index={i} />
          ))}
        </div>
      )}
    </section>
  );
}
