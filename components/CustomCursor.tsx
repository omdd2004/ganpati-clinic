"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

// Radar-themed custom cursor: a small dot with a pulsing ring, matching the
// hero's sonography rings. Grows + turns teal on hoverable elements.
export default function CustomCursor() {
  const [isPointer, setIsPointer] = useState(false);
  const [visible, setVisible] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  // Ring lags slightly behind the dot for a soft "echo" feel
  const ringX = useSpring(x, { damping: 25, stiffness: 300, mass: 0.4 });
  const ringY = useSpring(y, { damping: 25, stiffness: 300, mass: 0.4 });

  useEffect(() => {
    // Skip on touch devices — custom cursor only makes sense with a mouse
    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    if (isTouch) return;

    function handleMove(e: MouseEvent) {
      x.set(e.clientX);
      y.set(e.clientY);
      if (!visible) setVisible(true);
      const target = e.target as HTMLElement;
      const hoverable = target.closest(
        "a, button, input, select, textarea, [role='button']"
      );
      setIsPointer(!!hoverable);
    }

    function handleLeave() {
      setVisible(false);
    }

    window.addEventListener("mousemove", handleMove);
    document.documentElement.addEventListener("mouseleave", handleLeave);
    document.body.classList.add("custom-cursor-active");

    return () => {
      window.removeEventListener("mousemove", handleMove);
      document.documentElement.removeEventListener("mouseleave", handleLeave);
      document.body.classList.remove("custom-cursor-active");
    };
  }, [x, y, visible]);

  return (
    <>
      {/* Core dot — tracks instantly. mix-blend-mode: difference makes it
          auto-invert against any background (dark hero or white sections)
          so it's always visible without needing manual color logic. */}
      <motion.div
        className="pointer-events-none fixed z-[10001] hidden md:block rounded-full"
        style={{
          left: x,
          top: y,
          x: "-50%",
          y: "-50%",
          width: isPointer ? 8 : 8,
          height: isPointer ? 8 : 8,
          backgroundColor: "#ffffff",
          mixBlendMode: "difference",
          opacity: visible ? 1 : 0,
          transition: "width 0.2s ease, height 0.2s ease, opacity 0.2s ease",
        }}
      />
      {/* Echo ring — lags slightly behind, pulses on hover */}
      <motion.div
        className="pointer-events-none fixed z-[10000] hidden md:flex items-center justify-center rounded-full border"
        style={{
          left: ringX,
          top: ringY,
          x: "-50%",
          y: "-50%",
          width: isPointer ? 44 : 28,
          height: isPointer ? 44 : 28,
          borderColor: "#ffffff",
          borderWidth: 1.5,
          mixBlendMode: "difference",
          opacity: visible ? (isPointer ? 0.85 : 0.6) : 0,
          transition: "width 0.25s ease, height 0.25s ease, opacity 0.25s ease",
        }}
      >
        {isPointer && (
          <motion.span
            className="absolute inset-0 rounded-full border"
            style={{ borderColor: "#ffffff", mixBlendMode: "difference" }}
            initial={{ scale: 1, opacity: 0.6 }}
            animate={{ scale: 1.6, opacity: 0 }}
            transition={{ duration: 1.2, repeat: Infinity, ease: "easeOut" }}
          />
        )}
      </motion.div>
    </>
  );
}
