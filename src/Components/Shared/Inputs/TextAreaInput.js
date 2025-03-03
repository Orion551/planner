import React from 'react';
import { useField } from 'formik';
import '@Assets/styles/global.scss';
import { Typography } from '@mui/material';

const TextAreaInput = ({ label, ...props }) => {
  const [field, meta] = useField(props);

  return (
    <>
      <Typography variant='subtitle1' color='textPrimary' sx={{ userSelect: 'none' }}>
        {label}
      </Typography>
      <textarea className='textarea-input' rows='5' cols='50' {...field} {...props} />
      {meta.touched && meta.error && <div className='error'>{meta.error}</div>}
    </>
  );
};

export default TextAreaInput;
