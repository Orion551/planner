import React from 'react';
import { TagItemView } from '@Components/Tags/TagItemView';
import { Box, Button, Stack, Typography } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import { Draggable } from '@hello-pangea/dnd';
// import { Actions } from '@Context/Actions';
import { useGlobalState } from '@Context/GlobalStateContext';
import '@Assets/styles/ticket.scss';
import { toHoursAndMinutes } from '@Utils/toHoursAndMinutes';
import { updateActivity } from '@Context/ActionHandlers/HandleActivity';
import { findProjectById } from '@Utils/HandleProject';
import { useTranslation } from 'react-i18next';
import CircleIcon from '@mui/icons-material/Circle';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useActivityModal } from '@Context/Hooks/useActivityModal';

export const ActivityCardView = ({ activityId, index }) => {
  const { state: appState, dispatch } = useGlobalState();
  const { openActivityModal } = useActivityModal();
  const [expanded, setExpanded] = React.useState(false);
  const activity = appState.activities.get(activityId);
  const { t } = useTranslation();

  const handleActivityStatusChange = async () => {
    const updatedActivity = {
      ...activity,
      completed: !activity.completed,
    };

    try {
      await dispatchUpdateActivity(updatedActivity);
    } catch (err) {
      console.error('error', err);
    }
  };

  const dispatchUpdateActivity = async (updatedActivity) => {
    await updateActivity(dispatch, updatedActivity, t);
  };

  return (
    <Draggable key={activityId} draggableId={activityId} index={index}>
      {(provided) => (
        <div {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
          <Box
            className='activity-card-wrapper'
            onDoubleClick={() => openActivityModal(activityId, null)}
          >
            <Stack direction='column'>
              <Stack direction='row' sx={{ justifyContent: 'space-between' }}>
                <IconButton name={'completed'} onClick={handleActivityStatusChange} size='small'>
                  <CircleIcon
                    sx={{
                      fontSize: '0.8rem',
                      color: (theme) =>
                        activity.completed
                          ? theme.palette.success.main
                          : theme.palette.warning.main,
                    }}
                  />
                </IconButton>
                {activity.tag && <TagItemView tagId={activity.tag} embedded={true} />}
              </Stack>
              <Stack direction='column' sx={{ marginTop: '5px' }}>
                <Typography variant='subtitle1' sx={{ lineHeight: '1.1rem' }}>
                  {activity.title}
                </Typography>
                <Typography variant='caption'>{toHoursAndMinutes(activity.estimate)}</Typography>
                {activity.project && (
                  <Typography variant='body2' sx={{ fontStyle: 'italic' }}>
                    {findProjectById(appState.projects, activity.project).projectName}
                  </Typography>
                )}
                {expanded && (
                  <Box sx={{ marginTop: '5px', marginBottom: '5px' }}>
                    <Typography variant='body2' sx={{ color: '#1E1E1E' }}>
                      {activity.description}
                    </Typography>
                  </Box>
                )}
              </Stack>
              <Button
                disabled={activity.description.length === 0}
                size='small'
                color='secondary'
                onClick={() => {
                  activity.description.length > 0 ? setExpanded(!expanded) : '';
                }}
              >
                {expanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
              </Button>
            </Stack>
          </Box>
        </div>
      )}
    </Draggable>
  );
};
