/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: "#5B4CFF",
          dark: "#3D2FCF",
          light: "#EDEBFF",
        },
      },
    },
  },
  plugins: [],
};
