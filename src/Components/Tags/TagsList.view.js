import React from 'react';
import { TagItemView } from '@Components/Tags/TagItemView';
import { Box } from '@mui/material';

/**
 * Renders a list of tags
 * @param tags {Array<Tag>} - The tags to render
 * @param tagsPalette {Array<String>} - The palette of colors
 * @param handleTagInfoToggle {Function} - Function that should be provided by the parent
 * @param isEmbedded
 */
export const TagsListView = ({
  tags,
  tagsPalette,
  handleTagInfoToggle = () => {},
  embedded = true,
}) => {
  return (
    <>
      <Box sx={{ flex: 'column' }}>
        {tags.map((tag, idx) => (
          <TagItemView
            key={idx}
            tagName={tag.tagName}
            tagColor={tagsPalette.find((tP) => tP.id === tag.tagColorId)?.code}
            embedded={embedded}
            infoToggle={handleTagInfoToggle}
            remove={null}
          />
        ))}
      </Box>
    </>
  );
};
