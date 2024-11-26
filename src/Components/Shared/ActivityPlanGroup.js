// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import { useGlobalState } from '@Context/GlobalStateContext';
import { Box } from '@mui/material';
/**
 *
 * @param {*} param0
 * @returns
 */
// eslint-disable-next-line no-unused-vars
export const ActivityPlanGroup = ({ selectedColumns = {}, onColumnSelection, isDisabled }) => {
  const { state: appState } = useGlobalState();
  onColumnSelection;
  // const [localSelectedColumns, setLocalSelectedColumns] = useState([]);

  // useEffect(() => {
  //   setLocalSelectedColumns(selectedColumns);
  // }, [selectedColumns]);

  // const handleColumnSelection = (columnId) => {
  //   if (localSelectedColumns.includes(columnId))
  //     setLocalSelectedColumns(localSelectedColumns.filter((id) => id !== columnId));
  //   else setLocalSelectedColumns([...localSelectedColumns, columnId]);
  //
  //   console.log(localSelectedColumns);
  //   // Call the callback function to update the parent state
  //   // onColumnSelection(localSelectedColumns);
  //   // console.log('local selected columns', localSelectedColumns);
  // };

  return (
    <Box sx={{ marginBottom: '8px', marginTop: '16px' }}>
      <ButtonGroup disabled={isDisabled} size='small' color='primary' disableElevation>
        {appState.configData.scheduleColumns.map((column) => (
          <Button
            // variant={localSelectedColumns.includes(column.columnId) ? 'contained' : 'outlined'}
            onClick={() => onColumnSelection(column.columnId)}
            key={column.columnId}
            sx={{ textTransform: 'none' }}
          >
            {column.columnId.substring(0, 3)}
          </Button>
        ))}
      </ButtonGroup>
    </Box>
  );
};
