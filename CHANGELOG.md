# Changelog
### [v3.1.0] - 04-19-2025
- Attached + button at table bottom to open a custom modal. This will allow creating activities directly attached to a project;
- Re-enabled global action handler to track selected project;
- Created new form to create an activity within Projects view and enforce the belonging to a project (todo: reduce code redundancy);
- Custom styling for project activity select field
- Added new column to show which day an activity has been scheduled for, added a select field to edit anytime an activity's schedule day;
- Added the ability to sort items by clicking on headers and pagination feature, added the ability to remove a tag from an activity directly in the table;
- @fix: now tablefooter sticks to the bottom of the page;
- @fix: text wasn't truncating in ProjectItemView;
- Updated ProjectSummary to actually show consinstent data based on total activities and completed activities. Some more ui tweaks to ProjectItem component;
- UI tweaks to Activity card + scss cleanup;
- UI tweaks to TagItem and the way activity estimate shows up;
- Moved TableDataRow to external file, updated ActivityCard ui to a simpler layout. Attached activity completion state update to project's activities;
- New localized labels
- Added method to compute % of completed activities within a project;
- @fix: an activity that was attached to a project wasn't being updated in the GlobalState;
## [v3.0.0] - 03-25-2025
- Implemented Auth Layer;
- Updated rest-service to provide session credentials when performing a request;
- @fix: when a user was deleting a Tag, the change didn't propagate to projects also;
- Adjusted CREATE_ACTIVITY action reducer to update global state consistently;
- Added dotenv dependency, created 'local' build process that uses .env localhost file to connect to local backend service;
- Dynamically imported backend rest service base url, reworked some API calls;
- UI adjustments
### [v2.4.0] - 03-09-2025
- Integrated notistack dependency and wrapped around App;
- Created custom snackbars;
- @fix: http-service wasn't throwing errors but only returning them, causing the app to crash;
- Attached snackbars to app interactions.
### [v2.3.0] - 03-04-2025
- Added 'Formik' dependency to provide advanced form capabilities;
- Added 'Yup' dependency to validate data while creating an Activity or a Project;
- Added custom input fields with custom styling;
- Bug fixes to ui and logics;
### [v2.2.0] - 01-22-2025
- Created findProjectById method to retrieve a project and better display it on the UI;
- Added `<Select>` control field;
#### [v2.1.5] - 01-21-2025
- @fix: Removed useless useEffect in '<ScheduleColumn>'. It was causing a double render and was reading old data that caused the app to crash in certain conditions (e.g. deleting an activity)
- Connected the app to persistency service to update the db accordingly as a user moves an activity;
- Added new endpoint '/scheduleColumns';
#### [v2.1.4] - 01-13-2025
- @fix: Updated method to retrieve the correct number of planned activities;
#### [v2.1.3] - 01-09-2025
- @fix: Calendar widget now updates dynamically based on day and month; 
- Added new translations;
#### [v2.1.2] - 01-09-2025
- @fix: StatusView Popover wasn't opening due to missing data. Did some code cleanup and managed to persist changes;
- @fix: GlobalState updates weren't reflected correctly and the ui wasn't updating;
- @fix: Reworked ProjectsListSidebarView component to better handle the lists of projects based on their status.
#### [v2.1.1] - 01-06-2025
- @fix: Used MemoryRouter instead of Router. This way any time a user refreshes the page, the app returns to the index page (which is Schedule)
### [v2.1.0] - 01-05-2025
- Improved 'Tags' feature;
- Implemented debounce effect when creating/editing a Tag name;
- Removed unnecessary translations;
- Updated scss files regarding Tags;
- Split TagMenu in different sub-components;
- @fix: Adjusted prop exposing;
- @fix: Different fixes regarding user interaction such as delete/rename/edit;
- UI Improvements;
- Added more translations
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