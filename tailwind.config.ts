import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ivory: "#FFFFF0",
        "ivory-deep": "#F5F0E8",
        "champagne": "#F7E7CE",
        "champagne-dark": "#E8C99A",
        "gold": "#C9A84C",
        "gold-light": "#E2C87E",
        "gold-dark": "#A07A2C",
        "maroon": "#6B1C2A",
        "maroon-light": "#8B2635",
        "maroon-deep": "#4A1018",
        "blush": "#F2D9D4",
        "blush-dark": "#E8B8B0",
        "beige": "#F0E4D4",
        "beige-dark": "#DDD0BC",
        "warm-white": "#FAF8F5",
        "ink": "#1A1410",
        "ink-light": "#3D2B1F",
      },
      fontFamily: {
        serif: ["var(--font-cormorant)", "Cormorant Garamond", "Georgia", "serif"],
        sans: ["var(--font-dm-sans)", "DM Sans", "system-ui", "sans-serif"],
      },
      spacing: {
        "128": "32rem",
        "144": "36rem",
      },
      borderRadius: {
        "4xl": "2rem",
      },
      boxShadow: {
        "luxury": "0 4px 40px rgba(107, 28, 42, 0.08)",
        "luxury-lg": "0 8px 60px rgba(107, 28, 42, 0.12)",
        "gold": "0 4px 20px rgba(201, 168, 76, 0.3)",
        "soft": "0 2px 20px rgba(0,0,0,0.06)",
        "card": "0 1px 3px rgba(0,0,0,0.05), 0 8px 24px rgba(0,0,0,0.08)",
        "card-hover": "0 4px 12px rgba(0,0,0,0.06), 0 16px 40px rgba(107, 28, 42, 0.15)",
      },
      backgroundImage: {
        "gradient-luxury": "linear-gradient(135deg, #F5F0E8 0%, #FFFFF0 50%, #F7E7CE 100%)",
        "gradient-maroon": "linear-gradient(135deg, #4A1018 0%, #6B1C2A 100%)",
        "gradient-gold": "linear-gradient(135deg, #C9A84C 0%, #E2C87E 50%, #C9A84C 100%)",
        "gradient-hero": "linear-gradient(to right, rgba(74, 16, 24, 0.7), rgba(74, 16, 24, 0.2))",
        "gradient-card": "linear-gradient(to top, rgba(26, 20, 16, 0.6) 0%, transparent 60%)",
      },
      animation: {
        "fade-up": "fadeUp 0.6s ease-out forwards",
        "fade-in": "fadeIn 0.5s ease-out forwards",
        "shimmer": "shimmer 2s infinite",
        "float": "float 3s ease-in-out infinite",
        "spin-slow": "spin 8s linear infinite",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-8px)" },
        },
      },
      transitionTimingFunction: {
        "luxury": "cubic-bezier(0.25, 0.1, 0.25, 1)",
        "spring": "cubic-bezier(0.34, 1.56, 0.64, 1)",
      },
      screens: {
        "xs": "375px",
      },
    },
  },
  plugins: [],
};

export default config;
