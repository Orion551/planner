import React, { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Actions } from '@Context/Actions';
import { useGlobalState } from '@Context/GlobalStateContext';
import { Box, Button, Popover } from '@mui/material';
import { TagsListView } from '@Components/Tags/TagsList.view';
import '@Assets/styles/tag.scss';
import {
  handleDeleteTag,
  handleTagCreate,
  handleTagUpdate,
} from '@Context/ActionHandlers/HandleTag';
import debounce from 'lodash.debounce';
import TextField from '@mui/material/TextField';
import { TagInfo } from '@Components/Tags/TagInfo.view';

export const TagsMenuView = () => {
  const { t } = useTranslation();
  const { state: appState, dispatch } = useGlobalState();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState({ tagName: '', tagColorId: '', id: null });
  const inputRef = useRef(null);
  const [anchorEl, setAnchorEl] = useState(null);

  /**
   * On tag info change, debounce it to prevent continuous requests to the remote service;
   */
  const debouncedUpdateTag = useRef(
    debounce(async (updatedTag) => {
      try {
        const response = await handleTagUpdate(updatedTag);
        dispatch(Actions.editTag(response));
        return response;
      } catch (e) {
        console.error(e);
      }
    }, 600)
  ).current;

  useEffect(() => {
    return () => debouncedUpdateTag.cancel();
  }, [debouncedUpdateTag]);

  const tagInfoToggle = (ev, item) => {
    setAnchorEl(ev.currentTarget);
    setSelectedTag(item);
  };

  const handleTagInfoMenuClose = () => {
    setAnchorEl(null);
  };

  const editTagName = async (e) => {
    const updatedTag = {
      ...selectedTag,
      tagName: e.target.value,
    };

    // Update the state
    setSelectedTag(updatedTag);

    debouncedUpdateTag(updatedTag);
  };

  const editTagColor = async (tagColorId) => {
    const updatedTag = {
      ...selectedTag,
      tagColorId: tagColorId,
    };
    setSelectedTag(updatedTag);
    try {
      const response = await handleTagUpdate(updatedTag);
      dispatch(Actions.editTag(response));
    } catch (e) {
      console.error(e);
    }
  };

  const deleteTag = async () => {
    const requestResponse = await handleDeleteTag(selectedTag.tagId);
    dispatch(Actions.deleteTag(requestResponse, selectedTag.tagId));
    handleTagInfoMenuClose();
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredTags = appState.configData.userTags.filter((tag) =>
    tag.tagName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const createTag = async () => {
    if (searchQuery.trim() === '') return; // Don't create tag if the search query is empty
    const newTag = {
      tagName: searchQuery,
      tagColorId: Math.floor(Math.random() * appState.configData.tagsPalette.length),
    };
    try {
      const responseTag = await handleTagCreate(newTag);
      if (responseTag) {
        dispatch(Actions.createTag(responseTag));
      }
      setSearchQuery(''); // Clear the search query
    } catch (e) {
      console.error('Error creating tag', e);
    }
  };

  return (
    <>
      <Box sx={{ p: 2 }}>
        <TextField
          label={t('schedule_top_controls.tags.search_or_create_a_tag')}
          variant='outlined'
          value={searchQuery}
          size='small'
          onChange={handleSearch}
        />
        <TagsListView handleTagInfoToggle={tagInfoToggle} tags={filteredTags} embedded={false} />
        {filteredTags.length === 0 && searchQuery.trim() !== '' && (
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
            }}
          >
            <Button
              onClick={createTag}
              sx={{
                textTransform: 'none',
              }}
            >
              {`${t('tags.actions.create')} "${searchQuery}"`}
            </Button>
          </Box>
        )}
        <Popover open={Boolean(anchorEl)} anchorEl={anchorEl} onClose={handleTagInfoMenuClose}>
          <TagInfo
            tag={selectedTag}
            handleDeleteTag={deleteTag}
            handleEditTagName={editTagName}
            handleEditTagColor={editTagColor}
            inputReference={inputRef}
          />
        </Popover>
      </Box>
    </>
  );
};
