import React from 'react';
import { List, ListItem } from '@mui/material';
import { TagElementView } from '@Components/Tags/TagElement.view';

export const TagsListView = ({ tags, tagsPalette, tagSelection = () => {} }) => {
  console.log('tags', tags);
  return (
    <>
      <List>
        {tags.map((tag) => (
          <ListItem onClick={() => tagSelection(tag)} key={tag.id}>
            <TagElementView
              key={tag.id}
              tagName={tag.tagName}
              tagColor={tagsPalette.find((tP) => tP.id === tag.tagColorId)?.code}
            />
          </ListItem>
        ))}
      </List>
    </>
  );
};
