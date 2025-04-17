import React from 'react';
import { List, ListSubheader } from '@mui/material';
import { ProjectItemView } from '@Components/ProjectItem/ProjectItemView';
import { useTranslation } from 'react-i18next';

/**
 * Projects List Sidebar View
 *
 * @param {Object} props
 * @param {string} selectedProject - ID of the currently selected project.
 * @param {Array} projects - List of all project objects.
 * @param {function} onProjectSelected - Function to handle project selection.
 */
export const ProjectsListSidebarView = ({ selectedProject, projects, onProjectSelected }) => {
  const { t } = useTranslation();

  // Group projects by status
  const groupedProjects = {
    active: projects.filter(
      (project) => project.projectStatus === 1 || project.projectStatus === 2
    ),
    completed: projects.filter((project) => project.projectStatus === 3),
    archived: projects.filter((project) => project.projectStatus === 4),
  };

  // Map group keys to their corresponding labels
  const groupLabels = {
    active: t('projects.projectsLeftSidebar.active'),
    completed: t('projects.projectsLeftSidebar.completed'),
    archived: t('projects.projectsLeftSidebar.archived'),
  };

  return (
    <>
      {Object.entries(groupedProjects).map(
        ([status, projectsList]) =>
          projectsList.length > 0 && (
            <List key={status} dense={false}>
              <ListSubheader>{groupLabels[status]}</ListSubheader>
              {projectsList
                .sort((a, b) => a.projectName.localeCompare(b.projectName))
                .map((project) => (
                  <ProjectItemView
                    key={project.id}
                    project={project}
                    isSelected={selectedProject === project.id}
                    onProjectSelected={onProjectSelected}
                  />
                ))}
            </List>
          )
      )}
    </>
  );
};
