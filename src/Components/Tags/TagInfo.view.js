import React from 'react';
import { useTranslation } from 'react-i18next';
import Button from '@mui/material/Button';
import { TagsPalette } from '@Components/Tags/TagsPalette.view';
import { Box } from '@mui/material';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import TextField from '@mui/material/TextField';

export const TagInfo = ({
  tag,
  handleDeleteTag,
  handleEditTagName,
  handleEditTagColor,
  inputReference,
}) => {
  const { t } = useTranslation();
  console.log('selected tag', tag);

  return (
    <Box sx={{ p: 2, flexDirection: 'column' }}>
      <Box>
        <TextField
          name='tagName'
          value={tag.tagName}
          onChange={handleEditTagName}
          ref={inputReference}
          size='small'
        />
      </Box>
      <Box
        sx={{
          marginTop: '5px',
          marginBottom: '5px',
        }}
      >
        <TagsPalette selectedTag={tag} onTagColorChange={handleEditTagColor} />
      </Box>

      <Box
        sx={{
          marginTop: '5px',
        }}
      >
        <Button
          sx={{ textTransform: 'none', width: '100%' }}
          onClick={handleDeleteTag}
          color='error'
          startIcon={<DeleteRoundedIcon />}
        >
          {t('tags.actions.delete')}
        </Button>
      </Box>
    </Box>
  );
};
