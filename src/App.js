import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { NavbarView } from './Components/Navbar/Navbar.view';
import { Schedule } from '@Pages/Schedule';
import { Projects } from '@Pages/Projects';
import { Analytics } from '@Pages/Analytics';
import { ErrorPage } from '@Pages/ErrorPage';

import './Assets/styles/global.scss';

import Grid from '@mui/material/Grid';

export function App() {
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
          <Routes>
            <Route path='/' element={<Schedule />} index />
            <Route path='/projects' element={<Projects />} />
            <Route path='/analytics' element={<Analytics />} />
            <Route path='*' element={<ErrorPage />} />
          </Routes>
        </Grid>
      </Grid>
    </Router>
  );
}
