const request = require('supertest');
const express = require('../server'); // Adjust to your backend code path
const Sentry = require('@sentry/node');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

// Initialize Sentry
Sentry.init({
  dsn: process.env.SENTRY_DSN,
  tracesSampleRate: 1.0,
});

// Create directory for coverage logs
const coverageDir = path.resolve('./backend-test-automation/coverage');
if (!fs.existsSync(coverageDir)) {
  fs.mkdirSync(coverageDir, { recursive: true });
}

// Helper for error logging
const logError = (testName, error) => {
  const timestamp = new Date().toISOString();
  const logEntry = `${timestamp} - ${testName} FAILED: ${error.message}\n\n`;
  fs.appendFileSync(path.join(coverageDir, 'errors.log'), logEntry);
  Sentry.captureException(error);
};

describe('Backend API Tests', () => {
  let server;

  beforeAll(() => {
    server = express.listen(3000);
  });

  afterAll(() => {
    server.close();
  });

  test('Successful profile creation with valid inputs', async () => {
    try {
      const response = await request(server).post('/profile').send({
        username: 'JohnDoe',
        age: 25,
        gender: 'Male',
        location: 'Lagos',
        interests: 'Hiking',
        password: 'password123',
      });

      expect(response.status).toBe(201);
      expect(response.body.message).toBe('Profile created successfully!');
    } catch (error) {
      logError('Profile Creation - Valid Inputs', error);
      throw error;
    }
  });

  test('Error for missing fields in profile creation', async () => {
    try {
      const response = await request(server).post('/profile').send({
        username: 'JaneDoe',
        age: 30,
        gender: 'Female',
      });

      expect(response.status).toBe(400);
      expect(response.body.message).toBe('All fields are required!');
    } catch (error) {
      logError('Profile Creation - Missing Fields', error);
      throw error;
    }
  });

  test('Successful login with valid credentials', async () => {
    try {
      await request(server).post('/profile').send({
        username: 'JaneDoe',
        age: 30,
        gender: 'Female',
        location: 'Abuja',
        interests: 'Photography',
        password: 'securepass',
      });

      const response = await request(server).post('/login').send({
        username: 'JaneDoe',
        password: 'securepass',
      });

      expect(response.status).toBe(200);
      expect(response.body.message).toBe('Login successful!');
    } catch (error) {
      logError('Login - Valid Credentials', error);
      throw error;
    }
  });

  test('Error for invalid login credentials', async () => {
    try {
      const response = await request(server).post('/login').send({
        username: 'UnknownUser',
        password: 'wrongpass',
      });

      expect(response.status).toBe(401);
      expect(response.body.message).toBe('Invalid username or password!');
    } catch (error) {
      logError('Login - Invalid Credentials', error);
      throw error;
    }
  });
});
