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
import { findTagById, findTagColorCode } from '@Utils/TagUtilities';
import { useGlobalState } from '@Context/GlobalStateContext';
import { TagElementView } from '@Components/Tags/TagElement.view';
import CircleIcon from '@mui/icons-material/Circle';

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
            {activities.map((row, index) => {
              index;
              return (
                <TableRow
                  hover
                  padding='checkbox'
                  tabIndex={-1}
                  key={row.id}
                  sx={{ cursor: 'pointer' }}
                >
                  <TableCell padding='checkbox'>
                    <Checkbox color='primary' checked={false} />
                  </TableCell>
                  <TableCell component='th' scope={row} padding='none'>
                    {row.id}
                  </TableCell>
                  <TableCell align='left'>{row.title}</TableCell>
                  <TableCell align='left'>
                    <TagElementView
                      key={row.tag}
                      tagName={findTagById(appState.configData.userTags, row.tag).tagName}
                      tagColor={findTagColorCode(
                        appState.configData.tagsPalette,
                        findTagById(appState.configData.userTags, row.tag).tagColorId
                      )}
                    />
                  </TableCell>
                  <TableCell align='center'>
                    <CircleIcon
                      sx={{
                        color: (theme) =>
                          row.completed ? theme.palette.success.main : theme.palette.warning.main,
                        width: '0.7em',
                        height: '0.7em',
                      }}
                    />
                    {row.completed}
                  </TableCell>
                  <TableCell align='right'>{toHoursAndMinutes(row.estimate)}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};
