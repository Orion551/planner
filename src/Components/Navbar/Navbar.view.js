import React from 'react';
import logo from '@Assets/images/logo_tmp.png';
import { NavbarButtonsView } from '@Components/Navbar/NavbarButtons.view';
import { Outlet } from 'react-router-dom';
import { Stack } from '@mui/material';
import '@Assets/styles/navbar.scss';

export function NavbarView() {
  return (
    <>
      <div className='navbar'>
        <Stack
          direction='column'
          justifyContent='flex-start'
          alignItems='center'
          flexWrap='nowrap'
          spacing={2}
        >
          <img src={logo} alt='Logo' className='logo' />
          <NavbarButtonsView />
        </Stack>
        <div>
          <Outlet />
        </div>
      </div>
    </>
  );
}
