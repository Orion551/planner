import React from 'react';
import { Box } from '@mui/material';
import { Typography, TextField } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { AttachmentWidget } from '@Components/widgets/attachment-widget';
import Stack from '@mui/material/Stack';
// import { PieChart, Pie, Tooltip } from 'recharts';

export const ProjectSummaryView = ({ summaryData }) => {
  const { t } = useTranslation();

  // const data02 = [
  //   { name: 'Group A', value: 2400 },
  //   { name: 'Group B', value: 4567 },
  //   { name: 'Group C', value: 1398 },
  //   { name: 'Group D', value: 9800 },
  //   { name: 'Group E', value: 3908 },
  //   { name: 'Group F', value: 4800 },
  // ];

  return (
    <>
      <Box display='flex' flexDirection='row'>
        <Box marginRight={3}>
          <Typography variant='body1' sx={{ fontWeight: 500, color: 'text.primary' }}>
            {t('projects.fields.tags')}
          </Typography>
        </Box>
        <Box>{summaryData.projectTags.map((tag) => tag)}</Box>
      </Box>

      <Box marginTop={2}>
        <TextField
          id='project-description'
          fullWidth
          label={t('projects.fields.descriptionField.description')}
          multiline
          rows={4}
          placeholder={
            summaryData.projectDescription === ''
              ? t('projects.fields.descriptionField.whats_that_project_about')
              : ''
          }
          value={summaryData.projectDescription !== '' ? summaryData.projectDescription : ''}
        />
      </Box>

      <Box display='flex' flexDirection='column' marginTop={2}>
        <Typography variant='body1' sx={{ fontWeight: 500, color: 'text.primary' }}>
          {t('projects.fields.attachmentsField.attachments')} (
          {summaryData.projectAttachments.length})
        </Typography>
        {summaryData.projectAttachments.length === 0 ? (
          <Box marginTop={1} textAlign='center'>
            <Typography variant='body2' sx={{ color: 'text.hint' }}>
              {t('projects.fields.attachmentsField.no_attachments')}
            </Typography>
          </Box>
        ) : (
          <Stack direction='row' spacing={2}>
            {summaryData.projectAttachments.map((attachment, idx) => (
              <AttachmentWidget key={idx} attachmentData={attachment} />
            ))}
          </Stack>
        )}
      </Box>

      <Box>
        {/* <ResponsiveContainer width='100%' height='100%'> */}
        {/* <PieChart width={400} height={400}>
          <Pie
            dataKey='value'
            data={data02}
            cx={500}
            cy={200}
            innerRadius={40}
            outerRadius={80}
            fill='#82ca9d'
          />
          <Tooltip />
        </PieChart> */}
        {/* </ResponsiveContainer> */}
      </Box>
    </>
  );
};
