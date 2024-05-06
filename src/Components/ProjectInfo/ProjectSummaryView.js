import React from 'react';
import { Box } from '@mui/material';
import { Typography, TextField } from '@mui/material';
import { useTranslation } from 'react-i18next';

export const ProjectSummaryView = ({ summaryData }) => {
  const { t } = useTranslation();
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
        <Box marginTop={1} textAlign='center'>
          <Typography variant='body2' sx={{ color: 'text.hint' }}>
            {t('projects.fields.attachmentsField.no_attachments')}
          </Typography>
        </Box>
      </Box>
    </>
  );
};
