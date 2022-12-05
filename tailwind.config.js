/** @type {import('tailwindcss').Config} */
module.exports = {
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  content: [],
  darkMode: false,
  theme: {
    extend: {
      fontFamily: {
        rock: ["-apple-system"],
      },
    },
  },
  variants: {},
  plugins: [],
}
