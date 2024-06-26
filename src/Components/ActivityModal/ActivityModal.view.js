import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import {
  createActivity,
  deleteActivity,
  toggleActivityModal,
  useGlobalState,
} from '@Context/GlobalStateContext';
import { useTranslation } from 'react-i18next';
import { ActivityPlanGroup } from '@Components/Shared/ActivityPlanGroup';
import { TextInput } from '@Components/Shared/TextInput';
import { DescriptionInput } from '@Components/Shared/DescriptionInput';
import CircularProgress from '@mui/material/CircularProgress';
import DeleteIcon from '@mui/icons-material/Delete';
import { TagsListView } from '@Components/Tags/TagsList.view';
import { ActivityModalModes } from '@Constants/ActivityModalModes';

export const ActivityModalView = () => {
  const { state: appState, dispatch } = useGlobalState();
  // Local state to store the activity
  const [activity, setActivity] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [modalMode, setModalMode] = useState(ActivityModalModes.create);
  const { t } = useTranslation();

  const handleClose = () => dispatch(toggleActivityModal(false));

  // const handleEnter = () => {
  //   console.log('enter key pressed');
  // };

  const handleTagSelection = (tag) => {
    console.log('selected tag:', tag);
  };

  const handleColumnSelection = (selectedColumns) => {
    setActivity((prevActivity) => ({
      ...prevActivity,
      selectedColumns: [selectedColumns],
    }));
  };

  const handleActivityDelete = () => {
    dispatch(deleteActivity(activity.id));
  };

  // TODO: Data should be validated;
  const handleActivityCreate = () => {
    dispatch(createActivity(activity));
  };

  // Fetch activity from global state on component mount (if any)
  useEffect(() => {
    if (appState.activityModal.activityId) {
      setModalMode(ActivityModalModes.edit);
      // Fetch activity's related data.
      const activity = appState.activities.find(
        (activity) => activity.id === appState.activityModal.activityId
      );
      setActivity(activity);
      const scheduleColumn = appState.configData.scheduleColumns.find((column) =>
        column.columnTaskIds.includes(activity.id)
      );
      console.log('schedule column', scheduleColumn);
      handleColumnSelection(scheduleColumn.columnId);
      setIsLoading(false);
    } else {
      setModalMode(ActivityModalModes.create);
      setActivity(null);
      handleColumnSelection(appState.activityModal.dayId);
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
            <TextInput
              placeholder={t('activity_modal.titleField.what_are_you_gonna_do')}
              isRequired={true}
              label={t('activity_modal.titleField.title')}
              value={activity?.title || ''}
              onChange={(newValue) => setActivity({ ...activity, title: newValue })}
            />
            {/* Project selection [will be enabled in future] */}
            {/* <SelectField /> */}
            {/** Tag selection (not mandatory to the user ) */}
            {/* <TagsMenuView /> */}
            <TagsListView
              tags={appState.configData.userTags}
              tagsPalette={appState.configData.tagsPalette}
              tagSelection={handleTagSelection}
            />
            {/* Description */}
            <DescriptionInput
              label={t('activity_modal.descriptionField.description')}
              placeholder={t('activity_modal.descriptionField.any_details')}
              value={activity?.description || ''}
              isRequired={false}
              onChange={(newValue) => setActivity({ ...activity, description: newValue })}
            />
            {/* Activity Plan Btns */}
            <ActivityPlanGroup
              isDisabled={modalMode === ActivityModalModes.edit}
              selectedColumns={activity?.selectedColumns || []}
              onColumnSelection={handleColumnSelection}
            />

            {/* Estimate */}
            <TextInput
              isRequired={false}
              label={t('activity_modal.estimateField.estimate')}
              value={activity?.estimate || ''}
              onChange={(newValue) => setActivity({ ...activity, estimate: newValue })}
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
