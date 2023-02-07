const { fontFamily } = require("tailwindcss/defaultTheme");
/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./pages/**/*{js,jsx,ts,tsx}", "./components/**/*{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-noto)", ...fontFamily.sans],
      },
    },
  },
  darkMode: "media", // class
  plugins: [require("@tailwindcss/forms")],
};
