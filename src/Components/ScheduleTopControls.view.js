import React, { useState } from 'react';
import { Button, Menu, MenuItem } from '@mui/material';

export const ScheduleTopControlsView = () => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  // TODO: Buttons must be separate components. Refactor this to be in a folder
  return (
    <>
      <div>
        <Button onClick={handleClick}>Tags</Button>
        <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
          <MenuItem onClick={handleClose}>Item 1</MenuItem>
          <MenuItem onClick={handleClose}>Item 2</MenuItem>
        </Menu>
      </div>
    </>
  );
};
