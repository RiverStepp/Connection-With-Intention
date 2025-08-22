/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'mh-bg': 'var(--mh-bg)',
        'mh-surface': 'var(--mh-surface)', 
        'mh-primary': {
          DEFAULT: 'var(--mh-primary)',
          50: 'rgb(45 106 106 / 0.05)',
          100: 'rgb(45 106 106 / 0.1)',
          200: 'rgb(45 106 106 / 0.2)',
          300: 'rgb(45 106 106 / 0.3)',
          400: 'rgb(45 106 106 / 0.4)',
          500: 'rgb(45 106 106 / 0.5)',
          600: 'rgb(45 106 106 / 0.6)',
          700: 'rgb(45 106 106 / 0.7)',
          800: 'rgb(45 106 106 / 0.8)',
          900: 'rgb(45 106 106 / 0.9)',
          950: 'rgb(45 106 106 / 0.95)'
        },
        'mh-accent': {
          DEFAULT: 'var(--mh-accent)',
          50: 'rgb(134 182 179 / 0.05)',
          100: 'rgb(134 182 179 / 0.1)',
          200: 'rgb(134 182 179 / 0.2)',
          300: 'rgb(134 182 179 / 0.3)',
          400: 'rgb(134 182 179 / 0.4)',
          500: 'rgb(134 182 179 / 0.5)',
          600: 'rgb(134 182 179 / 0.6)',
          700: 'rgb(134 182 179 / 0.7)',
          800: 'rgb(134 182 179 / 0.8)',
          900: 'rgb(134 182 179 / 0.9)',
          950: 'rgb(134 182 179 / 0.95)'
        },
        'mh-error': {
          DEFAULT: 'var(--mh-error)',
          50: 'rgb(220 38 38 / 0.05)',
          100: 'rgb(220 38 38 / 0.1)',
          200: 'rgb(220 38 38 / 0.2)',
          300: 'rgb(220 38 38 / 0.3)',
          400: 'rgb(220 38 38 / 0.4)',
          500: 'rgb(220 38 38 / 0.5)',
          600: 'rgb(220 38 38 / 0.6)',
          700: 'rgb(220 38 38 / 0.7)',
          800: 'rgb(220 38 38 / 0.8)',
          900: 'rgb(220 38 38 / 0.9)',
          950: 'rgb(220 38 38 / 0.95)'
        },
        'mh-success': {
          DEFAULT: 'var(--mh-success)',
          50: 'rgb(5 150 105 / 0.05)',
          100: 'rgb(5 150 105 / 0.1)',
          200: 'rgb(5 150 105 / 0.2)',
          300: 'rgb(5 150 105 / 0.3)',
          400: 'rgb(5 150 105 / 0.4)',
          500: 'rgb(5 150 105 / 0.5)',
          600: 'rgb(5 150 105 / 0.6)',
          700: 'rgb(5 150 105 / 0.7)',
          800: 'rgb(5 150 105 / 0.8)',
          900: 'rgb(5 150 105 / 0.9)',
          950: 'rgb(5 150 105 / 0.95)'
        },
        'mh-ink': 'var(--mh-ink)',
        'mh-muted': 'var(--mh-muted)',
        'mh-border': 'var(--mh-border)',
        'mh-warning': 'var(--mh-warning)'
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        serif: ['Crimson Text', 'Georgia', 'serif']
      },
      container: {
        center: true,
        padding: {
          DEFAULT: '1rem',
          sm: '2rem',
          lg: '4rem',
          xl: '5rem',
          '2xl': '6rem'
        },
        screens: {
          sm: '640px',
          md: '768px', 
          lg: '1024px',
          xl: '1280px',
          '2xl': '1400px'
        }
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.6s ease-out',
        'scale-in': 'scaleIn 0.3s ease-out'
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' }
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' }
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' }
        }
      }
    }
  },
  plugins: [
    require('@tailwindcss/forms')({
      strategy: 'class'
    }),
    require('@tailwindcss/typography')
  ]
}
