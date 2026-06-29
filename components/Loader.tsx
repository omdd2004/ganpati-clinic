"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export default function Loader() {
  const [hide, setHide] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setHide(true), 600);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className={`fixed inset-0 z-[10000] flex items-center justify-center bg-pink-light transition-all duration-500 ${
        hide ? "opacity-0 invisible" : "opacity-100 visible"
      }`}
      aria-hidden="true"
    >
      <div className="relative flex h-36 w-36 items-center justify-center">
        <span className="absolute inset-0 rounded-full border-[3px] border-primary/10" />
        <span className="absolute inset-0 rounded-full border-[3px] border-transparent border-t-teal border-r-accent animate-spin" />
        <Image
          src="/logo.png"
          alt="Ganpati Sonography & X-Ray Clinic"
          width={84}
          height={84}
          className="relative z-10 rounded-2xl shadow-card"
          priority
        />
      </div>
    </div>
  );
}
