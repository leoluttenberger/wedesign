const formKitTailwind = require("@formkit/themes/tailwindcss");
module.exports = {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "wd-green": "#00e0ac",
        "wd-error": "#ff5e71",
        "wd-edit": "#FFE175",
        "wd-light-green": "#ebfffa40",
        "wd-pink": "#FF1787",
        "wd-yellow": "#FAC643",
        "wd-blue": "#0094FF",
        "wd-white": "#ffffff",
        "wd-background": "#ebfffa",
        "transparent-black": "#00000033",
        "transparent-green": "#00e0ac40",
      },
      fontFamily: {
        Montserrat: ["Montserrat", "sans-serif"],
      },
    },
  },
  plugins: [formKitTailwind],
};
