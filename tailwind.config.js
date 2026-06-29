/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#0B3D91",
          light: "#1E5BC6",
          dark: "#082A66",
        },
        teal: {
          DEFAULT: "#0097A7",
          light: "#3FC1D0",
        },
        accent: {
          DEFAULT: "#D62828",
        },
        pink: {
          light: "#FDECEF",
        },
        surface: {
          DEFAULT: "#FFFFFF",
          soft: "#F8FAFC",
        },
      },
      fontFamily: {
        heading: ["var(--font-poppins)", "sans-serif"],
        body: ["var(--font-inter)", "sans-serif"],
      },
      boxShadow: {
        card: "0 4px 24px rgba(11, 61, 145, 0.08)",
        "card-hover": "0 12px 32px rgba(11, 61, 145, 0.14)",
        glass: "0 4px 30px rgba(0, 0, 0, 0.05)",
      },
      animation: {
        "fade-up": "fadeUp 0.6s ease-out forwards",
        "fade-in": "fadeIn 0.6s ease-out forwards",
        "radar-pulse": "radarPulse 3.5s ease-out infinite",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: 0, transform: "translateY(16px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
        fadeIn: {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 },
        },
        radarPulse: {
          "0%": { opacity: 0.85, transform: "scale(0.85)" },
          "70%": { opacity: 0.5 },
          "100%": { opacity: 0.15, transform: "scale(1.15)" },
        },
      },
    },
  },
  plugins: [],
};
