/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
    './node_modules/flowbite/**/*.js',
    './node_modules/flowbite-react/**/*.js'
  ],
  theme: {
    extend: {}
  },
  plugins: [require('flowbite/plugin'), require('flowbite-react')]
};
