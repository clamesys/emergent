/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
    extend: {
      screens: {
        'xs': '375px',
        '3xl': '1600px',
        '4xl': '1920px',
      },
      fontFamily: {
        'primary': ['Inter', 'system-ui', 'sans-serif'],
        'accent': ['Orbitron', 'monospace'],
        'mono': ['JetBrains Mono', 'monospace'],
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
      animation: {
        'spin-slow': 'spin 3s linear infinite',
        'pulse-slow': 'pulse 3s ease-in-out infinite',
        'bounce-slow': 'bounce 2s infinite',
        'shimmer': 'shimmer 3s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        shimmer: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        glow: {
          '0%': { 
            textShadow: '0 0 20px rgba(255, 255, 255, 0.5)',
            filter: 'brightness(1)'
          },
          '100%': { 
            textShadow: '0 0 30px rgba(255, 255, 255, 0.8)',
            filter: 'brightness(1.2)'
          },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(ellipse at center, var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'circuit-pattern': 'radial-gradient(circle at 25px 25px, rgba(255, 255, 255, 0.05) 2px, transparent 0), radial-gradient(circle at 75px 75px, rgba(255, 255, 255, 0.03) 2px, transparent 0)',
      },
      backdropBlur: {
        'xs': '2px',
      },
      boxShadow: {
        'glass': '0 8px 32px rgba(31, 38, 135, 0.37)',
        'glow': '0 0 20px rgba(255, 255, 255, 0.3)',
        'glow-lg': '0 0 40px rgba(255, 255, 255, 0.4)',
      },
      colors: {
        'glass': {
          50: 'rgba(255, 255, 255, 0.05)',
          100: 'rgba(255, 255, 255, 0.1)',
          200: 'rgba(255, 255, 255, 0.2)',
        }
      }
    },
  },
  plugins: [],
};