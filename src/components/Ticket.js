import * as React from 'react';
import TagItem from "./TagItem";
import ActivityTracker from "./ActivityTracker";
import { Typography } from "@mui/material";
import styled from 'styled-components';
import IconButton from "@mui/material/IconButton";
import ZoomOutMapIcon from '@mui/icons-material/ZoomOutMap';
import TimerIcon from '@mui/icons-material/Timer';
import FolderIcon from '@mui/icons-material/Folder';

import '../assets/styles/ticket.scss';

export const CustomIcon = styled(ZoomOutMapIcon)`
  width: 15px !important;
  height: 15px !important;
  border-radius: 10px !important;
  color: #1E1E1E !important;
`;

export default function Ticket(props) {
    const {task, index} = props;

    return (
        <>
            <div className="ticket-card-wrapper">
                <div className="ticket-card-header">
                    <TagItem
                        tag={task.tag}
                    />
                    <IconButton>
                        <CustomIcon />
                    </IconButton>
                </div>

                <div>

                    <Typography variant="subtitle1">
                        <span>
                            <span>{task.title}</span>
                        </span>
                    </Typography>

                    {task.project !== "" ?
                        <div className="ticket-card-prj">
                            <FolderIcon />
                            <Typography variant="subtitle2">
                                {task.project}
                            </Typography>
                        </div> : ''
                    }
                    <div className="ticket-card-est">
                        <TimerIcon />

                        <Typography variant="subtitle2">
                            {task.estimate}
                        </Typography>
                    </div>

                    <div className="ticket-card-activity-tracker">
                        <ActivityTracker />
                    </div>

                </div>


            </div>

        </>
    )
}