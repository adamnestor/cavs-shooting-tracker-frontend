/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        cavsHeader: ["Inter", "sans-serif"],
        cavsBody: ["Inter", "sans-serif"],
      },
    },
  },
  plugins: [],
};
