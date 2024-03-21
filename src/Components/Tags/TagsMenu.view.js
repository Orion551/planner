import React, { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
// import { AppBar, Toolbar, List, ListItem, IconButton, Input, Button } from '@mui/material';
import { useGlobalState, setTagColor, updateTagName } from '@Context/GlobalStateContext';
import { List, ListItem, Button } from '@mui/material';
import { TagElementView } from '@Components/Tags/TagElement.view';
import '@Assets/styles/tag.scss';

export const TagsMenuView = () => {
  const { t } = useTranslation();
  const { state: appState, dispatch } = useGlobalState();

  const [isSubMenuOpen, setSubMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedItem, setSelectedItem] = useState(null);
  const [editedTagName, setEditedTagName] = useState('');
  const inputRef = useRef(null);

  useEffect(() => {
    if (isSubMenuOpen) {
      inputRef.current.focus();
    }
  }, [isSubMenuOpen]);

  /**
   * This will open a when the user selects one tag to edit.
   */
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
    // Perform search logic here
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
        <List>
          {appState.configData.userTags.map((tag) => (
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
        </List>
        {isSubMenuOpen && (
          <div className='tag-submenu'>
            <input
              type='text'
              value={editedTagName}
              onChange={handleTagNameChange}
              onKeyDown={handleKeyDown}
              ref={inputRef}
            />
            <Button onClick={handleTagNameUpdate}>Update</Button>
            <Button>Delete</Button>
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

        {/* <List>
          {items.map((item) => (
            <ListItem key={item.id}>
              {item.text}
              <IconButton onClick={() => handleItemClick(item)}>Icon</IconButton>
            </ListItem>
          ))}
        </List>
        {isSubMenuOpen && (
          <div>
            <Input placeholder='Submenu Input' />
            <Button>Delete</Button>
            <div>
              {colors.map((color) => (
                <Button
                  key={color}
                  style={{ backgroundColor: color }}
                  onClick={() => handleColorButtonClick(color)}
                />
              ))}
            </div>
          </div>
        )} */}
      </div>
    </>
  );
};
