
const withMT = require("@material-tailwind/react/utils/withMT");

/** @type {import('tailwindcss').Config} */
module.exports = withMT({
  content: [],
  theme: {
    fontFamily: {
      sans: ["Outfit", "sans-serif"],
    },
    extend: {
      colors: {
        teal: {
          500: '#4db6ac',
          700: '#4db6ac', 
          // ... add other shades as needed
        },
      },
    },
  },
  plugins: [],
});




