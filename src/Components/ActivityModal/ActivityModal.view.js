import React from 'react';
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  CloseIcon,
  DeleteIcon,
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
import { getActivityFormSchema } from '@Validations/activityFormSchema';

export const ActivityModalView = () => {
  const { state: appState, dispatch } = useGlobalState();
  const { t } = useTranslation();

  const handleClose = () => dispatch(Actions.toggleActivityModal(false));

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
          validationSchema={getActivityFormSchema(t, appState)}
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
              {/* Tag */}
              <TagSelect tags={activity.tag} allowMultiple={false} onTagSelect={handleTagSet} />
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
