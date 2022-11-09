const formKitTailwind = require("@formkit/themes/tailwindcss");

module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "wd-green": "#00e0ac",
        "wd-error": "#ff5e71",
        "wd-edit": "#FFE175",
        "wd-light-green": "#ebfffa40",
        "wd-white": "#ffffff",
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
