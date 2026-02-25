/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        alabaster: '#FDFBF7',
        charcoal: '#2C2C2C',
        terracotta: '#D4A574',
        whisper: '#E8E4DF',
      },
      fontFamily: {
        serif: ['Cormorant Garamond', 'Georgia', 'serif'],
        sans: ['Open Sans', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
