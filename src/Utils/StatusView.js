import React, { useState } from 'react';
import CircleIcon from '@mui/icons-material/Circle';
import { Menu } from '@mui/material';
import { useGlobalState } from '@Context/GlobalStateContext';
import { StatusViewModes } from '@Constants/StatusViewModes';
import { StatusButtonView } from '@Utils/StatusButtonView';
import MenuItem from '@mui/material/MenuItem';
import { Actions } from '@Context/Actions';

/**
 * `StatusView` component returns the status of an Activity|Project based on an ID;
 * @param id
 * @param statusCode
 * @param viewMode
 * @returns {Element}
 * @constructor
 */
export const StatusView = ({ project, viewMode = StatusViewModes.DETAILED }) => {
  const {
    state: { configData },
    dispatch,
  } = useGlobalState();
  /**
   * Will hold the status of the activity/project
   */
  const [status, setStatus] = useState(
    configData.status.find((s) => s.id === project.projectStatus)
  );
  setStatus;
  const [anchorEl, setAnchorEl] = useState(null);
  // Manages the state of the menu -> Open | Closed
  const open = Boolean(anchorEl);
  const [availableStatusOptions, setAvailableStatusOptions] = useState([]);
  setAvailableStatusOptions;

  const handleStatusMenu = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  /**
   * @param {string} id - The ID of what's to be changed;
   * @param {string} newStatus - New status to set
   */
  const handleSetStatus = (id, newStatus) => {
    console.log('should set the status');
    dispatch(Actions.setState(id, newStatus));
    handleClose();
  };

  switch (viewMode) {
    case StatusViewModes.BRIEF:
      return <CircleIcon sx={{ color: status?.colorCode, width: '0.7em', height: '0.7em' }} />;
    case StatusViewModes.DETAILED:
      return (
        <>
          <StatusButtonView
            label={status?.label}
            colorCode={status?.colorCode}
            click={handleStatusMenu}
            isAction={false}
          />
          <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
            {availableStatusOptions.map((s, idx) => (
              <MenuItem key={idx}>
                <StatusButtonView
                  label={s.label}
                  colorCode={s.colorCode}
                  click={() => handleSetStatus(project.id, s.id)}
                  isAction={true}
                />
              </MenuItem>
            ))}
          </Menu>
        </>
      );
  }
};
