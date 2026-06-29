"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Users, Award, Clock, Star } from "lucide-react";

const stats = [
  { icon: Award, value: 25, suffix: "+", label: "Years of Excellence" },
  { icon: Users, value: 20000, suffix: "+", label: "Patients Served" },
  { icon: Clock, value: 2, suffix: " hrs", label: "Report Turnaround" },
  { icon: Star, value: 4.9, suffix: "", label: "Patient Rating" },
];

function useCountUp(target: number, duration: number, start: boolean) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!start) return;
    let startTime: number | null = null;
    const isDecimal = target % 1 !== 0;

    function step(timestamp: number) {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = eased * target;
      setCount(isDecimal ? Math.round(current * 10) / 10 : Math.floor(current));
      if (progress < 1) requestAnimationFrame(step);
    }

    requestAnimationFrame(step);
  }, [start, target, duration]);

  return count;
}

function StatCard({
  icon: Icon,
  value,
  suffix,
  label,
  delay,
}: {
  icon: React.ComponentType<{ className?: string }>;
  value: number;
  suffix: string;
  label: string;
  delay: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [started, setStarted] = useState(false);
  const count = useCountUp(value, 2, started);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setStarted(true); },
      { threshold: 0.4 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const display = value === 20000
    ? count >= 1000
      ? `${(count / 1000).toFixed(0)}k`
      : count.toString()
    : count.toString();

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className="flex flex-col items-center text-center px-6 py-8 rounded-3xl bg-white border border-slate-100 shadow-card hover:shadow-card-hover transition-shadow"
    >
      <div className="flex h-14 w-14 items-center justify-center rounded-2xl gradient-primary text-white mb-4 shadow-md">
        <Icon className="h-7 w-7" />
      </div>
      <p className="font-heading text-3xl md:text-4xl font-bold text-primary">
        {display}{suffix}
      </p>
      <p className="mt-1.5 text-sm text-slate-500 font-medium">{label}</p>
    </motion.div>
  );
}

export default function StatsSection() {
  return (
    <section className="relative py-16 md:py-20 section-blue dot-grid overflow-hidden">
      {/* Faint blue glow blobs */}
      <div className="pointer-events-none absolute -top-20 -right-20 h-72 w-72 rounded-full bg-primary/8 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-20 -left-20 h-72 w-72 rounded-full bg-teal/8 blur-3xl" />

      <div className="container-px mx-auto max-w-5xl">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center text-sm font-semibold uppercase tracking-widest text-teal mb-10"
        >
          Trusted by thousands in Bhusawal
        </motion.p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {stats.map((s, i) => (
            <StatCard key={s.label} {...s} delay={i * 0.1} />
          ))}
        </div>
      </div>
    </section>
  );
}
