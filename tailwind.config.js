/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          light: '#10b981',
          DEFAULT: '#2E6A56',
          dark: '#047857',
          darker: '#065f46',
        },
        dark: {
          DEFAULT: '#1f2937',
          light: '#374151',
        },
        headerBg: {
          DEFAULT: '#F6F8F6',
        }
      },
    },
  },
  plugins: [],
}

