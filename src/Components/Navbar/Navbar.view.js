import React from 'react';
// import logo from '@Assets/images/logo_tmp.png';
// import { NavbarButtonsView } from '@Components/Navbar/NavbarButtons.view';
// import { Outlet } from 'react-router-dom';
import '@Assets/styles/navbar.scss';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
// import { Link } from 'react-router-dom';

export function NavbarView({ handleDrawerToggle }) {
  return (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Typography variant='h6' sx={{ my: 2 }}>
        Test
      </Typography>
      <Divider />
      <List>
        <ListItem to='/'>
          <ListItemButton sx={{ textAlign: 'center' }}>
            <ListItemText primary='Schedule' />
          </ListItemButton>
        </ListItem>
        <ListItem to='/projects'>
          <ListItemButton sx={{ textAlign: 'center' }}>
            <ListItemText primary='Projects' />
          </ListItemButton>
        </ListItem>
        <ListItem to='/analytics'>
          <ListItemButton sx={{ textAlign: 'center' }}>
            <ListItemText primary='Analytics' />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );
}
