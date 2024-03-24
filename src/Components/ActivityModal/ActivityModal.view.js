import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import { toggleActivityModal, useGlobalState } from '@Context/GlobalStateContext';
import { useTranslation } from 'react-i18next';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

export const ActivityModalView = () => {
  const { state: appState, dispatch } = useGlobalState();
  // Local state to store the activity
  const [activity, setActivity] = useState(null);
  const { t } = useTranslation();

  const handleClose = () => dispatch(toggleActivityModal(false));

  // Fetch activity from global state on component mount
  useEffect(() => {
    if (appState.activityModal.activityId) {
      const activity = appState.activities.find(
        (activity) => activity.id === appState.activityModal.activityId
      );
      setActivity(activity);
    } else {
      // Reset local activity if activityId is null
      setActivity(null);
    }
  }, [appState.activityModal.activityId, appState.activities]);
  // getActivity.title

  return (
    <React.Fragment>
      <BootstrapDialog
        onClose={close}
        aria-labelledby='customized-dialog-title'
        open={appState.activityModal.isActivityModalOpen}
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id='customized-dialog-title'>
          {activity ? t('activity_modal.edit_activity') : t('activity_modal.create_activity')}
        </DialogTitle>
        <IconButton
          aria-label='close'
          onClick={handleClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers>
          <TextField required id='outlined-required' label='Required' defaultValue='Hello World' />
          <FormControl>
            <InputLabel id='demo-simple-select-label'>Age</InputLabel>
            <Select
              labelId='demo-simple-select-label'
              id='demo-simple-select'
              value='20'
              label='Age'
            >
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
          </FormControl>
          <TextField
            id='outlined-multiline-static'
            label='Multiline'
            multiline
            rows={4}
            defaultValue='Default Value'
          />
          <Typography gutterBottom>
            Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis
            in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
          </Typography>
          <Typography gutterBottom>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vivamus sagittis
            lacus vel augue laoreet rutrum faucibus dolor auctor.
          </Typography>
          <Typography gutterBottom>
            Aenean lacinia bibendum nulla sed consectetur. Praesent commodo cursus magna, vel
            scelerisque nisl consectetur et. Donec sed odio dui. Donec ullamcorper nulla non metus
            auctor fringilla.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            Save changes
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </React.Fragment>
  );
};
