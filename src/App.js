import React, { useEffect, useState } from 'react';
import Drawer from '@mui/material/Drawer';
import { Routes, Route, Link, useLocation, MemoryRouter } from 'react-router-dom';
import Button from '@mui/material/Button';
import { NavbarView } from '@Components/Navbar/Navbar.view';
import { Schedule } from '@Pages/Schedule';
import { Projects } from '@Pages/Projects';
import { Analytics } from '@Pages/Analytics';
import { ErrorPage } from '@Pages/ErrorPage';
import './Assets/styles/global.scss';
import { useGlobalState } from '@Context/GlobalStateContext';
import { getRequest } from '@Api/http-service';
import CircularProgress from '@mui/material/CircularProgress';
import { ApiUrl } from '@Constants/ApiUrl';
import { Box, IconButton, Typography } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { LightTheme } from '@Assets/styles/light.theme';
import { ButtonGroup } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import { useTranslation } from 'react-i18next';
import { Actions } from '@Context/Actions';

const Navigation = () => {
  const location = useLocation();
  const { t } = useTranslation();

  // Function to determine variant based on the current route
  const getVariant = (route) => {
    return location.pathname === route ? 'contained' : 'outlined';
  };

  return (
    <ButtonGroup variant='outlined' aria-label='Basic button group' disableElevation>
      <Button variant={getVariant('/')} component={Link} to='/'>
        {t('sections.schedule')}
      </Button>
      <Button variant={getVariant('/projects')} component={Link} to='/projects'>
        {t('sections.projects')}
      </Button>
      <Button variant={getVariant('/analytics')} component={Link} to='/analytics'>
        {t('sections.reports')}
      </Button>
    </ButtonGroup>
  );
};

export function App() {
  const drawerWidth = 240;
  const { state: appState, dispatch } = useGlobalState();
  const [isLoading, setIsLoading] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  useEffect(() => {
    (async function () {
      try {
        const response = await getRequest({ url: ApiUrl.plannerConfig });
        const projectResponse = await getRequest({ url: ApiUrl.projects });
        const activitiesResponse = await getRequest({ url: ApiUrl.activities });
        dispatch(Actions.initConfig(response));
        dispatch(Actions.initActivities(activitiesResponse));
        dispatch(Actions.initProjects(projectResponse));
        setIsLoading(false);
      } catch (e) {
        console.error(e.message);
        setIsLoading(false);
      }
    })();
  }, [dispatch]);

  return (
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
                <Navigation />
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
          {isLoading ? ( // Conditional rendering based on loading state
            <CircularProgress /> // Render loading indicator or placeholder
          ) : (
            <Routes>
              {appState.configData ? ( // Check if configData is available
                <>
                  <Route path='/' exact element={<Schedule />} index />
                  <Route path='/projects' element={<Projects />} />
                  <Route path='/analytics' element={<Analytics />} />
                  <Route path='*' element={<ErrorPage />} />
                </>
              ) : (
                /* TODO: of course improve that */
                <span>no stuff</span>
              )}
            </Routes>
          )}
        </Box>
      </MemoryRouter>
    </ThemeProvider>
  );
}
