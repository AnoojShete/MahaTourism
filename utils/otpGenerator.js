function generateOTP(length = 6) {
    let otp = '';
    const characters = '0123456789'; // OTP will consist of digits only
    for (let i = 0; i < length; i++) {
      otp += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return otp;
  }
  
  module.exports = generateOTP;
  