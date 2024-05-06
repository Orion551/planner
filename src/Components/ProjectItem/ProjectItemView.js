import React from 'react';
// import { ListItem, ListItemText, ListItemAvatar, Avatar, IconButton } from '@mui/material';
// import Delete from '@mui/icons-material/Delete';
// import Folder from '@mui/icons-material/Folder';
import { Box, Typography } from '@mui/material';

export const ProjectItemView = ({ project, isSelected }) => {
  isSelected;
  project;
  return (
    <>
      <Box
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
        }}
      >
        <Box display='flex' flexDirection='row' marginLeft='10px'>
          O
          <Typography variant='body1' sx={{ textTransform: 'none' }}>
            {project.projectName}
          </Typography>
        </Box>
        <span>V</span>
      </Box>
    </>
  );
};
