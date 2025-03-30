/**
 * TODO: Projects[] should be reworked as Map to take advantage of the easier ways of handling data
 * @param projects {Array[{}]} - Piece of State that holds the projects within the application
 * @param projectId {String} - ProjectId to be found
 */
export const findProjectById = (projects, projectId) => {
  return projects.find((project) => project.id === projectId);
};

/**
 *
 * @param activities {Map<Object>} - The list of activities (they hold the details)
 * @param projectActivities {Array<String>} - The ids of the activities within a Project
 */
export const getProjectCompletion = (activities, projectActivities) => {
  if (projectActivities.length === 0) return 0;
  else {
    const completedActivities = projectActivities.filter(
      (activityId) => activities.get(activityId).completed
    ).length;
    return (completedActivities / projectActivities.length) * 100;
  }
};
