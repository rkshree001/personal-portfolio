import nodemailer from "nodemailer";

export async function handler(event) {
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: JSON.stringify({ success: false, error: "Method Not Allowed" }),
    };
  }

  try {
    const data = JSON.parse(event.body || "{}");

    if (!data.name || !data.email || !data.message) {
      return {
        statusCode: 400,
        body: JSON.stringify({
          success: false,
          error: "Missing required fields",
        }),
      };
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS,
      },
    });

    // ---- Owner Email ----
    const ownerEmailHTML = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width,initial-scale=1.0">
        <style>
          body { background:#f9fafb; margin:0; padding:0; font-family:'Segoe UI',Arial,sans-serif; }
          .container { max-width:700px; margin:auto; background:#fff; border-radius:20px; overflow:hidden; box-shadow:0 10px 25px rgba(0,0,0,0.1);}
          .header { background:linear-gradient(135deg,#6366f1,#3b82f6,#06b6d4); padding:30px; text-align:center; color:#fff; }
          .header h1 { margin:0; font-size:24px; }
          .section { padding:25px; color:#111; line-height:1.6; }
          .card { background:#f1f5f9; border-radius:12px; padding:18px; }
          .highlight { 
            background:#fef3c7; 
            border-left:6px solid #f59e0b; 
            border-radius:12px; 
            padding:18px; 
            font-style:italic; 
            max-height:400px; 
            overflow-y:auto; 
            white-space:pre-wrap;
            word-break:break-word;
            line-height:1.5;
          }
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
            <p>✨ Sent from <strong>Your Portfolio Contact Form</strong></p>
            <div style="margin-top:10px;">
              <a href="https://shree-bhargav-portfolio.netlify.app">🌐 Website</a> |
              <a href="https://www.linkedin.com/in/shree-bhargav-r-k-7b5b1419b">💼 LinkedIn</a> |
              <a href="https://www.instagram.com/_.the_.dance_.freakzz">📸 Instagram</a>
            </div>
          </div>
        </div>
      </body>
      </html>
    `;

    // ---- User Email (Same layout but different header color/content) ----
    const userEmailHTML = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width,initial-scale=1.0">
        <style>
          body { background:#f9fafb; margin:0; padding:0; font-family:'Segoe UI',Arial,sans-serif; }
          .container { max-width:700px; margin:auto; background:#fff; border-radius:20px; overflow:hidden; box-shadow:0 10px 25px rgba(0,0,0,0.1);}
          .header { background:linear-gradient(135deg,#10b981,#3b82f6,#06b6d4); padding:30px; text-align:center; color:#fff; }
          .header h1 { margin:0; font-size:24px; }
          .header p { margin-top:6px; font-size:14px; opacity:0.9; }
          .section { padding:25px; color:#111; line-height:1.6; }
          .card { background:#f1f5f9; border-radius:12px; padding:18px; }
          .highlight { 
            background:#dcfce7; 
            border-left:6px solid #10b981; 
            border-radius:12px; 
            padding:18px; 
            font-style:italic; 
            max-height:400px; 
            overflow-y:auto; 
            white-space:pre-wrap;
            word-break:break-word;
            line-height:1.5;
          }
          .footer { background:#f9fafb; padding:20px; text-align:center; font-size:13px; color:#555; }
          .footer a { color:#2563eb; margin:0 8px; text-decoration:none; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🙌 Thank You for Contacting Me!</h1>
            <p>Your message has been received. We'll get back to you soon 🚀</p>
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
              <a href="https://shree-bhargav-portfolio.netlify.app">🌐 Website</a> |
              <a href="https://www.linkedin.com/in/shree-bhargav-r-k-7b5b1419b">💼 LinkedIn</a> |
              <a href="https://www.instagram.com/_.the_.dance_.freakzz">📸 Instagram</a>
            </div>
          </div>
        </div>
      </body>
      </html>
    `;

    // Send Owner Email
    await transporter.sendMail({
      from: process.env.GMAIL_USER,
      to: "rkshree001@gmail.com",
      subject: "🚀 New Portfolio Contact Form Submission",
      html: ownerEmailHTML,
    });

    // Send User Email
    await transporter.sendMail({
      from: process.env.GMAIL_USER,
      to: data.email,
      replyTo: process.env.GMAIL_USER,
      subject: "✅ Thanks for reaching out!",
      html: userEmailHTML,
    });

    return { statusCode: 200, body: JSON.stringify({ success: true }) };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ success: false, error: err.message }),
    };
  }
}
