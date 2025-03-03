import React from 'react';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import { useGlobalState } from '@Context/GlobalStateContext';
import { Box } from '@mui/material';
import { useField } from 'formik';

export const ActivityPlanGroup = ({ selectedColumns, onColumnSelection, ...props }) => {
  const { state: appState } = useGlobalState();

  //eslint-disable-next-line no-unused-vars
  const [field, meta] = useField(props); // Correctly track Formik state

  return (
    <Box sx={{ marginBottom: '8px', marginTop: '16px' }}>
      <ButtonGroup name={props.name} size='small' color='primary' disableElevation>
        {appState.configData.scheduleColumns.map((column) => (
          <Button
            key={column.columnId}
            variant={selectedColumns.includes(column.columnId) ? 'contained' : 'outlined'}
            onClick={() => onColumnSelection(column.columnId)}
            sx={{ textTransform: 'none' }}
          >
            {column.columnId.substring(0, 3)}
          </Button>
        ))}
      </ButtonGroup>
      {meta.error && <div className='error'>{meta.error}</div>}
    </Box>
  );
};
