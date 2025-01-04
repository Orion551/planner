import React from 'react';
import { Box, Typography } from '@mui/material';
import '@Assets/styles/tag.scss';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import IconButton from '@mui/material/IconButton';
import ClearRoundedIcon from '@mui/icons-material/ClearRounded';
import { findTagById, findTagColorCode } from '@Utils/TagUtilities';
import { useGlobalState } from '@Context/GlobalStateContext';

/**
 * Renders the tag item
 * @param tagName {String} - Display name of the tag
 * @param allowRemove {Boolean} - If true -> X button will be rendered within the Tag. Used to remove the tag from an activity/project
 */
export const TagItemView = ({
  tagId,
  embedded = true,
  allowRemove = false,
  infoToggle = () => {},
  remove = () => {},
}) => {
  const { state: appState } = useGlobalState();
  const tag = findTagById(appState.configData.userTags, tagId);
  const tagHexColor = findTagColorCode(appState.configData.tagsPalette, tag.tagColorId);
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
            backgroundColor: tagHexColor,
            borderRadius: '10px',
            padding: '4px',
            userSelect: 'none',
          }}
        >
          <Typography variant='caption' ml={1} mr={1} noWrap={true} fontWeight={500}>
            {tag.tagName}
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
          <IconButton
            onClick={(e) => infoToggle(e, { tagName: tag.tagName, tagColor: tagHexColor })}
          >
            <MoreHorizIcon />
          </IconButton>
        )}
      </Box>
    </>
  );
};
