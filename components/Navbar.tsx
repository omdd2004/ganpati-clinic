"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Phone, Menu, X } from "lucide-react";
import { CLINIC } from "@/lib/clinic-data";
import { cn } from "@/lib/utils";

const links = [
  { label: "Home", href: "#home" },
  { label: "Book Appointment", href: "#appointment" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [activeHref, setActiveHref] = useState("#home");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Track which section is currently in view to drive the active nav indicator
  useEffect(() => {
    const sections = links
      .map((l) => document.querySelector(l.href))
      .filter(Boolean) as Element[];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveHref(`#${entry.target.id}`);
          }
        });
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 }
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-white/75 backdrop-blur-xl backdrop-saturate-150 shadow-layered border-b border-slate-100/80"
          : "bg-white border-b border-transparent"
      )}
    >
      <nav className="container-px mx-auto flex h-16 md:h-20 max-w-7xl items-center justify-between">
        <a href="#home" className="flex items-center gap-3 shrink-0">
          <Image
            src="/logo.png"
            alt={`${CLINIC.name} logo`}
            width={44}
            height={44}
            className="rounded-xl"
            priority
          />
          <span className="font-heading font-semibold text-primary text-sm md:text-base leading-tight">
            {CLINIC.name}
          </span>
        </a>

        <div className="hidden md:flex items-center gap-8 relative">
          {links.map((link) => {
            const isActive = activeHref === link.href;
            return (
              <a
                key={link.href}
                href={link.href}
                className={cn(
                  "relative text-sm font-medium transition-colors py-1",
                  isActive ? "text-primary" : "text-slate-600 hover:text-primary"
                )}
              >
                {link.label}
                {isActive && (
                  <motion.span
                    layoutId="navIndicator"
                    className="absolute left-0 right-0 -bottom-1 h-[2px] rounded-full bg-teal"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </a>
            );
          })}
        </div>

        <div className="hidden md:flex items-center gap-3">
          <a
            href={`tel:${CLINIC.phone}`}
            className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-white shadow-card hover:bg-primary-dark transition-colors"
          >
            <Phone className="h-4 w-4" />
            Call Now
          </a>
        </div>

        <button
          className="md:hidden p-2 text-primary"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      {open && (
        <div className="md:hidden bg-white/95 backdrop-blur-lg border-t border-slate-100 px-6 py-4 flex flex-col gap-4 animate-fade-in">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className={cn(
                "text-base font-medium",
                activeHref === link.href ? "text-primary" : "text-slate-700"
              )}
            >
              {link.label}
            </a>
          ))}
          <a
            href={`tel:${CLINIC.phone}`}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-medium text-white"
          >
            <Phone className="h-4 w-4" />
            Call Now
          </a>
        </div>
      )}
    </header>
  );
}
