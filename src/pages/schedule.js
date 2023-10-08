import * as React from 'react';
import { Container } from '@mui/material';
import '../assets/styles/schedule.css';
import PageTitle from "../components/page-title";
import PageDataControls from "../components/page-data-controls";
import ScheduleContainer from "../components/schedule-container";
import ScheduleDayItem from "../components/schedule-day-item";


export default function Schedule() {
    return (
        <>
            {/* Page title (could be a reusable component) */}
            <PageTitle />

            {/* Page controls */}
            <PageDataControls />

            <Container style={{ overflowX: 'auto', width: '100%', whiteSpace: 'nowrap', display: 'flex' }} maxWidth="md" disableGutters>
                <ScheduleDayItem />
                <ScheduleDayItem />
                <ScheduleDayItem />
                <ScheduleDayItem />
                <ScheduleDayItem />
                <ScheduleDayItem />
            </Container>
        </>
    )
}