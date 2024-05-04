import React from 'react';
import { ListItem, ListItemText, ListItemAvatar, Avatar, IconButton } from '@mui/material';
import Delete from '@mui/icons-material/Delete';
import Folder from '@mui/icons-material/Folder';

export const ProjectItemView = ({ project, isSelected }) => {
  isSelected;
  project;
  return (
    <>
      <ListItem
        secondaryAction={
          <IconButton edge='end' aria-label='delete'>
            <Delete />
          </IconButton>
        }
      >
        <ListItemAvatar>
          <Avatar>
            <Folder />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary={project.projectName} />
      </ListItem>
    </>
  );
};
