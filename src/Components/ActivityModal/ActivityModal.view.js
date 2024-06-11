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
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import TextField from '@mui/material/TextField';
import { postRequest } from '@Api/http-service';
import { ApiUrl } from '@Constants/ApiUrl';

export const ActivityModalView = () => {
  const { state: appState, dispatch } = useGlobalState();
  // Local state to store the activity
  const [activity, setActivity] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [modalMode, setModalMode] = useState(ActivityModalModes.create);
  const { t } = useTranslation();

  const [activityForm, setActivityForm] = useState({
    title: '',
    project: '',
    tag: null,
    description: '',
    estimate: 0,
  });

  // const [scheduleDays, setScheduleDays] = useState([]);

  const handleClose = () => dispatch(Actions.toggleActivityModal(false));

  const handleFormChange = (e) => {
    setActivityForm({
      ...activityForm,
      [e.target.name]: e.target.value,
    });
  };

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
    dispatch(Actions.deleteActivity(activity.id));
  };

  // TODO: Data should be validated;
  const handleActivityCreate = async () => {
    try {
      await postRequest({ url: ApiUrl.activities, data: activityForm }).then((response) => {
        console.log('success', response.data);
      });
    } catch (e) {
      console.error(e.message);
    }

    // dispatch(Actions.createActivity(activity));
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
            {/* TODO: Handle when in edit mode */}
            <TextField
              name={'title'}
              required={true}
              placeholder={t('activity_modal.titleField.what_are_you_gonna_do')}
              label={t('activity_modal.titleField.title')}
              onChange={handleFormChange}
              size='small'
              margin='normal'
            />
            {/* Project selection [will be enabled in future] */}
            {/* <SelectField /> */}
            {/** Tag selection (not mandatory to the user ) */}
            <InputLabel id='select-project'>Project</InputLabel>
            <Select
              size='small'
              labelId='project-select'
              id='demo-simple-select'
              value={activityForm.project}
              label='Age'
              name={'project'}
              onChange={handleFormChange}
            >
              {appState.projects.map((project, idx) => (
                <MenuItem key={idx} value={project.id}>
                  {project.projectName}
                </MenuItem>
              ))}
            </Select>
            {/* <TagsMenuView /> */}
            <TagsListView
              tags={appState.configData.userTags}
              tagsPalette={appState.configData.tagsPalette}
              tagSelection={handleTagSelection}
            />
            <TextField
              name={'description'}
              fullWidth
              multiline
              rows={3}
              required={false}
              placeholder={t('activity_modal.descriptionField.any_details')}
              label={t('activity_modal.descriptionField.description')}
              onChange={handleFormChange}
            />
            {/* Activity Plan Btns */}
            <ActivityPlanGroup
              isDisabled={modalMode === ActivityModalModes.edit}
              selectedColumns={activity?.selectedColumns || []}
              onColumnSelection={handleColumnSelection}
            />

            <TextField
              name={'estimate'}
              required={false}
              label={t('activity_modal.estimateField.estimate')}
              onChange={handleFormChange}
              size='small'
              margin='normal'
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
