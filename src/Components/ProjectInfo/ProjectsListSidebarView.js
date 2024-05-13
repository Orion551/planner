import React, { useState } from 'react';
import { List } from '@mui/material';
import { ProjectItemView } from '@Components/ProjectItem/ProjectItemView';
import { useTranslation } from 'react-i18next';

export const ProjectsListSidebarView = ({ projects, onProjectSelect }) => {
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
      <List dense={false}>
        {projects.map((project, idx) => (
          <ProjectItemView
            key={idx}
            project={project}
            isSelected={selectedProject?.projectId === project.projectId}
            onClick={() => handleProjectSelection(project)}
          />
        ))}
      </List>
    </>
  );
};
