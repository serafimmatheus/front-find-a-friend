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
      red: {
        200: "#FBE1E2",
        500: "#F15156",
        600: "#E44449",
      },
      white: "#ffffff",
      yellow: "#F4D35E",
      gray: {
        100: "#D9D9D9",
        400: "#0D3B66",
      },
    },
  },
  plugins: [],
};
