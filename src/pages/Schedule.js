import * as React from 'react';
import { Container } from '@mui/material';
import PageTitle from "../components/PageTitle";
import PageDataControls from "../components/page-data-controls";
import Column from "../components/Column";
import '../assets/styles/schedule.scss';

import { tasks } from "../assets/resources/tasks";
import { columnsData } from '../assets/resources/columns-data';

export default function Schedule() {

    const state = {...tasks, ...columnsData};
    const currentDate = new Date();
    const currentDayNumber = currentDate.getDay();

    const daysOfWeek = [
        "Backlog",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday"
    ];

    return (
        <>
            <div className="page-container">
                <PageTitle currentView="Schedule" />
                <PageDataControls />
                <Container style={{
                    overflowX: 'scroll',
                    width: '100%',
                    whiteSpace: 'nowrap',
                    display: 'flex'
                }}
                   disableGutters
                >
                    {
                        state.columnOrder.map(columnId => {
                            const column = state.columns[columnId];
                            const tasks = column.taskIds.map(taskId => state.tasks[taskId]);

                            return <Column
                                key={column.id}
                                column={column}
                                tasks={tasks}
                                currentDay={daysOfWeek[currentDayNumber]}
                                day={column.id}
                            />
                        })
                    }
                </Container>
            </div>
        </>
    )
}