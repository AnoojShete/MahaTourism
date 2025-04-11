const express = require('express');
const nodemailer = require('nodemailer');
const PDFDocument = require('pdfkit');
const fs = require('fs');
const router = express.Router();

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'mahatourismteam@gmail.com',
      pass: 'rbyw izcu uvuq hupj'
    }
});

// Helper function to generate flight ticket PDF
async function generateFlightTicketPDF(bookingDetails) {
  return new Promise((resolve, reject) => {
    try {
      const doc = new PDFDocument({ size: 'A4', margin: 50 });
      const fileName = `flight_ticket_${bookingDetails.transactionId}.pdf`;
      const filePath = `${__dirname}/../temp/${fileName}`;
      
      // Ensure temp directory exists
      if (!fs.existsSync(`${__dirname}/../temp`)) {
        fs.mkdirSync(`${__dirname}/../temp`);
      }

      const stream = fs.createWriteStream(filePath);
      doc.pipe(stream);

      // Add content to PDF
      doc.fontSize(20).text('Flight Booking Confirmation', { align: 'center' });
      doc.moveDown();
      
      // Flight details
      doc.fontSize(14).text(`Flight: ${bookingDetails.flightNumber}`, { continued: true })
         .text(`Airline: ${bookingDetails.airline}`, { align: 'right' });
      
      doc.moveDown();
      doc.text(`From: ${bookingDetails.departure}`, { continued: true })
         .text(`To: ${bookingDetails.arrival}`, { align: 'right' });
      
      doc.moveDown();
      doc.text(`Date: ${bookingDetails.date}`, { continued: true })
         .text(`Passengers: ${bookingDetails.passengers.length}`, { align: 'right' });
      
      doc.moveDown(2);
      doc.fontSize(16).text('Passenger Details', { underline: true });
      bookingDetails.passengers.forEach((passenger, index) => {
        doc.moveDown();
        doc.text(`${index + 1}. ${passenger.name} (${passenger.type})`);
      });

      doc.moveDown(2);
      doc.fontSize(16).text('Payment Details', { underline: true });
      doc.moveDown();
      doc.text(`Amount: ₹${bookingDetails.amount.toLocaleString('en-IN')}`);
      doc.text(`Transaction ID: ${bookingDetails.transactionId}`);
      doc.text(`Status: ${bookingDetails.status || 'Confirmed'}`);

      doc.moveDown(2);
      doc.fontSize(12).text('Thank you for booking with us!', { align: 'center' });
      doc.text('For any queries, contact support@mahatourism.com', { align: 'center' });

      doc.end();

      stream.on('finish', () => resolve(filePath));
      stream.on('error', reject);
    } catch (err) {
      reject(err);
    }
  });
}

// Existing package confirmation endpoint
router.post('/send-confirmation-email', async (req, res) => {
  try {
    const { to, name, bookingId, packageName, travelDate, totalPrice } = req.body;
    
    if (!to || !name || !bookingId || !packageName || !travelDate || !totalPrice) {
      return res.status(400).json({ 
        success: false, 
        message: 'Missing required fields for email' 
      });
    }
    
    const mailOptions = {
      from: 'mahatourismteam@gmail.com',
      to: to,
      subject: `Booking Confirmation - ${bookingId}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 5px;">
          <div style="text-align: center; padding: 20px 0;">
            <h1 style="color: #FF5722;">Package Booking Confirmation</h1>
          </div>
          
          <div style="padding: 20px; background-color: #f9f9f9; border-radius: 5px;">
            <p style="margin-bottom: 20px;">Dear <strong>${name}</strong>,</p>
            
            <p>Thank you for booking with us! Your travel package has been confirmed. Below are your booking details:</p>
            
            <div style="margin: 20px 0; padding: 15px; background-color: #fff; border-radius: 5px; border-left: 4px solid #FF5722;">
              <p><strong>Booking ID:</strong> ${bookingId}</p>
              <p><strong>Package:</strong> ${packageName}</p>
              <p><strong>Travel Date:</strong> ${travelDate}</p>
              <p><strong>Total Amount:</strong> ₹${totalPrice}</p>
            </div>
            
            <p>You can view your complete booking details by logging into your account on our website or mobile app.</p>
            
            <p style="margin-top: 30px;">If you have any questions or need assistance, please don't hesitate to contact our customer support team at <a href="mailto:mahatourismteam@gmail.com" style="color: #FF5722;">mahatourismteam@gmail.com</a></p>
          </div>
        </div>
      `
    };
    
    await transporter.sendMail(mailOptions);
    
    res.status(200).json({ 
      success: true, 
      message: 'Package confirmation email sent successfully' 
    });
    
  } catch (error) {
    console.error('Email sending error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to send confirmation email',
      error: error.message 
    });
  }
});

// New flight ticket endpoint
router.post('/send-flight-ticket', async (req, res) => {
  try {
    const { email, bookingDetails } = req.body;

    if (!email || !bookingDetails) {
      return res.status(400).json({ 
        success: false, 
        message: 'Email and booking details are required' 
      });
    }

    // Generate PDF
    const pdfPath = await generateFlightTicketPDF(bookingDetails);

    // Send email
    const mailOptions = {
      from: 'mahatourismteam@gmail.com',
      to: email,
      subject: `Your Flight Ticket - ${bookingDetails.flightNumber}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 5px;">
          <div style="text-align: center; padding: 20px 0;">
            <h1 style="color: #FF5722;">Flight Booking Confirmation</h1>
          </div>
          
          <div style="padding: 20px; background-color: #f9f9f9; border-radius: 5px;">
            <p>Dear Customer,</p>
            
            <p>Thank you for booking with us. Here are your flight details:</p>
            
            <div style="margin: 20px 0; padding: 15px; background-color: #fff; border-radius: 5px; border-left: 4px solid #FF5722;">
              <p><strong>Flight:</strong> ${bookingDetails.flightNumber}</p>
              <p><strong>Airline:</strong> ${bookingDetails.airline}</p>
              <p><strong>From:</strong> ${bookingDetails.departure}</p>
              <p><strong>To:</strong> ${bookingDetails.arrival}</p>
              <p><strong>Date:</strong> ${bookingDetails.date}</p>
              <p><strong>Passengers:</strong> ${bookingDetails.passengers.length}</p>
              <p><strong>Amount Paid:</strong> ₹${bookingDetails.amount.toLocaleString('en-IN')}</p>
            </div>
            
            <p>Your ticket is attached to this email. Please present it at the airport.</p>
            
            <p style="margin-top: 30px;">For any queries, contact <a href="mailto:mahatourismteam@gmail.com" style="color: #FF5722;">mahatourismteam@gmail.com</a></p>
          </div>
        </div>
      `,
      attachments: [{
        filename: `flight_ticket_${bookingDetails.transactionId}.pdf`,
        path: pdfPath
      }]
    };

    await transporter.sendMail(mailOptions);

    // Clean up
    fs.unlinkSync(pdfPath);

    res.status(200).json({ 
      success: true, 
      message: 'Flight ticket sent successfully' 
    });

  } catch (error) {
    console.error('Error sending flight ticket:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to send flight ticket',
      error: error.message 
    });
  }
});

module.exports = router;