import React from "react";
import { motion } from "framer-motion";
import { Heart, LogOut } from "lucide-react";
import { useScrolled } from "../hooks/useParallax.js";

export default function Navbar({ user, onSignOut, onShowFavorites }) {
  const scrolled = useScrolled(30);

  return (
    <motion.header
      className={`lr-nav ${scrolled ? "lr-nav-scrolled" : ""}`}
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="lr-nav-brand">Larder</div>
      {user && (
        <div className="lr-nav-actions">
          <button className="lr-nav-btn" onClick={onShowFavorites}>
            <Heart size={15} /> Favorites
          </button>
          <span className="lr-nav-user">{user.username}</span>
          <button className="lr-nav-btn" onClick={onSignOut}>
            <LogOut size={15} /> Sign out
          </button>
        </div>
      )}
    </motion.header>
  );
}
