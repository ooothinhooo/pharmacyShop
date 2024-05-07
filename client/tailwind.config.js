/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    screens: {
      sm: "600px",
      md: "768px",
      lg: "984px",
      "1lg": "1200px",
      xl: "1240px",
    },

    extend: {
      colors: {
        primaryColor: "var(--primary-color)",
        secondaryColor: "var(--secondary-color)",
      },
    },
  },

  plugins: [],
};
