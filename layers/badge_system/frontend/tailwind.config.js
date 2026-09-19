/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#1d242d",
        paper: "#f8fafc",
        accent: "#0f766e",
        action: "#b91c1c",
      },
    },
  },
  plugins: [],
};
