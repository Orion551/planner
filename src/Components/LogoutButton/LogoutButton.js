import React from 'react';
import { useAuth } from '@Context/AuthContext';
import { Button } from '@mui/material';

export const LogoutButton = () => {
  const { logout } = useAuth();

  return <Button onClick={logout}>Logout</Button>;
};
