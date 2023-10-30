import * as React from 'react';
import IconButton from '@mui/material/IconButton'
import AddIcon from '@mui/icons-material/Add';
// import styled from 'styled-components';
import {Typography} from "@mui/material";
import Ticket from "./Ticket";
import ClearTasks from "./utils/ClearTasks";

// export const CustomIcon = styled(AddIcon)`
//   background: #DBDBDB !important;
//   width: 30px !important;
//   height: 30px !important;
//   border-radius: 10px !important;
//   color: #1E1E1E !important;
// `;

export const HeaderCustomText = {
    fontWeight: 600,
}

export default function ScheduleDayItem(props) {
    const {day, currentDay, tasks} = props;

    const isCurrentDay = day === currentDay ? 'current-day' : '';

    return (
        <>
            <div className={`schedule-day-item ${day} ${isCurrentDay}`}>
                <div className="schedule-item-header">
                    <div className="schedule-item-header-info">
                        <div className={`schedule-item-name ${day}-schedule-item-name`}>
                            <Typography variant="body1">
                                <span style={HeaderCustomText}>
                                    {day}
                                </span>
                            </Typography>
                        </div>

                        <div className={`tasks-counter ${day}-tasks-counter`}>
                            <Typography variant="body1">
                                <span style={HeaderCustomText}>
                                    5
                                </span>
                            </Typography>
                        </div>

                    </div>

                    <IconButton className={`schedule-new-task ${day}`}>
                        <AddIcon />
                    </IconButton>
                </div>
                <div>
                    {/*<Ticket />*/}
                    {
                        tasks.length > 0 ?
                            <ul>
                                {tasks.map((task, index) => (
                                    <li key={index}>{task.title}</li>
                                ))}
                            </ul>
                            : <div>
                                <ClearTasks
                                    currentDay={day}
                                />
                            </div>
                    }
                </div>
            </div>
        </>
    )
}