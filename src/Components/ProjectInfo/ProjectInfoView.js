import React, { useEffect, useState } from 'react';
import { Box, IconButton } from '@mui/material';
import { Typography } from '@mui/material';
import { ToggleButtonGroup, ToggleButton } from '@mui/material';
import { ProjectSummaryView } from '@Components/ProjectInfo/ProjectSummaryView';
import { ProjectActivitiesView } from '@Components/ProjectInfo/ProjectActivitiesView';
import { deleteRequest, getRequest } from '@Api/http-service';
import { ApiUrl } from '@Constants/ApiUrl';
import { StatusViewModes } from '@Constants/StatusViewModes';
import { StatusView } from '@Utils/StatusView';
import { StatusViewContext } from '@Constants/StatusViewContext';
import DeleteIcon from '@mui/icons-material/Delete';
import { useGlobalState } from '@Context/GlobalStateContext';
import { Actions } from '@Context/Actions';

export const ProjectInfoView = ({ project }) => {
  const { dispatch } = useGlobalState();
  const [view, setView] = useState('summary');
  const [projectActivities, setProjectActivities] = useState(null);
  console.log('project', project);
  const { projectTags, projectAttachments, projectDescription } = project;
  console.log('projectTags:', projectTags);
  console.log('projectAttachments:', projectAttachments);
  console.log('projectDescription', projectDescription);
  const summaryData = { projectTags, projectAttachments, projectDescription };
  console.log('summaryData', summaryData);
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
              id={project.projectId}
              context={StatusViewContext.project}
              viewMode={StatusViewModes.DETAILED}
            />
          </Box>
          <Box marginLeft={1}>
            <IconButton onClick={handleDeleteProject}>
              <DeleteIcon />
            </IconButton>
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
