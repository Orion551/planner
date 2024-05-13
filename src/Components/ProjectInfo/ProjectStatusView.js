import React, { useEffect, useState } from 'react';
import { ProjectStatusViewModes } from '@Constants/ProjectStatusViewModes';
import { useGlobalState } from '@Context/GlobalStateContext';

/**
 * @param {number} statusCode - The status code of the project {1 -> ongoing, 2 -> on_hold, 3 -> completed, 4 -> archived }
 * @param {string} viewMode - How the component should render. Available views are in @Constants/ProjectStatusViewModes
 * @returns ProjectStatusView - A simple UI element that describes the status of a Project.
 */
export const ProjectStatusView = ({ statusCode, viewMode }) => {
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
    case ProjectStatusViewModes.BRIEF:
      return (
        <div>
          Status: {statusObject?.label} {statusCode}
        </div>
      );
    case ProjectStatusViewModes.DETAILED:
      return (
        <div>
          Detailed status: {statusObject?.label} {statusCode}
        </div>
      );
    default:
      return <></>;
  }
};
