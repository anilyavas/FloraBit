/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,ts,tsx}', './components/**/*.{js,ts,tsx}'],

  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        primaryGreen: '#4CAF50', // Main green
        darkGreen: '#2E7D32', // Darker green
        lightGreen: '#A5D6A7', // Soft green

        backgroundLight: '#F1F8E9', // Light background (for plant themes)
        backgroundDark: '#121212', // Dark theme background (if needed)

        textPrimary: '#2E3B2F', // Rich earthy text color
        textSecondary: '#5F755E', // Softer muted text

        accentYellow: '#FDD835', // Sunlight yellow
        accentOrange: '#EF6C00', // Earthy orange
        accentBlue: '#42A5F5', // Sky blue
        accentPurple: '#8E44AD', // Deep lavender

        softBrown: '#8D6E63', // Soil brown
        deepForest: '#1B5E20', // Deep green (for dark mode elements)
      },
    },
  },
  plugins: [],
};
