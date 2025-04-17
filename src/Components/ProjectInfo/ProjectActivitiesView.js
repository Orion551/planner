import React, { useState, useMemo } from 'react';
import { Stack, Box } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import { useTranslation } from 'react-i18next';
import { useGlobalState } from '@Context/GlobalStateContext';
import { TableDataRow } from '@Components/ProjectInfo/TableDataRow';
import { updateActivity } from '@Context/ActionHandlers/HandleActivity';
import { getProjectActivitiesTableHeaders } from '@Constants/ProjectActivitiesColumns';
import { ProjectActivitiesTableFooter } from '@Components/ProjectInfo/ProjectActivitiesTableFooter';
import TableSortLabel from '@mui/material/TableSortLabel';
import TableRow from '@mui/material/TableRow';
import { getComparator } from '@Utils/ProjectActivitiesTable';
import { visuallyHidden } from '@mui/utils';

export const ProjectActivitiesView = ({ activitiesIds }) => {
  const { t } = useTranslation();
  const { state, dispatch } = useGlobalState();
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('name');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(15);

  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleActivityUpdate = async (activity) => {
    const updatedActivity = {
      ...activity,
      completed: !activity.completed,
    };
    await updateActivity(dispatch, updatedActivity, t);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const getScheduledDay = useMemo(() => {
    const scheduleMap = {};
    state.configData?.scheduleColumns?.forEach((column) => {
      column.columnTaskIds.forEach((taskId) => {
        scheduleMap[taskId] = column.columnId;
      });
    });
    return scheduleMap;
  }, [state.configData]);

  return (
    <Stack direction='column' sx={{ flex: 1, minHeight: 0 }}>
      <TableContainer sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <Box sx={{ flex: 1, overflow: 'auto' }}>
          <Table stickyHeader sx={{ minWidth: 550 }} size='medium'>
            <TableHead>
              <TableRow>
                {getProjectActivitiesTableHeaders(t).map((tHCell) => (
                  <TableCell key={tHCell.id} sortDirection={orderBy === tHCell.id ? order : false}>
                    <TableSortLabel
                      active={orderBy === tHCell.id}
                      direction={orderBy === tHCell.id ? order : 'asc'}
                      onClick={() => handleRequestSort(tHCell.id)}
                    >
                      {tHCell.label}
                      {orderBy === tHCell.id ? (
                        <Box component='span' sx={visuallyHidden}>
                          {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                        </Box>
                      ) : null}
                    </TableSortLabel>
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {activitiesIds.length > 0 &&
                [...activitiesIds]
                  .sort((aId, bId) => {
                    const a = state.activities.get(aId);
                    const b = state.activities.get(bId);
                    return getComparator(order, orderBy)(a, b);
                  })
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((activityId) => {
                    const activity = state.activities.get(activityId);
                    return activity ? (
                      <TableDataRow
                        key={activityId}
                        activity={activity}
                        scheduledDay={getScheduledDay[activityId] || ''}
                        onActivityStateSet={handleActivityUpdate}
                      />
                    ) : null;
                  })}
            </TableBody>
          </Table>
        </Box>
        <Table sx={{ minWidth: 550 }}>
          <ProjectActivitiesTableFooter
            totalActivities={activitiesIds.length}
            page={page}
            rowsPerPage={rowsPerPage}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Table>
      </TableContainer>
    </Stack>
  );
};
