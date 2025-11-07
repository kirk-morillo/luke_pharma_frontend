// postcss.config.cjs

module.exports = {
  // This object format is typically more robust in handling 
  // plugin ordering and integration in PostCSS/Vite.
  plugins: {
    'tailwindcss': {},
    'autoprefixer': {},
  },
};