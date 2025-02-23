import React from 'react';
import { useField } from 'formik';
// import { useTranslation } from 'react-i18next';

const SelectField = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  // const { t } = useTranslation();

  return (
    <div>
      <label htmlFor={props.id || props.name}>{label}</label>
      <select {...field} {...props} />
      {meta.touched && meta.error && <div className='error'>{meta.error}</div>}
    </div>
  );
};

export default SelectField;
