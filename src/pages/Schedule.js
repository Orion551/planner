import * as React from 'react';
import { Container } from '@mui/material';
// import { useParams } from 'react-router-dom';
import '../assets/styles/schedule.css';
import PageTitle from "../components/PageTitle";
import PageDataControls from "../components/page-data-controls";
import ScheduleDayItem from "../components/schedule-day-item";


export default function Schedule() {
    // const { view } = useParams();

    return (
        <>
            <div className="page-container">
                {/* Page title (could be a reusable component) */}
                <PageTitle currentView="Schedule" />

                {/* Page controls */}
                <PageDataControls />

                <Container style={{ overflowX: 'scroll', width: '100%', whiteSpace: 'nowrap', display: 'flex' }}  disableGutters>
                    <ScheduleDayItem />
                    <ScheduleDayItem />
                    <ScheduleDayItem />
                    <ScheduleDayItem />
                    <ScheduleDayItem />
                    <ScheduleDayItem />
                    <ScheduleDayItem />
                    <ScheduleDayItem />
                </Container>
            </div>

        </>
    )
}