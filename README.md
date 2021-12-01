# Jobly
A full-stack job posting application for job seeker users to search and apply to jobs, and employers to post openings. This app is built using a React frontend and Node.js / Express.js backend. The backend repository is <a href="https://github.com/do-rh/jobly-fullstack/tree/main/jobly-backend">here</a>.

This app allows users to sign-up or login. Logged-in users can view all posted jobs, a list of all companies, and a company detail page (jobs for a specific company). Users can also edit their profile.

Authorization and authentication is handled with JSON Web Tokens (localStorage) and middleware. Users can only view certain routes, while admins have access to all routes.

A live demo of the site is <a href="http://jobgenie.surge.sh/">here</a>.
## Installation and Setup Instructions
### Server-side
Clone this repository and the backend repository.
1. `cd express-jobly`
2. `npm install`
3. `createdb jobly`
4. `createdb jobly-test`
5. `psql jobly -f seed.py`
6. `npm start`

### Server-side Tests:
1. `createdb jobly-test`
2. `npm test`

### Client-side
1. `cd jobly-frontend`
2. `npm install`
3. `npm start`


### Client-side Tests:
1. `npm test`
## Technologies Used
* React - JS Frontend Framework with create-react-app boilerplate
* Node.js - JS Backend Environment
* Express.js - JS Backend Framework for authorization, authentication and routing
* PostgreSQL Database - SQL database management system for storing job, company, and user information.

## Authors
This application was built with <a href="https://github.com/ColinSidberry/">Colin Sidberry</a>

## Acknowledgements
This frontend is deployed using a version of the backend build by Rithm School to ensure all pairs were working off of a consistent backend when building the frontend. To see my backend version, please go to https://github.com/do-rh/express-jobly/