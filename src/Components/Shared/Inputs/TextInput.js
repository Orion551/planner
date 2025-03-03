import React from 'react';
import { useField } from 'formik';
import '@Assets/styles/global.scss';
import { Typography } from '@mui/material';
import { ValidationFeedback } from '@Components/Shared/ValidationFeedback';

const TextInput = ({ label, ...props }) => {
  const [field, meta] = useField(props);

  return (
    <>
      <Typography variant='subtitle1' color='textPrimary' sx={{ userSelect: 'none' }}>
        {label}
      </Typography>
      <input className='text-input' {...field} {...props} />
      {meta.touched && meta.error && <ValidationFeedback validationMessage={meta.error} />}
    </>
  );
};

export default TextInput;
