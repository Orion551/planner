import { createTheme } from '@mui/material/styles';

export const LightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#b172f7',
      light: '#b27fef',
    },
    secondary: {
      main: '#fa9b5b',
      contrastText: '#ffffff',
    },
    text: {
      primary: '#1e1e1e',
      disabled: '#A6A6A6',
      hint: '#3317bd',
    },
    error: {
      main: '#d81e15',
    },
    success: {
      main: '#3fc865',
    },
    warning: {
      main: '#ffd700',
      contrastText: '#fff',
    },
  },
  typography: {
    fontFamily: 'Source Sans Pro, Roboto',
    h3: {
      fontFamily: 'Source Sans Pro, Roboto',
      fontSize: '2rem',
    },
    fontSize: 15,
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightBold: 600,
    h1: {
      fontSize: '3rem',
    },
    h2: {
      fontSize: '2.6rem',
    },
    h4: {
      fontSize: '1.8rem',
    },
    subtitle1: {
      fontSize: '1rem',
    },
    subtitle2: {
      fontSize: '1rem',
    },
    body1: {
      fontSize: '1.1rem',
    },
    body2: {
      fontSize: '1rem',
    },
    caption: {
      fontSize: '0.8rem',
    },
    h6: {
      fontSize: '1.5rem',
    },
    button: {
      fontSize: '0.9rem',
    },
  },
  shape: {
    borderRadius: 10,
  },
  overrides: {
    MuiAppBar: {
      root: {
        // Use root class for AppBar
        backgroundColor: '#fff',
        color: '#1E1E1E',
        boxShadow: 'none',
      },
    },
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#fff',
          color: '#1E1E1E',
          boxShadow: 'none',
          borderBottom: '1px solid #E8EEEA',
        },
      },
    },
    MuiSwitch: {
      styleOverrides: {
        root: {
          width: 46,
          height: 27,
          padding: 0,
          margin: 8,
        },
        switchBase: {
          padding: 1,
          '&$checked, &$colorPrimary$checked, &$colorSecondary$checked': {
            transform: 'translateX(16px)',
            color: '#fff',
            '& + $track': {
              opacity: 1,
              border: 'none',
            },
          },
        },
        thumb: {
          width: 24,
          height: 24,
        },
        track: {
          borderRadius: 13,
          border: '1px solid #bdbdbd',
          backgroundColor: '#fafafa',
          opacity: 1,
          transition:
            'background-color 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,border 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
        },
      },
    },
    MuiButtonBase: {
      defaultProps: {
        disableRipple: true,
      },
    },
  },
});
