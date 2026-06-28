import Image from "next/image";
import { CLINIC } from "@/lib/clinic-data";
import { Phone, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-primary text-white">
      <div className="container-px mx-auto max-w-7xl py-12 md:py-16">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-8">
          <div className="flex items-center gap-3">
            <Image
              src="/logo.png"
              alt={`${CLINIC.name} logo`}
              width={48}
              height={48}
              className="rounded-xl"
            />
            <div>
              <p className="font-heading font-semibold">{CLINIC.name}</p>
              <p className="text-sm text-white/70">{CLINIC.doctor}</p>
            </div>
          </div>

          <div className="space-y-2 text-sm text-white/85">
            <div className="flex items-center gap-2">
              <Phone className="h-4 w-4" />
              <a href={`tel:${CLINIC.phone}`} className="hover:text-white">
                {CLINIC.phoneDisplay}
              </a>
            </div>
            <div className="flex items-start gap-2">
              <MapPin className="h-4 w-4 mt-0.5 flex-none" />
              <span>{CLINIC.addressLines.join(", ")}</span>
            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-white/15 pt-6 text-center text-sm text-white/60">
          Copyright © 2026 {CLINIC.name}. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
