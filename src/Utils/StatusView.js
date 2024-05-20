import React, { useEffect, useState } from 'react';
import CircleIcon from '@mui/icons-material/Circle';
import { Button, Menu } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useGlobalState } from '@Context/GlobalStateContext';
import { StatusViewModes } from '@Constants/StatusViewModes';
import MenuItem from '@mui/material/MenuItem';

export const StatusView = ({ statusCode, viewMode = StatusViewModes.DETAILED }) => {
  const { t } = useTranslation();
  const {
    state: { configData },
  } = useGlobalState();
  const [status, setStatus] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    if (configData) setStatus(configData.status.find((s) => s.id === statusCode));
  }, [configData, statusCode]);

  switch (viewMode) {
    case StatusViewModes.BRIEF:
      return <CircleIcon sx={{ color: status?.colorCode }} />;
    case StatusViewModes.DETAILED:
      return (
        <>
          <Button
            sx={{ borderColor: status?.colorCode, color: status?.colorCode }}
            variant='outlined'
            size='small'
            endIcon={<CircleIcon sx={{ color: status?.colorCode }} />}
            onClick={handleClick}
          >
            {t(`status.${status?.label}`)}
          </Button>
          <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
            <MenuItem onClick={handleClose}>Opt 1</MenuItem>
            <MenuItem onClick={handleClose}>Opt 2</MenuItem>
          </Menu>
        </>
      );
  }
};
