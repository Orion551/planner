import React from 'react';
import { TagItem } from './TagItem';
import { ActivityTracker } from './ActivityTracker';
import { Typography } from '@mui/material';
import styled from 'styled-components';
import IconButton from '@mui/material/IconButton';
import ZoomOutMapIcon from '@mui/icons-material/ZoomOutMap';
import TimerIcon from '@mui/icons-material/Timer';
import FolderIcon from '@mui/icons-material/Folder';
import { Draggable } from '@hello-pangea/dnd';

import '../Assets/styles/ticket.scss';

export const CustomIcon = styled(ZoomOutMapIcon)`
  width: 15px !important;
  height: 15px !important;
  border-radius: 10px !important;
  color: #1e1e1e !important;
`;

export class Ticket extends React.Component {
  task = this.props.task;
  index = this.props.index;

  render() {
    return (
      <>
        <Draggable key={this.task.id} draggableId={this.task.id} index={this.index}>
          {(provided) => (
            <div {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
              <div className='ticket-card-wrapper'>
                <div className='ticket-card-header'>
                  <TagItem tag={this.task.tag} />
                  <IconButton>
                    <CustomIcon />
                  </IconButton>
                </div>

                <div>
                  <Typography variant='subtitle1'>
                    <span>
                      <span>{this.task.title}</span>
                    </span>
                  </Typography>

                  {this.task.project !== '' ? (
                    <div className='ticket-card-prj'>
                      <FolderIcon />
                      <Typography variant='subtitle2'>{this.task.project}</Typography>
                    </div>
                  ) : (
                    ''
                  )}
                  <div className='ticket-card-est'>
                    <TimerIcon />

                    <Typography variant='subtitle2'>{this.task.estimate}</Typography>
                  </div>

                  {this.task.completed ? (
                    <div className='ticket-card-completed-badge'>
                      <Typography variant='subtitle2'>Completed</Typography>
                    </div>
                  ) : (
                    <div className='ticket-card-activity-tracker'>
                      <ActivityTracker />
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </Draggable>
      </>
    );
  }
}
