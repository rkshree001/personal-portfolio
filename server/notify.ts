import nodemailer from "nodemailer";

const GMAIL_USER = process.env.GMAIL_USER || "";
const GMAIL_PASS = process.env.GMAIL_PASS || "";

export async function sendNotification(data: any) {
  console.log("📨 Sending email notification for contact form submission");

  if (!GMAIL_USER || !GMAIL_PASS) {
    console.warn("⚠️ GMAIL_USER or GMAIL_PASS not set — skipping email.");
    return { success: false, reason: "Email credentials not configured" };
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: GMAIL_USER,
      pass: GMAIL_PASS,
    },
  });

  const ownerEmailHTML = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <style>
        body { background:#f9fafb; margin:0; padding:0; font-family:'Segoe UI',Arial,sans-serif; }
        .container { max-width:700px; margin:auto; background:#fff; border-radius:20px; overflow:hidden; box-shadow:0 10px 25px rgba(0,0,0,0.1); }
        .header { background:linear-gradient(135deg,#6366f1,#3b82f6,#06b6d4); padding:30px; text-align:center; color:#fff; }
        .header h1 { margin:0; font-size:24px; }
        .section { padding:25px; color:#111; line-height:1.6; }
        .card { background:#f1f5f9; border-radius:12px; padding:18px; }
        .highlight { background:#fef3c7; border-left:6px solid #f59e0b; border-radius:12px; padding:18px; font-style:italic; white-space:pre-wrap; word-break:break-word; line-height:1.5; }
        .footer { background:#f9fafb; padding:20px; text-align:center; font-size:13px; color:#555; }
        .footer a { color:#2563eb; margin:0 8px; text-decoration:none; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>📬 New Contact Request</h1>
          <p style="margin-top:6px;font-size:14px;opacity:0.9;">Someone just reached out via your Portfolio 🚀</p>
        </div>
        <div class="section">
          <h2 style="color:#2563eb;font-size:18px;">👤 Contact Details</h2>
          <div class="card">
            <p><strong>Name:</strong> ${data.name}</p>
            <p><strong>Email:</strong> ${data.email}</p>
            <p><strong>Mobile:</strong> ${data.mobile || "N/A"}</p>
          </div>
          <h2 style="color:#2563eb;font-size:18px;margin-top:20px;">💬 Message</h2>
          <div class="highlight">${data.message}</div>
        </div>
        <div class="footer">
          <p>✨ Sent from <strong>Shree Bhargav Portfolio</strong></p>
          <div style="margin-top:10px;">
            <a href="https://linkedin.com/in/shree-bhargav-r-k-7b5b1419b">💼 LinkedIn</a>
          </div>
        </div>
      </div>
    </body>
    </html>
  `;

  const userEmailHTML = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <style>
        body { background:#f9fafb; margin:0; padding:0; font-family:'Segoe UI',Arial,sans-serif; }
        .container { max-width:700px; margin:auto; background:#fff; border-radius:20px; overflow:hidden; box-shadow:0 10px 25px rgba(0,0,0,0.1); }
        .header { background:linear-gradient(135deg,#10b981,#3b82f6,#06b6d4); padding:30px; text-align:center; color:#fff; }
        .header h1 { margin:0; font-size:24px; }
        .section { padding:25px; color:#111; line-height:1.6; }
        .card { background:#f1f5f9; border-radius:12px; padding:18px; }
        .highlight { background:#dcfce7; border-left:6px solid #10b981; border-radius:12px; padding:18px; font-style:italic; white-space:pre-wrap; word-break:break-word; line-height:1.5; }
        .footer { background:#f9fafb; padding:20px; text-align:center; font-size:13px; color:#555; }
        .footer a { color:#2563eb; margin:0 8px; text-decoration:none; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>🙌 Thank You for Contacting Me!</h1>
          <p style="margin-top:6px;font-size:14px;opacity:0.9;">Your message has been received. I'll get back to you soon 🚀</p>
        </div>
        <div class="section">
          <h2 style="color:#10b981;font-size:18px;">👤 Your Submitted Details</h2>
          <div class="card">
            <p><strong>Name:</strong> ${data.name}</p>
            <p><strong>Email:</strong> ${data.email}</p>
            <p><strong>Mobile:</strong> ${data.mobile || "N/A"}</p>
          </div>
          <h2 style="color:#10b981;font-size:18px;margin-top:20px;">💬 Your Message</h2>
          <div class="highlight">${data.message}</div>
        </div>
        <div class="footer">
          <p>✨ Sent from <strong>Shree Bhargav Portfolio</strong></p>
          <div style="margin-top:10px;">
            <a href="https://linkedin.com/in/shree-bhargav-r-k-7b5b1419b">💼 LinkedIn</a>
          </div>
        </div>
      </div>
    </body>
    </html>
  `;

  await transporter.sendMail({
    from: GMAIL_USER,
    to: "rkshree001@gmail.com",
    subject: "🚀 New Portfolio Contact Form Submission",
    html: ownerEmailHTML,
  });

  await transporter.sendMail({
    from: GMAIL_USER,
    to: data.email,
    replyTo: GMAIL_USER,
    subject: "✅ Thanks for reaching out!",
    html: userEmailHTML,
  });

  console.log("✅ Emails sent successfully");
  return { success: true };
}
