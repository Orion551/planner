import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import StopCircleIcon from '@mui/icons-material/StopCircle';
import PauseCircleIcon from '@mui/icons-material/PauseCircle';

export default function ActivityTracker() {
    return (
        <>
            <IconButton>
                <StopCircleIcon />
            </IconButton>

            <IconButton>
                <PlayCircleIcon />
            </IconButton>
            
            <IconButton>
                <PauseCircleIcon />
            </IconButton>
        </>
    )
}