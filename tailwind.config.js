const withMT = require("@material-tailwind/react/utils/withMT");

/** @type {import('tailwindcss').Config} */
module.exports = withMT({
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    fontFamily: {
      sans: ["Rubik", "sans-serif"],
    },
    extend: {
      colors : {
        teal: {
          400: "#14b8a6",
          // 500: "#14b8a6",
        },
      },

      fontSize: {
        'w': '1rem',
        'instruction': '1.2rem',
      },
    },
  },
  plugins: [],
  safelist: [
    '←', // Left arrow
    '↓', // Down arrow
    '→', // Right arrow
  ],
});
