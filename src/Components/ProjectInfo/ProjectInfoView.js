import React from 'react';
import { Box } from '@mui/material';
import { Typography } from '@mui/material';
import Switch from '@mui/material/Switch';
import Stack from '@mui/material/Stack';

export const ProjectInfoView = ({ project }) => {
  return (
    <>
      <Box
        display='flex'
        flexDirection='column'
        alignItems='flex-start'
        padding={1}
        component='subsection'
      >
        <Typography variant='h5'>{project.projectName}</Typography>
        {/* {project.projectId} */}
      </Box>
    </>
  );
};
