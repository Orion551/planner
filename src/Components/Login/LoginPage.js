import React from 'react';
import { ApiUrl } from '@Constants/ApiUrl';
// import { PlannerRestService } from '@Api/planner-rest-service';

export const LoginPage = () => {
  const handleLogin = () => {
    // window.location.href = 'http://localhost:3000/api/v1/auth/google';
    window.location.href = `${ApiUrl.plannerServiceBaseUrl}${ApiUrl.auth}/google`;
  };

  return (
    <div
      style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}
    >
      <button onClick={handleLogin}>Accedi con Google</button>
    </div>
  );
};
