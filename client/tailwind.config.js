/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'custom-gray': 'rgba(51, 51, 51, 0.8)',
      },
      fontFamily: {
        sans: ['"Google Sans"', 'Roboto', 'RobotoDraft', 'Helvetica', 'Arial', 'sans-serif'],
      },
    },
  },
  plugins: [],
}