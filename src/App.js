// import React, { useEffect, useState } from 'react';
import React, { useState } from 'react';
import Drawer from '@mui/material/Drawer';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { NavbarView } from '@Components/Navbar/Navbar.view';
// import { Schedule } from '@Pages/Schedule';
// import { Projects } from '@Pages/Projects';
// import { Analytics } from '@Pages/Analytics';
// import { ErrorPage } from '@Pages/ErrorPage';
import './Assets/styles/global.scss';
// import { useGlobalState } from '@Context/GlobalStateContext';
// import { getRequest } from '@Api/http-service';
// import CircularProgress from '@mui/material/CircularProgress';
// import { initConfig } from '@Context/GlobalStateContext';
// import { ApiUrl } from '@Constants/ApiUrl';
import { Box, IconButton, Typography } from '@mui/material';

import AppBar from '@mui/material/AppBar';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';

export function App() {
  const drawerWidth = 240;
  // const { state: appState, dispatch } = useGlobalState();
  // const [isLoading, setIsLoading] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);
  mobileOpen;

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  // useEffect(() => {
  //   (async function () {
  //     try {
  //       const response = await getRequest({ url: ApiUrl.plannerConfig });
  //       dispatch(initConfig(response));
  //       setIsLoading(false);
  //     } catch (e) {
  //       console.error(e.message);
  //       setIsLoading(false);
  //     }
  //   })();
  // }, [dispatch]);

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar component='nav'>
        <Toolbar>
          <IconButton
            color='inherit'
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
            PLANNER
          </Typography>
        </Toolbar>
      </AppBar>
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
      <Box component='main' sx={{ p: 3 }}>
        <Toolbar />
        <Typography>Actual content</Typography>
      </Box>
    </Box>
  );
}
