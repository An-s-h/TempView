/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: 'class', // Enable dark mode
  theme: {
    extend: {
      fontFamily: {
        SecondaSoft:['SecondaSoft' , 'sans-serif'],
      },
    },
  },
  plugins: [ require('tailwind-scrollbar-hide')],
}
