import React from 'react';
import { Box } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
// import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
// import TableSortLabel from '@mui/material/TableSortLabel';
// import Typography from '@mui/material/Typography';
import Checkbox from '@mui/material/Checkbox';
// import IconButton from '@mui/material/IconButton';
// import { visuallyHidden } from '@mui/utils';
// import DeleteIcon from '@mui/icons-material/Delete';
import { useTranslation } from 'react-i18next';
// import { StatusViewContext } from '@Constants/StatusViewContext';
// import { StatusViewModes } from '@Constants/StatusViewModes';
// import { StatusView } from '@Utils/StatusView';
import { toHoursAndMinutes } from '@Utils/toHoursAndMinutes';
import { useGlobalState } from '@Context/GlobalStateContext';
import { TagItemView } from '@Components/Tags/TagItemView';
import CircleIcon from '@mui/icons-material/Circle';

const TableDataRow = (state, data) => {
  return (
    <TableRow hover padding='checkbox' tabIndex={-1} key={data.id} sx={{ cursor: 'pointer' }}>
      <TableCell padding='checkbox'>
        <Checkbox color='primary' checked={false} />
      </TableCell>
      <TableCell component='th' scope={data} padding='none'>
        {data.id}
      </TableCell>
      <TableCell align='left'>{data.title}</TableCell>
      <TableCell align='left'>
        {data.tag !== null ? <TagItemView key={data.tag} tagId={data.tag} /> : 'none'}
      </TableCell>
      <TableCell align='center'>
        <CircleIcon
          sx={{
            color: (theme) =>
              data.completed ? theme.palette.success.main : theme.palette.warning.main,
            width: '0.7em',
            height: '0.7em',
          }}
        />
        {data.completed}
      </TableCell>
      <TableCell align='right'>{toHoursAndMinutes(data.estimate)}</TableCell>
    </TableRow>
  );
};

export const ProjectActivitiesView = ({ activities }) => {
  const { t } = useTranslation();
  const { state: appState } = useGlobalState();
  console.log('activities', activities);
  const tableHeadCells = [
    {
      id: 'id',
      numeric: false,
      disablePadding: true,
      label: t('projects.activityList.tableHeaders.id'),
    },
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

  return (
    <Box sx={{ width: '100%' }}>
      <TableContainer>
        <Table sx={{ minWidth: 550 }} size='medium'>
          <TableHead>
            <TableRow>
              <TableCell padding='checkbox'>
                <Checkbox color='primary' checked={false} />
              </TableCell>
              {tableHeadCells.map((tHCell) => (
                <TableCell
                  key={tHCell}
                  align={tHCell.numeric ? 'right' : 'left'}
                  padding={tHCell.disablePadding ? 'none' : 'normal'}
                >
                  {tHCell.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {activities.length > 0 &&
              activities.map((activity) => TableDataRow(appState, activity))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};
