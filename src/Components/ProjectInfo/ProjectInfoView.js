import React, { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import { Typography } from '@mui/material';
import { ToggleButtonGroup, ToggleButton } from '@mui/material';
import { ProjectSummaryView } from '@Components/ProjectInfo/ProjectSummaryView';
import { ProjectActivitiesView } from '@Components/ProjectInfo/ProjectActivitiesView';
import { getRequest } from '@Api/http-service';
import { ApiUrl } from '@Constants/ApiUrl';
import { StatusViewModes } from '@Constants/StatusViewModes';
import { StatusView } from '@Utils/StatusView';

export const ProjectInfoView = ({ project }) => {
  const [view, setView] = useState('summary');
  const [projectActivities, setProjectActivities] = useState(null);
  const { projectTags, projectAttachments, projectDescription } = project;
  const summaryData = { projectTags, projectAttachments, projectDescription };
  /**
   * TODO: IMPROVE ACTIVITY DATA STRUCTURE
   * totalActivities -> project.projectActivities.length
   
   */

  useEffect(() => {
    const queryParams = { id: project.projectActivities };
    (async function () {
      try {
        /** Fetching activities related to the Project;
         * TODO: WIP
         */
        await getRequest({ url: ApiUrl.activities, params: queryParams }).then((response) => {
          console.log(response);
          setProjectActivities(response);
        });
      } catch (e) {
        console.error(e);
      }
    })();
  }, [project.projectActivities, setProjectActivities]);

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
            <StatusView
              id={project.projectId}
              context={'project'}
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
          sx={{ overflowY: 'auto' }}
        >
          {view === 'summary' ? (
            <ProjectSummaryView summaryData={summaryData} />
          ) : (
            <ProjectActivitiesView activities={projectActivities} />
          )}
        </Box>
      </Box>
    </>
  );
};
