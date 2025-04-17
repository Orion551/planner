import React from 'react';
import TableRow from '@mui/material/TableRow';
import { TablePagination } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import { useTranslation } from 'react-i18next';
import TableCell from '@mui/material/TableCell';

export const ProjectActivitiesTableFooter = ({ totalActivities }) => {
  const { t } = useTranslation();
  return (
    <TableRow>
      <TablePagination
        rowsPerPageOptions={[
          5,
          10,
          25,
          { label: t('projects.activityList.tableFooter.all'), value: -1 },
        ]}
        colSpan={3}
        count={totalActivities}
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
      <TableCell>
        <IconButton>
          <AddIcon />
        </IconButton>
      </TableCell>
    </TableRow>
  );
};
