import * as React from 'react';
import './assets/styles/app.css';
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";

import Navbar from './components/navbar/navbar';
import Schedule from './pages/Schedule';
import Projects from './pages/Projects';
import Tags from './pages/Tags';
import Analytics from './pages/Analytics';
import ErrorPage from "./pages/ErrorPage";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Navbar />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: 'schedule',
                element: <Schedule />
            },
            {
                path: 'projects',
                element: <Projects />
            },
            {
                path: 'analytics',
                element: <Analytics />
            },
            {
                path: 'tags',
                element: <Tags />
            },
            { index: true, element: <Schedule /> }
        ]
    }
])

// This will be a container
function App() {
    return (
        <>
            <div className="main">
                <RouterProvider router={router}></RouterProvider>
            </div>
        </>
    )
}

export default App