import React from 'react';
import { Box, Typography } from '@mui/material';
import '@Assets/styles/tag.scss';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import IconButton from '@mui/material/IconButton';
import ClearRoundedIcon from '@mui/icons-material/ClearRounded';

/**
 * Renders the tag item
 * @param tagName {String} - Display name of the tag
 * @param tagColor {String} - HEX value
 * @param isEmbedded {Boolean} - If the displayed Tag is embedded in another (Client) component or not. Shows conditionally interaction buttons
 * @param allowRemove {Boolean} - If true -> X button will be rendered within the Tag. Used to remove the tag from an activity/project
 */
export const TagItemView = ({
  tagName,
  tagColor,
  embedded = true,
  allowRemove = false,
  infoToggle = () => {},
  remove = () => {},
}) => {
  return (
    <>
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
          {allowRemove && (
            <IconButton size='small' onClick={(e) => remove(e)}>
              <ClearRoundedIcon
                sx={{
                  width: '12px',
                  height: '12px',
                }}
              />
            </IconButton>
          )}
        </Box>
        {!embedded && (
          <IconButton onClick={(e) => infoToggle(e, { tagName: tagName, tagColor: tagColor })}>
            <MoreHorizIcon />
          </IconButton>
        )}
      </Box>
    </>
  );
};
