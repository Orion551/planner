import React from 'react';
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  CloseIcon,
  // eslint-disable-next-line no-unused-vars
  DeleteIcon,
} from './MuiImports';
import { useGlobalState } from '@Context/GlobalStateContext';
import { useTranslation } from 'react-i18next';
import { Actions } from '@Context/Actions';
// eslint-disable-next-line no-unused-vars
import { createActivity, deleteActivity } from '@Context/ActionHandlers/HandleActivity';
import { EditActivity } from '@Components/ActivityModal/EditActivity';
import { NewActivity } from '@Components/ActivityModal/NewActivity';

export const ActivityModalView = () => {
  const { state: appState, dispatch } = useGlobalState();
  const { t } = useTranslation();

  const handleClose = () => dispatch(Actions.toggleActivityModal(false));

  // eslint-disable-next-line no-unused-vars
  const handleActivityUpdate = () => {};

  const test = (data) => {
    console.log('data', data);
  };

  return (
    <Dialog
      onClose={close}
      open={appState.activityModal.isActivityModalOpen}
      scroll='paper'
      disableEscapeKeyDown={true}
      fullWidth={true}
    >
      <DialogTitle>
        {appState.activityModal.activityId
          ? t('activity_modal.edit_activity')
          : t('activity_modal.create_activity')}
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
        {appState.activityModal.activityId ? (
          <EditActivity activityId={appState.activityModal.activityId} />
        ) : (
          <NewActivity />
        )}
      </DialogContent>
      <DialogActions>
        {
          appState.activityModal.activityId ? (
            // <Button
            //   color='error'
            //   variant='outlined'
            //   size='small'
            //   startIcon={<DeleteIcon />}
            //   onClick={() => console.log('delete')}
            // >
            //   {t('activity_modal.buttons.delete')}
            // </Button>
            <Button onClick={() => test(formik.values)}>Test</Button>
          ) : // <button type='submit'>Update</button>
          null
          // TODO: Uncomment this to enable the button. These brackets are required ofc ()
          // <Button size='small' autoFocus onClick={handleActivityCreate}>
          //   {t('activity_modal.buttons.create')}
          // </Button>
        }
      </DialogActions>
    </Dialog>
  );
};
