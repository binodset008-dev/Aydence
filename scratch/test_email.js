const { Resend } = require('resend');
require('dotenv').config();

const resend = new Resend(process.env.RESEND_API_KEY || 're_mock_key');

async function testEmail() {
  console.log('Using API Key:', process.env.RESEND_API_KEY);
  console.log('From:', process.env.EMAIL_FROM);
  
  try {
    const result = await resend.emails.send({
      from: process.env.EMAIL_FROM || 'onboarding@resend.dev',
      to: 'jayantsinha2005@gmail.com', // Test recipient
      subject: 'Test Email from Aydence',
      html: '<p>This is a test email.</p>'
    });
    console.log('Result:', result);
  } catch (err) {
    console.error('Error sending email:', err);
  }
}

testEmail();
