import React, { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import { Typography } from '@mui/material';
import { ToggleButtonGroup, ToggleButton } from '@mui/material';
import { ProjectSummaryView } from '@Components/ProjectInfo/ProjectSummaryView';
import { ProjectActivitiesView } from '@Components/ProjectInfo/ProjectActivitiesView';
import { deleteRequest, getRequest } from '@Api/http-service';
import { ApiUrl } from '@Constants/ApiUrl';
import { StatusViewModes } from '@Constants/StatusViewModes';
import { StatusView } from '@Utils/StatusView';
import { useGlobalState } from '@Context/GlobalStateContext';
import { Actions } from '@Context/Actions';

export const ProjectInfoView = ({ project }) => {
  const { dispatch } = useGlobalState();
  const [view, setView] = useState('summary');
  const [projectActivities, setProjectActivities] = useState([]);
  const { projectTags, projectAttachments, projectDescription } = project;
  const summaryData = { projectTags, projectAttachments, projectDescription };

  useEffect(() => {
    (async function () {
      try {
        const response = await getRequest({ url: `${ApiUrl.projects}/${project.id}/activities` });
        console.log('RESPONSE', response);
        setProjectActivities(response);
      } catch (e) {
        console.error(e);
      }
    })();
  }, [project.id, setProjectActivities]);

  const handleViewChange = (event, newView) => {
    console.log('new view', newView);
    if (newView !== null) {
      setView(newView);
    }
  };

  // eslint-disable-next-line no-unused-vars
  const handleDeleteProject = async () => {
    try {
      await deleteRequest({ url: `/projects/${project.id}` }).then(() => {
        console.log('Deleted');
        dispatch(Actions.deleteProject(project.id));
        dispatch(Actions.setSelectedProject(null));
      });
    } catch (e) {
      console.error(e.message);
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
