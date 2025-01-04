import React, { useState } from 'react';
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
import DeleteIcon from '@mui/icons-material/Delete';
// import { TagsListView } from '@Components/Tags/TagsList.view';
import { Actions } from '@Context/Actions';
import { createActivity, deleteActivity } from '@Context/ActionHandlers/HandleActivity';
import TextField from '@mui/material/TextField';
import { findScheduledActivity } from '@Utils/FindScheduledActivity';
import { TagSelect } from '@Components/Tags/TagSelect.view';

export const ActivityModalView = () => {
  const { state: appState, dispatch } = useGlobalState();
  const { t } = useTranslation();

  const [activityForm, setActivityForm] = useState(() => {
    const defaultState = {
      activity: {
        title: '',
        project: '',
        tag: null,
        description: '',
        estimate: 0,
      },
      scheduleColumns: [],
    };

    const fetchedData =
      appState.activityModal.activityId &&
      appState.activities.get(appState.activityModal.activityId);

    const scheduleColumns = appState.activityModal.activityId
      ? findScheduledActivity(
          appState.activityModal.activityId,
          appState.configData.scheduleColumns
        )
      : appState.activityModal.dayId;

    console.log('fetched data', fetchedData);

    return fetchedData
      ? {
          ...defaultState,
          activity: {
            ...fetchedData,
          },
          scheduleColumns: scheduleColumns,
        }
      : {
          ...defaultState,
          scheduleColumns: [scheduleColumns],
        };
  });

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
    // Checking if `selectedColumn` was already selected by the user. In case, it gets removed from `activityForm.scheduleColumns[]`
    const isSelected = activityForm.scheduleColumns.some((column) => column === selectedColumn);
    const updatedScheduleColumns = isSelected
      ? activityForm.scheduleColumns.filter((column) => column !== selectedColumn)
      : [...activityForm.scheduleColumns, selectedColumn];
    setActivityForm({
      ...activityForm,
      scheduleColumns: updatedScheduleColumns,
    });
  };

  // eslint-disable-next-line no-unused-vars
  const handleTagSelection = (tag) => {
    console.log('selected tag:', tag);
  };

  const handleActivityDelete = async () => {
    // dispatch(Actions.deleteActivity(activityForm.id));
    await deleteActivity(dispatch, appState.activityModal.activityId);
  };

  // TODO: Data should be validated;
  const handleActivityCreate = async () => {
    await createActivity(dispatch, activityForm);
  };

  return (
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
        {/* Title */}
        <TextField
          name={'title'}
          required={true}
          placeholder={t('activity_modal.titleField.what_are_you_gonna_do')}
          value={activityForm.activity.title}
          onChange={handleChange}
          label={t('activity_modal.titleField.title')}
          size='small'
          margin='normal'
        />
        <TagSelect tags={activityForm.activity.tag} allowMultiple={false} />
        {/*<TagsListView*/}
        {/*  tags={appState.configData.userTags}*/}
        {/*  tagsPalette={appState.configData.tagsPalette}*/}
        {/*  tagSelection={handleTagSelection}*/}
        {/*/>*/}
        {/* Description */}
        <TextField
          fullWidth
          multiline
          rows={4}
          required={false}
          label={t('activity_modal.descriptionField.description')}
          name={'description'}
          onChange={handleChange}
          value={activityForm.activity.description}
        />
        {/* Activity Plan Btns */}
        <ActivityPlanGroup
          isDisabled={appState.activityModal.activityId ? true : false}
          selectedColumns={activityForm.scheduleColumns || []}
          onColumnSelection={handleColumnSelection}
        />

        {/* Estimate */}
        <TextField
          required={false}
          label={t('activity_modal.estimateField.estimate')}
          onChange={handleChange}
          value={activityForm.activity.estimate}
          size='small'
          margin='normal'
          name={'estimate'}
        />
      </DialogContent>

      <DialogActions>
        {appState.activityModal.activityId ? (
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
  );
};
