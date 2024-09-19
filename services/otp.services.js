const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASSWORD,
    },
});

// Function to send OTP
const sendOTP = async (email, otp) => {
    try {
        if (!email) {
            throw new Error('No email address provided');
        }

        // Send the email with OTP
        await transporter.sendMail({
            from: 'srushtikathiriya2003@gmail.com',  // Sender's email address
            to: email,                     // Recipient's email address
            subject: 'Your OTP Code',      // Email subject
            text: `Your OTP is ${otp}`,    // Email body (plain text)
        });

        console.log('OTP sent successfully');
        return { success: true, message: 'OTP sent successfully' };
    } catch (error) {
        console.error('Error sending OTP:', error);
        return { success: false, message: 'Error sending OTP' };
    }
};

module.exports = { sendOTP };