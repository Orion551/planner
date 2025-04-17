import React from 'react';
import { useAuth } from '@Context/AuthContext';
import { LoginPage } from '@Components/Login/LoginPage';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { Box, Typography } from '@mui/material';
import Drawer from '@mui/material/Drawer';
import { DesktopNavigationBar } from '@Components/DesktopNavigationBar/DesktopNavigationBar';
import { NavbarView } from '@Components/Navbar/Navbar.view';
import { Route, Routes } from 'react-router-dom';
import { RequireAuth } from '@Components/RequireAuth/RequireAuth';
import { Schedule } from '@Pages/Schedule';
import { Projects } from '@Pages/Projects';
import { Analytics } from '@Pages/Analytics';
import { ErrorPage } from '@Pages/ErrorPage';
import { ActivityModalView } from '@Components/ActivityModal/ActivityModal.view';

export const AppContent = () => {
  const drawerWidth = 240;
  // TODO: Also attach the loading state object to better handle low speed networks
  const { user, loading } = useAuth();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <LoginPage />;
  }

  return (
    <>
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

      {/* Side Drawer */}
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

      <ActivityModalView />
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
    </>
  );
};
