import React from 'react';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import { useGlobalState } from '@Context/GlobalStateContext';
import { Box } from '@mui/material';
/**
 *
 * @param {*} param0
 * @returns
 */
export const ActivityPlanGroup = ({ selectedColumns, onColumnSelection, isDisabled }) => {
  const { state: appState } = useGlobalState();

  return (
    <Box sx={{ marginBottom: '8px', marginTop: '16px' }}>
      <ButtonGroup disabled={isDisabled} size='small' color='primary' disableElevation>
        {appState.configData.scheduleColumns.map((column) => (
          <Button
            variant={selectedColumns.includes(column.columnId) ? 'contained' : 'outlined'}
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
