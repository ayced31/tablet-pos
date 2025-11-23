/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        // Custom colors matching the dark theme in screenshots
        "zinc-850": "#1f2024", // Slightly lighter than black for cards
        "zinc-900": "#121212", // Deep background
      },
    },
  },
  plugins: [],
};
