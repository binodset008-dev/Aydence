import dotenv from 'dotenv';
import path from 'path';
dotenv.config({ path: path.resolve(process.cwd(), '.env') });

const { sendAdminNotification } = require('../app/lib/email');

async function test() {
  console.log("Sending test email using Nodemailer...");
  
  const result = await sendAdminNotification({
    bookingId: "TEST-12345",
    customerName: "Test User",
    customerEmail: "testcustomer@example.com",
    courseName: "A1 New Batch",
    bookingDate: "2026-06-01",
    startTime: "17:00",
    endTime: "18:00",
    createdAt: new Date()
  });

  if (result.success) {
    console.log("✅ Email sent successfully to the admin!");
  } else {
    console.error("❌ Failed to send email:", result.error);
  }
}

test();
