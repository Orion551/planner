import * as Yup from 'yup';

export const getProjectFormSchema = (t) => {
  return Yup.object().shape({
    projectName: Yup.string()
      .max(100, t('validation.errors.must_be_100_chars_or_less'))
      .required(t('validation.errors.a_project_name_is_required')),
    projectDescription: Yup.string().max(1500, t('validation.errors.must_be_1500_chars_or_less')),
    projectTags: Yup.array().of(Yup.string()).nullable(),
    projectAttachments: Yup.array().of(Yup.string()).nullable(),
  });
};
