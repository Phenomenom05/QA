const request = require('supertest');
const express = require('../server'); // Adjust to the correct path of your backend code

describe('Backend API Tests', () => {
    let server;

    beforeAll(() => {
        server = express.listen(3000); // Start the server
    });

    afterAll(() => {
        server.close(); // Stop the server
    });

    test('Successful profile creation with valid inputs', async () => {
        const response = await request(server).post('/profile').send({
            username: 'JohnDoe',
            age: 25,
            gender: 'Male',
            location: 'Lagos',
            interests: 'Hiking',
            password: 'password123'
        });

        expect(response.status).toBe(201);
        expect(response.body.message).toBe('Profile created successfully!');
    });

    test('Error for missing fields in profile creation', async () => {
        const response = await request(server).post('/profile').send({
            username: 'JaneDoe',
            age: 30,
            gender: 'Female'
        });

        expect(response.status).toBe(400);
        expect(response.body.message).toBe('All fields are required!');
    });

    test('Successful login with valid credentials', async () => {
        await request(server).post('/profile').send({
            username: 'JaneDoe',
            age: 30,
            gender: 'Female',
            location: 'Abuja',
            interests: 'Photography',
            password: 'securepass'
        });

        const response = await request(server).post('/login').send({
            username: 'JaneDoe',
            password: 'securepass'
        });

        expect(response.status).toBe(200);
        expect(response.body.message).toBe('Login successful!');
    });

    test('Error for invalid login credentials', async () => {
        const response = await request(server).post('/login').send({
            username: 'UnknownUser',
            password: 'wrongpass'
        });

        expect(response.status).toBe(401);
        expect(response.body.message).toBe('Invalid username or password!');
    });
});
