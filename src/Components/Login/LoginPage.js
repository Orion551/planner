import React from 'react';

export const LoginPage = () => {
  const handleLogin = () => {
    window.location.href = 'http://localhost:3000/api/v1/auth/google';
  };

  return (
    <div
      style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}
    >
      <button onClick={handleLogin}>Accedi con Google</button>
    </div>
  );
};
