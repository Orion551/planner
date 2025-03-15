import React, { useState } from 'react';
import Drawer from '@mui/material/Drawer';
import { Routes, Route, MemoryRouter } from 'react-router-dom';
import { NavbarView } from '@Components/Navbar/Navbar.view';
import { Schedule } from '@Pages/Schedule';
import { Projects } from '@Pages/Projects';
import { Analytics } from '@Pages/Analytics';
import { ErrorPage } from '@Pages/ErrorPage';
import './Assets/styles/global.scss';
// import { useGlobalState } from '@Context/GlobalStateContext';
// import { getRequest } from '@Api/http-service';
// import CircularProgress from '@mui/material/CircularProgress';
// import { ApiUrl } from '@Constants/ApiUrl';
import { Box, IconButton, Typography } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { LightTheme } from '@Assets/styles/light.theme';
import AppBar from '@mui/material/AppBar';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
// import { Actions } from '@Context/Actions';
import { SnackbarProvider } from 'notistack';
import {
  SuccessSnackbar,
  ErrorSnackbar,
  WarningSnackbar,
  InfoSnackbar,
} from '@Components/StyledSnackbar/SnackbarImports';
// import { GoogleOAuthProvider } from '@react-oauth/google';
import { LoginPage } from '@Components/Login/LoginPage';
import { AuthProvider } from '@Context/AuthContext';
import { RequireAuth } from '@Components/RequireAuth/RequireAuth';
import { DesktopNavigationBar } from '@Components/DesktopNavigationBar/DesktopNavigationBar';

// const GOOGLE_CLIENT_ID = '115578837422-hjnm33pr82b908h97lrknr5arpvm8ktq.apps.googleusercontent.com';

export function App() {
  const drawerWidth = 240;
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  return (
    // <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
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
            <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <AppBar component='nav' position='sticky'>
                <Toolbar>
                  <IconButton
                    color='primary'
                    edge='start'
                    onClick={handleDrawerToggle}
                    sx={{ mr: 2, display: { sm: 'none' } }}
                  >
                    <MenuIcon />
                  </IconButton>
                  <Typography
                    variant='h6'
                    component='div'
                    sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
                  >
                    Planner {process.env.APP_VERSION}
                  </Typography>
                  <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                    <DesktopNavigationBar />
                  </Box>
                </Toolbar>
              </AppBar>
              {/* Side drawer */}
              <nav>
                <Drawer
                  variant='temporary'
                  open={mobileOpen}
                  onClose={handleDrawerToggle}
                  ModalProps={{ keepMounted: true }}
                  sx={{
                    display: { xs: 'block', sm: 'none' },
                    '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                  }}
                >
                  <NavbarView handleDrawerToggle={handleDrawerToggle} />
                </Drawer>
              </nav>
            </Box>
            <Box component='main' sx={{ p: 1 }}>
              <Routes>
                <Route path='/login' element={<LoginPage />} />
                <Route
                  path='/'
                  element={
                    <RequireAuth>
                      <Schedule />
                    </RequireAuth>
                  }
                />
                <Route
                  path='/projects'
                  element={
                    <RequireAuth>
                      <Projects />
                    </RequireAuth>
                  }
                />
                <Route
                  path='/analytics'
                  element={
                    <RequireAuth>
                      <Analytics />
                    </RequireAuth>
                  }
                />
                <Route path='*' element={<ErrorPage />} />
              </Routes>
            </Box>
          </MemoryRouter>
        </ThemeProvider>
      </SnackbarProvider>
    </AuthProvider>
    // </GoogleOAuthProvider>
  );
}
