/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#ff4500",
        secondary: "#ffcc00",
        accent: "#00bcd4",
        background: "#f9f9f9",
        textPrimary: "#333333",
      },
    },
  },
  plugins: [],
}

