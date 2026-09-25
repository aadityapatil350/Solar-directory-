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
        // GoSolarIndex Design System: 3 colours only (Ink, Paper, Sun)
        ink: {
          DEFAULT: '#1F2A37',
          2: 'rgba(31, 42, 55, 0.68)',
        },
        paper: {
          DEFAULT: '#FFFFFF',
        },
        sun: {
          DEFAULT: '#F2A30F',
          wash: 'rgba(242, 163, 15, 0.14)',
        },
        line: 'rgba(31, 42, 55, 0.14)',
        wash: 'rgba(31, 42, 55, 0.04)',
      },
      fontFamily: {
        heading: ['var(--font-anek)', '"Mukta"', '"Segoe UI"', 'Roboto', 'system-ui', 'sans-serif'],
        body: ['var(--font-mukta)', '"Segoe UI"', 'Roboto', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        sm: '4px',
        md: '8px',
      },
      boxShadow: {
        float: '0 6px 24px rgba(20, 38, 74, 0.14)',
      },
      maxWidth: {
        prose: '680px',
        content: '1200px',
      },
    },
  },
  plugins: [],
};

export default config;
