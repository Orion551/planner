import React, { useEffect, useState } from 'react';
import CircleIcon from '@mui/icons-material/Circle';
import { Menu } from '@mui/material';
import { useGlobalState } from '@Context/GlobalStateContext';
import { StatusViewModes } from '@Constants/StatusViewModes';
import { StatusButtonView } from '@Utils/StatusButtonView';
import MenuItem from '@mui/material/MenuItem';

export const StatusView = ({
  statusCode,
  context = 'project',
  viewMode = StatusViewModes.DETAILED,
}) => {
  context;
  const {
    state: { configData },
  } = useGlobalState();
  const [status, setStatus] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const [availableStatusOptions, setAvailableStatusOptions] = useState([]);
  availableStatusOptions;

  const handleClick = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  /**
   * Handles state change for activities and projects;
   */
  useEffect(() => {
    if (configData) setStatus(configData.status.find((s) => s.id === statusCode));
  }, [configData, statusCode]);

  useEffect(() => {
    setAvailableStatusOptions(
      context === 'activity'
        ? configData?.status.filter((state) => state.label !== 'archived')
        : configData?.status
    );
  }, [configData?.status, context]);

  switch (viewMode) {
    case StatusViewModes.BRIEF:
      return <CircleIcon sx={{ color: status?.colorCode }} />;
    case StatusViewModes.DETAILED:
      return (
        <>
          <StatusButtonView
            label={status?.label}
            colorCode={status?.colorCode}
            click={handleClick}
          />
          <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
            {availableStatusOptions.map((s, idx) => (
              <MenuItem key={idx} onClick={handleClose}>
                <StatusButtonView label={s.label} colorCode={s.colorCode} />
              </MenuItem>
            ))}
          </Menu>
        </>
      );
  }
};
