/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        night: '#07080d',
        gold: '#d7ab60',
        copper: '#b96a45',
      },
      boxShadow: {
        glow: '0 8px 35px rgba(215, 171, 96, 0.25)',
      },
    },
  },
  plugins: [],
};
