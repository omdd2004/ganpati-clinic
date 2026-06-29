"use client";

import { CLINIC } from "@/lib/clinic-data";

export default function WhatsAppButton() {
  const message = encodeURIComponent(
    "Hi, I'd like to know more about appointments at Ganpati Sonography & X-Ray Clinic."
  );
  const href = `https://wa.me/${CLINIC.whatsapp}?text=${message}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      className="fixed bottom-5 right-5 z-50 flex items-center gap-2 rounded-full bg-[#25D366] px-4 py-3.5 text-white shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 transition-all duration-200"
    >
      <svg viewBox="0 0 24 24" className="h-6 w-6 flex-none fill-white">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.149-.149.347-.198.521-.297.173-.099.297-.149.446-.248a.482.482 0 0 0 .15-.298c.05-.099.025-.198-.025-.297-.05-.099-.471-1.133-.644-1.553-.173-.42-.347-.297-.471-.297-.124 0-.396-.05-.594-.05-.198 0-.52.074-.792.372-.273.297-1.04 1.014-1.04 2.476s1.065 2.872 1.213 3.07c.149.198 2.06 3.144 4.989 4.281 2.93 1.138 2.93.76 3.46.71.53-.05 1.708-.694 1.955-1.366.247-.671.247-1.247.173-1.366-.074-.124-.272-.198-.57-.347z"/>
        <path d="M12.04 2.003C6.58 2.003 2.143 6.44 2.143 11.9c0 1.918.534 3.71 1.46 5.243L2 22l4.97-1.563a9.83 9.83 0 0 0 5.07 1.4c5.46 0 9.897-4.437 9.897-9.897 0-5.46-4.437-9.897-9.897-9.897zm0 17.798a8.06 8.06 0 0 1-4.55-1.385l-.326-.21-3.04.957.984-2.964-.224-.341A8.062 8.062 0 0 1 3.94 11.9c0-4.466 3.634-8.1 8.1-8.1 4.466 0 8.1 3.634 8.1 8.1 0 4.466-3.634 8.1-8.1 8.1z"/>
      </svg>
      <span className="hidden sm:inline text-sm font-medium pr-1">Chat with us</span>
    </a>
  );
}
