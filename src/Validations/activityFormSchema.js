import * as Yup from 'yup';

/**
 * @param t
 * @param appState {React.Context} - Retrieve data
 * @param isEdit {Boolean} - To conditionally provide some parts of the validation schema
 */
export const getActivityFormSchema = (t, appState, isEdit) => {
  console.log('is edit', isEdit);
  const projectIds = appState.projects.map((project) => project.id); // Extract IDs for validation

  return Yup.object().shape({
    activity: Yup.object().shape({
      title: Yup.string()
        .max(100, t('validation.errors.must_be_100_chars_or_less'))
        .required(t('validation.required')),
      project: Yup.string().oneOf(projectIds, t('validation.errors.invalid_project')), // Validate against available IDs
      description: Yup.string().max(1500, t('validation.errors.must_be_1500_chars_or_less')),
      estimate: Yup.number()
        .min(0, t('validation.errors.must_be_0_or_greater')) // Allows 0 and positive numbers
        .integer(t('validation.errors.must_be_integer')),
      tag: Yup.mixed().nullable(), // Ensure tag can be `null`
    }),
    scheduleColumns: Yup.array()
      .of(Yup.string())
      .when([], {
        is: () => !isEdit,
        then: (schema) =>
          schema
            .min(1, t('validation.errors.at_least_one_schedule_column'))
            .required(t('validation.required')),
        otherwise: (schema) => schema.notRequired(), // Skip validation if in edit mode
      }),
  });
};
