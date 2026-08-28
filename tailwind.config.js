/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: {
          50: '#FDFBF7',
          100: '#FAF7F0',
          200: '#F4ECE1',
          300: '#EBDDCC',
          400: '#DCC5AB',
        },
        sage: {
          50: '#F2F7F4',
          100: '#E2EFE7',
          200: '#C7E0D2',
          300: '#A3CBB5',
          400: '#76AD91',
          500: '#4D8E6F',
          600: '#387357',
          700: '#2C5C46',
          800: '#1F6F43',
          900: '#17472C',
        },
        terracotta: {
          50: '#FFF6F2',
          100: '#FFE9DF',
          200: '#FFD4C2',
          300: '#FFB497',
          400: '#F88763',
          500: '#E05A36',
          600: '#CA421F',
          700: '#A83215',
          800: '#8A2A14',
          900: '#702514',
        },
        charcoal: {
          800: '#232B25',
          900: '#171D19',
          950: '#0E1310',
        }
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'soft': '0 4px 20px -2px rgba(27, 36, 30, 0.06), 0 2px 6px -1px rgba(27, 36, 30, 0.03)',
        'soft-lg': '0 12px 32px -4px rgba(27, 36, 30, 0.08), 0 4px 12px -2px rgba(27, 36, 30, 0.04)',
        'soft-xl': '0 20px 48px -6px rgba(27, 36, 30, 0.12), 0 8px 16px -4px rgba(27, 36, 30, 0.06)',
      },
      borderRadius: {
        '3xl': '1.5rem',
        '4xl': '2rem',
      }
    },
  },
  plugins: [],
}
