module.exports = {
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    colors : {
      green: "#417B5A",
      white: "#FFFFFF",
      blue: "#1F2041"
    },
    screens: {
      sm: '480px',
      md: '768px',
      lg: '976px',
      xl: '1440px',
    },
    extend: {
      backgroundImage: theme => ({
        'home': "url('/img/refway1.jpg')",
        'work': "url('/img/work.jpg')",
        'house': "url('/img/house.jpg')",
        'language': "url('/img/language.jpg')",
        'culture': "url('/img/culture.jpg')",
        'organisations': "url('/img/organisations.jpg')",
       })
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
