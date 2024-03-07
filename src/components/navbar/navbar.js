import React from 'react';
import logo from '@Assets/images/logo_tmp.png';
import { NavbarButtons } from './navbar-buttons';
import { Outlet } from 'react-router-dom';
import { Stack } from '@mui/material';
import '@Assets/styles/navbar.scss';

export function Navbar() {
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
          <NavbarButtons />
        </Stack>
        <div>
          <Outlet />
        </div>
      </div>
    </>
  );
}
