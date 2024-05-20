import React, { useEffect, useState } from 'react';
import CircleIcon from '@mui/icons-material/Circle';
import { Button } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useGlobalState } from '@Context/GlobalStateContext';
import { StatusViewModes } from '@Constants/StatusViewModes';

export const StatusView = ({ statusCode, viewMode = StatusViewModes.DETAILED }) => {
  const { t } = useTranslation();
  const {
    state: { configData },
  } = useGlobalState();
  const [status, setStatus] = useState(null);

  useEffect(() => {
    if (configData) setStatus(configData.status.find((s) => s.id === statusCode));
  }, [configData, statusCode]);

  switch (viewMode) {
    case StatusViewModes.BRIEF:
      return <CircleIcon sx={{ color: status?.colorCode }} />;
    case StatusViewModes.DETAILED:
      return (
        <Button
          sx={{ borderColor: status?.colorCode, color: status?.colorCode }}
          variant='outlined'
          size='small'
          endIcon={<CircleIcon sx={{ color: status?.colorCode }} />}
        >
          {t(`status.${status?.label}`)}
        </Button>
      );
  }
};
