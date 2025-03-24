import React from 'react';
import '@Assets/styles/login-authorities.scss';
import GoogleIcon from '@mui/icons-material/Google';

export const GoogleLoginButtonView = ({ handleClick }) => {
  return (
    <button className='google-btn' onClick={() => handleClick('google')}>
      <GoogleIcon />
      Log in with Google
    </button>
  );
};
