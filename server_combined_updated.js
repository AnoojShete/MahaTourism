const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');
const twilio = require('twilio');
const mailgun = require('mailgun-js'); // Ensure mailgun is imported
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

// Route to send confirmation email
app.post('/api/send-confirmation-email', (req, res) => {
    const { email, bookingDetails } = req.body; // Get email and booking details from request

    const mg = mailgun({ apiKey: 'e298dd8e-025a8bfd', domain: 'YOUR_MAILGUN_DOMAIN' }); // Replace with your Mailgun API key and domain

    // Email options
    const data = {
        from: 'your-email@example.com', // Your verified Mailgun email
        to: email,
        subject: 'Booking Confirmation',
        text: `Your booking was successful! Details: ${JSON.stringify(bookingDetails)}`,
    };

    // Send confirmation email
    mg.messages().send(data, (error, body) => {
        if (error) {
            console.error('Error sending email:', error); // Log the specific error
            return res.status(500).json({ message: 'Failed to send confirmation email', error: error.message });
        }
        res.status(200).json({ message: 'Confirmation email sent!' });
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
