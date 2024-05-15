/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        gray: {
          100: '#F7FAFC',
          200: '#EDF2F7',
          300: '#E2E8F0',
          400: '#CBD5E0',
          500: '#A0AEC0',
          600: '#718096',
          700: '#4A5568',
          800: '#2D3748',
          900: '#1A202C',
        },
        whitePro: '#F6F6F6',
        blackPro: '#383636',
        purplePro: '#9F1EE8',
        violetPro: '#7A2FFF',
        bluePro: '#2147FF',
        primary: '#6C63FF',
        secondary: '#4AA1FF',
        accent: '#FFC75F',
      },
    },
    fontFamily: {
      pop: ['pop', 'sans-serif'],
    },
  },
  plugins: [],
};
