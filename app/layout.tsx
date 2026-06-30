import type { Metadata } from "next";
import { Poppins, Inter } from "next/font/google";
import RegisterSW from "@/components/RegisterSW";
import PageTransition from "@/components/PageTransition";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-inter",
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://ganpatisonography.in";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Ganpati Sonography & X-Ray Clinic | Sonography & Digital X-Ray in Bhusawal",
  description:
    "Ganpati Sonography & X-Ray Clinic provides reliable sonography, ultrasound, and digital X-ray services in Bhusawal. Book your appointment online.",
  keywords: [
    "sonography Bhusawal",
    "X-Ray Bhusawal",
    "ultrasound clinic Bhusawal",
    "Dr Deepak Dandale",
    "diagnostic centre Bhusawal",
  ],
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Ganpati Sonography",
  },
  icons: {
    icon: [
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  },
  openGraph: {
    title: "Ganpati Sonography & X-Ray Clinic",
    description:
      "Trusted Sonography & Digital X-Ray Centre in Bhusawal. Book your appointment online.",
    url: siteUrl,
    siteName: "Ganpati Sonography & X-Ray Clinic",
    images: [{ url: "/logo.png", width: 1200, height: 1200 }],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Ganpati Sonography & X-Ray Clinic",
    description:
      "Trusted Sonography & Digital X-Ray Centre in Bhusawal. Book your appointment online.",
    images: ["/logo.png"],
  },
  robots: { index: true, follow: true },
};

export const viewport = {
  themeColor: "#0B3D91",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "MedicalClinic",
  name: "Ganpati Sonography & X-Ray Clinic",
  image: "/logo.png",
  telephone: "+918530951675",
  medicalSpecialty: "Radiology",
  address: {
    "@type": "PostalAddress",
    streetAddress:
      "Municipal Staff Colony, Behind Saijeevan Supershop, Jamner Road",
    addressLocality: "Bhusawal",
    addressRegion: "Maharashtra",
    addressCountry: "IN",
  },
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://ganpatisonography.in",
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      opens: "09:00",
      closes: "15:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      opens: "18:00",
      closes: "19:30",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: "Tuesday",
      opens: "09:00",
      closes: "12:00",
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${poppins.variable} ${inter.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="font-body antialiased">
        <PageTransition>{children}</PageTransition>
        <RegisterSW />
      </body>
    </html>
  );
}
