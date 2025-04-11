import React from 'react';
import TableCell from '@mui/material/TableCell';
import { TagItemView } from '@Components/Tags/TagItemView';
import IconButton from '@mui/material/IconButton';
import CircleIcon from '@mui/icons-material/Circle';
import { toHoursAndMinutes } from '@Utils/toHoursAndMinutes';
import TableRow from '@mui/material/TableRow';

export const TableDataRow = ({ activity, onActivityStateSet }) => {
  return (
    <TableRow hover padding='checkbox' tabIndex={-1} sx={{ cursor: 'pointer' }}>
      <TableCell align='left'>{activity.title}</TableCell>
      <TableCell align='left'>
        {activity.tag !== null ? <TagItemView tagId={activity.tag} /> : ''}
      </TableCell>
      <TableCell align='center'>
        <IconButton size='small' onClick={() => onActivityStateSet(activity)}>
          <CircleIcon
            sx={{
              color: (theme) =>
                activity.completed ? theme.palette.success.main : theme.palette.warning.main,
              width: '0.7em',
              height: '0.7em',
            }}
          />
        </IconButton>
      </TableCell>
      <TableCell align='right'>{toHoursAndMinutes(activity.estimate)}</TableCell>
    </TableRow>
  );
};
