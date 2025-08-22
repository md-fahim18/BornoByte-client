/** @type {import('tailwindcss').Config} */
import defaultTheme from 'tailwindcss/defaultTheme'

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class', // Ensure dark mode variants work with data-theme
  theme: {
    extend: {
      fontFamily: {
        berlin: ['Berlin Sans FB Demi', ...defaultTheme.fontFamily.sans],
      },
      colors: {
        'important-text': {
          DEFAULT: '#4f46e5', // Indigo-600 in light mode
          dark: '#f59e0b', // Amber-500 in dark mode
        },
      },
    },
  },
  plugins: [require('daisyui')],
  daisyui: {
    themes: [
      {
        light: {
          primary: "#4f46e5", // Indigo-600 for buttons, etc.
          "base-content": "#000000", // Black for normal text
          secondary: "#6b7280",
          accent: "#f59e0b",
          neutral: "#374151",
          "base-100": "#ffffff",
          "base-200": "#f3f4f6",
          "base-300": "#e5e7eb",
          "--animation-btn": "0.25s",
          "--btn-text-case": "uppercase",
          "--rounded-btn": "0.2rem",
        },
        dark: {
          primary: "#f59e0b", // Amber-500 for buttons, etc.
          "base-content": "#ffffff", // White for normal text
          secondary: "#9ca3af",
          accent: "#4f46e5",
          neutral: "#1f2937",
          "base-100": "#1f2937",
          "base-200": "#374151",
          "base-300": "#4b5563",
          "--animation-btn": "0.25s",
          "--btn-text-case": "uppercase",
          "--rounded-btn": "0.2rem",
        },
      },
      "synthwave",
      "retro",
    ],
  },
};