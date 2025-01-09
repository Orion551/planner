import React from 'react';
// eslint-disable-next-line no-unused-vars
import { List, ListSubheader } from '@mui/material';
import { ProjectItemView } from '@Components/ProjectItem/ProjectItemView';
import { useTranslation } from 'react-i18next';
// import { useGlobalState } from '@Context/GlobalStateContext';

/**
 *
 * @param selectedProject
 * @param projects {Array[Object]} -
 */
export const ProjectsListSidebarView = ({ selectedProject, projects, onProjectSelect }) => {
  // const { state: appState, dispatch } = useGlobalState();
  // eslint-disable-next-line no-unused-vars
  const { t } = useTranslation();

  return (
    <>
      {projects.length > 0 && (
        <List dense={false}>
          {projects.map((project, idx) => (
            <ProjectItemView
              key={idx}
              project={project}
              isSelected={selectedProject === project.id}
              onClick={() => onProjectSelect(project.id)}
            />
          ))}
        </List>
      )}
      {/*{activeProjects.length > 0 && (*/}
      {/*  <List dense={false}>*/}
      {/*    <ListSubheader>{t('projects.projectsLeftSidebar.active')}</ListSubheader>*/}
      {/*    {activeProjects.map((project, idx) => (*/}
      {/*      <ProjectItemView*/}
      {/*        key={idx}*/}
      {/*        project={project}*/}
      {/*        isSelected={selectedProject === project.id}*/}
      {/*        onClick={() => onProjectSelect(project.id)}*/}
      {/*      />*/}
      {/*    ))}*/}
      {/*  </List>*/}
      {/*)}*/}
      {/*{completedProjects.length > 0 && (*/}
      {/*  <List dense={false}>*/}
      {/*    <ListSubheader>{t('projects.projectsLeftSidebar.completed')}</ListSubheader>*/}
      {/*    {completedProjects.map((project, idx) => (*/}
      {/*      <ProjectItemView*/}
      {/*        key={idx}*/}
      {/*        project={project}*/}
      {/*        isSelected={selectedProject === project.id}*/}
      {/*        onClick={() => onProjectSelect(project.id)}*/}
      {/*      />*/}
      {/*    ))}*/}
      {/*  </List>*/}
      {/*)}*/}
      {/*{archivedProjects.length > 0 && (*/}
      {/*  <List dense={false}>*/}
      {/*    <ListSubheader>{t('projects.projectsLeftSidebar.archived')}</ListSubheader>*/}
      {/*    {archivedProjects.map((project, idx) => (*/}
      {/*      <ProjectItemView*/}
      {/*        key={idx}*/}
      {/*        project={project}*/}
      {/*        isSelected={selectedProject === project.id}*/}
      {/*        onClick={() => onProjectSelect(project.id)}*/}
      {/*      />*/}
      {/*    ))}*/}
      {/*  </List>*/}
      {/*)}*/}
    </>
  );
};
