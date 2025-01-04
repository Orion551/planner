import React from 'react';
import { TagItemView } from '@Components/Tags/TagItemView';
import { Box } from '@mui/material';

/**
 * Renders a list of tags
 * @param tags {Array<Tag>} - The tags to render
 * @param handleTagInfoToggle {Function} - Function that should be provided by the parent
 * @param isEmbedded
 */
export const TagsListView = ({
  tags,
  onTagSelect = () => {},
  handleTagInfoToggle = () => {},
  embedded = true,
}) => {
  return (
    <>
      <Box sx={{ flex: 'column' }}>
        {tags.map((tag, idx) => (
          <TagItemView
            key={idx}
            tagId={tag.id}
            embedded={embedded}
            onInfoToggleClick={handleTagInfoToggle}
            onTagSelect={onTagSelect}
            onTagRemove={null}
          />
        ))}
      </Box>
    </>
  );
};
