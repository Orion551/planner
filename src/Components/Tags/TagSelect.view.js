import React, { useState } from 'react';
import Button from '@mui/material/Button';
import { useGlobalState } from '@Context/GlobalStateContext';
import { TagsListView } from '@Components/Tags/TagsList.view';
import { Box, Popover } from '@mui/material';
import { TagItemView } from '@Components/Tags/TagItemView';
import { findTagById, findTagColorCode } from '@Utils/TagUtilities';

export const TagSelect = ({ tags = [], allowMultiple = false }) => {
  tags;
  allowMultiple;
  const { state: appState } = useGlobalState();
  const [anchorEl, setAnchorEl] = useState(null);

  const showTagsList = (ev) => {
    setAnchorEl(ev.currentTarget);
  };

  const handleTagInfoMenuClose = () => {
    setAnchorEl(null);
  };

  // TODO: Fill that
  const selectTag = () => {
    return;
  };

  // Normalize `tags` to always be an array
  const normalizedTags = Array.isArray(tags)
    ? tags // Use as-is if it's already an array
    : tags
      ? [tags] // Wrap the single string in an array if it's not null
      : []; // Default to an empty array if `tags` is null or undefined
  return (
    <>
      {allowMultiple ? (
        <ul>
          {normalizedTags.map((tag, index) => (
            <li key={index}>
              <TagItemView
                tagName={findTagById(appState.configData.userTags, tag).tagName}
                tagColor={findTagColorCode(
                  appState.configData.tagsPalette,
                  findTagById(appState.configData.userTags, tag).tagColorId
                )}
                isEmbedded={false}
              />
            </li>
          ))}
        </ul>
      ) : (
        normalizedTags[0] && (
          <TagItemView
            tagName={findTagById(appState.configData.userTags, normalizedTags[0]).tagName}
            tagColor={findTagColorCode(
              appState.configData.tagsPalette,
              findTagById(appState.configData.userTags, normalizedTags[0]).tagColorId
            )}
            isEmbedded={false}
          />
        )
      )}
      <Button onClick={showTagsList}>Add Tag</Button>
      <Popover open={Boolean(anchorEl)} anchorEl={anchorEl} onClose={handleTagInfoMenuClose}>
        <Box sx={{ p: 2 }}>
          <TagsListView
            tagSelection={selectTag}
            tags={appState.configData.userTags}
            tagsPalette={appState.configData.tagsPalette}
          />
        </Box>
      </Popover>
    </>
  );
};
