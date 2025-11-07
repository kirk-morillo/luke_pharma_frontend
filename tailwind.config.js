/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    // This line is crucial: it tells Tailwind to scan all files 
    // inside the 'src' directory (and its subdirectories) 
    // that end with .vue, .js, .ts, etc.
    "./src/**/*.{vue,js,ts,jsx,tsx}", 
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}