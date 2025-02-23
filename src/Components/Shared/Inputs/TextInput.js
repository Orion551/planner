import React from 'react';
import { useField } from 'formik';
// import { useTranslation } from 'react-i18next';

const TextInput = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  // const { t } = useTranslation();

  return (
    <>
      <label htmlFor={props.id || props.name}>{label}</label>
      <input className='text-input' {...field} {...props} />
      {meta.touched && meta.error && <div className='error'>{meta.error}</div>}
    </>
  );
};

export default TextInput;
