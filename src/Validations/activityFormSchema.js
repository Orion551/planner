import * as Yup from 'yup';

export const getActivityFormSchema = (t, appState) =>
  Yup.object().shape({
    title: Yup.string()
      .max(100, t('validation.errors.must_be_100_chars_or_less'))
      .required(t('validation.required')),
    project: Yup.string().oneOf([appState.projects]),
    description: Yup.string().max(1500, t('validation.errors.must_be_1500_chars_or_less')),
    estimate: Yup.number().positive().integer(),
  });
