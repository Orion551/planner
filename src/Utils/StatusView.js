import React, { useEffect, useState } from 'react';
import CircleIcon from '@mui/icons-material/Circle';
import { Menu } from '@mui/material';
import { useGlobalState } from '@Context/GlobalStateContext';
import { StatusViewModes } from '@Constants/StatusViewModes';
import { StatusButtonView } from '@Utils/StatusButtonView';
import MenuItem from '@mui/material/MenuItem';
// import { Actions } from '@Context/Actions';
import { putRequest } from '@Api/http-service';

const StatusMenuItem = ({ statusOption, handleSetStatus }) => (
  <MenuItem>
    <StatusButtonView
      label={statusOption.label}
      colorCode={statusOption.colorCode}
      click={() => handleSetStatus(statusOption.id)}
      isAction={true}
    />
  </MenuItem>
);

/**
 * `StatusView` component returns the status of an Activity|Project based on an ID;
 * @param projectId
 * @param viewMode
 * @returns {Element}
 * @constructor
 */
export const StatusView = ({ projectId, viewMode = StatusViewModes.DETAILED }) => {
  const {
    state: { configData, projects },
    // dispatch,
  } = useGlobalState();
  /**
   * Will hold the status of the project
   */
  const [status, setStatus] = useState(null);
  setStatus;
  const [anchorEl, setAnchorEl] = useState(null);
  const [availableStatusOptions, setAvailableStatusOptions] = useState([]);
  // Manages the state of the menu -> Open | Closed
  const open = Boolean(anchorEl);

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
  const handleSetStatus = async (newStatus) => {
    console.log('should set the status', newStatus);
    try {
      await putRequest({ url: `/projects/${projectId}`, data: { projectStatus: newStatus } }).then(
        (response) => {
          console.log(response);
          // dispatch(Actions.setState(id, context, newStatus));
          handleClose();
        }
      );
    } catch (e) {
      console.error(e.message);
      handleClose();
    }
  };

  /**
   * Find the project or activity based on context & id
   */
  useEffect(() => {
    const project = projects[projects.findIndex((p) => p.id === projectId)];
    console.log('project', project);
    setStatus(configData.status.find((s) => s.id === project.projectStatus));
  }, [projects, projectId, configData.status]);

  useEffect(() => {
    setAvailableStatusOptions(configData.status.filter((aS) => aS.label !== status?.label));
  }, [configData, status]);

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
            {availableStatusOptions.map((statusOption, idx) => (
              <StatusMenuItem
                key={idx}
                statusOption={statusOption}
                handleSetStatus={() => handleSetStatus(statusOption.id)}
              />
            ))}
          </Menu>
        </>
      );
  }
};
