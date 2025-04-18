import React from 'react';
import { useField } from 'formik';
import { Typography } from '@mui/material';

const SelectField = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  // const { t } = useTranslation();

  return (
    <div>
      <Typography variant='subtitle1' color='textPrimary' sx={{ userSelect: 'none' }}>
        {label}
      </Typography>
      <select className='select-input' {...field} {...props} />
      {meta.touched && meta.error && <div className='error'>{meta.error}</div>}
    </div>
  );
};

export default SelectField;
