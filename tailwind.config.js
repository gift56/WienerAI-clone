/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],

  theme: {
    extend: {
      fontFamily: {
        sauage: "Sausages, sans-serif",
      },
      colors: {
        primary: "#ba8bf9",
      },
      backgroundImage: {
        heroBg: "url('/images/hero.gif')",
        heroLinearBg:
          "linear-gradient(0deg, rgba(0, 5, 50, 0.89) 0%, rgba(0, 5, 50, 0.4) 100%)",
        heroCard:
          "linear-gradient(0deg, rgba(172, 142, 235, 0.4), rgba(172, 142, 235, 0.4)), linear-gradient(0deg, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4))",
        tokenmicBg: "url('/images/tokenmicBg.svg')",
        howBg: "url('/images/howBg.svg')",
      },
    },
  },
  plugins: [],
};
