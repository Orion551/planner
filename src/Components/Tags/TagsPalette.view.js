import React from 'react';
import { useGlobalState } from '@Context/GlobalStateContext';
import IconButton from '@mui/material/IconButton';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CircleIcon from '@mui/icons-material/Circle';

export const TagsPalette = ({ selectedTag, onTagColorChange }) => {
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
              size='small'
              aria-label='color-item'
              name='tagColorId'
              onClick={() => onTagColorChange(item.id)}
            >
              {item.id === parseInt(selectedTag.tagColorId) ? (
                <CheckCircleIcon
                  sx={{
                    fill: item.code,
                  }}
                />
              ) : (
                <CircleIcon sx={{ fill: item.code }} />
              )}
            </IconButton>
          ))}
        </div>
      ))}
    </div>
  );
};
