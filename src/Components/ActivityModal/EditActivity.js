import React from 'react';
import { useGlobalState } from '@Context/GlobalStateContext';
import { useTranslation } from 'react-i18next';
import { TextInput, SelectField } from '@Components/Shared/Inputs';
import { TagSelect } from '@Components/Tags/TagSelect.view';

export const EditActivity = ({ formik }) => {
  const { state: appState } = useGlobalState();
  const { t } = useTranslation();

  const handleTagSet = (selectedTag, setFieldValue) => {
    setFieldValue('activity.tag', selectedTag);
  };

  return (
    <>
      <TextInput
        label='title'
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
      {/* Estimate */}
      <TextInput label='estimate' name='activity.estimate' type='number' placeholder='estimate' />
    </>
  );
};
