/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{html,ts,css,scss}',
    './node_modules/flowbite/**/*.js', // ✅ Flowbite components (optional)
  ],
  theme: {
    extend: {
      colors: {
        sky: require('tailwindcss/colors').sky,
        primary: {
          700: '#1d4ed8', // dark blue for dark mode
        },
        // Mahakaal Spiritual Theme Colors
        saffron: {
          50: '#fff5e6',
          100: '#ffebcc',
          200: '#ffd699',
          300: '#ffc266',
          400: '#ffad33',
          500: '#ff9900', // Primary Brand Color
          600: '#cc7a00',
          700: '#995c00',
          800: '#663d00',
          900: '#331f00',
        },
        maroon: {
          500: '#800000',
          600: '#660000',
          700: '#4d0000',
        },
        gold: {
          100: '#fcf8e3',
          200: '#f9f1c6',
          300: '#f6eaaa',
          400: '#f3e38d',
          500: '#daa520', // Goldenrod
          600: '#af841a',
        },
        cream: {
          50: '#fffbf0',
          100: '#fffdf5',
        }
      },
    },
  },
  plugins: [
    require('flowbite/plugin'), // ✅ works fine with Tailwind v3
  ],
  darkMode: 'class',
};
