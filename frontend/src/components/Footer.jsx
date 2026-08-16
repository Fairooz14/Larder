import React from "react";

export default function Footer({ mode }) {
  return (
    <footer className="lr-footer">
      <span>Larder</span>
      <span>
        {mode === "live" ? "Live recipe search" : "Running on the built-in recipe set"}
      </span>
    </footer>
  );
}
