/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  darkMode: ['class'],
  theme: {
    extend: {
      colors: {
        error: {
          main: '#ff0000',
        },
      },
    },
  },
  plugins: [],
};