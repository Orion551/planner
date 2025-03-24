import React, { createContext, useContext, useEffect } from 'react';
import { ApiUrl } from '@Constants/ApiUrl';
import { getRequest } from '@Api/http-service';
import { Actions } from '@Context/Actions';
import { useGlobalState } from '@Context/GlobalStateContext';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const { dispatch } = useGlobalState();
  const [user, setUser] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const SESSION_TIMEOUT = 15 * 60 * 1000; // 15 minutes
  let timeout;

  const resetTimer = () => {
    clearTimeout(timeout);
    timeout = setTimeout(logout, SESSION_TIMEOUT);
  };

  useEffect(() => {
    window.addEventListener('mousemove', resetTimer);
    window.addEventListener('keydown', resetTimer);
    resetTimer();

    return () => {
      clearTimeout(timeout);
      window.removeEventListener('mousemove', resetTimer);
      window.removeEventListener('keydown', resetTimer);
    };
  });

  useEffect(() => {
    const checkSession = async () => {
      try {
        const res = await getRequest({ url: `${ApiUrl.auth}/verify` });
        console.log('res', res);

        if (res.status === 200) {
          // const data = await res.json();
          const response = await getRequest({
            url: ApiUrl.plannerConfig,
          });
          const projectResponse = await getRequest({ url: ApiUrl.projects });
          const activitiesResponse = await getRequest({
            url: ApiUrl.activities,
          });
          // console.log('activitiesResponse', activitiesResponse);
          dispatch(Actions.initConfig(response.data));
          dispatch(Actions.initActivities(activitiesResponse.data));
          dispatch(Actions.initProjects(projectResponse.data));
          setUser(res.data.user);
        }
      } catch (error) {
        console.error('Errore nel recupero della sessione:', error);
      } finally {
        setLoading(false);
      }
    };

    checkSession();
  }, [dispatch]);

  const logout = async () => {
    try {
      await getRequest({ url: `${ApiUrl.auth}/logout` });
      setUser(null);
    } catch (error) {
      console.error('Network error', error);
    }
  };

  return <AuthContext.Provider value={{ user, loading, logout }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
