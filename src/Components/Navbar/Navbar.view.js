import React from 'react';
// import logo from '@Assets/images/logo_tmp.png';
import '@Assets/styles/navbar.scss';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import { NavbarButtonsView } from '@Components/Navbar/NavbarButtons.view';
import { List } from '@mui/material';
import { LogoutButton } from '@Components/LogoutButton/LogoutButton';

export function NavbarView({ handleDrawerToggle }) {
  return (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Typography variant='h6' sx={{ my: 2 }}>
        Planner
      </Typography>
      <Divider />
      <List>
        <NavbarButtonsView />
      </List>
      <LogoutButton />
    </Box>
  );
}
