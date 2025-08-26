import nodemailer from "nodemailer";

// ⛔️ DO NOT hardcode passwords here!
// Put them in your .env file instead.
const GMAIL_USER = process.env.GMAIL_USER || "yourgmail@gmail.com";
const GMAIL_PASS = process.env.GMAIL_PASS || "your-app-password"; // App Password, not normal password

export async function sendNotification(data: any) {
  console.log("📨 Sending email with data:", data);

  try {
    // Create Gmail transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: GMAIL_USER,
        pass: GMAIL_PASS,
      },
    });

    // Email details
    const mailOptions = {
      from: GMAIL_USER,
      to: "rkshree001@gmail.com", // you can change to any email
      subject: "📢 New Portfolio Notification",
      html: `<p>You got a new message:</p>
             <pre>${JSON.stringify(data, null, 2)}</pre>`,
    };

    // Send email
    const info = await transporter.sendMail(mailOptions);
    console.log("✅ Email sent:", info.response);

    return { success: true, info };
  } catch (err: any) {
    console.error("❌ Error sending email:", err);
    throw err;
  }
}
