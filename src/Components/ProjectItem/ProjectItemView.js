import React from 'react';
import { Box, Typography } from '@mui/material';
import { StatusView } from '@Utils/StatusView';
import { StatusViewModes } from '@Constants/StatusViewModes';
import { CircularProgress } from '@mui/material';
import { useGlobalState } from '@Context/GlobalStateContext';
import { getProjectCompletion } from '@Utils/HandleProject';

export const ProjectItemView = ({ project, isSelected, onProjectSelected }) => {
  const { state } = useGlobalState();

  return (
    <>
      <Box
        onClick={() => onProjectSelected(project)}
        display='flex'
        flexDirection='row'
        sx={{
          borderRadius: '10px',
          width: '230px',
          height: '43px',
          justifyContent: 'space-between',
          alignItems: 'center',
          cursor: 'pointer',
          marginBottom: '12px',
          backgroundColor: isSelected ? '#58626b' : 'inherit',
          color: isSelected ? '#fff' : 'inherit',
          paddingLeft: 1,
          paddingRight: 1,
        }}
      >
        <Box display='flex' flexDirection='row' sx={{ alignItems: 'center', gap: '10px' }}>
          <CircularProgress
            sx={{ color: (theme) => theme.palette.success.main }}
            variant='determinate'
            value={getProjectCompletion(state.activities, project.projectActivities)}
            size={15}
            thickness={6}
          />
          <Typography
            variant='body2'
            sx={{
              textTransform: 'none',
              maxWidth: '170px',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            }}
          >
            {project.projectName}
          </Typography>
        </Box>
        <StatusView
          projectId={project.id}
          currentStatus={project.projectStatus}
          viewMode={StatusViewModes.BRIEF}
        />
      </Box>
    </>
  );
};
