import * as React from 'react';
// import {Container, makeStyles} from '@mui/system';
import PageTitle from "../components/PageTitle";
import PageDataControls from "../components/page-data-controls";
import Column from "../components/Column";
import '../assets/styles/schedule.scss';

import {DragDropContext } from "@hello-pangea/dnd";
import Grid from '@mui/material/Grid';

import { tasks } from "../assets/resources/tasks";
import { columnsData } from '../assets/resources/columns-data';
import Container from '@mui/material/Container';
import CalendarWidget from "../components/info-bar/widgets/calendar-widget";
import PlannedActivitiesWidget from "../components/info-bar/widgets/planned-activities-widget";
import CompletedActivitiesWidget from "../components/info-bar/widgets/completed-activities-widget";

export default class Schedule extends React.Component {
    state = {...tasks, ...columnsData};
    currentDate = new Date();
    currentDayNumber = this.currentDate.getDay();
    onDragEnd = result => {
        /* will be used to synchronously update the state. */
        const {destination, source, draggableId} = result;
        if(!destination) return;
        if(destination.droppableId === source.droppableId && destination.index === source.index) return;

        const start = this.state.columns[source.droppableId];
        const finish = this.state.columns[destination.droppableId];

        if(start === finish) {
            const newTaskIds = Array.from(start.taskIds);
            newTaskIds.splice(source.index, 1);
            newTaskIds.splice(destination.index, 0, draggableId);

            const newColumn = {
                ...start,
                taskIds: newTaskIds
            };

            const newState = {
                ...this.state,
                columns: {
                    ...this.state.columns,
                    [newColumn.id]: newColumn
                }
            }

            this.setState(newState);

            return;
        }

        // Moving from one list to another
        const startTaskIds = Array.from(start.taskIds);
        startTaskIds.splice(source.index, 1);

        const newStart = {
            ...start,
            taskIds: startTaskIds
        }

        const finishTaskIds = Array.from(finish.taskIds);
        finishTaskIds.splice(destination.index, 0, draggableId);
        const newFinish = {
            ...finish,
            taskIds: finishTaskIds
        }

        const newState = {
            ...this.state,
            columns: {
                ...this.state.columns,
                [newStart.id]: newStart,
                [newFinish.id]: newFinish
            }
        }

        this.setState(newState);

    }

    daysOfWeek = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Backlog"
    ];

    render() {
        return (
            <>
                <Grid
                    id="page"
                    container
                    direction="column"
                    spacing={1}

                >
                    <Grid item xs={1}>
                        <PageTitle currentView="Schedule" />
                    </Grid>

                    <Grid container direction="row" spacing={1} className="div-container">
                        <Grid item xs>
                            <CalendarWidget />
                        </Grid>
                        <Grid item xs>
                            <PlannedActivitiesWidget />
                        </Grid>
                        <Grid item xs>
                            <CompletedActivitiesWidget />
                        </Grid>
                        {/*<PageDataControls />*/}
                    </Grid>


                    <Grid
                        container
                        direction="row"
                        className="div-container"
                        spacing={2}
                    >
                            <DragDropContext onDragEnd={this.onDragEnd}>
                                {
                                    this.state.columnOrder.map((columnId, idx) => {
                                        const column = this.state.columns[columnId];
                                        const tasks = column.taskIds.map(taskId => this.state.tasks[taskId]);
                                        return (
                                            <Grid
                                                item
                                                key={idx}
                                                xs={12}
                                            >
                                                <Column
                                                    key={column.id}
                                                    column={column}
                                                    tasks={tasks}
                                                    currentDay={this.daysOfWeek[this.currentDayNumber]}
                                                    day={column.id}
                                                />
                                            </Grid>
                                        )
                                    })
                                }
                            </DragDropContext>
                    </Grid>
                </Grid>
            </>
        )
    }
}