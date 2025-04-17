import React from 'react';
import TableRow from '@mui/material/TableRow';
import { TablePagination } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import TableCell from '@mui/material/TableCell';
import { useActivityModal } from '@Context/Hooks/useActivityModal';

export const ProjectActivitiesTableFooter = ({
  totalActivities,
  page,
  rowsPerPage,
  onPageChange,
  onRowsPerPageChange,
}) => {
  const { openActivityModal } = useActivityModal();
  return (
    <TableRow>
      <TablePagination
        rowsPerPageOptions={[15, 30, 45]}
        colSpan={3}
        count={totalActivities}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={onPageChange}
        onRowsPerPageChange={onRowsPerPageChange}
        slotProps={{
          select: {
            inputProps: {
              'aria-label': 'rows per page',
            },
            native: true,
          },
        }}
      />
      <TableCell>
        <IconButton onClick={() => openActivityModal(null, 'Monday')}>
          <AddIcon />
        </IconButton>
      </TableCell>
      <TableCell>{/* New cell for scheduled day */}</TableCell>
    </TableRow>
  );
};
