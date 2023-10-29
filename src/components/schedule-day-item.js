import * as React from 'react';
import IconButton from '@mui/material/IconButton'
import AddIcon from '@mui/icons-material/Add';
import styled from 'styled-components';
import {Typography} from "@mui/material";
import Ticket from "./Ticket";

export const CustomIcon = styled(AddIcon)`
  background: #DBDBDB !important;
  width: 30px !important;
  height: 30px !important;
  border-radius: 10px !important;
  color: #1E1E1E !important;
`;

export const HeaderCustomText = {
    fontWeight: 600,
}

export default function ScheduleDayItem({day}) {
    return (
        <>
            <div className="schedule-day-item">
                <div className="schedule-item-header">
                    <div className="schedule-item-header-info">
                        <div className="schedule-item-name">
                            <Typography variant="body1">
                                <span style={HeaderCustomText}>
                                    {day}
                                </span>
                            </Typography>
                        </div>

                        <div className="schedule-item-tasks-counter">
                            <Typography variant="body1">
                                <span style={HeaderCustomText}>
                                    5
                                </span>
                            </Typography>
                        </div>

                    </div>
                    <IconButton className="test">
                        <CustomIcon />
                    </IconButton>
                </div>
                {/* TODO: Implement ScheduleDayItem tickets list container */}
                <div>
                    <Ticket />
                </div>
            </div>
        </>
    )
}