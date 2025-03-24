import React from 'react';
import { ApiUrl } from '@Constants/ApiUrl';
import { GoogleLoginButtonView } from '@Components/Login/Google/GoogleLoginButton.view';

export const LoginPage = () => {
  const handleLogin = (authority) => {
    window.location.href = `${ApiUrl.plannerServiceBaseUrl}${ApiUrl.auth}/${authority}`;
  };

  return (
    <div
      style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}
    >
      <GoogleLoginButtonView handleClick={handleLogin} />
    </div>
  );
};
