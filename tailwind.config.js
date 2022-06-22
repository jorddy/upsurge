/**@type{import("tailwindcss").Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    container: {
      center: true,
      padding: "2rem"
    },
    extend: {
      animation: {
        scale: "scale 150ms linear"
      },
      keyframes: {
        scale: {
          from: { opacity: 0, transform: "scale(0.75)" },
          to: { opacity: 1, transform: "scale(1)" }
        }
      }
    }
  },
  plugins: []
};
