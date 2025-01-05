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
 * @param tagId {String} - The id of the Tag
 * @param embedded {Boolean} - Shows/Hides <MoreHorizIcon /> button that allows the user to edit the tag
 * @param allowRemove {Boolean} - If true -> 'x' button will be rendered within the Tag. Used to remove the tag from an activity/project
 * @param onInfoToggleClick {Function} - Fn prop that comes from a parent component and will be used to open tag edit capabilities (color set, delete, rename)
 * @param OnTagSelect {Function} - Fn prop that comes from a parent component. Allows a user to click and select a tag (i.e when creating an Activity/Project)
 * @param onTagRemove {Function} - Fn prop that comes from a parent component. Allows a user to click an 'x' button to remove the tag from a form (i.e when creating/editing an Activity/Project)
 */
export const TagItemView = ({
  tagId,
  embedded = true,
  allowRemove = false,
  onInfoToggleClick = () => {},
  onTagSelect = () => {},
  onTagRemove = () => {},
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
          onClick={() => onTagSelect(tag.id)}
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
            <IconButton size='small' onClick={() => onTagRemove(tag.id)}>
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
            onClick={(e) =>
              onInfoToggleClick(e, {
                tagId: tagId,
                tagName: tag.tagName,
                tagColorId: tag.tagColorId,
              })
            }
          >
            <MoreHorizIcon />
          </IconButton>
        )}
      </Box>
    </>
  );
};
