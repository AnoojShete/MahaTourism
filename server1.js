const express = require('express');
const mysql = require('mysql');
const router = express.Router();

// MySQL connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Amit12345',
  database: 'mahatourism1'
});

// Route to send confirmation code
router.post('/send-confirmation-code', (req, res) => {
  const { contact } = req.body;

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

      // Send the confirmation code via SMS or email
      // Example for SMS using Twilio
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

module.exports = router;
