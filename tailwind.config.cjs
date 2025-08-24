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
          50: 'rgb(74 144 226 / 0.05)',
          100: 'rgb(74 144 226 / 0.1)',
          200: 'rgb(74 144 226 / 0.2)',
          300: 'rgb(74 144 226 / 0.3)',
          400: 'rgb(74 144 226 / 0.4)',
          500: 'rgb(74 144 226 / 0.5)',
          600: 'rgb(74 144 226 / 0.6)',
          700: 'rgb(74 144 226 / 0.7)',
          800: 'rgb(74 144 226 / 0.8)',
          900: 'rgb(74 144 226 / 0.9)',
          950: 'rgb(74 144 226 / 0.95)'
        },
        'mh-accent': {
          DEFAULT: 'var(--mh-accent)',
          50: 'rgb(123 179 240 / 0.05)',
          100: 'rgb(123 179 240 / 0.1)',
          200: 'rgb(123 179 240 / 0.2)',
          300: 'rgb(123 179 240 / 0.3)',
          400: 'rgb(123 179 240 / 0.4)',
          500: 'rgb(123 179 240 / 0.5)',
          600: 'rgb(123 179 240 / 0.6)',
          700: 'rgb(123 179 240 / 0.7)',
          800: 'rgb(123 179 240 / 0.8)',
          900: 'rgb(123 179 240 / 0.9)',
          950: 'rgb(123 179 240 / 0.95)'
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
