import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Toned-down, elegant pastel warm amber palette replacing blinding neon orange
        orange: {
          50: '#fffbeb',  // soft pastel cream
          100: '#fef3c7', // warm pastel amber
          200: '#fde68a', // delicate warm yellow
          300: '#fcd34d',
          400: '#fbbf24',
          500: '#d97706', // sophisticated warm amber (replaces neon #f97316)
          600: '#b45309', // refined deep amber (replaces neon #ea580c)
          700: '#92400e',
          800: '#78350f',
          900: '#451a03',
        },
        primary: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#18181b', // sleek zinc-900 Vercel aesthetic
          600: '#09090b',
          700: '#000000',
        },
      },
    },
  },
  plugins: [],
};
export default config;
