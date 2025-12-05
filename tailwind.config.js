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
      },
    },
  },
  plugins: [
    require('flowbite/plugin'), // ✅ works fine with Tailwind v3
  ],
  darkMode: 'class',
};
