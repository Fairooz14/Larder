import React from "react";
import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import ParallaxBlob from "./ParallaxBlob.jsx";

const ease = [0.16, 1, 0.3, 1];

export default function Hero({ user, onCta }) {
  return (
    <section className="lr-hero">
      <ParallaxBlob speed={0.15} size={480} color="var(--cherry)" className="lr-blob-a" />
      <ParallaxBlob speed={0.32} size={320} color="var(--olive)" className="lr-blob-b" />
      <ParallaxBlob speed={0.08} size={220} color="var(--butter)" className="lr-blob-c" />

      <div className="lr-hero-inner">
        <motion.p
          className="lr-eyebrow"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease }}
        >
          {user ? `Welcome back, ${user.username}` : "A pantry-first recipe finder"}
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease, delay: 0.1 }}
        >
          Cook with
          <br />
          <em>what you have.</em>
        </motion.h1>

        <motion.p
          className="lr-hero-sub"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease, delay: 0.25 }}
        >
          Add what's sitting in your fridge and cupboards. Larder finds real
          recipes you can cook right now, no grocery run required.
        </motion.p>

        <motion.button
          className="lr-cta"
          onClick={onCta}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease, delay: 0.4 }}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.97 }}
        >
          {user ? "Go to your pantry" : "Start cooking"}
        </motion.button>
      </div>

      <motion.div
        className="lr-hero-scroll"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.6 }}
        transition={{ duration: 1, delay: 0.9 }}
      >
        <ArrowDown size={16} />
        <span>scroll</span>
      </motion.div>
    </section>
  );
}
