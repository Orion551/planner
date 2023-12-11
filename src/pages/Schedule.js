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

export default class Schedule extends React.Component {
    state = {...tasks, ...columnsData};
    currentDate = new Date();
    currentDayNumber = this.currentDate.getDay();
    onDragEnd = result => {
        /* will be used to synchronously update the state. */
        const {destination, source, draggableId} = result;
        const classes = useStyles();
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
                    container
                    direction="column"
                    spacing={1}
                >
                    <Grid item xs>
                        <PageTitle currentView="Schedule" />
                    </Grid>

                    <Grid item xs>
                        <PageDataControls />
                    </Grid>

                        <Grid container direction="row" className="div-container" >
                            <DragDropContext onDragEnd={this.onDragEnd}>
                                {
                                    this.state.columnOrder.map((columnId, idx) => {
                                        const column = this.state.columns[columnId];
                                        const tasks = column.taskIds.map(taskId => this.state.tasks[taskId]);


                                        return (
                                            <Grid
                                                item
                                                key={idx}>
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
                {/*<div className="schedule-big-grid">*/}
                {/*    <PageTitle currentView="Schedule" />*/}
                {/*    <PageDataControls />*/}
                {/*    <Grid*/}
                {/*        container*/}
                {/*        spacing={2}*/}
                {/*        p={2}*/}
                {/*        direction="row"*/}
                {/*        justifyContent="flex-start"*/}
                {/*        alignItems="flex-start"*/}
                {/*        className="schedule-grid"*/}
                {/*    >*/}
                {/*        <DragDropContext onDragEnd={this.onDragEnd}>*/}
                {/*            {*/}
                {/*                this.state.columnOrder.map(columnId => {*/}
                {/*                    const column = this.state.columns[columnId];*/}
                {/*                    const tasks = column.taskIds.map(taskId => this.state.tasks[taskId]);*/}


                {/*                    return (*/}
                {/*                        <Column*/}
                {/*                            key={column.id}*/}
                {/*                            column={column}*/}
                {/*                            tasks={tasks}*/}
                {/*                            currentDay={this.daysOfWeek[this.currentDayNumber]}*/}
                {/*                            day={column.id}*/}
                {/*                        />*/}
                {/*                    )*/}
                {/*                })*/}
                {/*            }*/}
                {/*        </DragDropContext>*/}
                {/*    </Grid>*/}
                {/*</div>*/}
            </>
        )
    }
}