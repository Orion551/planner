import * as React from 'react';
import { BrowserRouter as Router, Routes, Route,} from 'react-router-dom';
import Navbar from './components/navbar/navbar';
import Schedule from './pages/Schedule';
import Projects from './pages/Projects';
import Tags from './pages/Tags';
import Analytics from './pages/Analytics';
import ErrorPage from "./pages/ErrorPage";

import './assets/styles/global.scss';

import Grid from '@mui/material/Grid';

function App() {
    return (
        <Router>
            <Grid container>
                <Grid item xs={3}><Navbar /></Grid>
                <Grid item xs={9}>
                    <Routes>
                        <Route path="/" element={<Schedule />} index/>
                        <Route path="/projects" element={<Projects />} />
                        <Route path="/analytics" element={<Analytics />} />
                        <Route path="/tags" element={<Tags />} />
                        <Route path="*" element={<ErrorPage />} />
                    </Routes>
                </Grid>
            </Grid>
        </Router>
    )
}
export default App