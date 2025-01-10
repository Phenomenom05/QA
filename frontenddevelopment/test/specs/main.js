const assert = require('assert');
const Sentry = require('@sentry/node');
const fs = require('fs');
const path = require('path');

const BASE_URL = process.env.BASE_URL || 'http://127.0.0.1:8080';

// Initialize Sentry
Sentry.init({
  dsn: process.env.SENTRY_DSN,
  tracesSampleRate: 1.0,
});

// Create directory for test results
const resultDir = path.resolve('./frontenddevelopment/test-results');
if (!fs.existsSync(resultDir)) {
  fs.mkdirSync(resultDir, { recursive: true });
}

// Custom reporter to log test results
const logResult = (testName, status, error) => {
  const timestamp = new Date().toISOString();
  let logEntry = `${timestamp} - ${testName}: ${status}\n`;
  if (error) {
    logEntry += `Error: ${error.message}\nStack Trace:\n${error.stack}\n\n`;
    Sentry.captureException(error); // Log error to Sentry
  }
  fs.appendFileSync(path.join(resultDir, 'results.log'), logEntry);
};

describe('Profile Creation Feature', () => {
  beforeEach(async () => {
    await browser.url(BASE_URL);
    await browser.setTimeout({ implicit: 5000 });
  });

  it('should successfully create a profile', async () => {
    try {
      await $('#username').setValue('John Doe');
      await $('#age').setValue('30');
      await $('#gender').selectByVisibleText('Male');
      await $('#location').setValue('Lagos');
      await $('#interests').setValue('Hiking, Music');

      const uploadButton = await $('#profilePicture');
      const filePath = process.env.IMAGE_PATH;
      const remoteFilePath = await browser.uploadFile(filePath);
      await uploadButton.setValue(remoteFilePath);

      await $('#submit').click();

      const successMessage = await $('#success-message').getText();
      assert.strictEqual(successMessage.trim(), 'Profile created successfully!');
      logResult('Profile Creation - Success', 'PASS');
    } catch (error) {
      logResult('Profile Creation - Success', 'FAIL', error);
      throw error;
    }
  });

  it('should display error for invalid image upload', async () => {
    try {
      await $('#username').setValue('Jane Doe');
      await $('#age').setValue('28');
      await $('#gender').selectByVisibleText('Female');
      await $('#location').setValue('Abuja');
      await $('#interests').setValue('Photography, Traveling');

      const uploadButton = await $('#profilePicture');
      const invalidFilePath = 'C:\\Users\\pheda\\Downloads\\invalid_file.txt';
      if (!fs.existsSync(invalidFilePath)) {
        fs.writeFileSync(invalidFilePath, 'This is not an image file.');
      }
      const remoteFilePath = await browser.uploadFile(invalidFilePath);
      await uploadButton.setValue(remoteFilePath);

      await $('#submit').click();

      const errorMessage = await $('#error-message').getText();
      assert.strictEqual(errorMessage.trim(), 'Invalid file format!');
      logResult('Invalid Image Upload', 'PASS');
    } catch (error) {
      logResult('Invalid Image Upload', 'FAIL', error);
      throw error;
    }
  });
});

describe('Profile Creation Feature - Missing Fields', () => {
  beforeEach(async () => {
    await browser.url(BASE_URL);
    await browser.setTimeout({ implicit: 5000 });
  });

  it('should display error for missing mandatory fields', async () => {
    try {
      await $('#submit').click();

      const errorMessage = await $('#error-message').getText();
      const expectedMessage = 'Please fill out all mandatory fields.';
      assert.strictEqual(errorMessage.trim(), expectedMessage.trim(), 'Error message does not match');
      logResult('Missing Mandatory Fields', 'PASS');
    } catch (error) {
      logResult('Missing Mandatory Fields', 'FAIL', error);
      throw error;
    }
  });
});
