/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        bg:       '#070b14',
        surface:  '#0d1525',
        surface2: '#111e33',
        border:   '#1a2a45',
        border2:  '#243550',
        orange:   '#ff6b1a',
        'orange-d': '#cc4f0a',
        'orange-l': '#ff8c4a',
        cyan:     '#00d4ff',
        green:    '#00f5a0',
        pink:     '#e6007a',
        purple:   '#9b59ff',
        muted:    '#5a6a85',
        muted2:   '#3a4a65',
      },
      fontFamily: {
        syne: ['Syne', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      keyframes: {
        fadeUp:   { from: { opacity: 0, transform: 'translateY(16px)' }, to: { opacity: 1, transform: 'translateY(0)' } },
        fadeIn:   { from: { opacity: 0 }, to: { opacity: 1 } },
        toastIn:  { from: { opacity: 0, transform: 'translateX(40px)' }, to: { opacity: 1, transform: 'translateX(0)' } },
        modalIn:  { from: { opacity: 0, transform: 'scale(.95) translateY(20px)' }, to: { opacity: 1, transform: 'scale(1) translateY(0)' } },
        shimmer:  { '0%,100%': { opacity: 0 }, '50%': { opacity: 0.5 } },
        pulse:    { '0%,100%': { opacity: 1 }, '50%': { opacity: 0.3 } },
      },
      animation: {
        fadeUp:  'fadeUp .4s ease both',
        fadeIn:  'fadeIn .3s ease both',
        toastIn: 'toastIn .35s cubic-bezier(.34,1.2,.64,1) both',
        modalIn: 'modalIn .3s cubic-bezier(.34,1.2,.64,1) both',
        shimmer: 'shimmer 2s infinite',
        pulse:   'pulse 2s infinite',
      },
      boxShadow: {
        orange: '0 0 28px rgba(255,107,26,.45)',
        'orange-lg': '0 0 48px rgba(255,107,26,.6)',
      },
    },
  },
  plugins: [],
}
