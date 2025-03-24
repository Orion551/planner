import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import './Assets/styles/global.scss';
import { ThemeProvider } from '@mui/material/styles';
import { LightTheme } from '@Assets/styles/light.theme';
import { SnackbarProvider } from 'notistack';
import {
  SuccessSnackbar,
  ErrorSnackbar,
  WarningSnackbar,
  InfoSnackbar,
} from '@Components/StyledSnackbar/SnackbarImports';
import { AuthProvider } from '@Context/AuthContext';
import { AppContent } from '@Components/AppContent/AppContent';

export function App() {
  return (
    <AuthProvider>
      <SnackbarProvider
        Components={{
          successSnackbar: SuccessSnackbar,
          errorSnackbar: ErrorSnackbar,
          warningSnackbar: WarningSnackbar,
          infoSnackbar: InfoSnackbar,
        }}
        maxSnack={5}
      >
        <ThemeProvider theme={LightTheme}>
          <MemoryRouter>
            <AppContent />
          </MemoryRouter>
        </ThemeProvider>
      </SnackbarProvider>
    </AuthProvider>
  );
}
