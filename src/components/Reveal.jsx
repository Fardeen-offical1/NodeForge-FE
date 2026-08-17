import React from "react";
import { motion } from "framer-motion";

/**
 * Fades + slides a section in once it scrolls into view. Wrap any
 * section with this for consistent, subtle motion across the site
 * instead of everything appearing instantly and statically.
 */
export default function Reveal({ children, delay = 0, y = 24 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
