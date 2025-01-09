import React, { useEffect, useState } from 'react';
import CircleIcon from '@mui/icons-material/Circle';
import { useGlobalState } from '@Context/GlobalStateContext';
import { StatusViewModes } from '@Constants/StatusViewModes';
import { StatusButtonView } from '@Utils/StatusButtonView';
import MenuItem from '@mui/material/MenuItem';
import { Actions } from '@Context/Actions';
import Menu from '@mui/material/Menu';

import { putRequest } from '@Api/http-service';

import { ApiUrl } from '@Constants/ApiUrl';

/**
 * `StatusView` component returns the status of an Activity|Project based on an ID;
 * @param status {Number} - Status code (i.e. 1 -> ongoing, 2 -> hold...)
 * @param projectId {String} - ID of the Project
 * @param viewMode
 */
export const StatusView = ({ projectId, currentStatus, viewMode = StatusViewModes.DETAILED }) => {
  const {
    state: { configData },
    dispatch,
  } = useGlobalState();

  const [status, setStatus] = useState(configData.status.find((s) => s.id === currentStatus) || {});
  const [anchorEl, setAnchorEl] = useState(null);

  // Sync status with currentStatus changes
  useEffect(() => {
    const updatedStatus = configData.status.find((s) => s.id === currentStatus);
    setStatus(updatedStatus || {});
  }, [currentStatus, configData.status]);

  // Manage menu state
  const open = Boolean(anchorEl);
  const handleStatusMenu = (e) => setAnchorEl(e.currentTarget);
  const handleClose = () => setAnchorEl(null);

  // Handle status update
  const handleSetStatus = async (id, newStatus) => {
    try {
      const response = await putRequest({
        url: `${ApiUrl.projects}/${projectId}`,
        data: { projectStatus: newStatus },
      });
      console.log('response', response);
      dispatch(Actions.setProjectStatus(id, newStatus));
    } catch (e) {
      console.error(e);
    }
    handleClose();
  };

  // Render based on viewMode
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
            {configData.status
              .filter((s) => s.id !== status?.id)
              .map((st) => (
                <MenuItem key={st.id}>
                  <StatusButtonView
                    label={st.label}
                    colorCode={st.colorCode}
                    click={() => handleSetStatus(projectId, st.id)}
                    isAction={true}
                  />
                </MenuItem>
              ))}
          </Menu>
        </>
      );

    default:
      return null;
  }
};
