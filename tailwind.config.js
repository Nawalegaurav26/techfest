/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#050505',
        surface: '#131313',
        primary: '#00f2ff',
        secondary: '#ff00ff',
        tertiary: '#00ff41',
      },
      fontFamily: {
        geist: ['Geist', 'sans-serif'],
        space: ['Space Mono', 'monospace'],
        mono: ['JetBrains Mono', 'monospace'],
      },
    },
  },
  plugins: [],
}
