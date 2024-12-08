/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      boxShadow: {
        custom: "5px 0 10px -2px rgba(0,0,0,0.1)",
      },
      colors: {
        default: {
          100: "#EBEBF3", // Very light gray
          150: "#DFDFE8", // Light gray
          200: "#C8C8DB", // Slightly darker light gray
          250: "#B2B2CF", // Soft gray
          300: "#A5A5C4", // Medium-light gray
          350: "#9090B7", // Slightly darker medium gray
          400: "#8282AD", // Muted blue-gray
          450: "#6D6DA0", // Dull blue-gray
          500: "#5E5E95", // Mid-tone blue-gray
          550: "#51517F", // Darker blue-gray
          600: "#3B3B7E", // Muted deep blue
          650: "#313164", // Dark slate blue
          700: "#29284a", // Dark blue from SVG
          750: "#222140", // Darker blue from SVG
          800: "#24243C", // Background color you added
          850: "#151532", // Very dark navy blue
          900: "#10102C", // Background from SVG, very dark blue
        },
        supernova: {
          100: "#f2f2f3", // Very light gray, almost white
          150: "#e5e6e8", // Slightly darker gray
          200: "#d1d2d5", // Light gray
          250: "#bcbec1", // Soft gray
          300: "#a7a9ac", // Medium-light gray
          350: "#939598", // Neutral gray
          400: "#7f8184", // Darker neutral gray
          450: "#6b6d70", // Slate gray
          500: "#56585b", // Dark slate gray
          550: "#424447", // Even darker slate gray
          600: "#2e3032", // Dark charcoal gray
          650: "#292b2c", // Slightly darker charcoal
          700: "#242627", // Dark charcoal with cool undertones
          750: "#1e1f21", // Very dark charcoal
          800: "#18191a", // Almost black with subtle warmth
          850: "#131314", // Very deep black-gray
          900: "#0e0e0f", // Pure black with slight depth
        },
      },
      fontFamily: {
        default: ["Raleway", "sans-serif"],
        logo: ["DynaPuff", "sans-serif"],
        subtitle: ["Ubuntu, sans-serif"],
      },
    },
  },
  plugins: [],
};
