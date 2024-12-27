import React from 'react';
import { useGlobalState } from '@Context/GlobalStateContext';
import IconButton from '@mui/material/IconButton';
import CheckIcon from '@mui/icons-material/Check';

export const TagsPalette = ({ selectedTag }) => {
  const { state: appState } = useGlobalState();

  /**
   * Helper function to chunk array into rows
   * @param array
   * @param size
   */
  const chunkArray = (array, size) => {
    const chunks = [];
    for (let i = 0; i < array.length; i += size) {
      chunks.push(array.slice(i, i + size));
    }
    return chunks;
  };

  const rows = chunkArray(appState.configData.tagsPalette, 5);
  console.log('rows', rows);

  return (
    <div className='tag-palette'>
      {rows.map((row, rowIndex) => (
        <div
          key={rowIndex}
          style={{
            display: 'flex',
            justifyContent: 'space-around',
            gap: '0.35rem',
            marginBottom: '1px',
          }}
        >
          {row.map((item, idx) => (
            <IconButton
              key={idx}
              size='large'
              aria-label='color-item'
              name='tagColorId'
              value={parseInt(selectedTag.tagColorId)}
              style={{
                backgroundColor: item.code,
                border: item.id === parseInt(selectedTag.tagColorId) ? '1px solid black' : 'none',
              }}
            >
              {item.id === parseInt(selectedTag.tagColorId) && <CheckIcon />}
            </IconButton>
          ))}
        </div>
      ))}
    </div>
  );
};
