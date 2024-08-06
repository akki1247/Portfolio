const nodemailer = require('nodemailer');

exports.handler = async (event, context) => {
    // Parse the body to extract the form fields
    const { name, email, subject, message } = JSON.parse(event.body);

    // Configure the email transport using your email service provider
    let transporter = nodemailer.createTransport({
        service: 'gmail', // Use your email service provider (e.g., 'gmail')
        auth: {
            user: process.env.EMAIL_USER, // Your email address
            pass: process.env.EMAIL_PASS  // Your email password
        }
    });

    // Set up email data with unicode symbols
    let mailOptions = {
        from: process.env.EMAIL_USER, // Sender address (your email)
        to: 'recipient_email@example.com', // List of recipients (your email)
        subject: `Contact Form Submission: ${subject}`, // Subject line
        text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}` // Plain text body
    };

    try {
        // Send the email
        await transporter.sendMail(mailOptions);
        return {
            statusCode: 200,
            body: JSON.stringify({ message: 'Message received!' })
        };
    } catch (error) {
        console.error('Error sending email:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Error sending message.' })
        };
    }
};
