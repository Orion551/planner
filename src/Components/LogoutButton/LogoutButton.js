import React from 'react';
import { useAuth } from '@Context/AuthContext';
import IconButton from '@mui/material/IconButton';
import LogoutIcon from '@mui/icons-material/Logout';

export const LogoutButton = () => {
  const { logout } = useAuth();

  return (
    <IconButton onClick={logout}>
      <LogoutIcon />
    </IconButton>
  );
};
