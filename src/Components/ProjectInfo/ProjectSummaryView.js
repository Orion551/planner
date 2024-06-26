import React from 'react';
import { Box } from '@mui/material';
import { Typography, TextField } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { AttachmentWidget } from '@Components/widgets/attachment-widget';
import Stack from '@mui/material/Stack';
import { PieChart } from '@mui/x-charts/PieChart';
import { TagElementView } from '@Components/Tags/TagElement.view';
import { findTagById, findTagColorCode } from '@Utils/TagUtilities';
import { useGlobalState } from '@Context/GlobalStateContext';

export const ProjectSummaryView = ({ summaryData }) => {
  const { t } = useTranslation();
  const { state: appState } = useGlobalState();

  return (
    <>
      <Box display='flex' flexDirection='row'>
        <Box marginRight={3}>
          <Typography variant='body1' sx={{ fontWeight: 500, color: 'text.primary' }}>
            {t('projects.fields.tags')}
          </Typography>
        </Box>
        {summaryData.projectTags !== null ? (
          <Box display='flex' flexDirection='row'>
            {summaryData.projectTags.map((tagId) => (
              <TagElementView
                key={tagId}
                tagName={findTagById(appState.configData.userTags, tagId).tagName}
                tagColor={findTagColorCode(
                  appState.configData.tagsPalette,
                  findTagById(appState.configData.userTags, tagId).tagColorId
                )}
              />
            ))}
          </Box>
        ) : (
          ''
        )}
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

      <Box display='flex' flexDirection='column' marginTop={2}>
        <Typography variant='body1' sx={{ fontWeight: 500, color: 'text.primary' }}>
          {t('projects.fields.summaryField.summary')}
        </Typography>
        <PieChart
          width={450}
          height={250}
          colors={['#3FC865', '#B172F7', '#FA9B5B']}
          series={[
            {
              data: [
                {
                  id: 0,
                  value: 10,
                  label: t('projects.fields.summaryField.completed_activities'),
                },
                {
                  id: 1,
                  value: 5,
                  label: t('projects.fields.summaryField.activities_in_progress'),
                },
                { id: 2, value: 30, label: t('projects.fields.summaryField.activities_to_do') },
              ],
              innerRadius: 36,
              outerRadius: 110,
              paddingAngle: 2,
              cornerRadius: 3,
              startAngle: 0,
              endAngle: 360,
              cx: 120, // Adjust the cx as needed
              cy: 125, // Adjust the cy as needed
            },
          ]}
        />
      </Box>
    </>
  );
};
