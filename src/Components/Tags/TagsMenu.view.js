import React, { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Actions } from '@Context/Actions';
import { useGlobalState } from '@Context/GlobalStateContext';
import { Button } from '@mui/material';
// import { TagElementView } from '@Components/Tags/TagElement.view';
import { TagsListView } from '@Components/Tags/TagsList.view';
import '@Assets/styles/tag.scss';
import {
  handleDeleteTag,
  handleTagCreate,
  handleTagUpdate,
} from '@Context/ActionHandlers/HandleTag';
import debounce from 'lodash.debounce';

export const TagsMenuView = () => {
  const { t } = useTranslation();
  const { state: appState, dispatch } = useGlobalState();

  const [isSubMenuOpen, setSubMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState({ tagName: '', tagColorId: '', id: null });
  const inputRef = useRef(null);

  const debouncedUpdateTag = useRef(
    debounce(async (updatedTag) => {
      const response = await handleTagUpdate(updatedTag.id, updatedTag);
      console.log(response);
    }, 600)
  ).current;

  useEffect(() => {
    return () => debouncedUpdateTag.cancel();
  }, [debouncedUpdateTag]);

  /** Reference input element in submenu */
  useEffect(() => {
    if (isSubMenuOpen) {
      inputRef.current.focus();
    }
  }, [isSubMenuOpen]);

  const selectTag = (item) => {
    setSelectedTag(item);
    setSubMenuOpen(true);
  };

  const editTag = async (e) => {
    const updatedTag = {
      ...selectedTag,
      [e.target.name]: e.target.name === 'tagColorId' ? e.target.textContent : e.target.value,
    };

    // Update the state
    setSelectedTag(updatedTag);

    // Use the updated tag for the remote request
    // const response = await handleTagUpdate(updatedTag.id, updatedTag);
    // console.log(response.data);
    debouncedUpdateTag(updatedTag);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const filteredTags = appState.configData.userTags.filter((tag) =>
    tag.tagName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const deleteTag = async () => {
    // dispatch(Actions.deleteTag(Actions.selectedItem));  Dispatch delete tag action
    const requestResponse = await handleDeleteTag(selectedTag.id);
    dispatch(Actions.deleteTag(requestResponse, selectedTag.id));
    setSubMenuOpen(false);
  };

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
      <div>
        <input
          type='text'
          placeholder={t('schedule_top_controls.tags.search_or_create_a_tag')}
          value={searchQuery}
          onChange={(e) => handleSearch(e.target.value)}
        />
        <TagsListView
          tagSelection={selectTag}
          tags={filteredTags}
          tagsPalette={appState.configData.tagsPalette}
        />
        {filteredTags.length === 0 && searchQuery.trim() !== '' && (
          <div>
            <p>
              {t('tags.no_tags_found_for_search')} <strong>{searchQuery}</strong>
            </p>
            <Button onClick={createTag}>{`${t('tags.actions.create')} "${searchQuery}"`}</Button>
          </div>
        )}
        {isSubMenuOpen && (
          <div className='tag-submenu'>
            <input
              type='text'
              name={'tagName'}
              value={selectedTag.tagName}
              onChange={editTag}
              ref={inputRef}
            />
            <Button onClick={deleteTag}>{t('tags.actions.delete')}</Button>
            <div className='tag-palette'>
              {appState.configData.tagsPalette.map((color) => (
                <button
                  className='tag-palette-color'
                  key={color.id}
                  name={'tagColorId'}
                  value={parseInt(selectedTag.tagColorId)}
                  style={{
                    backgroundColor: color.code,
                    border:
                      color.id === parseInt(selectedTag.tagColorId) ? '1px solid black' : 'none',
                  }}
                  onClick={editTag}
                >
                  {color.id}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
};
