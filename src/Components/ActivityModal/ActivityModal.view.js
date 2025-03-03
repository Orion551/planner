import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  CloseIcon,
  DeleteIcon,
  DialogActions,
  Button,
  Box,
} from './MuiImports';
import { useGlobalState } from '@Context/GlobalStateContext';
import { useTranslation } from 'react-i18next';
import { EditActivity } from '@Components/ActivityModal/EditActivity';
import { NewActivity } from '@Components/ActivityModal/NewActivity';
import { Formik } from 'formik';
import { getActivityFormSchema } from '@Validations/activityFormSchema';
import {
  handleActivityDelete,
  handleActivityCreate,
  handleActivityModalClose,
  handleActivityUpdate,
} from '@Context/ActionHandlers/HandleActivityModal';

export const ActivityModalView = () => {
  const { state: appState, dispatch } = useGlobalState();
  const { t } = useTranslation();

  const isEdit = Boolean(appState.activityModal.activityId);
  const fetchedData = React.useMemo(() => {
    return appState.activities.get(appState.activityModal.activityId);
  }, [appState.activities, appState.activityModal.activityId]);

  const initialValues = isEdit
    ? {
        activity: {
          title: fetchedData?.title || '',
          project: fetchedData?.project || '',
          tag: fetchedData?.tag || null,
          description: fetchedData?.description || '',
          estimate: fetchedData?.estimate || 0,
        },
      }
    : {
        activity: {
          title: '',
          project: '',
          tag: null,
          description: '',
          estimate: 0,
        },
        scheduleColumns: [appState.activityModal.dayId],
      };

  return (
    <Formik
      initialValues={initialValues}
      enableReinitialize={true}
      validateOnMount={true}
      validationSchema={getActivityFormSchema(t, appState, isEdit)}
      onSubmit={() => {}}
    >
      {(formik) => (
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
            onClick={() => handleActivityModalClose(dispatch)}
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
            {isEdit ? (
              <EditActivity formik={formik} activityId={appState.activityModal.activityId} />
            ) : (
              <NewActivity formik={formik} />
            )}
          </DialogContent>
          <DialogActions>
            {isEdit ? (
              <Box
                sx={{
                  width: '100%',
                  display: 'flex',
                  justifyContent: 'space-between',
                }}
              >
                <IconButton
                  aria-label='delete'
                  color='error'
                  onClick={() => handleActivityDelete(dispatch, appState.activityModal.activityId)}
                >
                  <DeleteIcon />
                </IconButton>
                <Button
                  size='small'
                  onClick={handleActivityUpdate}
                  disabled={!formik.isValid || formik.isSubmitting || !formik.dirty}
                >
                  {t('activity_modal.buttons.update')}
                </Button>
              </Box>
            ) : (
              <Button
                color='primary'
                variant='contained'
                disabled={!formik.isValid || formik.isSubmitting}
                onClick={() => {
                  handleActivityCreate(dispatch, formik.values);
                }}
              >
                {t('activity_modal.buttons.create')}
              </Button>
            )}
          </DialogActions>
        </Dialog>
      )}
    </Formik>
  );
};
