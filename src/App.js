import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { NavbarView } from '@Components/Navbar/Navbar.view';
import { Schedule } from '@Pages/Schedule';
import { Projects } from '@Pages/Projects';
import { Analytics } from '@Pages/Analytics';
import { ErrorPage } from '@Pages/ErrorPage';
import './Assets/styles/global.scss';
import Grid from '@mui/material/Grid';
import { useGlobalState } from '@Context/GlobalStateContext';
import { getRequest } from '@Api/http-service';
import CircularProgress from '@mui/material/CircularProgress';
import { initConfig } from '@Context/GlobalStateContext';

export function App() {
  const { state: appState, dispatch } = useGlobalState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async function () {
      try {
        const response = await getRequest({ url: '/planner-config' });
        dispatch(initConfig(response));
        setIsLoading(false);
      } catch (e) {
        console.error(e.message);
        setIsLoading(false);
      }
    })();
  }, [dispatch]);

  return (
    <Router>
      <Grid
        container
        direction='row'
        justifyContent='flex-start'
        alignItems='flex-start'
        spacing={1}
      >
        <Grid item xs={2}>
          <NavbarView />
        </Grid>
        <Grid item xs={10} p={1}>
          {isLoading ? ( // Conditional rendering based on loading state
            <CircularProgress /> // Render loading indicator or placeholder
          ) : (
            <Routes>
              {appState.configData ? ( // Check if configData is available
                <>
                  <Route path='/' element={<Schedule />} index />
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
        </Grid>
      </Grid>
    </Router>
  );
}
