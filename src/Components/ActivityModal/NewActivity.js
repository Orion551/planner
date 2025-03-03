import React from 'react';
import { useGlobalState } from '@Context/GlobalStateContext';
import { useTranslation } from 'react-i18next';
import { TextInput, SelectField, TextAreaInput } from '@Components/Shared/Inputs';
import { TagSelect } from '@Components/Tags/TagSelect.view';
import { ActivityPlanGroup } from '@Components/Shared/ActivityPlanGroup';

export const NewActivity = ({ formik }) => {
  const { state: appState } = useGlobalState();
  const { t } = useTranslation();

  const handleTagSet = (selectedTag, setFieldValue) => {
    setFieldValue('activity.tag', selectedTag);
  };

  return (
    <>
      {/* title */}
      <TextInput
        label={t('activity_modal.titleField.title')}
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
      <TextAreaInput
        label={t('activity_modal.descriptionField.description')}
        name='activity.description'
        type='textarea'
        placeholder={t('activity_modal.descriptionField.any_details')}
      />
      {/* Estimate */}
      <TextInput
        label={t('activity_modal.estimateField.estimate')}
        name='activity.estimate'
        type='number'
        placeholder={t('activity_modal.estimateField.eg_type_65_min_it_turns_to_1h_5min')}
      />
      <ActivityPlanGroup
        name='scheduleColumns'
        label={t('activity_modal.planned_for')}
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
    </>
  );
};
