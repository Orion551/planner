import React, { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
// import { AppBar, Toolbar, List, ListItem, IconButton, Input, Button } from '@mui/material';
import {
  useGlobalState,
  setTagColor,
  updateTagName,
  deleteTag,
  createTag,
} from '@Context/GlobalStateContext';
import { Button } from '@mui/material';
// import { TagElementView } from '@Components/Tags/TagElement.view';
import { TagsListView } from '@Components/Tags/TagsList.view';
import '@Assets/styles/tag.scss';

export const TagsMenuView = () => {
  const { t } = useTranslation();
  const { state: appState, dispatch } = useGlobalState();

  const [isSubMenuOpen, setSubMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedItem, setSelectedItem] = useState(null);
  const [editedTagName, setEditedTagName] = useState('');
  const inputRef = useRef(null);

  /** Reference input element in submenu */
  useEffect(() => {
    if (isSubMenuOpen) {
      inputRef.current.focus();
    }
  }, [isSubMenuOpen]);

  /** This will open a when the user selects one tag to edit.  */
  // eslint-disable-next-line no-unused-vars
  const handleTagSelection = (item) => {
    setSelectedItem(item);
    setSubMenuOpen(true);
    setEditedTagName(item.tagName);
  };

  const handleTagNameChange = (e) => {
    setEditedTagName(e.target.value);
  };

  const handleTagNameUpdate = () => {
    if (editedTagName.trim() === '') return; // Do nothing if the name is empty;
    dispatch(updateTagName(selectedItem, editedTagName));
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleTagNameUpdate();
    }
  };

  /**
   *
   * @param {*} color
   * @returns
   */
  const handleTagColorPick = (color) => {
    console.log('selected tag', selectedItem);
    console.log('selected color', color);
    // If the user selected the same color, do nothing.
    if (selectedItem.tagColorId === color.id) return;
    // Otherwise, dispatch an action updating the reference in userTags object.
    dispatch(setTagColor(selectedItem, color));
  };

  // const handleColorButtonClick = (color) => {
  //   setSelectedColor(color);
  // };

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const filteredTags = appState.configData.userTags.filter((tag) =>
    tag.tagName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleTagDelete = () => {
    dispatch(deleteTag(selectedItem)); // Dispatch delete tag action
    setSubMenuOpen(false);
  };

  const createTagFromSearch = () => {
    if (searchQuery.trim() === '') return; // Don't create tag if the search query is empty
    const newTag = {
      id: Date.now(), // Generate a unique id (you might want to use a better way to generate ids)
      tagName: searchQuery,
      tagColorId: null, // Set the tag color id to null or choose a default color
    };
    dispatch(createTag(newTag)); // Dispatch action to create new tag
    setSearchQuery(''); // Clear the search query
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
        <TagsListView tags={filteredTags} tagsPalette={appState.configData.tagsPalette} />
        {/* <List>
          {filteredTags.map((tag) => (
            <ListItem key={tag.id} onClick={() => handleTagSelection(tag)}>
              <TagElementView
                key={tag.id}
                tagLabel={tag.tagName}
                tagColor={
                  appState.configData.tagsPalette.find((tP) => tP.id === tag.tagColorId)?.code
                }
              />
            </ListItem>
          ))}
        </List> */}
        {filteredTags.length === 0 && searchQuery.trim() !== '' && (
          <div>
            <p>No tags found for `${searchQuery}`.</p>
            <Button onClick={createTagFromSearch}>{`Create "${searchQuery}"`}</Button>
          </div>
        )}
        {isSubMenuOpen && (
          <div className='tag-submenu'>
            <input
              type='text'
              value={editedTagName}
              onChange={handleTagNameChange}
              onKeyDown={handleKeyDown}
              ref={inputRef}
            />
            <Button onClick={handleTagDelete}>Delete</Button>
            <div className='tag-palette'>
              {appState.configData.tagsPalette.map((color) => (
                <div
                  className='tag-palette-color'
                  key={color.id}
                  style={{ backgroundColor: color.code }}
                  onClick={() => handleTagColorPick(color)}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
};
