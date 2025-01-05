import React from 'react';
import { TagItemView } from '@Components/Tags/TagItemView';
import { Box } from '@mui/material';

/**
 * Renders a list of tags
 * @param tags {Array<Tag>} - The tags to render
 * @param handleTagInfoToggle {Function} - Function that should be provided by the parent
 * @param onTagSelect {Function} - Fn prop that comes from a parent component. Allows a user to click and select a tag (i.e when creating an Activity/Project)
 * @param isEmbedded {Boolean} - Shows/Hides <MoreHorizIcon /> button that allows the user to edit the tag. Goes down to <TagItemView /x
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
          />
        ))}
      </Box>
    </>
  );
};
