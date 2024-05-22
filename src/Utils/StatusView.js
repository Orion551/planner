import React, { useEffect, useState } from 'react';
import CircleIcon from '@mui/icons-material/Circle';
import { Menu } from '@mui/material';
import { useGlobalState } from '@Context/GlobalStateContext';
import { StatusViewModes } from '@Constants/StatusViewModes';
import { StatusButtonView } from '@Utils/StatusButtonView';
import MenuItem from '@mui/material/MenuItem';
import { setState } from '@Context/GlobalStateContext';

export const StatusView = ({
  id,
  statusCode,
  context = 'project',
  viewMode = StatusViewModes.DETAILED,
}) => {
  context;
  const {
    state: { configData },
    dispatch,
  } = useGlobalState();
  const [status, setStatus] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const [availableStatusOptions, setAvailableStatusOptions] = useState([]);
  availableStatusOptions;

  const handleStatusMenu = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  /**
   * @param {string} id - The ID of what's to be changed;
   * @param {string} newStatus - New status to set
   * @param {string} context - The context on which to act
   */
  const handleSetStatus = (id, context, newStatus) => {
    console.log('should set the status');
    dispatch(setState(id, context, newStatus));
    handleClose();
  };

  /**
   * Handles state change for activities and projects;
   */
  useEffect(() => {
    if (configData) setStatus(configData.status.find((s) => s.id === statusCode));
  }, [configData, statusCode]);

  /**
   * TODO: This can be improved to one only state object.
   */
  useEffect(() => {
    /**
     * In case the component is being rendered on an `ActivityCard`, we'll have to remove the `archived` property.
     */
    let availableStates = [];
    context === 'activity'
      ? (availableStates = configData?.status.filter((state) => state.label !== 'archived'))
      : (availableStates = configData?.status);
    setAvailableStatusOptions(availableStates.filter((aS) => aS.label !== status?.label));
  }, [configData, status, context]);

  // TODO: UPDATE THE STATE

  switch (viewMode) {
    case StatusViewModes.BRIEF:
      return <CircleIcon sx={{ color: status?.colorCode }} />;
    case StatusViewModes.DETAILED:
      return (
        <>
          <StatusButtonView
            label={status?.label}
            colorCode={status?.colorCode}
            click={handleStatusMenu}
          />
          <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
            {availableStatusOptions.map((s, idx) => (
              <MenuItem key={idx}>
                <StatusButtonView
                  label={s.label}
                  colorCode={s.colorCode}
                  click={() => handleSetStatus(id, context, s.id)}
                />
              </MenuItem>
            ))}
          </Menu>
        </>
      );
  }
};
