### NGT Challenge

See live @ https://r-ngt-660b3.web.app

### How to Setup

If you want to setup on the local machine, clone this repo, go to the folder, then execute 'npm install', after it is completed, execute 'npm start' to start application, execute 'npm test' to execute unit tests.

### Project Details

You can convert the data to JSON and upload to firebase realtime database, firebase config file is included in the project, after that data will be shown on the grid, I used ag-grid, you can filter and sort the data. I also include snapshot unit tests. I used github actions to automatically deply the project to firebase, if you want to deploy a new version to firebase, just create a new release in github and the action will trigger automatically and project will be deploy to firebase.