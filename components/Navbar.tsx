"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
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

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 bg-white transition-shadow duration-300",
        scrolled ? "shadow-glass border-b border-slate-100" : "border-b border-transparent"
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

        <div className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-slate-600 hover:text-primary transition-colors"
            >
              {link.label}
            </a>
          ))}
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
        <div className="md:hidden bg-white border-t border-slate-100 px-6 py-4 flex flex-col gap-4 animate-fade-in">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="text-base font-medium text-slate-700"
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
