/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        forest: '#1C4A3E',
        terra: '#C4623A',
        sage: '#7AAF96',
        cream: '#FAF7F2',
        ink: '#1A2420',
        mist: '#9DB8AE',
      },
      fontFamily: {
        playfair: ['"Playfair Display"', 'serif'],
        dm: ['"DM Sans"', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
