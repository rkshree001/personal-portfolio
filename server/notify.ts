import nodemailer from "nodemailer";

const GMAIL_USER = process.env.GMAIL_USER || "";
const GMAIL_PASS = process.env.GMAIL_PASS || "";

function createTransporter() {
  return nodemailer.createTransport({
    service: "gmail",
    auth: { user: GMAIL_USER, pass: GMAIL_PASS },
  });
}

export async function sendNotification(data: any) {
  console.log("📨 Sending email notification for contact form submission");

  if (!GMAIL_USER || !GMAIL_PASS) {
    console.warn("⚠️ GMAIL_USER or GMAIL_PASS not set — skipping email.");
    return { success: false, reason: "Email credentials not configured" };
  }

  const transporter = createTransporter();

  const ownerEmailHTML = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { background: #f0f4ff; font-family: 'Segoe UI', Arial, sans-serif; padding: 20px; }
        .wrapper { max-width: 640px; margin: auto; }
        .card { background: #fff; border-radius: 24px; overflow: hidden; box-shadow: 0 20px 60px rgba(59,130,246,0.12); }
        .header { background: linear-gradient(135deg, #3b82f6 0%, #6366f1 50%, #8b5cf6 100%); padding: 40px 32px; text-align: center; position: relative; overflow: hidden; }
        .header::before { content: ''; position: absolute; top: -40px; right: -40px; width: 180px; height: 180px; background: rgba(255,255,255,0.08); border-radius: 50%; }
        .header::after { content: ''; position: absolute; bottom: -60px; left: -30px; width: 220px; height: 220px; background: rgba(255,255,255,0.05); border-radius: 50%; }
        .badge { display: inline-block; background: rgba(255,255,255,0.2); color: #fff; font-size: 11px; font-weight: 700; letter-spacing: 1.5px; text-transform: uppercase; padding: 6px 16px; border-radius: 100px; margin-bottom: 16px; }
        .header h1 { color: #fff; font-size: 26px; font-weight: 700; margin-bottom: 8px; position: relative; z-index: 1; }
        .header p { color: rgba(255,255,255,0.85); font-size: 14px; position: relative; z-index: 1; }
        .body { padding: 36px 32px; }
        .section-label { font-size: 11px; font-weight: 700; letter-spacing: 1.5px; text-transform: uppercase; color: #6366f1; margin-bottom: 14px; }
        .info-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-bottom: 28px; }
        .info-item { background: #f8faff; border: 1px solid #e0e7ff; border-radius: 14px; padding: 16px; }
        .info-item .label { font-size: 11px; color: #94a3b8; font-weight: 600; text-transform: uppercase; letter-spacing: 0.8px; margin-bottom: 5px; }
        .info-item .value { font-size: 14px; color: #1e293b; font-weight: 600; word-break: break-word; }
        .message-box { background: linear-gradient(135deg, #f0f4ff, #faf0ff); border: 1px solid #c7d2fe; border-radius: 16px; padding: 24px; margin-bottom: 28px; }
        .message-box .msg-text { font-size: 15px; color: #334155; line-height: 1.7; white-space: pre-wrap; word-break: break-word; font-style: italic; }
        .cta-button { display: inline-block; background: linear-gradient(135deg, #3b82f6, #6366f1); color: #fff; text-decoration: none; padding: 14px 28px; border-radius: 12px; font-weight: 700; font-size: 14px; }
        .footer { background: #f8faff; border-top: 1px solid #e0e7ff; padding: 24px 32px; text-align: center; }
        .footer p { color: #94a3b8; font-size: 12px; margin-bottom: 12px; }
        .footer a { color: #6366f1; text-decoration: none; font-weight: 600; margin: 0 8px; font-size: 12px; }
      </style>
    </head>
    <body>
      <div class="wrapper">
        <div class="card">
          <div class="header">
            <div class="badge">📬 New Message</div>
            <h1>New Contact Request</h1>
            <p>Someone just reached out via your Portfolio</p>
          </div>
          <div class="body">
            <div class="section-label">Contact Details</div>
            <div class="info-grid">
              <div class="info-item">
                <div class="label">Name</div>
                <div class="value">${data.name}</div>
              </div>
              <div class="info-item">
                <div class="label">Email</div>
                <div class="value">${data.email}</div>
              </div>
              <div class="info-item" style="grid-column: span 2;">
                <div class="label">Mobile</div>
                <div class="value">${data.mobile || "Not provided"}</div>
              </div>
            </div>
            <div class="section-label">Message</div>
            <div class="message-box">
              <div class="msg-text">${data.message}</div>
            </div>
            <a href="mailto:${data.email}" class="cta-button">Reply to ${data.name}</a>
          </div>
          <div class="footer">
            <p>Sent from <strong>Shree Bhargav Portfolio</strong></p>
            <a href="https://linkedin.com/in/shree-bhargav-r-k-7b5b1419b">LinkedIn</a>
            <a href="https://github.com/rkshree001">GitHub</a>
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
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { background: #f0fdf4; font-family: 'Segoe UI', Arial, sans-serif; padding: 20px; }
        .wrapper { max-width: 640px; margin: auto; }
        .card { background: #fff; border-radius: 24px; overflow: hidden; box-shadow: 0 20px 60px rgba(16,185,129,0.12); }
        .header { background: linear-gradient(135deg, #10b981 0%, #059669 50%, #047857 100%); padding: 40px 32px; text-align: center; position: relative; overflow: hidden; }
        .header::before { content: ''; position: absolute; top: -40px; right: -40px; width: 180px; height: 180px; background: rgba(255,255,255,0.08); border-radius: 50%; }
        .badge { display: inline-block; background: rgba(255,255,255,0.2); color: #fff; font-size: 11px; font-weight: 700; letter-spacing: 1.5px; text-transform: uppercase; padding: 6px 16px; border-radius: 100px; margin-bottom: 16px; }
        .header h1 { color: #fff; font-size: 26px; font-weight: 700; margin-bottom: 8px; }
        .header p { color: rgba(255,255,255,0.85); font-size: 14px; }
        .body { padding: 36px 32px; }
        .greeting { font-size: 20px; font-weight: 700; color: #1e293b; margin-bottom: 12px; }
        .text { font-size: 15px; color: #64748b; line-height: 1.7; margin-bottom: 28px; }
        .section-label { font-size: 11px; font-weight: 700; letter-spacing: 1.5px; text-transform: uppercase; color: #10b981; margin-bottom: 14px; }
        .info-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-bottom: 28px; }
        .info-item { background: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 14px; padding: 16px; }
        .info-item .label { font-size: 11px; color: #94a3b8; font-weight: 600; text-transform: uppercase; letter-spacing: 0.8px; margin-bottom: 5px; }
        .info-item .value { font-size: 14px; color: #1e293b; font-weight: 600; word-break: break-word; }
        .message-box { background: linear-gradient(135deg, #f0fdf4, #ecfdf5); border: 1px solid #a7f3d0; border-radius: 16px; padding: 24px; margin-bottom: 28px; }
        .message-box .msg-text { font-size: 14px; color: #334155; line-height: 1.7; white-space: pre-wrap; word-break: break-word; font-style: italic; }
        .timeline { background: #f8faff; border-radius: 16px; padding: 20px 24px; margin-bottom: 24px; }
        .timeline p { font-size: 13px; color: #64748b; margin-bottom: 8px; }
        .timeline p:last-child { margin-bottom: 0; }
        .timeline strong { color: #1e293b; }
        .footer { background: #f8faff; border-top: 1px solid #e0e7ff; padding: 24px 32px; text-align: center; }
        .footer p { color: #94a3b8; font-size: 12px; margin-bottom: 12px; }
        .footer a { color: #10b981; text-decoration: none; font-weight: 600; margin: 0 8px; font-size: 12px; }
      </style>
    </head>
    <body>
      <div class="wrapper">
        <div class="card">
          <div class="header">
            <div class="badge">✅ Message Received</div>
            <h1>Thank You, ${data.name}!</h1>
            <p>Your message has been received successfully.</p>
          </div>
          <div class="body">
            <p class="greeting">Hi ${data.name},</p>
            <p class="text">Thank you for reaching out through my portfolio! I've received your message and will personally review it. I typically respond within <strong>24 hours</strong>.</p>

            <div class="section-label">Your Submitted Details</div>
            <div class="info-grid">
              <div class="info-item">
                <div class="label">Name</div>
                <div class="value">${data.name}</div>
              </div>
              <div class="info-item">
                <div class="label">Email</div>
                <div class="value">${data.email}</div>
              </div>
              <div class="info-item" style="grid-column: span 2;">
                <div class="label">Mobile</div>
                <div class="value">${data.mobile || "Not provided"}</div>
              </div>
            </div>

            <div class="section-label">Your Message</div>
            <div class="message-box">
              <div class="msg-text">${data.message}</div>
            </div>

            <div class="timeline">
              <p>📅 <strong>Expected Reply:</strong> Within 24 hours</p>
              <p>📧 <strong>Reply Email:</strong> rkshree001@gmail.com</p>
              <p>💼 <strong>LinkedIn:</strong> linkedin.com/in/shree-bhargav-r-k-7b5b1419b</p>
            </div>
          </div>
          <div class="footer">
            <p>Sent from <strong>Shree Bhargav Portfolio</strong></p>
            <a href="https://linkedin.com/in/shree-bhargav-r-k-7b5b1419b">LinkedIn</a>
            <a href="https://github.com/rkshree001">GitHub</a>
          </div>
        </div>
      </div>
    </body>
    </html>
  `;

  await transporter.sendMail({
    from: `"Shree Bhargav Portfolio" <${GMAIL_USER}>`,
    to: "rkshree001@gmail.com",
    subject: "📬 New Portfolio Contact — " + data.name,
    html: ownerEmailHTML,
  });

  await transporter.sendMail({
    from: `"Shree Bhargav" <${GMAIL_USER}>`,
    to: data.email,
    replyTo: GMAIL_USER,
    subject: "✅ Got your message! — Shree Bhargav",
    html: userEmailHTML,
  });

  console.log("✅ Contact emails sent successfully");
  return { success: true };
}

export async function sendHireMeNotification(data: any) {
  console.log("📨 Sending Hire Me notification email");

  if (!GMAIL_USER || !GMAIL_PASS) {
    console.warn("⚠️ GMAIL_USER or GMAIL_PASS not set — skipping email.");
    return { success: false, reason: "Email credentials not configured" };
  }

  const transporter = createTransporter();

  const ownerHireEmailHTML = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { background: #faf0ff; font-family: 'Segoe UI', Arial, sans-serif; padding: 20px; }
        .wrapper { max-width: 640px; margin: auto; }
        .card { background: #fff; border-radius: 24px; overflow: hidden; box-shadow: 0 20px 60px rgba(139,92,246,0.15); }
        .header { background: linear-gradient(135deg, #7c3aed 0%, #6366f1 50%, #3b82f6 100%); padding: 40px 32px; text-align: center; position: relative; overflow: hidden; }
        .header::before { content: ''; position: absolute; top: -50px; right: -50px; width: 200px; height: 200px; background: rgba(255,255,255,0.08); border-radius: 50%; }
        .header::after { content: ''; position: absolute; bottom: -70px; left: -40px; width: 240px; height: 240px; background: rgba(255,255,255,0.05); border-radius: 50%; }
        .badge { display: inline-block; background: rgba(255,255,255,0.25); color: #fff; font-size: 11px; font-weight: 700; letter-spacing: 1.5px; text-transform: uppercase; padding: 6px 16px; border-radius: 100px; margin-bottom: 16px; }
        .header h1 { color: #fff; font-size: 28px; font-weight: 700; margin-bottom: 8px; position: relative; z-index: 1; }
        .header p { color: rgba(255,255,255,0.9); font-size: 14px; position: relative; z-index: 1; }
        .body { padding: 36px 32px; }
        .priority-bar { background: linear-gradient(135deg, #7c3aed, #3b82f6); border-radius: 12px; padding: 16px 20px; margin-bottom: 28px; display: flex; align-items: center; gap: 12px; }
        .priority-bar span { color: #fff; font-size: 13px; font-weight: 600; }
        .section-label { font-size: 11px; font-weight: 700; letter-spacing: 1.5px; text-transform: uppercase; color: #7c3aed; margin-bottom: 14px; }
        .info-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-bottom: 28px; }
        .info-item { background: #faf5ff; border: 1px solid #e9d5ff; border-radius: 14px; padding: 16px; }
        .info-item .label { font-size: 11px; color: #94a3b8; font-weight: 600; text-transform: uppercase; letter-spacing: 0.8px; margin-bottom: 5px; }
        .info-item .value { font-size: 14px; color: #1e293b; font-weight: 700; word-break: break-word; }
        .project-details { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 12px; margin-bottom: 28px; }
        .detail-card { border-radius: 14px; padding: 20px 16px; text-align: center; }
        .detail-card.type { background: linear-gradient(135deg, #f0e7ff, #e9d5ff); border: 1px solid #d8b4fe; }
        .detail-card.budget { background: linear-gradient(135deg, #ecfdf5, #d1fae5); border: 1px solid #6ee7b7; }
        .detail-card.timeline { background: linear-gradient(135deg, #eff6ff, #dbeafe); border: 1px solid #93c5fd; }
        .detail-card .icon { font-size: 22px; margin-bottom: 8px; }
        .detail-card .d-label { font-size: 10px; color: #94a3b8; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 5px; }
        .detail-card .d-value { font-size: 13px; font-weight: 700; color: #1e293b; }
        .description-box { background: linear-gradient(135deg, #faf5ff, #f5f3ff); border: 1px solid #e9d5ff; border-radius: 16px; padding: 24px; margin-bottom: 28px; }
        .description-box .desc-text { font-size: 14px; color: #334155; line-height: 1.8; white-space: pre-wrap; word-break: break-word; }
        .cta-button { display: inline-block; background: linear-gradient(135deg, #7c3aed, #3b82f6); color: #fff; text-decoration: none; padding: 15px 32px; border-radius: 14px; font-weight: 700; font-size: 15px; }
        .footer { background: #faf5ff; border-top: 1px solid #e9d5ff; padding: 24px 32px; text-align: center; }
        .footer p { color: #94a3b8; font-size: 12px; margin-bottom: 12px; }
        .footer a { color: #7c3aed; text-decoration: none; font-weight: 600; margin: 0 8px; font-size: 12px; }
      </style>
    </head>
    <body>
      <div class="wrapper">
        <div class="card">
          <div class="header">
            <div class="badge">🚀 New Hire Request</div>
            <h1>Someone Wants to Hire You!</h1>
            <p>A new project inquiry has arrived via your portfolio</p>
          </div>
          <div class="body">
            <div class="priority-bar">
              <span>🔥 New opportunity — Review and respond within 24 hours</span>
            </div>

            <div class="section-label">Client Information</div>
            <div class="info-grid">
              <div class="info-item">
                <div class="label">Full Name</div>
                <div class="value">${data.name}</div>
              </div>
              <div class="info-item">
                <div class="label">Email</div>
                <div class="value">${data.email}</div>
              </div>
              <div class="info-item">
                <div class="label">Company</div>
                <div class="value">${data.company || "Not specified"}</div>
              </div>
              <div class="info-item">
                <div class="label">Mobile</div>
                <div class="value">${data.mobile || "Not provided"}</div>
              </div>
            </div>

            <div class="section-label">Project Snapshot</div>
            <div class="project-details">
              <div class="detail-card type">
                <div class="icon">📱</div>
                <div class="d-label">Project Type</div>
                <div class="d-value">${data.projectType}</div>
              </div>
              <div class="detail-card budget">
                <div class="icon">💰</div>
                <div class="d-label">Budget</div>
                <div class="d-value">${data.budget}</div>
              </div>
              <div class="detail-card timeline">
                <div class="icon">📅</div>
                <div class="d-label">Timeline</div>
                <div class="d-value">${data.timeline}</div>
              </div>
            </div>

            <div class="section-label">Project Description</div>
            <div class="description-box">
              <div class="desc-text">${data.description}</div>
            </div>

            <a href="mailto:${data.email}?subject=Re: Your Project Inquiry&body=Hi ${data.name}," class="cta-button">Reply to ${data.name} →</a>
          </div>
          <div class="footer">
            <p>Received via <strong>Shree Bhargav Portfolio — Hire Me</strong></p>
            <a href="https://linkedin.com/in/shree-bhargav-r-k-7b5b1419b">LinkedIn</a>
            <a href="https://github.com/rkshree001">GitHub</a>
          </div>
        </div>
      </div>
    </body>
    </html>
  `;

  const clientHireEmailHTML = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { background: #f0f4ff; font-family: 'Segoe UI', Arial, sans-serif; padding: 20px; }
        .wrapper { max-width: 640px; margin: auto; }
        .card { background: #fff; border-radius: 24px; overflow: hidden; box-shadow: 0 20px 60px rgba(99,102,241,0.15); }
        .header { background: linear-gradient(135deg, #6366f1 0%, #7c3aed 50%, #4f46e5 100%); padding: 44px 32px; text-align: center; position: relative; overflow: hidden; }
        .header::before { content: ''; position: absolute; top: -60px; right: -60px; width: 220px; height: 220px; background: rgba(255,255,255,0.07); border-radius: 50%; }
        .header::after { content: ''; position: absolute; bottom: -80px; left: -40px; width: 260px; height: 260px; background: rgba(255,255,255,0.04); border-radius: 50%; }
        .avatar { width: 72px; height: 72px; background: rgba(255,255,255,0.2); border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 28px; font-weight: 700; color: #fff; margin: 0 auto 16px; position: relative; z-index: 1; }
        .badge { display: inline-block; background: rgba(255,255,255,0.25); color: #fff; font-size: 11px; font-weight: 700; letter-spacing: 1.5px; text-transform: uppercase; padding: 6px 16px; border-radius: 100px; margin-bottom: 16px; }
        .header h1 { color: #fff; font-size: 26px; font-weight: 700; margin-bottom: 6px; position: relative; z-index: 1; }
        .header p { color: rgba(255,255,255,0.85); font-size: 14px; position: relative; z-index: 1; }
        .body { padding: 36px 32px; }
        .greeting { font-size: 22px; font-weight: 700; color: #1e293b; margin-bottom: 14px; }
        .text { font-size: 15px; color: #64748b; line-height: 1.8; margin-bottom: 28px; }
        .section-label { font-size: 11px; font-weight: 700; letter-spacing: 1.5px; text-transform: uppercase; color: #6366f1; margin-bottom: 14px; }
        .summary-grid { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 12px; margin-bottom: 28px; }
        .summary-card { border-radius: 16px; padding: 20px 14px; text-align: center; }
        .summary-card.type { background: linear-gradient(135deg, #f0e7ff, #ede9fe); border: 1px solid #c4b5fd; }
        .summary-card.budget { background: linear-gradient(135deg, #ecfdf5, #d1fae5); border: 1px solid #6ee7b7; }
        .summary-card.timeline { background: linear-gradient(135deg, #eff6ff, #dbeafe); border: 1px solid #93c5fd; }
        .summary-card .icon { font-size: 20px; margin-bottom: 8px; }
        .summary-card .s-label { font-size: 10px; color: #94a3b8; font-weight: 700; text-transform: uppercase; letter-spacing: 0.8px; margin-bottom: 5px; }
        .summary-card .s-value { font-size: 12px; font-weight: 700; color: #1e293b; }
        .what-next { background: linear-gradient(135deg, #f5f3ff, #eef2ff); border: 1px solid #c7d2fe; border-radius: 16px; padding: 24px; margin-bottom: 28px; }
        .step { display: flex; align-items: flex-start; gap: 12px; margin-bottom: 14px; }
        .step:last-child { margin-bottom: 0; }
        .step-num { width: 28px; height: 28px; background: linear-gradient(135deg, #6366f1, #7c3aed); border-radius: 50%; display: flex; align-items: center; justify-content: center; color: #fff; font-size: 12px; font-weight: 700; flex-shrink: 0; margin-top: 1px; }
        .step-text { font-size: 14px; color: #334155; line-height: 1.6; }
        .contact-links { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-bottom: 24px; }
        .contact-link { border-radius: 12px; padding: 14px 16px; display: flex; align-items: center; gap: 10px; text-decoration: none; border: 1px solid; }
        .contact-link.email { background: #f0f4ff; border-color: #c7d2fe; }
        .contact-link.linkedin { background: #eff6ff; border-color: #bfdbfe; }
        .contact-link-icon { font-size: 18px; }
        .contact-link-text .cl-label { font-size: 10px; color: #94a3b8; font-weight: 600; text-transform: uppercase; }
        .contact-link-text .cl-value { font-size: 12px; color: #1e293b; font-weight: 700; }
        .footer { background: #f8faff; border-top: 1px solid #e0e7ff; padding: 24px 32px; text-align: center; }
        .footer p { color: #94a3b8; font-size: 12px; margin-bottom: 12px; }
        .footer a { color: #6366f1; text-decoration: none; font-weight: 600; margin: 0 8px; font-size: 12px; }
      </style>
    </head>
    <body>
      <div class="wrapper">
        <div class="card">
          <div class="header">
            <div class="avatar">SB</div>
            <div class="badge">✅ Request Confirmed</div>
            <h1>Hire Request Received!</h1>
            <p>I'll review your project and respond within 24 hours</p>
          </div>
          <div class="body">
            <p class="greeting">Hi ${data.name},</p>
            <p class="text">
              Thank you for your interest in working with me! I've received your project inquiry and I'm genuinely excited to learn more about what you're building.
              I'll carefully review all your details and reach out with a personalized proposal or follow-up questions within <strong>24 hours</strong>.
            </p>

            <div class="section-label">Your Project Summary</div>
            <div class="summary-grid">
              <div class="summary-card type">
                <div class="icon">📱</div>
                <div class="s-label">Project Type</div>
                <div class="s-value">${data.projectType}</div>
              </div>
              <div class="summary-card budget">
                <div class="icon">💰</div>
                <div class="s-label">Budget</div>
                <div class="s-value">${data.budget}</div>
              </div>
              <div class="summary-card timeline">
                <div class="icon">📅</div>
                <div class="s-label">Timeline</div>
                <div class="s-value">${data.timeline}</div>
              </div>
            </div>

            <div class="section-label">What Happens Next?</div>
            <div class="what-next">
              <div class="step">
                <div class="step-num">1</div>
                <div class="step-text"><strong>Review</strong> — I'll review your project description and requirements in detail.</div>
              </div>
              <div class="step">
                <div class="step-num">2</div>
                <div class="step-text"><strong>Proposal</strong> — I'll prepare a customized proposal with timeline and cost breakdown.</div>
              </div>
              <div class="step">
                <div class="step-num">3</div>
                <div class="step-text"><strong>Connect</strong> — We'll schedule a call to discuss the project and align on expectations.</div>
              </div>
              <div class="step">
                <div class="step-num">4</div>
                <div class="step-text"><strong>Build</strong> — Once agreed, I'll start building your vision with regular progress updates.</div>
              </div>
            </div>

            <div class="section-label">Get in Touch</div>
            <div class="contact-links">
              <a class="contact-link email" href="mailto:rkshree001@gmail.com">
                <div class="contact-link-icon">📧</div>
                <div class="contact-link-text">
                  <div class="cl-label">Direct Email</div>
                  <div class="cl-value">rkshree001@gmail.com</div>
                </div>
              </a>
              <a class="contact-link linkedin" href="https://linkedin.com/in/shree-bhargav-r-k-7b5b1419b" target="_blank">
                <div class="contact-link-icon">💼</div>
                <div class="contact-link-text">
                  <div class="cl-label">LinkedIn</div>
                  <div class="cl-value">Shree Bhargav R K</div>
                </div>
              </a>
            </div>
          </div>
          <div class="footer">
            <p>Sent by <strong>Shree Bhargav</strong> — Android Developer & Team Lead</p>
            <a href="https://linkedin.com/in/shree-bhargav-r-k-7b5b1419b">LinkedIn</a>
            <a href="https://github.com/rkshree001">GitHub</a>
          </div>
        </div>
      </div>
    </body>
    </html>
  `;

  await transporter.sendMail({
    from: `"Shree Bhargav Portfolio" <${GMAIL_USER}>`,
    to: "rkshree001@gmail.com",
    subject: `🚀 New Hire Request — ${data.projectType} | ${data.budget} — ${data.name}`,
    html: ownerHireEmailHTML,
  });

  await transporter.sendMail({
    from: `"Shree Bhargav" <${GMAIL_USER}>`,
    to: data.email,
    replyTo: GMAIL_USER,
    subject: `✅ Hire Request Received — Let's Build Something Amazing!`,
    html: clientHireEmailHTML,
  });

  console.log("✅ Hire Me emails sent successfully");
  return { success: true };
}
