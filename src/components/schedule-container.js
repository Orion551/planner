import * as React from 'react';
import ScheduleDayItem from "./schedule-day-item";

export default function ScheduleContainer() {
    return (
        <>
            <div className="schedule-items-container">
                <ScheduleDayItem />
                <ScheduleDayItem />
                <ScheduleDayItem />
                <ScheduleDayItem />
                <ScheduleDayItem />
                <ScheduleDayItem />
                <ScheduleDayItem />
                <ScheduleDayItem />
            </div>
            {/*<div className="schedule-items-container">*/}
            {/*    <ScheduleDayItem />*/}
            {/*    <ScheduleDayItem />*/}
            {/*    <ScheduleDayItem />*/}
            {/*    <ScheduleDayItem />*/}
            {/*    <ScheduleDayItem />*/}
            {/*    <ScheduleDayItem />*/}
            {/*    <ScheduleDayItem />*/}
            {/*    <ScheduleDayItem />*/}
            {/*</div>*/}
        </>
    )
}