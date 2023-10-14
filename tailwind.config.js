/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        error: "#BF0E0E",
        "json-key": "#4E9590",
        "json-bracket": "#F2CAB8",
        "json-gray": "#BFBFBF",
      },
    },
  },
  plugins: [],
};
