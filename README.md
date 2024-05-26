# Project Planner

At its core, Project Planner is a comprehensive planner designed to empower users to organize their tasks, projects, and activities in a way that (in my opinion, and need) reflects their unique workflows and needs. From managing daily to-do lists to overseeing long-term projects, the app promises to be a versatile companion for anyone seeking to boost their productivity. <br />
Project Planner will be built on a foundation of Oracle for database management and CloudFlare for frontend deployment. At the heart of it all lies React, the frontend technology of choice that promises not only to power the app but also to serve as a vehicle for learning and growth.

# Getting started
- Use `node@18` or later version;
- `npm i` to install all required dependencies;

# Run the Project
1. `npm run debug` - Builds the App and runs it into the browser;
2. `npm run build-dev` - Makes a development build, ready to be deployed.

# Changelog
## [v1.2.0] - 5-26-2024
- Deleted unused file
- Added `<StatusView>` component in `<ProjectActivitiesView>` to report activitie' status; Decided to use `brief` mode;
## [v1.1.0] - 5-26-2024
- Exported available contexts for <StatusView> in own Constants file
- Improved <ProjectItemView> ui; 
- Added <CircularProgress> to report the completion state of a project
### [v1.0.1] - 5-25-2024
- @fix: Newly created activities have `undefined` state;
## [v1.0.0] - 5-25-2024
- Bumped app to v1.0.0 - All basic functionalities have been introduced;