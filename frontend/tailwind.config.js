/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        'khmer': ['Kantumruy Pro', 'sans-serif'],
        'inter': ['Inter', 'sans-serif'],
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'fade-in': 'fadeIn 0.5s ease-out',
        'slide-up': 'slideUp 0.3s ease-out',
      },
      colors: {
        'khmer-blue': '#2563eb',
        'khmer-emerald': '#10b981',
        'khmer-violet': '#8b5cf6',
        'khmer-amber': '#f59e0b',
        'khmer-slate': '#0f172a',
      }
    },
  },
  plugins: [],
}