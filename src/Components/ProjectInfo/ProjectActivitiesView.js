import React from 'react';
import { Box, TablePagination } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { useTranslation } from 'react-i18next';
import { useGlobalState } from '@Context/GlobalStateContext';
import { TableFooter } from '@mui/material';
import { TableDataRow } from '@Components/ProjectInfo/TableDataRow';
import { updateActivity } from '@Context/ActionHandlers/HandleActivity';

export const ProjectActivitiesView = ({ activitiesIds }) => {
  const { t } = useTranslation();
  const { state, dispatch } = useGlobalState();
  const tableHeadCells = [
    {
      id: 'name',
      numeric: false,
      disablePadding: true,
      label: t('projects.activityList.tableHeaders.name'),
    },
    {
      id: 'tag',
      numeric: true,
      disablePadding: true,
      label: t('projects.activityList.tableHeaders.tag'),
    },
    {
      id: 'status',
      numeric: true,
      disablePadding: true,
      label: t('projects.activityList.tableHeaders.status'),
    },
    {
      id: 'estimation',
      numeric: true,
      disablePadding: true,
      label: t('projects.activityList.tableHeaders.estimation'),
    },
  ];

  const handleActivityUpdate = async (activity) => {
    const updatedActivity = {
      ...activity,
      completed: !activity.completed,
    };
    await updateActivity(dispatch, updatedActivity, t);
  };

  return (
    <Box sx={{ width: '100%', height: '100vh' }}>
      <TableContainer>
        <Table sx={{ minWidth: 550 }} size='medium'>
          <TableHead>
            <TableRow>
              {tableHeadCells.map((tHCell) => (
                <TableCell
                  key={tHCell.id}
                  align={tHCell.numeric ? 'right' : 'left'}
                  padding={tHCell.disablePadding ? 'none' : 'normal'}
                >
                  {tHCell.label}
                </TableCell>
              ))}
            </TableRow>
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
          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                colSpan={3}
                count={activitiesIds.length}
                rowsPerPage={50}
                page={0}
                onPageChange={() => {}}
                slotProps={{
                  select: {
                    inputProps: {
                      'aria-label': 'rows per page',
                    },
                    native: true,
                  },
                }}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    </Box>
  );
};
