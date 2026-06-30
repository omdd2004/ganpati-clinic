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
      {/* Core dot — tracks instantly */}
      <motion.div
        className="pointer-events-none fixed z-[10001] hidden md:block rounded-full"
        style={{
          left: x,
          top: y,
          x: "-50%",
          y: "-50%",
          width: isPointer ? 6 : 7,
          height: isPointer ? 6 : 7,
          backgroundColor: isPointer ? "#3FC1D0" : "#0B3D91",
          opacity: visible ? 1 : 0,
          transition: "width 0.2s ease, height 0.2s ease, background-color 0.2s ease, opacity 0.2s ease",
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
          borderColor: isPointer ? "#3FC1D0" : "#0B3D91",
          borderWidth: 1.5,
          opacity: visible ? (isPointer ? 0.7 : 0.4) : 0,
          transition: "width 0.25s ease, height 0.25s ease, border-color 0.25s ease, opacity 0.25s ease",
        }}
      >
        {isPointer && (
          <motion.span
            className="absolute inset-0 rounded-full border border-teal-light"
            initial={{ scale: 1, opacity: 0.6 }}
            animate={{ scale: 1.6, opacity: 0 }}
            transition={{ duration: 1.2, repeat: Infinity, ease: "easeOut" }}
          />
        )}
      </motion.div>
    </>
  );
}
