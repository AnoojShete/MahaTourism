const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const rateLimit = require('express-rate-limit'); // Import rate limiting middleware
require('dotenv').config();

const app = express();
app.use(bodyParser.json());
app.use(cors()); // Enable CORS for cross-origin requests

// MySQL connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Amit@12345', // Replace with your MySQL password
    database: 'mahatourism1', // Replace with your database name
});

db.connect((err) => {
    if (err) {
        console.error('Database connection failed:', err.message);
        return;
    }
    console.log('Connected to the database.');
});

// User Authentication
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // Limit each IP to 5 login attempts per windowMs
  message: 'Too many login attempts from this IP, please try again later.'
});
app.use('/api/login', loginLimiter);

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
      const isValidPassword = await bcrypt.compare(password, user.password_hash);

      if (!isValidPassword) {
        return res.status(401).json({ error: 'Invalid mobile number or password' });
      }

      // Generate JWT token
      const token = jwt.sign(
        { userId: user.user_id, mobileNumber: user.phone_number },
        process.env.JWT_SECRET || 'your-secret-key',
        { expiresIn: '7d' }
      );

      // Return user data and token
      res.json({
        message: 'Login successful',
        user: {
          id: user.user_id,
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

// Registration endpoint
app.post('/api/register', async (req, res) => {
    const { firstName, lastName, email, password, phoneNumber } = req.body;

    // Validate input
    if (!firstName || !email || !password) {
        return res.status(400).json({ error: 'First name, email, and password are required.' });
    }

    // Hash the password
    const passwordHash = await bcrypt.hash(password, 10);

    const sql = `
        INSERT INTO users (first_name, last_name, email, password_hash, phone_number)
        VALUES (?, ?, ?, ?, ?)`;
    db.query(sql, [firstName, lastName, email, passwordHash, phoneNumber], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(201).json({ id: result.insertId, firstName, lastName, email, phoneNumber });
    });
});

// API Endpoints for Tourist Spots
// 1. Fetch all tourist spots
app.get('/api/destinations', (req, res) => {
    const sql = 'SELECT destination_id, name, description, location, category, address, open_hours, entry_fee, image_url, latitude, longitude FROM destinations';
    db.query(sql, (err, results) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            res.json(results);
        }
    });
});

// 2. Fetch a specific tourist spot by ID
app.get('/api/destinations/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'SELECT destination_id, name, description, location, category, address, open_hours, entry_fee, image_url, latitude, longitude FROM destinations WHERE destination_id = ?';
    db.query(sql, [id], (err, result) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            res.json(result);
        }
    });
});

// 3. Add a new tourist spot
app.post('/api/destinations', (req, res) => {
    const { name, description, location, category, address, open_hours, entry_fee, image_url, latitude, longitude } = req.body;
    const sql = `
        INSERT INTO destinations (name, description, location, category, address, open_hours, entry_fee, image_url, latitude, longitude)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    db.query(sql, [name, description, location, category, address, open_hours, entry_fee, image_url, latitude, longitude], (err, result) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            res.json({ id: result.insertId, name, description, location, category, address, open_hours, entry_fee, image_url, latitude, longitude });
        }
    });
});

// 4. Update a tourist spot
app.put('/api/destinations/:id', (req, res) => {
    const { id } = req.params;
    const { name, description, location, category, address, open_hours, entry_fee, image_url, latitude, longitude } = req.body;
    const sql = `
        UPDATE destinations
        SET name = ?, description = ?, location = ?, category = ?, address = ?, open_hours = ?, entry_fee = ?, image_url = ?, latitude = ?, longitude = ?
        WHERE destination_id = ?`;
    db.query(sql, [name, description, location, category, address, open_hours, entry_fee, image_url, latitude, longitude, id], (err) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            res.json({ message: 'Destination updated successfully.' });
        }
    });
});

// 5. Delete a tourist spot
app.delete('/api/destinations/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'DELETE FROM destinations WHERE destination_id = ?';
    db.query(sql, [id], (err) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            res.json({ message: 'Destination deleted successfully.' });
        }
    });
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
