/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#0A7075',
          dark: '#032F30',
          light: '#10A1A7',
        },
        secondary: {
          DEFAULT: '#6BA3BE',
          dark: '#274D60',
          light: '#8FBFD6',
        },
        accent: {
          DEFAULT: '#0C969C',
          light: '#6BA3BE',
          lighter: '#A3D5E4',
        },
        highlight: '#e5924a',
        darkTeal: '#032F30',
        teal: '#0A7075',
        lightTeal: '#0C969C',
        skyBlue: '#6BA3BE',
        navyBlue: '#4682B4',
        extraGray:'#708090',
        extraBlack:'#232B2B',
        background: {
          dark: '#032F30',
          light: '#F0F4F8',
        },
        text: {
          dark: '#FFFFFF',
          light: '#1A202C',
        },
      },
    },
  },
  plugins: [],
  variants: {
    extend: {
      opacity: ['disabled'],
      cursor: ['disabled'],
      backgroundColor: ['active', 'hover', 'dark'],
      textColor: ['active', 'hover', 'dark'],
      scale: ['hover', 'active'],
      transform: ['hover', 'focus'],
    },
  },
};

