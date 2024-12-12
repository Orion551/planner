# Changelog
## [v2.0.0] - 12-12-2024
### Breaking change
- Parsed data in Map() instead of plain array of objects;
- @fix: Activity data fetching;
- @fix: ActivityModal -> activityForm reworked;
- @fix: (ActivityModal) Reworked local state object to handle edit/create mode with new procedure to fetch an activity from globalState;
- @fix: (ActivityModal) Inputs now attach to consistent data and trigger state updates;
- @fix: ActivityPlanGroup now gets consistent data for new activities or ones that need editing;
- @fix: ACTIVITY_CREATE rework;
- @fix: ACTIVITY_UPDATE rework;
- @fix: ACTIVITY_DELETE rework;
### [v1.3.5] - 5-31-2024
- Migrated GlobalState reducer in own file. ActionCreators and ActionTypes have moved too;
- Completely refactored the way components dispatch events to the State;
### [v1.3.4] - 5-28-2024
- @fix: tags stopped working on <ActivityCard>;
### [v1.3.3] - 5-28-2024
- Added support for <TagElementView> in <ProjectActivitiesView>;
- @fix: tags container now take width based on content;
- Added rightMargin to tags;
### [v1.3.2] - 5-28-2024
- Created TagUtilities file of functions that handles a set of utilities to retrieve tags;
- Displayed `<TagElementView>` in `<ProjectSummaryView>`;
### [v1.3.1] - 5-27-2024
- @fix: Issue related to `Tags` assigned to a Project. If a Project had 0 tags, the app would crash;
## [v1.3.0] - 5-26-2024
- Created `toHoursAndMinutes` function that converts time (in minutes) to `hh:mm` format;
- Applied `toHoursAndMinutes` function to `<ActivityCard>`;
- Applied `toHoursAndMinutes` to `<ProjectActivitiesView>` either;
## [v1.2.0] - 5-26-2024
- Deleted unused file;
- Added `<StatusView>` component in `<ProjectActivitiesView>` to report activitie' status; Decided to use `brief` mode;
## [v1.1.0] - 5-26-2024
- Exported available contexts for <StatusView> in own Constants file;
- Improved <ProjectItemView> ui;
- Added <CircularProgress> to report the completion state of a project;
### [v1.0.1] - 5-25-2024
- @fix: Newly created activities have `undefined` state;
## [v1.0.0] - 5-25-2024
- Bumped app to v1.0.0 - All basic functionalities have been introduced;