import * as React from 'react';
import './assets/styles/app.css';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/navbar/navbar';
import Schedule from './pages/schedule';
import Projects from './pages/projects';
import Tags from './pages/tags';
import Analytics from './pages/analytics';

// This will be a container
function App() {
    return (
        <>
            <div className="main">
                <Router>
                    <Navbar />
                    <Routes>
                        <Route path="schedule" element={<Schedule />} />
                        <Route path="projects" element={<Projects />} />
                        <Route path="tags" element={<Tags />} />
                        <Route path="analytics" element={<Analytics />} />
                    </Routes>
                </Router>
            </div>

            {/*<Router>*/}
            {/*    <div className="App">*/}
            {/*        <Navbar />*/}
            {/*        <Switch>*/}
            {/*            <Route path="/schedule" component={SchedulePage} />*/}
            {/*            <Route path="/reports" component={ReportsPage} />*/}
            {/*            <Route path="/projects" component={ProjectsPage} />*/}
            {/*            <Route path="/tags" component={TagsPage} />*/}
            {/*        </Switch>*/}
            {/*    </div>*/}
            {/*</Router>*/}
        </>
    )
}

export default App