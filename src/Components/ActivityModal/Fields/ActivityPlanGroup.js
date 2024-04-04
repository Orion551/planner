import React, { useState } from 'react';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import { useGlobalState } from '@Context/GlobalStateContext';
/**
 *
 * @param {*} param0
 * @returns
 */
export const ActivityPlanGroup = ({ selectedColumns, onColumnSelection, isDisabled }) => {
  const { state: appState } = useGlobalState();
  const [localSelectedColumns, setLocalSelectedColumns] = useState(selectedColumns);

  console.log(isDisabled);

  const handleColumnSelection = (columnId) => {
    if (localSelectedColumns.includes(columnId))
      setLocalSelectedColumns(localSelectedColumns.filter((id) => id !== columnId));
    else setLocalSelectedColumns([...localSelectedColumns, columnId]);

    // Call the callback function to update the parent state
    onColumnSelection(localSelectedColumns);
    console.log('local selected columns', localSelectedColumns);
  };

  return (
    <>
      <ButtonGroup disabled={isDisabled} size='small' color='secondary' disableElevation>
        {appState.configData.scheduleColumns.map((column) => (
          <Button
            variant={localSelectedColumns.includes(column.columnId) ? 'contained' : 'outlined'}
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
