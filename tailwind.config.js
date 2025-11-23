/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Helvetica", "Arial", "sans-serif"],
      },
      colors: {
        // Custom colors matching the dark theme in screenshots
        "zinc-850": "#1f2024", // Slightly lighter than black for cards
        "zinc-900": "#121212", // Deep background
        "app-bg": "#1c1c1e", // Main app background matching ref.png
      },
    },
  },
  plugins: [],
};
