import React, { useState } from 'react';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import { useGlobalState } from '@Context/GlobalStateContext';

export const ActivityPlanGroup = () => {
  const { state: appState } = useGlobalState();
  const [selectedColumns, setSelectedColumns] = useState([]);
  selectedColumns;

  const handleColumnSelection = (columnId) => {
    // Check if the column is already selected
    if (selectedColumns.includes(columnId))
      setSelectedColumns(selectedColumns.filter((id) => id !== columnId));
    // If not selected, add it to the state
    else setSelectedColumns([...selectedColumns, columnId]);
  };

  return (
    <>
      <ButtonGroup size='small' color='secondary' disableElevation>
        {appState.configData.scheduleColumns.map((column) => (
          <Button
            variant={selectedColumns.includes(column.columnId) ? 'contained' : 'outlined'}
            onClick={() => handleColumnSelection(column.columnId)}
            key={column.columnId}
          >
            {column.columnId}
          </Button>
        ))}
      </ButtonGroup>
    </>
  );
};
