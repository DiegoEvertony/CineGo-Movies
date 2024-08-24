/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,js}",
    "./**/*.{html,js}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'custom-gradient': 'linear-gradient(180deg, rgba(13,12,15,0) 40%, rgba(13,12,15,1) 100%);',

        'custom-gradient2': 'linear-gradient(90deg, rgba(13,12,15,1) 0%, rgba(13,12,15,0) 20%, rgba(13,12,15,0) 80%, rgba(13,12,15,1) 100%);',

        'custom-gradient3': 'linear-gradient(270deg, rgba(13,12,15,0) 0%, rgba(13,12,15,0.13014524657519255) 50%, rgba(13,12,15,1) 100%);',
      },

      colors: {
        'color-gray': '#0D0C0F',
        'color-gray-transparent': '#0d0c0f43',
      },
      
      fontFamily: {
        inter_sans: ["Inter", "sans-serif"]
      },
      
    },
  },
  plugins: [],
}

