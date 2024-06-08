import React from 'react';
import { List, ListSubheader } from '@mui/material';
import { ProjectItemView } from '@Components/ProjectItem/ProjectItemView';
import { useTranslation } from 'react-i18next';
import { useGlobalState } from '@Context/GlobalStateContext';

export const ProjectsListSidebarView = ({
  activeProjects,
  completedProjects,
  archivedProjects,
  onProjectSelect,
}) => {
  const { state: appState } = useGlobalState();
  const { t } = useTranslation();

  return (
    <>
      {activeProjects.length > 0 && (
        <List dense={false}>
          <ListSubheader>{t('projects.projectsLeftSidebar.active')}</ListSubheader>
          {activeProjects.map((project, idx) => (
            <ProjectItemView
              key={idx}
              project={project}
              isSelected={appState.selectedProject?.id === project.id}
              onClick={() => onProjectSelect(project)}
            />
          ))}
        </List>
      )}
      {completedProjects.length > 0 && (
        <List dense={false}>
          <ListSubheader>{t('projects.projectsLeftSidebar.completed')}</ListSubheader>
          {completedProjects.map((project, idx) => (
            <ProjectItemView
              key={idx}
              project={project}
              isSelected={appState.selectedProject?.id === project.id}
              onClick={() => onProjectSelect(project)}
            />
          ))}
        </List>
      )}
      {archivedProjects.length > 0 && (
        <List dense={false}>
          <ListSubheader>{t('projects.projectsLeftSidebar.archived')}</ListSubheader>
          {archivedProjects.map((project, idx) => (
            <ProjectItemView
              key={idx}
              project={project}
              isSelected={appState.selectedProject?.id === project.id}
              onClick={() => onProjectSelect(project)}
            />
          ))}
        </List>
      )}
    </>
  );
};
