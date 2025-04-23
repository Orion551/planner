console.log('✅ Backend API:', process.env.REACT_APP_PLANNER_SERVICE_BASE_URL);
export const ApiUrl = {
  plannerServiceBaseUrl: process.env.REACT_APP_PLANNER_SERVICE_BASE_URL,
  plannerConfig: '/api/v1/planner-config',
  userTags: '/api/v1/planner-config/userTags',
  activities: '/api/v1/activities',
  projects: '/api/v1/projects',
  auth: '/api/v1/auth',
  activitiesPlanner: '/api/v1/activities-planner',
  scheduleColumns: '/scheduleColumns',
};

// export const ApiUrl = {
//   plannerServiceBaseUrl: base,
//   plannerConfig: `${base}/api/v1/planner-config`,
//   userTags: `${base}/api/v1/planner-config/userTags`,
//   activities: `${base}/api/v1/activities`,
//   projects: `${base}/api/v1/projects`,
//   auth: `${base}/api/v1/auth`,
//   activitiesPlanner: `${base}/api/v1/activities-planner`,
//   scheduleColumns: `${base}/scheduleColumns`,
// };
