"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Activity, ScanLine, FileCheck2, Stethoscope, Phone, CalendarCheck } from "lucide-react";
import { CLINIC } from "@/lib/clinic-data";
import { isClinicOpenNow } from "@/lib/clinic-hours";

const features = [
  { icon: Activity, label: "Sonography" },
  { icon: ScanLine, label: "Digital X-Ray" },
  { icon: FileCheck2, label: "Fast Reports" },
  { icon: Stethoscope, label: "Experienced Radiologist" },
];

const rings = [1, 2, 3, 4, 5, 6];

export default function Hero() {
  const [isOpen, setIsOpen] = useState<boolean | null>(null);

  useEffect(() => {
    function check() {
      setIsOpen(isClinicOpenNow());
    }
    check();
    const id = setInterval(check, 60 * 1000);
    return () => clearInterval(id);
  }, []);

  const ringColor = isOpen === null ? "#3FC1D0" : isOpen ? "#22C55E" : "#FF2222";
  const dotColor  = isOpen === null ? "#3FC1D0" : isOpen ? "#22C55E" : "#FF2222";

  return (
    <section
      id="home"
      className="relative overflow-hidden pt-32 pb-0 md:pt-44 bg-primary-dark"
    >
      {/* Subtle noise grid overlay for glassmorphism depth */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(255,255,255,0.04) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      {/* Radar rings */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute right-[-180px] top-1/2 -translate-y-1/2 h-[480px] w-[480px]">
          <svg viewBox="0 0 200 200" className="h-full w-full">
            {rings.map((r) => (
              <circle
                key={r}
                cx="100"
                cy="100"
                r={10 + r * 10}
                fill="none"
                stroke={ringColor}
                strokeWidth="2"
                opacity="0.85"
                className="animate-radar-pulse"
                style={{ animationDelay: `${r * 0.4}s`, transition: "stroke 0.6s ease" }}
              />
            ))}
            <circle cx="100" cy="100" r="5" fill={dotColor} opacity="0.95" style={{ transition: "fill 0.6s ease" }} />
          </svg>
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-primary-dark via-primary-dark/60 to-transparent" />
      </div>

      {/* Teal glow top-left */}
      <div className="pointer-events-none absolute -top-32 -left-32 h-96 w-96 rounded-full bg-teal/10 blur-3xl" />

      <div className="container-px relative mx-auto max-w-7xl pb-20 md:pb-28">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-3xl text-center"
        >
          <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-xs font-medium text-teal-light">
            Radiology &amp; Diagnostic Imaging
          </span>

          {isOpen !== null && (
            <span
              className={[
                "ml-3 inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium",
                isOpen ? "bg-green-500/15 text-green-300" : "bg-red-500/15 text-red-300",
              ].join(" ")}
            >
              <span
                className={[
                  "h-1.5 w-1.5 rounded-full animate-pulse",
                  isOpen ? "bg-green-400" : "bg-red-400",
                ].join(" ")}
              />
              {isOpen ? "Open Now" : "Currently Closed"}
            </span>
          )}

          <h1 className="mt-6 font-heading text-3xl md:text-5xl lg:text-6xl font-semibold leading-tight text-white">
            Trusted Sonography &amp; Digital X-Ray Centre in{" "}
            <span className="text-teal-light">Bhusawal</span>
          </h1>

          <p className="mt-6 text-base md:text-lg text-white/75 max-w-2xl mx-auto leading-relaxed">
            Providing accurate diagnostic imaging with modern equipment and
            compassionate patient care.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#appointment"
              className="inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm md:text-base font-medium text-primary shadow-card hover:shadow-card-hover transition-all"
            >
              <CalendarCheck className="h-5 w-5" />
              Book Appointment
            </a>
            <a
              href={`tel:${CLINIC.phone}`}
              className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/5 px-7 py-3.5 text-sm md:text-base font-medium text-white hover:bg-white/10 transition-all"
            >
              <Phone className="h-5 w-5" />
              Call Now
            </a>
          </div>
        </motion.div>

        {/* Glassmorphism feature cards */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 max-w-4xl mx-auto"
        >
          {features.map((f, i) => (
            <motion.div
              key={f.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 + i * 0.08 }}
              className="group flex flex-col items-center gap-3 rounded-2xl glass-hero p-5 md:p-7 text-center hover:bg-white/10 hover:-translate-y-1 transition-all duration-300"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl gradient-primary text-white shadow-lg">
                <f.icon className="h-6 w-6" />
              </div>
              <span className="text-sm md:text-base font-medium text-white/90">
                {f.label}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Wave divider — transitions hero into the next section */}
      <div className="relative w-full overflow-hidden leading-none" style={{ height: "80px" }}>
        <svg
          viewBox="0 0 1440 80"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          className="absolute bottom-0 w-full h-full"
        >
          <path
            d="M0,40 C240,80 480,0 720,40 C960,80 1200,0 1440,40 L1440,80 L0,80 Z"
            fill="#f0f5ff"
          />
        </svg>
      </div>
    </section>
  );
}
