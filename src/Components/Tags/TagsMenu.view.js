import React, { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Actions } from '@Context/Actions';
import { useGlobalState } from '@Context/GlobalStateContext';
import { Button } from '@mui/material';
// import { TagElementView } from '@Components/Tags/TagElement.view';
import { TagsListView } from '@Components/Tags/TagsList.view';
import '@Assets/styles/tag.scss';
import { handleDeleteTag } from '@Context/ActionHandlers/HandleTag';

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
    dispatch(Actions.updateTagName(selectedItem, editedTagName));
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
    dispatch(Actions.setTagColor(selectedItem, color));
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

  const deleteTag = async () => {
    // dispatch(Actions.deleteTag(Actions.selectedItem));  Dispatch delete tag action
    const requestResponse = await handleDeleteTag(selectedItem.id);
    dispatch(Actions.deleteTag(requestResponse, selectedItem.id));
    setSubMenuOpen(false);
  };

  const createTagFromSearch = () => {
    if (searchQuery.trim() === '') return; // Don't create tag if the search query is empty
    const newTag = {
      id: Date.now(), // Generate a unique id (you might want to use a better way to generate ids)
      tagName: searchQuery,
      tagColorId: null, // Set the tag color id to null or choose a default color
    };
    dispatch(Actions.createTag(newTag)); // Dispatch action to create new tag
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
        <TagsListView
          tagSelection={handleTagSelection}
          tags={filteredTags}
          tagsPalette={appState.configData.tagsPalette}
        />
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
            <Button onClick={() => deleteTag()}>Delete</Button>
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
