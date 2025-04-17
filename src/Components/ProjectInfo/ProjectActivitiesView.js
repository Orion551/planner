import React from 'react';
import { Stack, Box } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
// import TableRow from '@mui/material/TableRow';
import { useTranslation } from 'react-i18next';
import { useGlobalState } from '@Context/GlobalStateContext';
// import { TableFooter } from '@mui/material';
import { TableDataRow } from '@Components/ProjectInfo/TableDataRow';
import { updateActivity } from '@Context/ActionHandlers/HandleActivity';
import { getProjectActivitiesTableHeaders } from '@Constants/ProjectActivitiesColumns';
// import IconButton from '@mui/material/IconButton';
// import AddIcon from '@mui/icons-material/Add';
import { ProjectActivitiesTableFooter } from '@Components/ProjectInfo/ProjectActivitiesTableFooter';

export const ProjectActivitiesView = ({ activitiesIds }) => {
  const { t } = useTranslation();
  const { state, dispatch } = useGlobalState();

  const handleActivityUpdate = async (activity) => {
    const updatedActivity = {
      ...activity,
      completed: !activity.completed,
    };
    await updateActivity(dispatch, updatedActivity, t);
  };

  return (
    <Stack direction='column' sx={{ flex: 1, minHeight: 0 }}>
      <TableContainer sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <Box sx={{ flex: 1, overflow: 'auto' }}>
          <Table sx={{ minWidth: 550 }} size='medium'>
            <TableHead>
              {getProjectActivitiesTableHeaders(t).map((tHCell) => (
                <TableCell key={tHCell.id}>{tHCell.label}</TableCell>
              ))}
            </TableHead>
            <TableBody>
              {activitiesIds.length > 0 &&
                activitiesIds.map((activityId) => {
                  const activity = state.activities.get(activityId);
                  return activity ? (
                    <TableDataRow
                      key={activityId}
                      activity={activity}
                      onActivityStateSet={handleActivityUpdate}
                    />
                  ) : null;
                })}
            </TableBody>
          </Table>
        </Box>
        <Table sx={{ minWidth: 550 }}>
          <ProjectActivitiesTableFooter totalActivities={activitiesIds.length} />
        </Table>
      </TableContainer>
    </Stack>
  );
};
