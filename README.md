Matchify QA Automation

Project Title:

Automating Testing for a Dating App - "Matchify"

Description:

The Matchify app is a fictitious dating platform that connects users based on their interests, preferences, and location. This project automates the testing of both frontend and backend features of the app. The tests cover scenarios for profile creation, login functionality, error handling, and integration with a CI/CD pipeline.

Scope:

The goal of this project is to ensure the quality and reliability of the Matchify app by:

Automating frontend and backend tests.

Integrating tests into a CI/CD pipeline for continuous testing.

Monitoring errors using Sentry.

Key Features:

Profile creation with valid inputs and error handling.

Image upload functionality with validation.

Backend API testing for profile creation and login.

Integration of test automation with a CI/CD pipeline using GitHub Actions.

Error tracking with Sentry for failed test cases.

Setup Instructions:

Prerequisites:

Ensure the following tools are installed before proceeding:

Node.js (v23 or above)

NPM (Node Package Manager)

Chrome and ChromeDriver (ensure version compatibility)

Git (to clone the repository)

1. Clone the Repository:

git clone https://github.com/Phenomenom05/QA.git
cd QA

2. Install Dependencies:

Install the required dependencies for both frontend and backend testing:

npm install

This will install all necessary dependencies, including WebDriverIO, Jest, and other packages.

3. Frontend Tests (WebDriverIO):

Step 1: Start the Frontend Server

cd frontenddevelopment
http-server

Leave this terminal running.

Step 2: Run Frontend Tests

Open a second terminal:

cd frontenddevelopment
npx wdio wdio.conf.js

Step 3: Navigate Back

After completing the frontend tests:

cd ..

4. Backend Tests (Jest):

Navigate to the backend directory:

cd backend-test-automation
npm test

This validates the profile creation, login, and error-handling API endpoints.

5. CI/CD Pipeline (GitHub Actions):

The CI/CD pipeline is configured in .github/workflows/ci.yml.

To Trigger the Pipeline:

Push changes to the main branch or create a pull request:

git push origin main

Check the GitHub Actions tab for results.

Tools Used:

WebDriverIO: For frontend web automation testing.

Jest: For backend API testing.

Postman: For manual API testing during development.

GitHub Actions: For CI/CD.

Sentry: For error tracking.

Tasks Accomplished:

Task 1: Frontend Test Automation

Profile Creation: Automated tests to verify successful profile creation, including mandatory fields (Name, Age, Gender, Location, Interests) and profile picture upload.

Error Handling: Validated error handling for invalid image uploads and missing fields.

Task 2: Backend Test Automation

API Testing: Automated API tests using Jest to validate profile creation and login features.

Test Cases: Covered successful profile creation, error handling for missing fields, and login scenarios.

Task 3: CI/CD Integration

GitHub Actions: Configured workflows to automatically run tests on code changes.

Task 4: Error Monitoring

Integrated Sentry to log test case name, timestamp, and error details.

Known Issues / Limitations:

ChromeDriver Compatibility: Ensure matching versions of Chrome and ChromeDriver.

CI/CD Delays: Pipeline execution time may vary based on test size.

Conclusion:

This project demonstrates automation of both frontend and backend tests, CI/CD integration, and effective error monitoring. Challenges encountered were resolved to ensure test reliability and maintainability.

