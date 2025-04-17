import React, { useState } from 'react';
import { Box } from '@mui/material';
import { Typography } from '@mui/material';
import { ToggleButtonGroup, ToggleButton } from '@mui/material';
import { ProjectSummaryView } from '@Components/ProjectInfo/ProjectSummaryView';
import { ProjectActivitiesView } from '@Components/ProjectInfo/ProjectActivitiesView';
import { StatusViewModes } from '@Constants/StatusViewModes';
import { StatusView } from '@Utils/StatusView';

export const ProjectInfoView = ({ project }) => {
  // const { dispatch } = useGlobalState();
  const [view, setView] = useState('summary');
  const { projectTags, projectAttachments, projectDescription, projectActivities } = project;
  const summaryData = { projectTags, projectAttachments, projectDescription, projectActivities };

  const handleViewChange = (event, newView) => {
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
        sx={{ height: '100%', flex: 1, minHeight: 0 }}
      >
        <Box display='flex' flexDirection='row' marginBottom={2}>
          <Box>
            <Typography variant='h4'>{project.projectName}</Typography>
          </Box>
          <Box marginLeft={3}>
            <StatusView
              projectId={project.id}
              currentStatus={project.projectStatus}
              viewMode={StatusViewModes.DETAILED}
            />
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
          sx={{ overflowY: 'auto', flex: 1 }}
        >
          {view === 'summary' ? (
            <ProjectSummaryView projectId={project.id} summaryData={summaryData} />
          ) : (
            <ProjectActivitiesView activitiesIds={projectActivities} />
          )}
        </Box>
      </Box>
    </>
  );
};
