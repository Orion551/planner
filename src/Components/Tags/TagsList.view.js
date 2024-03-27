import React from 'react';
import { List, ListItem } from '@mui/material';
import { TagElementView } from '@Components/Tags/TagElement.view';

export const TagsListView = ({ tags, tagsPalette }) => {
  return (
    <>
      <List>
        {tags.map((tag) => (
          <ListItem key={tag.id}>
            <TagElementView
              kay={tag.id}
              tagLabel={tag.tagName}
              tagColor={tagsPalette.find((tP) => tP.id === tag.tagColorId)?.code}
            />
          </ListItem>
        ))}
      </List>
    </>
  );
};
