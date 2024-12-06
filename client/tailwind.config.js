/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#f9f9f9",
        secondary: "#1f2937",
        accent: "#00bcd4",
        background: "#f9f9f9",
        textPrimary: "#333333",
      },
    },
  },
  plugins: [],
}

