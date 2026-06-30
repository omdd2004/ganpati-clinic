"use client";

import { useEffect, useRef } from "react";

// Lightweight, dependency-free confetti burst — no npm install needed.
export default function Confetti() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const colors = ["#0B3D91", "#0097A7", "#3FC1D0", "#D62828", "#22C55E", "#FBBF24"];
    const count = 140;
    const particles = Array.from({ length: count }, () => ({
      x: canvas.width / 2,
      y: canvas.height / 2.5,
      r: 4 + Math.random() * 4,
      color: colors[Math.floor(Math.random() * colors.length)],
      vx: (Math.random() - 0.5) * 14,
      vy: Math.random() * -14 - 4,
      rotation: Math.random() * 360,
      vr: (Math.random() - 0.5) * 12,
      gravity: 0.32,
      life: 0,
      maxLife: 90 + Math.random() * 30,
    }));

    let frame: number;
    function tick() {
      ctx!.clearRect(0, 0, canvas!.width, canvas!.height);
      let alive = false;
      for (const p of particles) {
        p.life++;
        if (p.life > p.maxLife) continue;
        alive = true;
        p.vy += p.gravity;
        p.x += p.vx;
        p.y += p.vy;
        p.rotation += p.vr;
        const opacity = 1 - p.life / p.maxLife;
        ctx!.save();
        ctx!.translate(p.x, p.y);
        ctx!.rotate((p.rotation * Math.PI) / 180);
        ctx!.globalAlpha = opacity;
        ctx!.fillStyle = p.color;
        ctx!.fillRect(-p.r / 2, -p.r / 2, p.r, p.r * 0.6);
        ctx!.restore();
      }
      if (alive) {
        frame = requestAnimationFrame(tick);
      }
    }
    tick();

    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-[9999]"
      aria-hidden="true"
    />
  );
}
