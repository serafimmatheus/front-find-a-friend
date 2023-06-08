/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    fontFamily: {
      nunito: ["Nunito", "sans-serif"],
    },

    colors: {
      linear: {
        100: "#E6F7FB",
      },
      red: {
        100: "#F5F8FA",
        150: "#FDECED",
        200: "#FBE1E2",
        500: "#F15156",
        600: "#E44449",
      },
      white: "#ffffff",
      yellow: "#F4D35E",
      gray: {
        50: "#F5F8FA",
        75: "#D3E2E5",
        100: "#D9D9D9",
        200: "#8FA7B2",
        300: "#114A80",
        400: "#0D3B66",
      },
      orange: {
        400: "#F27006",
      },
      green: {
        400: "#3CDC8C",
      },
    },
  },
  plugins: [],
};
