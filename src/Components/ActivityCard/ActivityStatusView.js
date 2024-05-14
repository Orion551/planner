import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useGlobalState } from '@Context/GlobalStateContext';
import { Button } from '@mui/material';

export const ActivityStatusView = ({ statusCode }) => {
  const { t } = useTranslation();
  const {
    state: { configData },
  } = useGlobalState();
  const [statusObject, setStatusObject] = useState(null);

  useEffect(() => {
    if (configData)
      setStatusObject(configData.activityStatus.find((status) => status.id === statusCode));
  }, [configData, statusCode]);

  return (
    <Button sx={{ borderColor: statusObject?.colorCode }} size='small' variant='outlined'>
      {t(`activity.activityStatus.${statusObject?.label}`)}
    </Button>
  );
};
