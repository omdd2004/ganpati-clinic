"use client";

import { motion } from "framer-motion";
import { GraduationCap, Award, Users, Clock3 } from "lucide-react";
import { DOCTOR_CREDENTIALS } from "@/lib/clinic-data";

const highlightIcons = [Award, Users, Clock3];

export default function DoctorCredentials() {
  return (
    <section className="py-20 md:py-28 bg-white">
      <div className="container-px mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="rounded-3xl border border-slate-100 bg-surface-soft shadow-card p-8 md:p-12"
        >
          <div className="flex flex-col md:flex-row items-start gap-8">
            <div className="flex h-16 w-16 flex-none items-center justify-center rounded-2xl gradient-primary text-white shadow-card">
              <GraduationCap className="h-8 w-8" />
            </div>

            <div className="flex-1">
              <h2 className="font-heading text-2xl md:text-3xl font-semibold text-slate-900">
                {DOCTOR_CREDENTIALS.name}
              </h2>
              <p className="mt-1 text-teal font-medium">
                {DOCTOR_CREDENTIALS.qualifications}
              </p>
              <p className="mt-1 text-sm text-slate-500">
                {DOCTOR_CREDENTIALS.registration}
              </p>

              <p className="mt-5 text-slate-600 leading-relaxed max-w-2xl">
                {DOCTOR_CREDENTIALS.bio}
              </p>

              <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
                {DOCTOR_CREDENTIALS.highlights.map((h, i) => {
                  const Icon = highlightIcons[i % highlightIcons.length];
                  return (
                    <motion.div
                      key={h.label}
                      initial={{ opacity: 0, y: 15 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: 0.1 + i * 0.1 }}
                      className="flex items-center gap-3 rounded-2xl bg-white border border-slate-100 p-4 shadow-sm"
                    >
                      <div className="flex h-10 w-10 flex-none items-center justify-center rounded-xl bg-primary/10 text-primary">
                        <Icon className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="font-heading text-lg font-semibold text-slate-900 leading-none">
                          {h.value}
                        </p>
                        <p className="text-xs text-slate-500 mt-1">{h.label}</p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
