import React from 'react';
import { Box } from '@mui/material';
import { Typography, TextField } from '@mui/material';
import { useTranslation } from 'react-i18next';
// import { AttachmentWidget } from '@Components/widgets/attachment-widget';
// import Stack from '@mui/material/Stack';
import { PieChart } from '@mui/x-charts/PieChart';
import { TagItemView } from '@Components/Tags/TagItemView';
import { useGlobalState } from '@Context/GlobalStateContext';

export const ProjectSummaryView = ({ projectId, summaryData }) => {
  const { t } = useTranslation();
  const { state } = useGlobalState();
  // TODO: Improve that;
  const project = state.projects.find((p) => p.id === projectId);
  const completedActivities = project.projectActivities.filter(
    (activityId) => state.activities.get(activityId)?.completed
  ).length;
  const plannedActivities = project.projectActivities.filter(
    (activityId) => !state.activities.get(activityId)?.completed
  ).length;

  return (
    <>
      <Box display='flex' flexDirection='row'>
        <Box marginRight={3}>
          <Typography variant='body1' sx={{ fontWeight: 500, color: 'text.primary' }}>
            {t('projects.fields.tags')}
          </Typography>
        </Box>
        {summaryData.projectTags.length > 0 ? (
          <Box display='flex' flexDirection='row'>
            {summaryData.projectTags.map((tagId) => (
              <TagItemView key={tagId} tagId={tagId} />
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

      {/*<Box display='flex' flexDirection='column' marginTop={2}>*/}
      {/*  <Typography variant='body1' sx={{ fontWeight: 500, color: 'text.primary' }}>*/}
      {/*    {t('projects.fields.attachmentsField.attachments')} (*/}
      {/*    {summaryData.projectAttachments.length})*/}
      {/*  </Typography>*/}
      {/*  {summaryData.projectAttachments.length === 0 ? (*/}
      {/*    <Box marginTop={1} textAlign='center'>*/}
      {/*      <Typography variant='body2' sx={{ color: 'text.hint' }}>*/}
      {/*        {t('projects.fields.attachmentsField.no_attachments')}*/}
      {/*      </Typography>*/}
      {/*    </Box>*/}
      {/*  ) : (*/}
      {/*    <Stack direction='row' spacing={2}>*/}
      {/*      {summaryData.projectAttachments.map((attachment, idx) => (*/}
      {/*        <AttachmentWidget key={idx} attachmentData={attachment} />*/}
      {/*      ))}*/}
      {/*    </Stack>*/}
      {/*  )}*/}
      {/*</Box>*/}

      <Box display='flex' flexDirection='column' marginTop={2}>
        <Typography variant='body1' sx={{ fontWeight: 500, color: 'text.primary' }}>
          {t('projects.fields.summaryField.summary')}
        </Typography>
        {project.projectActivities.length > 0 ? (
          <PieChart
            width={450}
            height={250}
            colors={['#3FC865', '#FA9B5B']}
            series={[
              {
                data: [
                  {
                    id: 0,
                    value: completedActivities,
                    label: t('projects.fields.summaryField.completed_activities'),
                  },
                  {
                    id: 1,
                    value: plannedActivities,
                    label: t('projects.fields.summaryField.activities_to_do'),
                  },
                ],
                innerRadius: 36,
                outerRadius: 110,
                paddingAngle: 2,
                cornerRadius: 3,
                startAngle: 0,
                endAngle: 360,
                cx: 120,
                cy: 125,
              },
            ]}
          />
        ) : (
          <Box marginTop={1} textAlign='center'>
            <Typography variant='body2' sx={{ color: 'text.hint' }}>
              {t('projects.summary.nothing_to_show_so_far')}
            </Typography>
          </Box>
        )}
      </Box>
    </>
  );
};
