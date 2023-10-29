import * as React from 'react';
import { Container } from '@mui/material';
import PageTitle from "../components/PageTitle";
import PageDataControls from "../components/page-data-controls";
import ScheduleDayItem from "../components/schedule-day-item";
import '../assets/styles/schedule.scss'

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
                    <ScheduleDayItem day="Backlog" />
                    <ScheduleDayItem day="Monday" />
                    <ScheduleDayItem day="Tuesday" />
                    <ScheduleDayItem day="Wednesday" />
                    <ScheduleDayItem day="Thursday" />
                    <ScheduleDayItem day="Friday" />
                    <ScheduleDayItem day="Saturday" />
                    <ScheduleDayItem day="Sunday" />
                </Container>
            </div>

        </>
    )
}