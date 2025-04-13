const twilio = require('twilio');
const generateOTP = require('../utils/otpGenerator');
const db = require('../server'); // Import DB connection
require('dotenv').config(); 
// Your Twilio SID and Auth token setup
const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

let otpStore = {}; // Store OTP temporarily

exports.sendOTP = async (req, res) => {
  const { contact } = req.body;

  try {
    // Query the user based on phone number
    const [rows] = await db.promise().query("SELECT * FROM users WHERE phone_number = ?", [contact]);
    if (rows.length === 0) {
      return res.status(404).json({ message: 'User not found with this phone number' });
    }

    const otp = generateOTP(); // Generate OTP
    otpStore[contact] = { otp, expiresAt: Date.now() + 5 * 60 * 1000 }; // Store OTP for 5 minutes

    // Send OTP via Twilio
    await client.messages.create({
      body: `Your OTP for MahaTourism is: ${otp}`,
      from: process.env.TWILIO_PHONE_NUMBER,
      to: contact
    });

    return res.status(200).json({ message: 'OTP sent successfully' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Failed to send OTP' });
  }
};

exports.verifyOTP = (req, res) => {
  const { contact, otp } = req.body;
  const record = otpStore[contact];

  if (!record) return res.status(400).json({ message: 'No OTP requested' });
  if (Date.now() > record.expiresAt) return res.status(400).json({ message: 'OTP expired' });
  if (record.otp !== otp) return res.status(400).json({ message: 'Invalid OTP' });

  // OTP is valid, delete the record
  delete otpStore[contact];
  return res.status(200).json({ message: 'OTP verified! Redirecting to HomeScreen...' });
};
