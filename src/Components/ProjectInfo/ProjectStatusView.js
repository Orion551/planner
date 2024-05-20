import React, { useEffect, useState } from 'react';
import { StatusViewModes } from '@Constants/StatusViewModes';
import { useGlobalState } from '@Context/GlobalStateContext';
import CircleIcon from '@mui/icons-material/Circle';
import Button from '@mui/material/Button';
import { useTranslation } from 'react-i18next';

/**
 * @param {number} statusCode - The status code of the project {1 -> ongoing, 2 -> on_hold, 3 -> completed, 4 -> archived }
 * @param {string} viewMode - How the component should render. Available views are in @Constants/StatusViewModes
 * @returns ProjectStatusView - A simple UI element that describes the status of a Project.
 */
export const ProjectStatusView = ({ statusCode, viewMode }) => {
  const { t } = useTranslation();
  const {
    state: { configData },
  } = useGlobalState();
  const [statusObject, setStatusObject] = useState(null);

  // Retrieve project's status by finding it in the projectAvailableStates array;
  useEffect(() => {
    if (configData)
      setStatusObject(configData.projectStatus.find((status) => status.id === statusCode));
  }, [configData, statusCode]);

  switch (viewMode) {
    case StatusViewModes.BRIEF:
      return <CircleIcon sx={{ color: statusObject?.colorCode }} />;
    case StatusViewModes.DETAILED:
      return (
        <Button
          sx={{ borderColor: statusObject?.colorCode, color: statusObject?.colorCode }}
          variant='outlined'
          endIcon={<CircleIcon sx={{ color: statusObject?.colorCode }} />}
        >
          {t(`projects.projectStatus.${statusObject?.label}`)}
        </Button>
      );
    default:
      return <></>;
  }
};
