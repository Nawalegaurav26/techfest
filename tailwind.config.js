/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#03000a',
        surface: '#0a0514',
        'surface-panel': 'rgba(255, 255, 255, 0.03)',
        primary: '#00f2ff', // Cyan
        secondary: '#ff00ff', // Magenta
        tertiary: '#ffaa00', // Gold for ancient wisdom
        'primary-glow': 'rgba(0, 242, 255, 0.5)',
        'secondary-glow': 'rgba(255, 0, 255, 0.5)',
        'tertiary-glow': 'rgba(255, 170, 0, 0.5)',
      },
      fontFamily: {
        geist: ['Geist', 'sans-serif'],
        cinzel: ['Cinzel', 'serif'],
        playfair: ['"Playfair Display"', 'serif'],
        space: ['Space Mono', 'monospace'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      backgroundImage: {
        'cosmos': "radial-gradient(ellipse at bottom, #1b2735 0%, #090a0f 100%)",
        'ancient-ruins': "url('/ruins-silhouette.svg')",
      }
    },
  },
  plugins: [],
}
