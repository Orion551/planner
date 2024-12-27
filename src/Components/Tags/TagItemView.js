import React from 'react';
import { Box, Typography } from '@mui/material';
import '@Assets/styles/tag.scss';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import IconButton from '@mui/material/IconButton';

/**
 * Renders the tag item
 * @param tagName {String} - Display name of the tag
 * @param tagColor {String} - HEX value
 */
export const TagItemView = ({ tagName, tagColor }) => {
  return (
    <>
      {/* TODO: Improve that */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '5px',
          marginTop: '5px',
          cursor: 'pointer',
        }}
      >
        <Box
          sx={{
            backgroundColor: tagColor,
            borderRadius: '10px',
            padding: '4px',
            userSelect: 'none',
          }}
        >
          <Typography variant='caption' ml={1} mr={1} noWrap={true} fontWeight={500}>
            {tagName}
          </Typography>
        </Box>
        <IconButton>
          <MoreHorizIcon />
        </IconButton>
      </Box>
    </>
  );
};
