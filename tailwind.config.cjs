/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        green: '#0ae98a',
        blue: '#121F3D',
        darkblue: '#13161c',
        skyblue: '#0ae98a',
      },
      fontFamily: {
        sans: ['IBM Plex Sans', 'sans-serif'],
      },
      animation: {
        'fade-in-scale': 'fadeInScale 1s ease-out forwards',
        'fade-in-right': 'fadeInRight 1s ease-out forwards',
        'fade-in-up': 'fadeInUp 1s ease-out forwards',
      },
      keyframes: {
        fadeInScale: {
          '0%': { opacity: '0', transform: 'scale(1.6)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        fadeInRight: {
          '0%': { opacity: '0', transform: 'translateX(20px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(32px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animationDelay: {
        '300': '300ms',
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      addUtilities({
        '.animate-delay-300': {
          'animation-delay': '300ms',
        },
      });
    },
  ],
};
