import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { useGlobalState } from '@Context/GlobalStateContext';
import { useTranslation } from 'react-i18next';
import { ActivityPlanGroup } from '@Components/Shared/ActivityPlanGroup';
// import { TextInput } from '@Components/Shared/TextInput';
// import { DescriptionInput } from '@Components/Shared/DescriptionInput';
import CircularProgress from '@mui/material/CircularProgress';
import DeleteIcon from '@mui/icons-material/Delete';
import { TagsListView } from '@Components/Tags/TagsList.view';
import { ActivityModalModes } from '@Constants/ActivityModalModes';
import { Actions } from '@Context/Actions';
import { createActivity, deleteActivity } from '@Context/ActionHandlers/HandleActivity';
import TextField from '@mui/material/TextField';

export const ActivityModalView = () => {
  const { state: appState, dispatch } = useGlobalState();
  // Local state to store the activity
  const [isLoading, setIsLoading] = useState(true);
  const [modalMode, setModalMode] = useState(ActivityModalModes.create);
  const { t } = useTranslation();
  const [activityId, setActivityId] = useState(null);

  const [activityForm, setActivityForm] = useState({
    activity: {
      title: '',
      project: '',
      tag: null,
      description: '',
      estimate: 0,
    },
    scheduleColumns: ['Monday'],
  });

  // const [scheduleDays, setScheduleDays] = useState([]);

  const handleClose = () => dispatch(Actions.toggleActivityModal(false));

  const handleChange = (e) => {
    setActivityForm((prevForm) => ({
      ...prevForm,
      activity: {
        ...prevForm.activity,
        [e.target.name]: e.target.value,
      },
    }));
  };

  const handleColumnSelection = (selectedColumn) => {
    console.log('selected column', selectedColumn);
    const updatedScheduleColumns = [...activityForm.scheduleColumns, selectedColumn];
    setActivityForm({
      ...activityForm,
      scheduleColumns: updatedScheduleColumns,
    });
  };

  const handleTagSelection = (tag) => {
    console.log('selected tag:', tag);
  };

  const handleActivityDelete = async () => {
    // dispatch(Actions.deleteActivity(activityForm.id));
    await deleteActivity(dispatch, activityId);
  };

  // TODO: Data should be validated;
  const handleActivityCreate = async () => {
    await createActivity(dispatch, activityForm);
  };

  // Fetch activity from global state on component mount (if any)
  useEffect(() => {
    if (appState.activityModal.activityId) {
      console.log('appState.activityModal.activityId', appState.activityModal.activityId);
      setModalMode(ActivityModalModes.edit);
      // Fetch activity's related data.
      const activity = appState.activities.get(appState.activityModal.activityId);
      // setActivityForm(activity);
      const scheduleColumn = appState.configData.scheduleColumns.find((column) =>
        column.columnTaskIds.includes(activity.id)
      );
      console.log('schedule column', scheduleColumn);
      // handleColumnSelection(scheduleColumn.columnId);
      setIsLoading(false);
      setActivityId(appState.activityModal.activityId);
    } else {
      setModalMode(ActivityModalModes.create);
      // setActivityForm(null);
      // handleColumnSelection(appState.activityModal.dayId);
      setIsLoading(false);
    }
  }, [appState]);
  // getActivity.title

  return (
    <React.Fragment>
      {isLoading ? (
        <>
          <CircularProgress />
        </>
      ) : (
        <Dialog
          onClose={close}
          open={appState.activityModal.isActivityModalOpen}
          scroll='paper'
          PaperProps={{
            component: 'form',
          }}
          disableEscapeKeyDown={true}
          fullWidth={true}
        >
          <DialogTitle>
            {modalMode === ActivityModalModes.edit
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
            {/* Title */}
            <TextField
              name={'title'}
              required={true}
              placeholder={t('activity_modal.titleField.what_are_you_gonna_do')}
              onChange={handleChange}
              label={t('activity_modal.titleField.title')}
              size='small'
              margin='normal'
            />
            <TagsListView
              tags={appState.configData.userTags}
              tagsPalette={appState.configData.tagsPalette}
              tagSelection={handleTagSelection}
            />
            {/* Description */}
            <TextField
              fullWidth
              multiline
              rows={4}
              required={false}
              label={t('activity_modal.descriptionField.description')}
              name={'description'}
              onChange={handleChange}
            />
            {/* Activity Plan Btns */}
            <ActivityPlanGroup
              isDisabled={modalMode === ActivityModalModes.edit}
              selectedColumns={activityForm?.selectedColumns || []}
              onColumnSelection={handleColumnSelection}
            />

            {/* Estimate */}
            <TextField
              required={false}
              label={t('activity_modal.estimateField.estimate')}
              onChange={handleChange}
              size='small'
              margin='normal'
              name={'estimate'}
            />
          </DialogContent>

          <DialogActions>
            {modalMode === ActivityModalModes.edit ? (
              <Button
                color='error'
                variant='outlined'
                size='small'
                startIcon={<DeleteIcon />}
                onClick={handleActivityDelete}
              >
                {t('activity_modal.buttons.delete')}
              </Button>
            ) : (
              <Button size='small' autoFocus onClick={handleActivityCreate}>
                {t('activity_modal.buttons.create')}
              </Button>
            )}
          </DialogActions>
        </Dialog>
      )}
    </React.Fragment>
  );
};
