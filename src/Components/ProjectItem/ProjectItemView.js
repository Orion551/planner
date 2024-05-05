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
        <span>O</span>
        <span>
          <Typography variant='body1' sx={{ textTransform: 'none' }}>
            {project.projectName}
          </Typography>
        </span>
        <span>V</span>
      </Box>
    </>
  );
};
