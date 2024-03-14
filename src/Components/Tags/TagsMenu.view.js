import React, { useState, useEffect } from 'react';
import { getRequest } from '@Api/http-service';
import { ApiUrl } from '@Utils/ApiUrl';
import { useTranslation } from 'react-i18next';
// import { AppBar, Toolbar, List, ListItem, IconButton, Input, Button } from '@mui/material';

export const TagsMenuView = () => {
  const { t } = useTranslation();

  // const [isSubMenuOpen, setSubMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  // const [selectedItem, setSelectedItem] = useState(null);
  // const [selectedColor, setSelectedColor] = useState(null);

  // const handleItemClick = (item) => {
  //   setSelectedItem(item);
  //   setSubMenuOpen(true);
  // };

  // const handleColorButtonClick = (color) => {
  //   setSelectedColor(color);
  // };

  const handleSearch = (query) => {
    setSearchQuery(query);
    // Perform search logic here
  };

  useEffect(() => {
    (async function () {
      try {
        await getRequest({ url: ApiUrl.tags_palette }).then((response) => {
          console.log(response);
        });
      } catch (e) {
        console.error(e);
      }
    });
  });

  return (
    <>
      <div>
        <input
          type='text'
          placeholder={t('schedule_top_controls.tags.search_or_create_a_tag')}
          value={searchQuery}
          onChange={(e) => handleSearch(e.target.value)}
        />

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
