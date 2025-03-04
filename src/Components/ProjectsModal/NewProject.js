import React from 'react';
import { useTranslation } from 'react-i18next';
import { TextAreaInput, TextInput } from '@Components/Shared/Inputs';
import { TagSelect } from '@Components/Tags/TagSelect.view';

export const NewProject = ({ formik }) => {
  const { t } = useTranslation();

  const handleTagSet = (selectedTag, setFieldValue) => {
    setFieldValue('projectTags', selectedTag);
  };

  return (
    <>
      <TextInput
        name='projectName'
        type='text'
        label={t('projects_modal.projectNameField.name')}
        placeholder={t('projects_modal.projectNameField.project_name')}
      />
      <TagSelect
        tags={[]}
        allowMultiple={true}
        onTagSelect={(selectedTag) => handleTagSet(selectedTag, formik.setFieldValue)}
      />
      <TextAreaInput
        label={t('projects_modal.projectDescriptionField.description')}
        name='projectDescription'
        type='textarea'
        placeholder={t('projects_modal.projectDescriptionField.what_is_the_project_about')}
      />
    </>
  );
};
