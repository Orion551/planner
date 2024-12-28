import React from 'react';
import { TagItemView } from '@Components/Tags/TagItemView';
import { Box } from '@mui/material';

/**
 * Renders a list of tags
 * @param tags {Array<Tag>} - The tags to render
 * @param tagsPalette {Array<String>} - The palette of colors
 * @param tagSelection {Function} - Function that should be provided by the parent
 */
export const TagsListView = ({ tags, tagsPalette, tagSelection = () => {} }) => {
  return (
    <>
      <Box sx={{ flex: 'column' }}>
        {tags.map((tag, idx) => (
          <div key={idx} onClick={(e) => tagSelection(e, tag)}>
            <TagItemView
              tagName={tag.tagName}
              tagColor={tagsPalette.find((tP) => tP.id === tag.tagColorId)?.code}
            />
          </div>
        ))}
      </Box>
    </>
  );
};
