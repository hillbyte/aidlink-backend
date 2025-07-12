import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

// Create reusable transporter
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: process.env.EMAIL_PORT === '465',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// Email templates
const templates = {
  donationReceived: (data) => ({
    subject: 'Donation Request Received - ClothDonate',
    html: `
      <h1>Thank You for Your Donation Request!</h1>
      <p>Dear ${data.donor_name},</p>
      <p>We have received your donation request for ${data.items_description}. We appreciate your generosity!</p>
      <p>Donation details:</p>
      <ul>
        <li>Donation type: ${data.donation_type}</li>
        <li>Condition: ${data.condition}</li>
        <li>Pickup required: ${data.pickup_required ? 'Yes' : 'No'}</li>
        ${data.pickup_required ? `<li>Pickup address: ${data.pickup_address}, ${data.pickup_city}, ${data.pickup_state} ${data.pickup_zip}</li>` : ''}
      </ul>
      <p>We will process your request and get back to you soon. If you have any questions, please contact us.</p>
      <p>Thank you,<br>ClothDonate Team</p>
    `
  }),
  volunteerRegistration: (data) => ({
    subject: 'Volunteer Registration - ClothDonate',
    html: `
      <h1>Thank You for Volunteering!</h1>
      <p>Dear ${data.name},</p>
      <p>We have received your volunteer registration. Thank you for your interest in supporting our mission!</p>
      <p>We will review your application and contact you soon to discuss next steps.</p>
      <p>Thank you,<br>ClothDonate Team</p>
    `
  }),
  contactReceived: (data) => ({
    subject: 'Contact Form Submission - ClothDonate',
    html: `
      <h1>We've Received Your Message</h1>
      <p>Dear ${data.name},</p>
      <p>Thank you for contacting us. We have received your message regarding "${data.subject}".</p>
      <p>Our team will review your inquiry and get back to you as soon as possible.</p>
      <p>Thank you,<br>ClothDonate Team</p>
    `
  })
};

// Send email function
export const sendEmail = async (to, templateName, data) => {
  try {
    const template = templates[templateName](data);
    
    const mailOptions = {
      from: process.env.EMAIL_FROM,
      to,
      subject: template.subject,
      html: template.html
    };
    
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent:', info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('Error sending email:', error);
    return { success: false, error: error.message };
  }
};
