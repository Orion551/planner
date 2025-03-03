import React from 'react';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import { useGlobalState } from '@Context/GlobalStateContext';
import { Box, Typography } from '@mui/material';
import { useField } from 'formik';
import { ValidationFeedback } from '@Components/Shared/ValidationFeedback';

export const ActivityPlanGroup = ({ label, selectedColumns, onColumnSelection, ...props }) => {
  const { state: appState } = useGlobalState();

  //eslint-disable-next-line no-unused-vars
  const [field, meta] = useField(props); // Correctly track Formik state

  return (
    <>
      <Box sx={{ marginBottom: '8px', marginTop: '16px' }}>
        <Typography variant='subtitle1' color='textPrimary' sx={{ userSelect: 'none' }}>
          {label}
        </Typography>
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
      </Box>
      {meta.error && <ValidationFeedback validationMessage={meta.error} />}
    </>
  );
};
