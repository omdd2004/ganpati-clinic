"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, Loader2, User, Phone, Calendar, Clock, Stethoscope, MessageSquare } from "lucide-react";
import { SERVICES } from "@/lib/clinic-data";

type FormState = {
  patient_name: string;
  phone: string;
  appointment_date: string;
  appointment_time: string;
  service: string;
  message: string;
};

const initialState: FormState = {
  patient_name: "",
  phone: "",
  appointment_date: "",
  appointment_time: "",
  service: "",
  message: "",
};

export default function AppointmentForm() {
  const [form, setForm] = useState<FormState>(initialState);
  const [errors, setErrors] = useState<Partial<FormState>>({});
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [serverError, setServerError] = useState("");

  function update<K extends keyof FormState>(key: K, value: string) {
    setForm((f) => ({ ...f, [key]: value }));
    setErrors((e) => ({ ...e, [key]: undefined }));
  }

  function validate(): boolean {
    const newErrors: Partial<FormState> = {};
    if (!form.patient_name.trim()) newErrors.patient_name = "Please enter your name.";
    if (!/^[0-9+\s-]{10,15}$/.test(form.phone.trim()))
      newErrors.phone = "Please enter a valid mobile number.";
    if (!form.appointment_date) newErrors.appointment_date = "Please select a date.";
    if (!form.appointment_time) newErrors.appointment_time = "Please select a preferred time.";
    if (!form.service) newErrors.service = "Please select a service.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setServerError("");
    if (!validate()) return;

    setSubmitting(true);
    try {
      const res = await fetch("/api/appointments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();

      if (!res.ok) {
        setServerError(data.error || "Something went wrong. Please try again.");
        return;
      }

      setSuccess(true);
      setForm(initialState);
    } catch {
      setServerError("Network error. Please check your connection and try again.");
    } finally {
      setSubmitting(false);
    }
  }

  const today = new Date().toISOString().split("T")[0];

  return (
    <section id="appointment" className="py-20 md:py-28 bg-white">
      <div className="container-px mx-auto max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="font-heading text-2xl md:text-4xl font-semibold text-slate-900">
            Book Your Appointment
          </h2>
          <p className="mt-3 text-slate-600">
            Fill in your details and our team will confirm your slot shortly.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="rounded-3xl border border-slate-100 bg-surface-soft shadow-card p-6 md:p-10"
        >
          {success ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center text-center gap-4 py-8"
            >
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-teal/10 text-teal">
                <CheckCircle2 className="h-9 w-9" />
              </div>
              <h3 className="font-heading text-xl font-semibold text-slate-900">
                Appointment Request Received!
              </h3>
              <p className="text-slate-600 max-w-md">
                Thank you. Our team will contact you shortly to confirm your appointment.
              </p>
              <button
                onClick={() => setSuccess(false)}
                className="mt-2 text-sm font-medium text-primary hover:underline"
              >
                Book another appointment
              </button>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5" noValidate>
              <Field
                label="Patient Name"
                icon={User}
                error={errors.patient_name}
              >
                <input
                  type="text"
                  value={form.patient_name}
                  onChange={(e) => update("patient_name", e.target.value)}
                  placeholder="Enter your full name"
                  className={inputClass(!!errors.patient_name)}
                />
              </Field>

              <Field label="Mobile Number" icon={Phone} error={errors.phone}>
                <input
                  type="tel"
                  value={form.phone}
                  onChange={(e) => update("phone", e.target.value)}
                  placeholder="e.g. 9876543210"
                  className={inputClass(!!errors.phone)}
                />
              </Field>

              <div className="grid sm:grid-cols-2 gap-5">
                <Field label="Appointment Date" icon={Calendar} error={errors.appointment_date}>
                  <input
                    type="date"
                    min={today}
                    value={form.appointment_date}
                    onChange={(e) => update("appointment_date", e.target.value)}
                    className={inputClass(!!errors.appointment_date)}
                  />
                </Field>

                <Field label="Preferred Time" icon={Clock} error={errors.appointment_time}>
                  <input
                    type="time"
                    value={form.appointment_time}
                    onChange={(e) => update("appointment_time", e.target.value)}
                    className={inputClass(!!errors.appointment_time)}
                  />
                </Field>
              </div>

              <Field label="Service Required" icon={Stethoscope} error={errors.service}>
                <select
                  value={form.service}
                  onChange={(e) => update("service", e.target.value)}
                  className={inputClass(!!errors.service)}
                >
                  <option value="">Select a service</option>
                  {SERVICES.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </Field>

              <Field label="Message (optional)" icon={MessageSquare}>
                <textarea
                  value={form.message}
                  onChange={(e) => update("message", e.target.value)}
                  placeholder="Any additional details for our team"
                  rows={3}
                  className={inputClass(false)}
                />
              </Field>

              {serverError && (
                <p className="text-sm text-accent font-medium">{serverError}</p>
              )}

              <button
                type="submit"
                disabled={submitting}
                className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-4 text-base font-medium text-white shadow-card hover:bg-primary-dark hover:shadow-card-hover transition-all disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {submitting && <Loader2 className="h-5 w-5 animate-spin" />}
                {submitting ? "Booking..." : "Book Appointment"}
              </button>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
}

function inputClass(hasError: boolean) {
  return [
    "w-full rounded-xl border bg-white px-4 py-3 text-sm md:text-base text-slate-800 placeholder:text-slate-400 transition-colors",
    hasError
      ? "border-accent focus:border-accent"
      : "border-slate-200 focus:border-primary",
  ].join(" ");
}

function Field({
  label,
  icon: Icon,
  error,
  children,
}: {
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="mb-1.5 flex items-center gap-2 text-sm font-medium text-slate-700">
        <Icon className="h-4 w-4 text-primary" />
        {label}
      </label>
      {children}
      {error && <p className="mt-1.5 text-xs font-medium text-accent">{error}</p>}
    </div>
  );
}
