import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        heroLeft: "#2A254B",
        heroRight: "#A6C3C1",
        footer: "#2A254B",
        bgWhite: "var(--bg-white)",
        foreground: "var(--foreground)",
        navbarColor: "var(--navbar-color)",
        lightGray: "var(--light-gray)",
        darkPrimary: "var(--dark-primary)",
        darkBlue: "var(--dark-blue)",
      },
      fontFamily: {
        clash: ["Clash Display", "sans-serif"],
        clash2: ["Clash Display 2", "sans-serif"],
        satoshi: ["Satoshi", "sans-serif"],
      },
      screens: {
        xs: { max: '639px' },
        xxs: { max: '534px' },
      },
    },
  },
  plugins: [],
};
export default config;
