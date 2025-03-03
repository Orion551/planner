import React from 'react';
import { useField } from 'formik';
import '@Assets/styles/global.scss';
import { Typography } from '@mui/material';

const TextInput = ({ label, ...props }) => {
  const [field, meta] = useField(props);

  return (
    <>
      <Typography variant='subtitle1' color='textPrimary' sx={{ userSelect: 'none' }}>
        {label}
      </Typography>
      {/*<label htmlFor={props.id || props.name}></label>*/}
      <input className='text-input' {...field} {...props} />
      {meta.touched && meta.error && <div className='error'>{meta.error}</div>}
    </>
  );
};

export default TextInput;
