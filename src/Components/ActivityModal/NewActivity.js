import React from 'react';
import { useGlobalState } from '@Context/GlobalStateContext';
import { useTranslation } from 'react-i18next';
// import { Actions } from '@Context/Actions';
import { Form, Formik } from 'formik';
import { TextInput, SelectField } from '@Components/Shared/Inputs';
import { getActivityFormSchema } from '@Validations/activityFormSchema';
import { TagSelect } from '@Components/Tags/TagSelect.view';
import { ActivityPlanGroup } from '@Components/Shared/ActivityPlanGroup';

export const NewActivity = () => {
  // eslint-disable-next-line no-unused-vars
  const { state: appState, dispatch } = useGlobalState();
  const { t } = useTranslation();

  const handleTagSet = (selectedTag, setFieldValue) => {
    setFieldValue('activity.tag', selectedTag);
  };

  return (
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
      validationSchema={getActivityFormSchema(t, appState, false)}
      onSubmit={() => {
        console.log('onSubmit');
      }}
    >
      {(formik) => (
        <Form>
          {/* title */}
          <TextInput
            labe='title'
            name='activity.title'
            type='text'
            placeholder={t('activity_modal.titleField.what_are_you_gonna_do')}
          />
          {/* Project selection */}
          <SelectField label={t('activity_modal.projectField.project')} name='activity.project'>
            <option value=''>{t('activity_modal.projectField.no_project')}</option>
            {appState.projects.map((project) => (
              <option key={project.id} value={project.id}>
                {project.projectName}
              </option>
            ))}
          </SelectField>
          {/* Tag */}
          <TagSelect
            tags={formik.values.activity.tag}
            allowMultiple={false}
            onTagSelect={(selectedTag) => handleTagSet(selectedTag, formik.setFieldValue)}
          />
          {/* Textarea */}
          <TextInput
            label='description'
            name='activity.description'
            type='textarea'
            placeholder={t('activity_modal.descriptionField.description')}
          />
          <ActivityPlanGroup
            name='scheduleColumns'
            isDisabled={!!appState.activityModal.activityId}
            selectedColumns={formik.values.scheduleColumns || []}
            onColumnSelection={(selectedColumn) =>
              formik.setFieldValue(
                'scheduleColumns',
                formik.values.scheduleColumns.includes(selectedColumn)
                  ? formik.values.scheduleColumns.filter((col) => col !== selectedColumn)
                  : [...formik.values.scheduleColumns, selectedColumn]
              )
            }
          />
          {/* Estimate */}
          <TextInput
            label='estimate'
            name='activity.estimate'
            type='number'
            placeholder='estimate'
          />
        </Form>
      )}
    </Formik>
  );
};
