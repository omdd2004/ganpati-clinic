"use client";

import { useEffect, useState } from "react";

export default function Loader() {
  const [hide, setHide] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setHide(true), 1800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className={`fixed inset-0 z-[10000] bg-white transition-all duration-700 ${
        hide ? "opacity-0 invisible" : "opacity-100 visible"
      }`}
      aria-hidden="true"
    >
      {/* Navbar skeleton */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
        <div className="flex items-center gap-3">
          <div className="h-11 w-11 rounded-xl shimmer" />
          <div className="h-4 w-40 rounded-full shimmer" />
        </div>
        <div className="hidden md:flex items-center gap-6">
          <div className="h-3 w-16 rounded-full shimmer" />
          <div className="h-3 w-24 rounded-full shimmer" />
          <div className="h-3 w-16 rounded-full shimmer" />
        </div>
        <div className="h-9 w-28 rounded-full shimmer" />
      </div>

      {/* Hero skeleton */}
      <div className="bg-primary-dark/90 px-6 py-20 flex flex-col items-center gap-6">
        <div className="h-5 w-48 rounded-full shimmer opacity-40" />
        <div className="h-10 w-80 rounded-xl shimmer opacity-30" />
        <div className="h-10 w-64 rounded-xl shimmer opacity-30" />
        <div className="h-4 w-72 rounded-full shimmer opacity-20 mt-2" />
        <div className="flex gap-4 mt-4">
          <div className="h-12 w-40 rounded-full shimmer opacity-40" />
          <div className="h-12 w-32 rounded-full shimmer opacity-20" />
        </div>
        {/* Feature cards skeleton */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 w-full max-w-2xl">
          {[1,2,3,4].map((i) => (
            <div key={i} className="h-24 rounded-2xl shimmer opacity-20" />
          ))}
        </div>
      </div>

      {/* Stats skeleton */}
      <div className="px-6 py-10 flex justify-center gap-6">
        {[1,2,3].map((i) => (
          <div key={i} className="flex flex-col items-center gap-2">
            <div className="h-8 w-24 rounded-lg shimmer" />
            <div className="h-3 w-20 rounded-full shimmer" />
          </div>
        ))}
      </div>

      {/* Content rows skeleton */}
      <div className="px-6 space-y-3 max-w-2xl mx-auto">
        <div className="h-4 w-full rounded-full shimmer" />
        <div className="h-4 w-5/6 rounded-full shimmer" />
        <div className="h-4 w-4/6 rounded-full shimmer" />
      </div>
    </div>
  );
}
