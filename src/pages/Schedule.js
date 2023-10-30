import * as React from 'react';
import { Container } from '@mui/material';
import PageTitle from "../components/PageTitle";
import PageDataControls from "../components/page-data-controls";
import ScheduleDayItem from "../components/schedule-day-item";
import '../assets/styles/schedule.scss'

export default function Schedule() {
    // const { view } = useParams();
    const currentDate = new Date();
    const currentDayNumber = currentDate.getDay();

    const daysOfWeek = ["Backlog", "Monday", "Tuesday",  "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];


    return (
        <>
            <div className="page-container">
                {/* Page title (could be a reusable component) */}
                <PageTitle currentView="Schedule" />

                {/* Page controls */}
                <PageDataControls />

                <Container style={{ overflowX: 'scroll', width: '100%', whiteSpace: 'nowrap', display: 'flex' }}  disableGutters>
                    {
                        daysOfWeek.map((day, index) => (
                            <ScheduleDayItem key={index} day={day} currentDay={daysOfWeek[currentDayNumber]} />
                        ))
                    }

                    {/*<ScheduleDayItem day="Backlog" current={} />*/}
                    {/*<ScheduleDayItem day="Monday" current={} />*/}
                    {/*<ScheduleDayItem day="Tuesday" current={} />*/}
                    {/*<ScheduleDayItem day="Wednesday" current={} />*/}
                    {/*<ScheduleDayItem day="Thursday" current={} />*/}
                    {/*<ScheduleDayItem day="Friday" current={} />*/}
                    {/*<ScheduleDayItem day="Saturday" current={} />*/}
                    {/*<ScheduleDayItem day="Sunday" current={} />*/}
                </Container>
            </div>

        </>
    )
}