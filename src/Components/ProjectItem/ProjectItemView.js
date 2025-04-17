import React from 'react';
import { Box, Typography } from '@mui/material';
import { StatusView } from '@Utils/StatusView';
import { StatusViewModes } from '@Constants/StatusViewModes';

export const ProjectItemView = ({ project, isSelected, onProjectSelected }) => {
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
          backgroundColor: isSelected ? '#58626b9e' : 'inherit',
          color: isSelected ? '#fff' : 'inherit',
          paddingLeft: 1,
          paddingRight: 1,
        }}
      >
        <Box
          display='flex'
          flexDirection='row'
          sx={{ alignItems: 'center', gap: '10px', userSelect: 'none' }}
        >
          <Typography
            variant='body2'
            sx={{
              textTransform: 'none',
              maxWidth: '180px',
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
