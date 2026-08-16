import React from "react";
import { useParallax } from "../hooks/useParallax.js";

export default function ParallaxBlob({
  speed = 0.2,
  size = 300,
  color,
  style = {},
  className = "",
}) {
  const offset = useParallax(speed);
  return (
    <div
      className={`lr-blob ${className}`}
      style={{
        width: size,
        height: size,
        background: color,
        transform: `translateY(${offset}px)`,
        ...style,
      }}
    />
  );
}
