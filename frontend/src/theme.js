import { createTheme } from '@mui/material';
// Colors

// Mains - Opacity
const primaryLight = 'rgba(159,128,101, 0.15)'
const primaryMedium = 'rgba(159,128,101, 0.35)'
const primaryFull = '#9f8065';

// Secondaries - Opacity
const secondaryLight = 'rgba(102,161,140, 0.15)';
const secondaryMedium = 'rgba(102,161,140, 0.35)';
const secondaryFull = '#66a18c';

// White & Grays

const grayLight = 'rgba(73,73,73, 0.1)';
const grayMedium = 'rgba(73,73,73, 0.5)';
const grayFull = 'rgba(73,73,73, 1)';

const whiteLight = 'rgba(255, 255, 255, 0.1)';
const whiteMedium = 'rgba(255, 255, 255, 0.5)';
const whiteFull = 'rgba(255, 255, 255, 1)';

// Font Colors
const primaryFontColor = 'black';
const secondaryFontColor = 'black';
const tabPrimaryFontColor = 'black';
const tabSecondaryFontColor = 'black';

// Buttons
const primaryButtonTextColor = `${whiteMedium}`;
const secondaryButtonTextColor = `${whiteFull}`;
const primaryButtonColor = `${primaryFull}`;
const secondaryButtonColor = `${secondaryFull}`;


// Box Shadows
const primaryInsetBoxShadow = 'inset 0px 3.5px 10px rgba(56,56,55, 0.5)';

// Main App Background
const mainBackground = `${whiteFull}`;

// Fonts

const primaryFont = `"Lemon", serif`;
const secondaryFont = "Avenir";
const tabFont = "Avenir";

// Create Theme

const theme = createTheme({
  palette: {
    primary : {
      lt: `${primaryLight}`,
      md: `${primaryMedium}`,
      main: `${primaryFull}`,
    },
    secondary: {
      lt: `${secondaryLight}`,
      md: `${secondaryMedium}`,
      main: `${secondaryFull}`
    },
    grays: {
      lt: `${grayLight}`,
      md: `${grayMedium}`,
      main: `${grayFull}`,
    },
    whites: {
      lt: `${whiteLight}`,
      md: `${whiteMedium}`,
      main: `${whiteFull}`,
    }
  },
  typography: {
    primary: {
      fontFamily: `${primaryFont}`,
      color: `${primaryFontColor}`
    },
    secondary: {
      fontFamily: `${secondaryFont}`,
      color: `${secondaryFontColor}`
    },
    tab: {
      fontFamily: `${tabFont}`,
      color: `${tabPrimaryFontColor}`
    },
    tabSecondary: {
      fontFamily: `${tabFont}`,
      color: `${tabSecondaryFontColor}`,
      opacity: '0.7',
      "&:hover": {
        backgroundColor: `${secondaryMedium}`,
        opacity: '1'
      },
    },
    button: {
      textTransform: 'none'
    }
  },

  boxShadows: {
    inset: {
      boxShadow: `${primaryInsetBoxShadow}`,
    }
  },
  buttons: {
    primary: {
      color: `${primaryButtonTextColor}`,
      transition: '0.4s ease-in-out',
      "&:hover": {
        background: `${primaryButtonColor}`,
      }
    },
    secondary: {
      color: `${secondaryButtonTextColor}`,
      transition: '0.4s ease-in-out',
      "&: hover": {
        background: `${secondaryButtonColor}`
      }
    }
  },
  flexBox: {
    justifyAlignCenter: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    },
    justifyStartAlignCenter: {
      display: 'flex',
      justifyContent: 'flex-start',
      alignItems: 'center'
    }
  },
  toolbars: {
    mobileNav: {
      height: '10dvh'
    },
    mobileTopToolbar: {
      height: '5vh'
    }
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          background: `${mainBackground} fixed`,
          backgroundPosition: 'bottom',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          height: '90dvh',
          maxHeight: '90dvh',
          width: '100%',
          padding: '0'
        },
        html: {
          minHeight: '100%'
        },
        '#root': {
          height: '100%'
        },
        '*::-webkit-scrollbar': {
          width: '0.2rem'
        },
        '*::-webkit-scrollbar-thumb': {
          backgroundColor: `${secondaryFull}`,
          outline: '1px solid slategrey',
          borderRadius: '1rem',
        },
        '.MuiToggleButtonGroup-grouped:not(:first-of-type)': {
          border: 'none',
          padding: 'inherit',
          margin: '0'
        },
        '.MuiToggleButtonGroup-grouped:first-of-type': {
          border: 'none',
          padding: 'inherit',
          margin: '0'
        }
      }
    },
    MuiGrid: {
      item: {
        display: 'flex',
        flexGrow: '1!important',
        flexShrink: '2',
        maxWidth: '100%!important',
        flexDirection: 'row',
        justifyContent: 'space-between'
      }
    }
    
  }
});

export default theme ;