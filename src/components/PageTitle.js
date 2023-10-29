import * as React from 'react';
import { Typography } from '@mui/material';
import CalendarViewWeekIcon from '@mui/icons-material/CalendarViewWeek';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import FolderIcon from '@mui/icons-material/Folder';
import StyleIcon from '@mui/icons-material/Style';
import AnalyticsIcon from '@mui/icons-material/Analytics';

const icons = {
    'Schedule': <CalendarViewWeekIcon />,
    'Tags': <StyleIcon />,
    'Analytics': <AnalyticsIcon />,
    'Projects': <FolderIcon />,
};


export default function PageTitle({currentView}) {
    const routeIcon = icons[currentView] || <EmojiEmotionsIcon />;

    return (
        <>
            <div className="title-container">
                <div className="page-title-icon">{routeIcon}</div>

                <Typography variant="h5" className="text-test">
                    {currentView}
                </Typography>
            </div>
        </>
    )
}