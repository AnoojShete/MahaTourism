// test_email.js
const fetch = require('node-fetch');

const BASE_URL = 'http://192.168.43.124:5000/send-flight-ticket'; // Replace IP if testing on real device

const testData = {
  email: 'anoojshete01@example.com', // 🔁 Your test email here
  bookingDetails: {
    flightNumber: 'AI420',
    airline: 'Air India',
    departure: 'Mumbai (BOM)',
    arrival: 'Delhi (DEL)',
    date: '2025-04-11',
    amount: 680,
    transactionId: 'TXN_TEST_001',
    status: 'Confirmed',
    passengers: [
      { name: 'John Doe', type: 'Adult' },
      { name: 'Jane Doe', type: 'Child' }
    ]
  }
};

console.log("🧪 Starting flight ticket email test...");

(async () => {
  try {
    console.log("📨 Sending POST request to:", BASE_URL);
    console.log("📦 Payload:", JSON.stringify(testData, null, 2));

    const response = await fetch(BASE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(testData)
    });

    const result = await response.json();

    if (response.ok) {
      console.log("✅ Test Passed: Email sent successfully!");
      console.log("📝 Response:", result.message);
    } else {
      console.error("❌ Test Failed: Email sending failed.");
      console.error("📝 Response:", result.message || result.error);
    }

  } catch (err) {
    console.error("❌ Test Error: Could not connect to server.");
    console.error("📛 Error:", err.message);
  }
})();
