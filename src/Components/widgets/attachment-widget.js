import React from 'react';
import { Box, Paper, Typography } from '@mui/material';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

export const AttachmentWidget = ({ attachmentData }) => {
  attachmentData;
  return (
    <>
      <Paper
        sx={{ width: '120px', height: '120px', padding: '3px' }}
        variant='outlined'
        square={false}
      >
        <Box display='flex' flexDirection='column' justifyContent='space-between' height='100%'>
          {attachmentData.type === 'document' ? (
            <Box
              sx={{
                height: '100%',
                display: 'flex',
                justifyContent: 'space-around',
                alignItems: 'center',
              }}
            >
              <DescriptionOutlinedIcon sx={{ width: '80px', height: '80px', color: '#39A0C0' }} />
            </Box>
          ) : (
            <Box
              sx={{
                height: '100%',
                display: 'flex',
                justifyContent: 'space-around',
                alignItems: 'center',
              }}
            >
              <ImageOutlinedIcon sx={{ width: '80px', height: '80px', color: '#D81E15' }} />
            </Box>
          )}
          <Box
            display='flex'
            flexDirection='row'
            justifyContent='space-between'
            marginLeft='3px'
            alignItems='center'
          >
            <Typography variant='caption'>{attachmentData.attachmentName}</Typography>
            <MoreHorizIcon />
          </Box>
        </Box>
      </Paper>
    </>
  );
};
