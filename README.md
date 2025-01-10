Matchify QA Automation

Project Title:

Automating Testing for Matchify Dating App

Description:

The Matchify app is a fictitious dating platform that connects users based on their interests, preferences, and location. This project automates the testing of both frontend and backend features of the app. The tests cover scenarios for profile creation, login functionality, error handling, and integration with a CI/CD pipeline.

Scope:

The goal of this project is to ensure the quality and reliability of the Matchify app by:

Automating frontend and backend tests.

Integrating tests into a CI/CD pipeline for continuous testing.

Monitoring errors.

Key Features:

Profile creation with valid inputs and error handling.

Image upload functionality with validation.

Backend API testing for profile creation and login.

Integration of test automation with a CI/CD pipeline using GitHub Actions.

Error tracking with Sentry for failed test cases.

Setup Instructions:

Prerequisites:

Before setting up the environment, ensure you have the following installed:

Node.js (version 23)

NPM (Node Package Manager)

Chrome and ChromeDriver (ensure version compatibility)

Git (to clone the repository)

Step 1: Clone the Repository

git clone https://github.com/Phenomenom05/QA.git
cd QA

Step 2: Install Dependencies

npm install

This will install all necessary dependencies, including WebDriverIO, Jest, and other packages.

Step 3: Frontend Tests (WebDriverIO)

Start the Frontend Server

Open a terminal and navigate to the frontenddevelopment directory:

cd frontenddevelopment

Start the frontend server using http-server:

http-server

Leave this terminal running the server.

Run Frontend Tests

Open a second terminal and navigate to the frontenddevelopment directory:

cd frontenddevelopment

Run the frontend tests using WebDriverIO:

npx wdio wdio.conf.js

Navigate back to the main directory:

cd ..

Step 4: Backend Tests (Jest)

Navigate to the backend-test-automation directory:

cd backend-test-automation

Run the Jest test suite:

npm test

This will validate the profile creation, login, and error-handling API endpoints.

Step 5: CI/CD Pipeline (GitHub Actions)

The CI/CD pipeline is configured in the .github/workflows/ci.yml file. It automatically runs the tests whenever changes are pushed to the repository.

To trigger the CI/CD pipeline:

Push changes to the main branch or create a pull request:

git push origin main

Check the GitHub Actions tab to view the test results.

Tools Used:

WebDriverIO: For frontend web automation testing.

Appium: For mobile test automation (if applicable).

Jest: For backend API testing.

Supertest: For additional API testing (if applicable).

Postman: Used for manual API testing during development.

GitHub Actions: For continuous integration and delivery (CI/CD).

Sentry: For error tracking and monitoring in the test automation framework.

Tasks Accomplished:

Task 1: Frontend Test Automation

Profile Creation: Automated tests to verify successful profile creation, including mandatory fields (Name, Age, Gender, Location, Interests) and profile picture upload.

Error Handling: Implemented error handling for invalid image uploads and missing mandatory fields.

Challenge: Overcame the issue of submitting the form without filling in the fields by modifying the HTML to remove the 'required' attribute in input tags.

Task 2: Backend Test Automation

API Testing: Automated API tests using Jest to validate profile creation and login features.

Scenarios Tested:

Successful profile creation.

Error handling for missing fields.

Successful/failed login attempts.

Challenge: Ensured all edge cases were handled and tested thoroughly.

Task 3: CI/CD Integration

GitHub Actions: Integrated frontend and backend tests into the CI/CD pipeline. Configured workflows to automatically run tests on code changes and pull requests.

Challenge: Encountered issues with version compatibility between Chrome and ChromeDriver and ensuring the correct dependencies were installed.

Task 4: Error Monitoring

Sentry Integration: Integrated Sentry into the test automation framework to capture and log errors during test execution. Configured test logs to include relevant information such as test name, timestamp, and error details.

Challenge: Ensured that all error details were accurately logged and displayed in the Sentry dashboard.

Known Issues / Limitations:

Chrome and ChromeDriver Compatibility: Ensure that the correct versions of Chrome and ChromeDriver are used to avoid compatibility issues in the tests.

Mobile Testing: Some mobile tests may require additional configuration in Appium (if applicable).

CI/CD Environment: There might be some delays in the CI/CD pipeline execution depending on the number of tests and the size of the repository.

Conclusion:

This project demonstrates how to automate both frontend and backend tests for a dating app, integrate the tests into a CI/CD pipeline, and monitor errors effectively. It also highlights key challenges and how they were addressed, ensuring that the tests are reliable and maintainable.
