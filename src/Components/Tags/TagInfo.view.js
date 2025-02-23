import React from 'react';
import { useTranslation } from 'react-i18next';
import Button from '@mui/material/Button';
import { TagsPalette } from '@Components/Tags/TagsPalette.view';
import { Box } from '@mui/material';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import TextField from '@mui/material/TextField';

/**
 * Renders a box containing interaction elements to edit/delete a tag (color change, tag rename, tag delete)
 * @param tag {Object} - Object representing the tag {tagId, tagColorId, tagName}
 * @param handleDeleteTag {Function} - Fn prop that allows a user to delete the Tag
 * @param handleEditTagName {Function} - Fn prop that allows a user to update the name of a Tag
 * @param handleEditTagColor {Function} - Fn prop that allows the user to update the color of a Tag
 * @param inputReference {MutableRefObject} - Reference to the <TextInput> input
 */
export const TagInfo = ({
  tag,
  handleDeleteTag,
  handleEditTagName,
  handleEditTagColor,
  inputReference,
}) => {
  const { t } = useTranslation();

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
