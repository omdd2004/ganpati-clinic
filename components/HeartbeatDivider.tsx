"use client";

import { motion } from "framer-motion";

// Decorative ECG / heartbeat line divider between sections — ties into the
// clinic's diagnostic imaging theme. Draws itself in when scrolled into view.
export default function HeartbeatDivider({ className = "" }: { className?: string }) {
  return (
    <div className={`w-full overflow-hidden ${className}`}>
      <svg
        viewBox="0 0 600 60"
        preserveAspectRatio="none"
        className="w-full h-10 md:h-12"
      >
        <motion.path
          d="M0,30 L130,30 L150,30 L165,8 L180,52 L195,18 L210,30 L230,30 L600,30"
          fill="none"
          stroke="#0097A7"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 0.6 }}
          viewport={{ once: true }}
          transition={{ duration: 1.4, ease: "easeInOut" }}
        />
      </svg>
    </div>
  );
}
