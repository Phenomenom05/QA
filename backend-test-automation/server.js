const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

const users = [];

// Endpoint: Profile Creation
app.post('/profile', (req, res) => {
    const { username, age, gender, location, interests, password } = req.body;

    if (!username || !age || !gender || !location || !interests || !password) {
        return res.status(400).json({ message: 'All fields are required!' });
    }

    users.push({ username, password });
    return res.status(201).json({ message: 'Profile created successfully!' });
});

// Endpoint: Login
app.post('/login', (req, res) => {
    const { username, password } = req.body;

    const user = users.find((u) => u.username === username && u.password === password);
    if (!user) {
        return res.status(401).json({ message: 'Invalid username or password!' });
    }

    return res.status(200).json({ message: 'Login successful!' });
});

// Only start the server if this file is run directly
if (require.main === module) {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
}

module.exports = app; // Export the app instance