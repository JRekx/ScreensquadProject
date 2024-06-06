// routes/auth.js
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { SECRET } = require('../constants');
const db = require('../db'); // Import the database connection

// User login route
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const { rows } = await db.query('SELECT * FROM users WHERE email = $1', [email]);
    if (rows.length === 0) {
      console.log('User not found with email:', email); // Log if user is not found
      return res.status(400).json({ message: 'User not found' });
    }
    const user = rows[0];
    console.log('User fetched from database:', user); // Log the user fetched from the database

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.log('Password does not match for user:', email); // Log if password does not match
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    const token = jwt.sign({ id: user.user_id }, SECRET, { expiresIn: '1h' });
    const userData = { name: user.email.split('@')[0], email: user.email };
    console.log('Sending user data:', userData); // Log the user data sent to the client
    res.json({ token, user: userData });
  } catch (error) {
    console.error('Server error:', error); // Log server errors
    res.status(500).json({ message: 'Server error' });
  }
});

// User registration route
router.post('/register', async (req, res) => {
  const { email, password } = req.body;
  try {
    // Check if user already exists
    const { rows: existingUsers } = await db.query('SELECT * FROM users WHERE email = $1', [email]);
    if (existingUsers.length > 0) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert new user into the database
    const { rows: newUser } = await db.query(
      'INSERT INTO users (email, password) VALUES ($1, $2) RETURNING *',
      [email, hashedPassword]
    );

    const user = newUser[0];
    const token = jwt.sign({ id: user.user_id }, SECRET, { expiresIn: '1h' });
    const userData = { name: user.email.split('@')[0], email: user.email };

    console.log('New user created:', user); // Log the new user creation
    res.json({ token, user: userData });
  } catch (error) {
    console.error('Server error:', error); // Log server errors
    res.status(500).json({ message: 'Server error' });
  }
});

// User logout route
  router.post('/logout', (req, res) => {
  // Invalidate the token by clearing it on the client-side
  res.json({ message: 'Logged out successfully' });
});

module.exports = router;
