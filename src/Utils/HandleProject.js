/**
 * TODO: Projects[] should be reworked as Map to take advantage of the easier ways of handling data
 * @param projects {Array[{}]} - Piece of State that holds the projects within the application
 * @param projectId {String} - ProjectId to be found
 */
export const findProjectById = (projects, projectId) => {
  return projects.find((project) => project.id === projectId);
};
