import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { toggleActivityModal, useGlobalState } from '@Context/GlobalStateContext';
import { useTranslation } from 'react-i18next';
import { TextInput, DescriptionInput, SelectField } from '@Components/ActivityModal/Fields';

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
          {/* Title */}
          <TextInput isRequired={true} label={'Title'} />
          {/* Project selection */}
          <SelectField />
          {/* Description */}
          <DescriptionInput />
          {/* Estimate */}
          <TextInput isRequired={false} label={'Estimate'} />
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
