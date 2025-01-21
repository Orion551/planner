import React, { useState } from 'react';
import { useGlobalState } from '@Context/GlobalStateContext';
import { TagsListView } from '@Components/Tags/TagsList.view';
import { Box, Popover, Typography } from '@mui/material';
import { TagItemView } from '@Components/Tags/TagItemView';
import { Add } from '@mui/icons-material';
import IconButton from '@mui/material/IconButton';
import { useTranslation } from 'react-i18next';

export const TagSelect = ({ tags = [], onTagSelect, allowMultiple = false }) => {
  const { state: appState } = useGlobalState();
  const { t } = useTranslation();
  const [anchorEl, setAnchorEl] = useState(null);

  // Normalize `tags` to always be an array
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
  };

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          marginBottom: '8px',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
          <Typography>{t(`tags.${allowMultiple ? 'tags' : 'tag'}`)}</Typography>
          <IconButton
            onClick={showTagsList}
            size='small'
            disabled={appState.configData.userTags.every((uT) => normalizedTags.includes(uT.id))}
          >
            <Add />
          </IconButton>
        </Box>
        {allowMultiple ? (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {normalizedTags.map((tag, index) => (
              <TagItemView
                key={index}
                tagId={tag}
                isEmbedded={false}
                allowRemove={true}
                onTagRemove={removeTag}
              />
            ))}
          </div>
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
      </Box>
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
