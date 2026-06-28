"use client";

import { motion } from "framer-motion";
import { Activity, ScanLine, FileCheck2, Stethoscope, Phone, CalendarCheck } from "lucide-react";
import { CLINIC } from "@/lib/clinic-data";

const features = [
  { icon: Activity, label: "Sonography" },
  { icon: ScanLine, label: "Digital X-Ray" },
  { icon: FileCheck2, label: "Fast Reports" },
  { icon: Stethoscope, label: "Experienced Radiologist" },
];

export default function Hero() {
  return (
    <section
      id="home"
      className="relative overflow-hidden pt-32 pb-20 md:pt-44 md:pb-28 bg-gradient-to-b from-pink-light/40 via-white to-white"
    >
      {/* Decorative gradient blobs */}
      <div className="pointer-events-none absolute -top-24 -right-24 h-80 w-80 rounded-full bg-teal/10 blur-3xl" />
      <div className="pointer-events-none absolute top-40 -left-24 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />

      <div className="container-px relative mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-3xl text-center"
        >
          <span className="inline-flex items-center gap-2 rounded-full bg-teal/10 px-4 py-1.5 text-xs font-medium text-teal">
            Radiology &amp; Diagnostic Imaging
          </span>

          <h1 className="mt-6 font-heading text-3xl md:text-5xl lg:text-6xl font-semibold leading-tight text-slate-900">
            Trusted Sonography &amp; Digital X-Ray Centre in{" "}
            <span className="text-gradient">Bhusawal</span>
          </h1>

          <p className="mt-6 text-base md:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Providing accurate diagnostic imaging with modern equipment and
            compassionate patient care.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#appointment"
              className="inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm md:text-base font-medium text-white shadow-card hover:shadow-card-hover hover:bg-primary-dark transition-all"
            >
              <CalendarCheck className="h-5 w-5" />
              Book Appointment
            </a>
            <a
              href={`tel:${CLINIC.phone}`}
              className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-7 py-3.5 text-sm md:text-base font-medium text-primary shadow-sm hover:border-primary/30 hover:bg-pink-light/40 transition-all"
            >
              <Phone className="h-5 w-5" />
              Call Now
            </a>
          </div>
        </motion.div>

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
              className="group flex flex-col items-center gap-3 rounded-2xl border border-slate-100 bg-white p-5 md:p-7 text-center shadow-card hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl gradient-primary text-white">
                <f.icon className="h-6 w-6" />
              </div>
              <span className="text-sm md:text-base font-medium text-slate-700">
                {f.label}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
