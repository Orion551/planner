import React from 'react';
import { Box, Typography } from '@mui/material';
import { StatusView } from '@Utils/StatusView';
import { StatusViewModes } from '@Constants/StatusViewModes';
import { CircularProgress } from '@mui/material';

export const ProjectItemView = ({ project, isSelected, onClick }) => {
  isSelected;
  project;
  return (
    <>
      <Box
        onClick={onClick}
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
            value={95}
            size={15}
            thickness={6}
          />
          <Typography variant='body1' sx={{ textTransform: 'none' }}>
            {project.projectName}
          </Typography>
        </Box>
        <StatusView projectId={project.id} viewMode={StatusViewModes.BRIEF} />
      </Box>
    </>
  );
};
