import React, { useState } from 'react';
import { Box } from '@mui/material';
import { Typography } from '@mui/material';
import { ToggleButtonGroup, ToggleButton } from '@mui/material';

export const ProjectInfoView = ({ project }) => {
  const [view, setView] = useState('summary');
  view;

  const handleViewChange = (event, newView) => {
    console.log('new view', newView);
    if (newView !== null) {
      setView(newView);
    }
  };
  return (
    <>
      <Box
        display='flex'
        flexDirection='column'
        alignItems='flex-start'
        padding={1}
        component='section'
      >
        <Typography variant='h5'>{project.projectName}</Typography>

        <ToggleButtonGroup
          color='primary'
          exclusive
          value={view}
          onChange={handleViewChange}
          size='small'
        >
          <ToggleButton value='summary'>
            <Typography variant='button'>Summary</Typography>
          </ToggleButton>
          ,
          <ToggleButton value='activities'>
            <Typography variant='button'>Activities</Typography>
          </ToggleButton>
        </ToggleButtonGroup>
        {/* {project.projectId} */}
      </Box>
    </>
  );
};
