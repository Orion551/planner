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
      fontSize: '3rem',
    },
    fontSize: 15,
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightBold: 600,
    h1: {
      fontSize: '5rem',
    },
    h2: {
      fontSize: '4.2rem',
    },
    h4: {
      fontSize: '2rem',
    },
    subtitle1: {
      fontSize: '1.3rem',
    },
    subtitle2: {
      fontSize: '1.1rem',
    },
    body1: {
      fontSize: '1.1rem',
    },
    body2: {
      fontSize: '1rem',
    },
    caption: {
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
  },
});
