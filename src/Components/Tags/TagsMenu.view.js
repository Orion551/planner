import React, { useEffect } from 'react';
import { getRequest } from '@Api/http-service';
import { ApiUrl } from '@Utils/ApiUrl';
// import { AppBar, Toolbar, List, ListItem, IconButton, Input, Button } from '@mui/material';

export const TagsMenuView = () => {
  //   const [isSubMenuOpen, setSubMenuOpen] = useState(false);
  //   const [searchQuery, setSearchQuery] = useState('');
  //   const [selectedItem, setSelectedItem] = useState(null);
  //   const [selectedColor, setSelectedColor] = useState(null);
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
      {/* TODO: Iterate through TagElement(s) and add some controls over them */}
      <span>This will be the tags menu :)</span>
    </>
  );
};
