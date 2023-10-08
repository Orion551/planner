import * as React from 'react';
import './assets/styles/app.css';

import Navbar from './components/navbar';
import Schedule from "./pages/schedule";

// This will be a container
function App() {
    return (
        <>
            <div className="main">
                <Navbar />
                {/* TODO: This will be dynamic.
                  * <Schedule />
                  * <Analytics /.
                  * ...
                */}
                <Schedule />
            </div>
        </>
    )
}

export default App