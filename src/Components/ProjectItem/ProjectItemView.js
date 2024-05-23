import React from 'react';
import { Box, Typography } from '@mui/material';
import { StatusView } from '@Utils/StatusView';
import { StatusViewModes } from '@Constants/StatusViewModes';

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
          border: '1px solid black',
          borderRadius: '10px',
          width: '250px',
          height: '40px',
          justifyContent: 'space-between',
          alignItems: 'center',
          cursor: 'pointer',
          marginBottom: '12px',
          backgroundColor: isSelected ? '#e0e0e0' : 'inherit',
        }}
      >
        <Box display='flex' flexDirection='row' marginLeft='10px'>
          O
          <Typography variant='body1' sx={{ textTransform: 'none' }}>
            {project.projectName}
          </Typography>
        </Box>
        <StatusView id={project.projectId} context={'project'} viewMode={StatusViewModes.BRIEF} />
      </Box>
    </>
  );
};
