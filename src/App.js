import * as React from 'react';
import './assets/styles/app.css';

// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";

import Navbar from './components/navbar/navbar';
import Schedule from './pages/schedule';
import Projects from './pages/projects';
import Tags from './pages/tags';
import Analytics from './pages/analytics';
import ErrorPage from "./pages/error-page";

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
            }
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