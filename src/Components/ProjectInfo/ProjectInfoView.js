import React, { useState } from 'react';
import { Box } from '@mui/material';
import { Typography } from '@mui/material';
import { ToggleButtonGroup, ToggleButton } from '@mui/material';
import { ProjectSummaryView } from '@Components/ProjectInfo/ProjectSummaryView';
import { ProjectActivitiesView } from '@Components/ProjectInfo/ProjectActivitiesView';

export const ProjectInfoView = ({ project }) => {
  const [view, setView] = useState('summary');
  const { projectTags, projectAttachments, projectDescription } = project;
  const summaryData = { projectTags, projectAttachments, projectDescription };

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
        marginLeft={2}
        marginRight={2}
        overflow='hidden'
      >
        <Box display='flex' flexDirection='row' marginBottom={2}>
          <Box>
            <Typography variant='h4'>{project.projectName}</Typography>
          </Box>
          <Box marginLeft={3}>
            <Typography variant='h4'>{project.projectStatus}</Typography>
          </Box>
        </Box>

        <Box marginTop={1} marginBottom={1}>
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
        </Box>

        <Box
          marginTop={1}
          display='flex'
          flexDirection='column'
          width='100%'
          sx={{ overflowY: 'auto' }}
        >
          {view === 'summary' ? (
            <ProjectSummaryView summaryData={summaryData} />
          ) : (
            <ProjectActivitiesView />
          )}
        </Box>
      </Box>
    </>
  );
};
