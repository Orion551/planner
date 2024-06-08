import React, { useState } from 'react';
import { List, ListSubheader } from '@mui/material';
import { ProjectItemView } from '@Components/ProjectItem/ProjectItemView';
import { useTranslation } from 'react-i18next';

export const ProjectsListSidebarView = ({
  activeProjects,
  completedProjects,
  archivedProjects,
  onProjectSelect,
}) => {
  const { t } = useTranslation();
  t;
  const [selectedProject, setSelectedProject] = useState(null);

  /**
   * @param {String} project - The ID of the project.
   */
  const handleProjectSelection = (project) =>
    selectedProject !== null && project.projectId === selectedProject.projectId
      ? (setSelectedProject(null), onProjectSelect(null))
      : (setSelectedProject(project), onProjectSelect(project));
  return (
    <>
      {activeProjects.length > 0 && (
        <List dense={false}>
          <ListSubheader>{t('projects.projectsLeftSidebar.active')}</ListSubheader>
          {activeProjects.map((project, idx) => (
            <ProjectItemView
              key={idx}
              project={project}
              isSelected={selectedProject?.id === project.id}
              onClick={() => handleProjectSelection(project)}
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
              isSelected={selectedProject?.projectId === project.projectId}
              onClick={() => handleProjectSelection(project)}
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
              isSelected={selectedProject?.projectId === project.projectId}
              onClick={() => handleProjectSelection(project)}
            />
          ))}
        </List>
      )}
    </>
  );
};
