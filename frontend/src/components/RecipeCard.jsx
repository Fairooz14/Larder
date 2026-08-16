import React from "react";
import { motion } from "framer-motion";

export default function RecipeCard({ recipe, onOpen, index }) {
  return (
    <motion.button
      className="lr-recipe-card"
      onClick={() => onOpen(recipe)}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay: Math.min(index * 0.05, 0.4) }}
      whileHover="hover"
    >
      <div className="lr-recipe-img-wrap">
        <motion.img
          src={recipe.image}
          alt={recipe.title}
          variants={{ hover: { scale: 1.08 } }}
          transition={{ duration: 0.5 }}
        />
        <div className="lr-recipe-overlay">
          <span className="lr-recipe-badge">
            uses {recipe.usedIngredientCount} of your ingredients
          </span>
        </div>
      </div>
      <div className="lr-recipe-meta">
        <h3>{recipe.title}</h3>
        {recipe.missedIngredientCount > 0 && (
          <p>+{recipe.missedIngredientCount} you'll need to grab</p>
        )}
      </div>
    </motion.button>
  );
}
