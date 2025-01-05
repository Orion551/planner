import React, { useState } from 'react';
import { useGlobalState } from '@Context/GlobalStateContext';
import { TagsListView } from '@Components/Tags/TagsList.view';
import { Box, Popover } from '@mui/material';
import { TagItemView } from '@Components/Tags/TagItemView';
import { Add } from '@mui/icons-material';
import IconButton from '@mui/material/IconButton';

export const TagSelect = ({ tags = [], onTagSelect, allowMultiple = false }) => {
  const { state: appState } = useGlobalState();
  const [anchorEl, setAnchorEl] = useState(null);

  const [normalizedTags, setNormalizedTags] = useState(
    Array.isArray(tags) ? tags : tags ? [tags] : []
  );

  const showTagsList = (ev) => {
    setAnchorEl(ev.currentTarget);
  };

  const handleTagInfoMenuClose = () => {
    setAnchorEl(null);
  };

  const selectTag = (tagId) => {
    if (allowMultiple) {
      setNormalizedTags((prevTags) => {
        const updatedTags = [...prevTags, tagId];
        onTagSelect(updatedTags);
        return updatedTags;
      });
    } else {
      setNormalizedTags([tagId]);
      onTagSelect(tagId);
    }
    handleTagInfoMenuClose();
  };

  const removeTag = (tagId) => {
    setNormalizedTags((prevTags) => {
      const updatedTags = prevTags.filter((tag) => tag !== tagId);
      allowMultiple ? onTagSelect(updatedTags) : onTagSelect(null);
      return updatedTags;
    });

    console.log(`Removed tag: ${tagId}`);
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
            <TagItemView
              key={index}
              tagId={tag}
              isEmbedded={false}
              allowRemove={true}
              onTagRemove={removeTag}
            />
          ))}
        </ul>
      ) : (
        normalizedTags[0] && (
          <TagItemView
            tagId={normalizedTags[0]}
            isEmbedded={true}
            allowRemove={true}
            onTagRemove={removeTag}
          />
        )
      )}
      <IconButton
        onClick={showTagsList}
        size='small'
        disabled={appState.configData.userTags.every((uT) => normalizedTags.includes(uT.id))}
      >
        <Add />
      </IconButton>
      <Popover open={Boolean(anchorEl)} anchorEl={anchorEl} onClose={handleTagInfoMenuClose}>
        <Box sx={{ p: 2 }}>
          <TagsListView
            onTagSelect={selectTag}
            tags={appState.configData.userTags.filter((uT) => !normalizedTags.includes(uT.id))}
            isEmbedded={true}
          />
        </Box>
      </Popover>
    </>
  );
};
