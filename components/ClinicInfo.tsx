"use client";

import { motion } from "framer-motion";
import { User, MapPin, Phone, Clock, ArrowUpRight } from "lucide-react";
import { CLINIC, WORKING_HOURS } from "@/lib/clinic-data";

export default function ClinicInfo() {
  return (
    <section id="contact" className="relative py-20 md:py-28 bg-white dot-grid overflow-hidden">
      {/* Blue top glow — connects from wave divider above */}
      <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 h-40 w-2/3 bg-primary/5 blur-3xl rounded-full" />
      {/* Teal bottom-right accent */}
      <div className="pointer-events-none absolute bottom-0 right-0 h-64 w-64 bg-teal/5 blur-3xl rounded-full" />

      <div className="container-px relative mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-2xl mx-auto mb-12"
        >
          <p className="text-sm font-semibold uppercase tracking-widest text-teal mb-3">
            Find Us
          </p>
          <h2 className="font-heading text-2xl md:text-4xl font-semibold text-slate-900">
            Visit Our Clinic
          </h2>
          <p className="mt-3 text-slate-600">
            We&apos;re here to help. Reach out or visit us during our working hours.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 items-start">
          {/* Info Card */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="rounded-3xl bg-white border border-slate-100 shadow-card p-7 md:p-9 space-y-7"
          >
            <div className="flex items-start gap-4">
              <div className="flex h-11 w-11 flex-none items-center justify-center rounded-xl bg-primary/10 text-primary">
                <User className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm text-slate-500">Radiologist</p>
                <p className="font-heading font-semibold text-slate-900">{CLINIC.doctor}</p>
                <p className="text-sm text-slate-500">{CLINIC.specialization}</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="flex h-11 w-11 flex-none items-center justify-center rounded-xl bg-teal/10 text-teal">
                <MapPin className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm text-slate-500">Address</p>
                {CLINIC.addressLines.map((line) => (
                  <p key={line} className="font-medium text-slate-800 leading-snug">{line}</p>
                ))}
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="flex h-11 w-11 flex-none items-center justify-center rounded-xl bg-accent/10 text-accent">
                <Phone className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm text-slate-500">Phone</p>
                <a
                  href={`tel:${CLINIC.phone}`}
                  className="font-medium text-slate-800 hover:text-primary transition-colors"
                >
                  {CLINIC.phoneDisplay}
                </a>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="flex h-11 w-11 flex-none items-center justify-center rounded-xl bg-primary/10 text-primary">
                <Clock className="h-5 w-5" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-slate-500 mb-2">Working Hours</p>
                <ul className="space-y-1.5">
                  {WORKING_HOURS.map((wh) => (
                    <li
                      key={wh.day}
                      className="flex flex-col sm:flex-row sm:items-center sm:justify-between text-sm gap-0.5 border-b border-slate-50 pb-1.5 last:border-0 last:pb-0"
                    >
                      <span className="font-medium text-slate-700 w-24">{wh.day}</span>
                      <span className="text-slate-500">{wh.slots.join("  •  ")}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>

          {/* Map */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="rounded-3xl overflow-hidden border border-slate-100 shadow-card bg-white flex flex-col"
          >
            <div className="h-72 md:h-80 w-full">
              <iframe
                src={CLINIC.mapsEmbedUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Clinic location map"
              />
            </div>
            <div className="p-6">
              <a
                href={CLINIC.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-full items-center justify-center gap-2 rounded-full gradient-primary px-6 py-3.5 text-sm md:text-base font-medium text-white shadow-card hover:shadow-card-hover transition-all"
              >
                Get Directions
                <ArrowUpRight className="h-4 w-4" />
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
