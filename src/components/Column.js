import React from 'react';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import { ActivityCardView } from '@Components//ActivityCard/ActivityCard.view';
import { NoActivitiesLabel } from '@Utils/NoActivitiesLabel';
import { Typography } from '@mui/material';
import { Droppable } from '@hello-pangea/dnd';

export const HeaderCustomText = {
  fontWeight: 600,
};

export class Column extends React.Component {
  isCurrentDay = this.props.day === this.props.currentDay ? 'current-day' : '';

  render() {
    return (
      <>
        <div className={`schedule-day-item ${this.props.day} ${this.isCurrentDay}`}>
          <div className='schedule-item-header'>
            <div className='schedule-item-header-info'>
              <div className={`schedule-item-name ${this.props.day}-schedule-item-name`}>
                <Typography variant='body1'>
                  <span style={HeaderCustomText}>{this.props.day}</span>
                </Typography>
              </div>

              <div className={`tasks-counter ${this.props.day}-tasks-counter`}>
                <Typography variant='body1'>
                  <span style={HeaderCustomText}>{this.props.tasks.length}</span>
                </Typography>
              </div>
            </div>

            <IconButton className={`schedule-new-task ${this.props.day}`}>
              <AddIcon />
            </IconButton>
          </div>

          <Droppable droppableId={this.props.column.id}>
            {(provided) => (
              <div ref={provided.innerRef} {...provided.droppableProps}>
                {this.props.tasks.length > 0 ? (
                  this.props.tasks.map((task, index) => (
                    <ActivityCardView key={task.id} task={task} index={index} />
                  ))
                ) : (
                  <NoActivitiesLabel currentDay={this.props.day} />
                )}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </div>
      </>
    );
  }
}
