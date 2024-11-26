import React from 'react';
import { Typography } from '@mui/material';
import '@Assets/styles/tag.scss';

/**
 * @param {String} tagName - The name of the Tag
 * @param {String} tagColor - HEX Code of the Tag
 */

export const TagElementView = ({ tagName, tagColor }) => {
  // const tag = findTagById(tagId);
  // console.log('TAG', tag);
  return (
    <>
      <div className='tag' style={{ backgroundColor: tagColor }}>
        <Typography variant='caption' display='block' ml={1} mr={1} noWrap={true} fontWeight={500}>
          {tagName}
        </Typography>
      </div>
    </>
  );
};
