import React from 'react';
import { Box } from '@mui/material';
import { Typography, TextField } from '@mui/material';

export const ProjectSummaryView = ({ summaryData }) => {
  return (
    <>
      <Box display='flex' flexDirection='row'>
        <Box marginRight={3}>
          <Typography variant='body1'>Tags</Typography>
        </Box>
        <Box>{summaryData.projectTags.map((tag) => tag)}</Box>
      </Box>

      <Box marginTop={2}>
        <TextField
          id='project-description'
          fullWidth
          label='Description'
          multiline
          rows={4}
          defaultValue={
            summaryData.projectDescription !== ''
              ? summaryData.projectDescription
              : 'something to say?'
          }
        />
      </Box>
    </>
  );
};
