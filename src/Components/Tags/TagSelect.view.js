import React, { useState } from 'react';
import { useGlobalState } from '@Context/GlobalStateContext';
import { TagsListView } from '@Components/Tags/TagsList.view';
import { Box, Popover } from '@mui/material';
import { TagItemView } from '@Components/Tags/TagItemView';
import { Add } from '@mui/icons-material';
import IconButton from '@mui/material/IconButton';

export const TagSelect = ({ tags = [], allowMultiple = false }) => {
  const { state: appState } = useGlobalState();
  const [anchorEl, setAnchorEl] = useState(null);
  // eslint-disable-next-line no-unused-vars
  const [normalizedTags, setNormalizedTags] = useState(
    Array.isArray(tags) ? tags : tags ? [tags] : []
  );

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
  // const normalizedTags = Array.isArray(tags)
  //   ? tags // Use as-is if it's already an array
  //   : tags
  //     ? [tags] // Wrap the single string in an array if it's not null
  //     : []; // Default to an empty array if `tags` is null or undefined
  return (
    <>
      {allowMultiple ? (
        <ul>
          {normalizedTags.map((tag, index) => (
            <li key={index}>
              <TagItemView tagId={tag.id} isEmbedded={false} />
            </li>
          ))}
        </ul>
      ) : (
        normalizedTags[0] && (
          <TagItemView tagId={normalizedTags[0]} isEmbedded={true} allowRemove={true} />
        )
      )}
      <IconButton onClick={showTagsList} size='small'>
        <Add />
      </IconButton>
      <Popover open={Boolean(anchorEl)} anchorEl={anchorEl} onClose={handleTagInfoMenuClose}>
        <Box sx={{ p: 2 }}>
          <TagsListView
            tagSelection={selectTag}
            tags={appState.configData.userTags.filter((uT) => !normalizedTags.includes(uT.id))}
            isEmbedded={true}
          />
        </Box>
      </Popover>
    </>
  );
};
