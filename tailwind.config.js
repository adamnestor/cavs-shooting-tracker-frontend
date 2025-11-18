/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        cavsHeader: ["Bebas Neue", "sans-serif"],
        cavsBody: ["Inter", "sans-serif"],
      },
      colors: {
        cavsWine: "#860038",
        cavsNavy: "#041E42",
        cavsGold: "#FDBB30",
      },
    },
  },
  plugins: [],
};
