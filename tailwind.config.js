/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#2d3748',
        secondary: '#edf2f7',
        accent: '#319795',
      },
    },
  },
  plugins: [],
} 