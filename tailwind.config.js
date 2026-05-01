/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#1a1a1a",
        secondary: "#ffffff",
        accent: "#d4af37", // Gold accent for luxury feel
        muted: "#f5f5f5",
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        serif: ['Playfair Display', 'serif'], // Elegant serif for headings
      }
    },
  },
  plugins: [],
}
