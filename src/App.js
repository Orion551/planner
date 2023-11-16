import * as React from 'react';
// import {
//     createBrowserRouter,
//     RouterProvider,
// } from "react-router-dom";

import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link,
} from 'react-router-dom';

import Navbar from './components/navbar/navbar';
import Schedule from './pages/Schedule';
import Projects from './pages/Projects';
import Tags from './pages/Tags';
import Analytics from './pages/Analytics';
import ErrorPage from "./pages/ErrorPage";

import './assets/styles/global.scss';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';


// export const router = createBrowserRouter([
//     {
//         path: '/',
//         element: <Grid item xs={3}>
//                     <Navbar />
//                 </Grid>,
//         errorElement: <ErrorPage />,
//         children: [
//             {
//                 path: 'schedule',
//                 element:
//                     <Grid item xs={9}>
//                         <Schedule />
//                     </Grid>
//             },
//             {
//                 path: 'projects',
//                 element: <Projects />
//             },
//             {
//                 path: 'analytics',
//                 element: <Analytics />
//             },
//             {
//                 path: 'tags',
//                 element: <Tags />
//             },
//             { index: true, element: <Schedule /> }
//         ]
//     }
// ])

// This will be a container
function App() {
    return (
        <Router>
            <Grid container>
                <Grid item xs={3}><Navbar /></Grid>
                <Grid item xs={9}>
                    <Routes>
                        <Route path="/" element={<Schedule />} index/>
                        {/*<Route path="/schedule" element={<Schedule />} />*/}
                        <Route path="/projects" element={<Projects />} />
                        <Route path="/analytics" element={<Analytics />} />
                        <Route path="/tags" element={<Tags />} />
                        {/*<Route path="*" element={<ErrorPage />} />*/}
                    </Routes>
                </Grid>
            </Grid>
        </Router>
    )
}
export default App