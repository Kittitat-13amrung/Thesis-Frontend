export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontSize: {
        clamp: "clamp(1rem, 5vw, 3rem)",
      },
      // fontFamily: {
      //   sans: ["Jomhuria", "sans-serif"],
      // },
    },
  },
  plugins: [],
}