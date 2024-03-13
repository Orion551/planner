import React, { useState } from 'react';
import { Button, Menu, MenuItem } from '@mui/material';
import { TagsMenuView } from '@Components/Tags/TagsMenu.view';
import { useTranslation } from 'react-i18next';

export const TagsButtonView = () => {
  const { t } = useTranslation();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <>
      <Button onClick={handleClick}>{t('schedule_top_controls.tags.tags')}</Button>
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
        <MenuItem onclick={handleClose}>
          <TagsMenuView />
        </MenuItem>
      </Menu>
    </>
  );
};
