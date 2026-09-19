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
        background: '#090a0f',
        surface: {
          50: '#151722',
          100: '#1b1e2e',
          200: '#23273c',
          300: '#2e334d',
        },
        brand: {
          emerald: '#01fe93',
          violet: '#7928ca',
          cyan: '#00f0ff',
          amber: '#ffb703',
          rose: '#ff0055',
        },
        border: '#23273c',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      animation: {
        'pulse-glow': 'pulse-glow 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        'pulse-glow': {
          '0%, 100%': { opacity: '1', filter: 'drop-shadow(0 0 10px rgba(1, 254, 147, 0.6))' },
          '50%': { opacity: '.6', filter: 'drop-shadow(0 0 2px rgba(1, 254, 147, 0.2))' },
        },
      },
    },
  },
  plugins: [],
}
