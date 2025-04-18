import React from 'react';
import TableCell from '@mui/material/TableCell';
import { TagItemView } from '@Components/Tags/TagItemView';
import IconButton from '@mui/material/IconButton';
import CircleIcon from '@mui/icons-material/Circle';
import { toHoursAndMinutes } from '@Utils/toHoursAndMinutes';
import TableRow from '@mui/material/TableRow';
import { useActivityModal } from '@Context/Hooks/useActivityModal';
import { useGlobalState } from '@Context/GlobalStateContext';

export const TableDataRow = ({
  activity,
  scheduledDay,
  onActivityStateSet,
  onSelectedDayChange,
  onActivityTagRemove,
}) => {
  scheduledDay;
  const { openActivityModal } = useActivityModal();
  const { state: appState } = useGlobalState();

  return (
    <TableRow
      hover
      tabIndex={-1}
      sx={{ cursor: 'pointer' }}
      onDoubleClick={() => openActivityModal(activity.id, null)}
    >
      <TableCell align='left'>{activity.title}</TableCell>
      <TableCell align='left'>
        {activity.tag !== null ? (
          <TagItemView
            tagId={activity.tag}
            allowRemove={true}
            onTagRemove={() => onActivityTagRemove(activity)}
          />
        ) : (
          ''
        )}
      </TableCell>
      <TableCell align='left'>
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
      <TableCell align='left'>{toHoursAndMinutes(activity.estimate)}</TableCell>
      <TableCell align='left'>
        <select
          className='activity-schedule-select-input'
          value={scheduledDay}
          onChange={(e) => onSelectedDayChange(activity.id, e.target.value, scheduledDay)}
        >
          {appState.configData.scheduleColumns.map((column) => (
            <option key={column.id} value={column.id}>
              {column.columnId}
            </option>
          ))}
        </select>
      </TableCell>
    </TableRow>
  );
};
