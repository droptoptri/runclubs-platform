import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './lib/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        background: '#F9F9F7',
        accent: '#B9FF66',
        accentBlue: '#0077FF',
        ink: '#111111'
      },
      boxShadow: {
        soft: '0 10px 30px rgba(17, 17, 17, 0.08)'
      },
      fontFamily: {
        sans: ['var(--font-inter)']
      }
    }
  },
  plugins: []
};

export default config;
