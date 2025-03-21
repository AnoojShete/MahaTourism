const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');
const twilio = require('twilio');
const mailgun = require('mailgun-js'); // Import Mailgun



const bcrypt = require('bcrypt'); // Ensure bcrypt is imported

const app = express();
app.use(bodyParser.json());
app.use(cors()); // Enable CORS for cross-origin requests

// Global variable for port
const PORT = process.env.PORT || 5000;

// MySQL connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Anooj@23', // Replace with your MySQL password
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
app.post('/api/login', async (req, res) => {
  const { mobileNumber, password } = req.body;


  console.log('Login attempt with data:', { mobileNumber, password });

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

      console.log('User found:', user);

      // Compare password
      const isValidPassword = await bcrypt.compare(password, user.password_hash); // Compare password


      if (!isValidPassword) {
        return res.status(401).json({ error: 'Invalid mobile number or password' });
      }

      // // Generate JWT token
      // const token = jwt.sign(
      //   { userId: user.user_id, mobileNumber: user.phone_number },
      //   process.env.JWT_SECRET || 'your-secret-key',
      //   { expiresIn: '7d' }
      // );

      // Return user data and token
      res.json({
        message: 'Login successful',
        user: {
          id: user.user_id,
          mobileNumber: user.phone_number,
          fullName: user.full_name,
          email: user.email
        },
        // token
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
  const passwordHash = await bcrypt.hash(password, 10); // Hashing the password


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

// Route to send confirmation email
app.post('/api/send-confirmation-email', (req, res) => {
    const { email, bookingDetails } = req.body; // Get email and booking details from request

sgMail.setApiKey('YOUR_SENDGRID_API_KEY'); // Replace with your SendGrid API key

// Email options
const msg = {
    to: email,
    from: 'your-email@example.com', // Your verified SendGrid email
    subject: 'Booking Confirmation',
    text: `Your booking was successful! Details: ${JSON.stringify(bookingDetails)}`,
};


    // Email options
    const mailOptions = {
        from: 'mahatourismteam@gmail.com',
        to: email,
        subject: 'Booking Confirmation',
        text: `Your booking was successful! Details: ${bookingDetails}`
    };

    // Send confirmation email
    sgMail.send(msg)
        .then(() => {
            res.status(200).json({ message: 'Confirmation email sent!' });
        })
        .catch((error) => {
            console.error('Error sending email:', error); // Log the specific error
            res.status(500).json({ message: 'Failed to send confirmation email', error: error.message });
        });

});

// Route to send confirmation code
app.post('/api/send-confirmation-code', (req, res) => {
  const { contact } = req.body; // This part can remain if you still want to send confirmation codes via SMS


  // Check if the mobile number exists in the user table
  db.query('SELECT * FROM users WHERE phone_number = ?', [contact], (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Database error' });
    }
    if (results.length === 0) {
      return res.status(404).json({ message: 'Account does not exist' });
    }

    const confirmationCode = Math.floor(100000 + Math.random() * 900000); // Generate a 6-digit code
    const expirationTime = new Date(Date.now() + 1 * 60 * 1000); // 1 minute from now

    db.query('INSERT INTO confirmation_codes (contact, code, expires_at) VALUES (?, ?, ?)', [contact, confirmationCode, expirationTime], (err) => {
      if (err) {
        return res.status(500).json({ message: 'Database error' });
      }

      // Send the confirmation code via SMS

      const client = twilio('TWILIO_ACCOUNT_SID', 'TWILIO_AUTH_TOKEN');
      client.messages.create({
        body: `Your confirmation code is: ${confirmationCode}`,
        to: contact, // User's phone number
        from: 'YOUR_TWILIO_PHONE_NUMBER'
      })
      .then(() => res.status(200).json({ message: 'Confirmation code sent!' }))
      .catch(() => res.status(500).json({ message: 'Failed to send confirmation code' }));
    });
  });
});

// flights
app.get('/api/airports', (req, res) => {
  const query = 'SELECT iata_code, name, city FROM airports';

  db.query(query, (err, results) => {
      if (err) {
          console.error('Database error:', err);
          return res.status(500).json({ error: 'Database error occurred' });
      }
      res.json(results);
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
