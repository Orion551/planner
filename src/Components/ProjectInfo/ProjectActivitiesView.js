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

export const ProjectActivitiesView = ({ activities }) => {
  console.log('activities', activities);
  const tableHeadCells = [
    {
      id: 'id',
      numeric: false,
      disablePadding: true,
      label: 'ID',
    },
    {
      id: 'name',
      numeric: false,
      disablePadding: true,
      label: 'Name',
    },
    {
      id: 'tag',
      numeric: true,
      disablePadding: true,
      label: 'Tag',
    },
    {
      id: 'status',
      numeric: true,
      disablePadding: true,
      label: 'Status',
    },
    {
      id: 'estimation',
      numeric: true,
      disablePadding: true,
      label: 'Estimation',
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
                    {row.title}
                  </TableCell>
                  <TableCell align='center'>{row.title}</TableCell>
                  <TableCell align='right'>{row.tag}</TableCell>
                  <TableCell align='right'>{row.activityStatus}</TableCell>
                  <TableCell align='right'>{row.estimate}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};
