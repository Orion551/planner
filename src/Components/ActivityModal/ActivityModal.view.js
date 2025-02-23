import React, { useState } from 'react';
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  CloseIcon,
  DeleteIcon,
  // eslint-disable-next-line no-unused-vars
  TagSelect,
  ActivityPlanGroup,
} from './MuiImports';
import { useGlobalState } from '@Context/GlobalStateContext';
import { useTranslation } from 'react-i18next';
import { Actions } from '@Context/Actions';
// eslint-disable-next-line no-unused-vars
import { createActivity, deleteActivity } from '@Context/ActionHandlers/HandleActivity';
import { findScheduledActivity } from '@Utils/FindScheduledActivity';
import { Form, Formik } from 'formik';
import { TextInput, SelectField } from '@Components/Shared/Inputs';
import * as Yup from 'yup';

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

  // eslint-disable-next-line no-unused-vars
  const handleChange = (e) => {
    console.log('event', e);
    setActivityForm((prevForm) => ({
      ...prevForm,
      activity: {
        ...prevForm.activity,
        [e.target.name]: e.target.value,
      },
    }));
  };

  // eslint-disable-next-line no-unused-vars
  const handleTagSet = (selectedTag) => {
    setActivityForm((prevForm) => ({
      ...prevForm,
      activity: {
        ...prevForm.activity,
        tag: selectedTag,
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

  const handleActivityDelete = async () => {
    // dispatch(Actions.deleteActivity(activityForm.id));
    await deleteActivity(dispatch, appState.activityModal.activityId);
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
        <Formik
          initialValues={{
            activity: {
              title: '',
              project: '',
              tag: null,
              description: '',
              estimate: 0,
            },
            scheduleColumns: [],
          }}
          validationSchema={Yup.object({
            title: Yup.string()
              .max(100, t('validation.errors.must_be_100_chars_or_less'))
              .required(t('validation.required')),
            project: Yup.string().oneOf([appState.projects]),
            description: Yup.string().max(1500, t('validation.errors.must_be_1500_chars_or_less')),
            estimate: Yup.number().positive().integer(),
          })}
          onSubmit={(values, { setSubmitting }) => {
            setTimeout(() => {
              alert(JSON.stringify(values, null, 2));
              setSubmitting(false);
            }, 500);
          }}
        >
          {() => (
            <Form>
              {/* Title */}
              <TextInput
                label='title'
                name='title'
                type='text'
                placeholder={t('activity_modal.titleField.what_are_you_gonna_do')}
              />
              {/* Project selection */}
              <SelectField label={t('activity_modal.projectField.project')} name='project'>
                <option value=''>{t('activity_modal.projectField.no_project')}</option>
                {appState.projects.map((project) => (
                  <option key={project.id} value={project.id}>
                    {project.projectName}
                  </option>
                ))}
              </SelectField>
              {/* Textarea */}
              <TextInput
                label='description'
                name='description'
                type='textarea'
                placeholder={t('activity_modal.descriptionField.description')}
              />
              {/* Activity day planning */}
              <ActivityPlanGroup
                isDisabled={appState.activityModal.activityId ? true : false}
                selectedColumns={activityForm.scheduleColumns || []}
                onColumnSelection={handleColumnSelection}
              />
              {/* Estimate */}
              <TextInput label='estimate' name='estimate' type='number' placeholder='estimate' />
            </Form>
          )}
        </Formik>
      </DialogContent>

      <DialogActions>
        {
          appState.activityModal.activityId ? (
            <Button
              color='error'
              variant='outlined'
              size='small'
              startIcon={<DeleteIcon />}
              onClick={handleActivityDelete}
            >
              {t('activity_modal.buttons.delete')}
            </Button>
          ) : null
          // TODO: Uncomment this to enable the button. These brackets are required ofc ()
          // <Button size='small' autoFocus onClick={handleActivityCreate}>
          //   {t('activity_modal.buttons.create')}
          // </Button>
        }
      </DialogActions>
    </Dialog>
  );
};
