// server.js
const express = require('express');
const mysql = require('mysql2');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
// const fetch = require('node-fetch');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MySQL Connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Amit@12345',
  database: 'mahatourism1'
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL database');
  
  // Create users table if it doesn't exist
  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS users (
      user_id INT AUTO_INCREMENT PRIMARY KEY,
      phone_number VARCHAR(15) UNIQUE NOT NULL,
      password VARCHAR(255) NOT NULL,
      full_name VARCHAR(100),
      email VARCHAR(100),
      profile_picture VARCHAR(100) default(""),
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `;
  
  db.query(createTableQuery, (err) => {
    if (err) {
      console.error('Error creating users table:', err);
    } else {
      console.log('Users table ready');
    }
  });
});

// Login endpoint
app.post('/api/login', async (req, res) => {
  const { mobileNumber, password } = req.body;

  // Validate input
  if (!mobileNumber || !password) {
    return res.status(400).json({
      error: 'Please provide both mobile number and password'
    });
  }

  // Clean mobile number (remove spaces and special characters)
  const cleanMobileNumber = mobileNumber.replace(/[^0-9]/g, '');

  try {
    // Query to find user
    const query = 'SELECT * FROM users WHERE phone_number = ?';
    
    db.query(query, [cleanMobileNumber], async (err, results) => {
      if (err) {
        console.error('Database error:', err);
        return res.status(500).json({ error: 'Database error occurred' });
      }

      if (results.length === 0) {
        return res.status(401).json({ error: 'Invalid mobile number or password' });
      }

      const user = results[0];

      // Compare password
      const isValidPassword = await bcrypt.compare(password, user.password);

      if (!isValidPassword) {
        return res.status(401).json({ error: 'Invalid mobile number or password' });
      }

      // Generate JWT token
      const token = jwt.sign(
        { userId: user.id, mobileNumber: user.mobile_number },
        process.env.JWT_SECRET || 'your-secret-key',
        { expiresIn: '7d' }
      );

      // Return user data and token
      res.json({
        message: 'Login successful',
        user: {
          id: user.id,
          mobileNumber: user.phone_number,
          fullName: user.full_name,
          email: user.email
        },
        token
      });
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Login failed' });
  }
});

// Verify token middleware (for protected routes)
const verifyToken = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({ error: 'Access denied' });
  }

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');
    req.user = verified;
    next();
  } catch (error) {
    res.status(400).json({ error: 'Invalid token' });
  }
};

// Protected route example
app.get('/api/user/profile', verifyToken, (req, res) => {
  const query = 'SELECT id, mobile_number, full_name, email FROM users WHERE id = ?';
  
  db.query(query, [req.user.userId], (err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Database error occurred' });
    }
    
    if (results.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    res.json(results[0]);
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});