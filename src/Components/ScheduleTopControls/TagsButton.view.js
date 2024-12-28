import React, { useState } from 'react';
import { Button, Popover } from '@mui/material';
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

  const open = Boolean(anchorEl);
  return (
    <>
      <Button onClick={handleClick}>{t('schedule_top_controls.tags.tags')}</Button>
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        PaperProps={{
          sx: {
            maxHeight: 300,
            overflowY: 'auto',
          },
        }}
      >
        <TagsMenuView />
      </Popover>
    </>
  );
};
