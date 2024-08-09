/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./*.{html,js}"],
  theme: {
    extend: {
      
      screens:
      {
        'mobile-sm': '320px',
        // => @media (min-width: 320px) { ... }
        
        'mobile-md': '375px',
        // => @media (min-width: 375px) { ... }

        'mobile-lg': '425px',
        // => @media (min-width: 425px) { ... }

        'sm': '640px',
        // => @media (min-width: 640px) { ... }
  
        'md': '768px',
        // => @media (min-width: 768px) { ... }
        
        'md-lg': '896px',
        // => @media (min-width: 896px) { ... }
  
        'lg': '1080px',
        // => @media (min-width: 1080px) { ... }
  
        'xl': '1280px',
        // => @media (min-width: 1280px) { ... }
  
        '2xl': '1536px',
        // => @media (min-width: 1536px) { ... }
      },
      fontFamily: {
        'Nunito': ['Nunito Regular'],
        'Nunito-B': ['Nunito Bold'],
        'Nunito-I': ['Nunito Italic'],
        'Nunito-B-I': ['Nunito Bold Italic'],
        'Nunito-M': ['Nunito Medium'],
        'Nunito-M-I': ['Nunito Medium Italic'],
        'Nunito-SB': ['Nunito Semibold'],
        'Nunito-SB-I': ['Nunito Semibold Italic'],
        'Nunito-EXB': ['Nunito Extrabold'],
        'Nunito-EXB-I': ['Nunito Extrabold Italic'],
        'Nunito-LT': ['Nunito Light'],
        'Nunito-LT-I': ['Nunito Light Italic']
      },
      width:
      {
        'col-1': '8.33%',
        'col-2': '16.66%',
        'col-3': '25%',
        'col-4': '33.33%',
        'col-5': '41.66%',
        'col-6': '50%',
        'col-7': '58.33%',
        'col-8': '66.66%',
        'col-9': '75%',
        'col-10': '83.33%',
        'col-11': '91.66%',
        'col-12': '100%'
      },
      colors:
      {
        'dark': '#373E4D',
        'informational': '#00aeff',
        'success': '#2ad100',
        'redirection': '#ffb800',
        'client': '#ff3d00',
        'server': '#cc00ff',
      },
      borderRadius:
      {
        'circular': '50%'
      },
      dropShadow:
      {
        '1XX': '0 16px 16px rgba(0, 174, 255, 0.25)',
        '2XX': '0 16px 16px rgba(42, 209, 0, 0.25)',
        '3XX': '0 16px 16px rgba(255, 184, 0, 0.25)',
        '4XX': '0 16px 16px rgba(255, 61, 0, 0.25)',
        '5XX': '0 16px 16px rgba(204, 0, 255, 0.25)',
      },
      gridTemplateColumns:
      {
        'box-content': 'repeat(auto-fit, minmax(22em, 1fr))',
        'box-content-col-1': 'repeat(1, minmax(22em, 1fr))',
      },
      backgroundImage:
      {
        'grid-pattern': "url('./Grid_Pattern.svg')"
      },
      backgroundSize:
      {
        'grid-size': '64px'
      },
      animation:
      {
        'grid-infinite-scroll': 'infinite-scroll 5s linear infinite',
      },
      keyframes: {
        'infinite-scroll': {
          '0%':   { 'background-position': '0px 0px' },
          '100%': { 'background-position': '-128px -128px'}
        }
      }
    },
  },
  plugins: [],
}

