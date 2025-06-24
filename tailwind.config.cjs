const rtl = require('tailwindcss-rtl');

module.exports = {
  content: [
    './index.html',
    './src/**/*.{vue,ts}'
  ],
  theme: {
    extend: {},
  },
  plugins: [rtl()],
};
