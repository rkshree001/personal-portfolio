import nodemailer from "nodemailer";

const GMAIL_USER = process.env.GMAIL_USER || "";
const GMAIL_PASS = process.env.GMAIL_PASS || "";

function createTransporter() {
  return nodemailer.createTransport({
    service: "gmail",
    auth: { user: GMAIL_USER, pass: GMAIL_PASS },
  });
}

function budgetCurrencyTable(budget: string): string {
  const parts = budget.split("·").map((s) => s.trim());
  if (parts.length !== 3) {
    return `<p style="margin:0;font-size:15px;font-weight:700;color:#1e293b;">${budget}</p>`;
  }
  return `
    <table width="100%" cellpadding="0" cellspacing="0" border="0" style="border-collapse:separate;border-spacing:0;">
      <tr>
        <td width="33%" style="padding-right:6px;">
          <table width="100%" cellpadding="0" cellspacing="0" border="0">
            <tr>
              <td align="center" style="background:#fff7ed;border:2px solid #fb923c;border-radius:12px;padding:14px 10px;">
                <p style="margin:0 0 4px 0;font-size:20px;line-height:1;">🇺🇸</p>
                <p style="margin:0 0 5px 0;font-size:10px;font-weight:700;color:#c2410c;letter-spacing:1px;text-transform:uppercase;font-family:Arial,sans-serif;">USD</p>
                <p style="margin:0;font-size:13px;font-weight:800;color:#1e293b;font-family:Arial,sans-serif;">${parts[0]}</p>
              </td>
            </tr>
          </table>
        </td>
        <td width="33%" style="padding:0 3px;">
          <table width="100%" cellpadding="0" cellspacing="0" border="0">
            <tr>
              <td align="center" style="background:#fdf4ff;border:2px solid #c026d3;border-radius:12px;padding:14px 10px;">
                <p style="margin:0 0 4px 0;font-size:20px;line-height:1;">🇮🇳</p>
                <p style="margin:0 0 5px 0;font-size:10px;font-weight:700;color:#7e22ce;letter-spacing:1px;text-transform:uppercase;font-family:Arial,sans-serif;">INR</p>
                <p style="margin:0;font-size:13px;font-weight:800;color:#1e293b;font-family:Arial,sans-serif;">${parts[1]}</p>
              </td>
            </tr>
          </table>
        </td>
        <td width="33%" style="padding-left:6px;">
          <table width="100%" cellpadding="0" cellspacing="0" border="0">
            <tr>
              <td align="center" style="background:#f0fdf4;border:2px solid #16a34a;border-radius:12px;padding:14px 10px;">
                <p style="margin:0 0 4px 0;font-size:20px;line-height:1;">🇷🇺</p>
                <p style="margin:0 0 5px 0;font-size:10px;font-weight:700;color:#166534;letter-spacing:1px;text-transform:uppercase;font-family:Arial,sans-serif;">RUB</p>
                <p style="margin:0;font-size:13px;font-weight:800;color:#1e293b;font-family:Arial,sans-serif;">${parts[2]}</p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>`;
}

export async function sendNotification(data: any) {
  console.log("📨 Sending email notification for contact form submission");

  if (!GMAIL_USER || !GMAIL_PASS) {
    console.warn("⚠️ GMAIL_USER or GMAIL_PASS not set — skipping email.");
    return { success: false, reason: "Email credentials not configured" };
  }

  const transporter = createTransporter();

  const ownerEmailHTML = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>New Contact Message</title>
</head>
<body style="margin:0;padding:0;background:#eef2ff;font-family:Arial,Helvetica,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#eef2ff;padding:32px 16px;">
  <tr>
    <td align="center">
      <table width="600" cellpadding="0" cellspacing="0" border="0" style="max-width:600px;width:100%;">

        <!-- HEADER -->
        <tr>
          <td align="center" style="background:linear-gradient(135deg,#3b82f6,#6366f1,#8b5cf6);border-radius:20px 20px 0 0;padding:40px 32px;">
            <p style="margin:0 0 12px 0;font-size:28px;">📬</p>
            <p style="margin:0 0 6px 0;font-size:11px;font-weight:700;color:rgba(255,255,255,0.8);letter-spacing:2px;text-transform:uppercase;font-family:Arial,sans-serif;">New Message</p>
            <h1 style="margin:0 0 8px 0;font-size:26px;font-weight:700;color:#ffffff;font-family:Arial,sans-serif;">New Contact Request</h1>
            <p style="margin:0;font-size:14px;color:rgba(255,255,255,0.85);font-family:Arial,sans-serif;">Someone just reached out via your portfolio</p>
          </td>
        </tr>

        <!-- BODY -->
        <tr>
          <td style="background:#ffffff;padding:36px 32px;">

            <!-- Sender info label -->
            <p style="margin:0 0 16px 0;font-size:11px;font-weight:700;color:#6366f1;letter-spacing:2px;text-transform:uppercase;font-family:Arial,sans-serif;">Contact Details</p>

            <!-- Name + Email row -->
            <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom:12px;">
              <tr>
                <td width="49%" valign="top" style="padding-right:8px;">
                  <table width="100%" cellpadding="0" cellspacing="0" border="0">
                    <tr>
                      <td style="background:#f8faff;border:1px solid #e0e7ff;border-radius:12px;padding:16px;">
                        <p style="margin:0 0 5px 0;font-size:10px;font-weight:700;color:#94a3b8;text-transform:uppercase;letter-spacing:1px;font-family:Arial,sans-serif;">Name</p>
                        <p style="margin:0;font-size:14px;font-weight:700;color:#1e293b;font-family:Arial,sans-serif;">${data.name}</p>
                      </td>
                    </tr>
                  </table>
                </td>
                <td width="49%" valign="top" style="padding-left:8px;">
                  <table width="100%" cellpadding="0" cellspacing="0" border="0">
                    <tr>
                      <td style="background:#f8faff;border:1px solid #e0e7ff;border-radius:12px;padding:16px;">
                        <p style="margin:0 0 5px 0;font-size:10px;font-weight:700;color:#94a3b8;text-transform:uppercase;letter-spacing:1px;font-family:Arial,sans-serif;">Email</p>
                        <p style="margin:0;font-size:14px;font-weight:700;color:#1e293b;word-break:break-word;font-family:Arial,sans-serif;">${data.email}</p>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>

            <!-- Mobile row -->
            <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom:28px;">
              <tr>
                <td style="background:#f8faff;border:1px solid #e0e7ff;border-radius:12px;padding:16px;">
                  <p style="margin:0 0 5px 0;font-size:10px;font-weight:700;color:#94a3b8;text-transform:uppercase;letter-spacing:1px;font-family:Arial,sans-serif;">Mobile</p>
                  <p style="margin:0;font-size:14px;font-weight:700;color:#1e293b;font-family:Arial,sans-serif;">${data.mobile || "Not provided"}</p>
                </td>
              </tr>
            </table>

            <!-- Message label -->
            <p style="margin:0 0 16px 0;font-size:11px;font-weight:700;color:#6366f1;letter-spacing:2px;text-transform:uppercase;font-family:Arial,sans-serif;">Message</p>

            <!-- Message box -->
            <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom:32px;">
              <tr>
                <td style="background:#f5f3ff;border:1px solid #c4b5fd;border-radius:14px;padding:24px;">
                  <p style="margin:0;font-size:15px;color:#334155;line-height:1.8;white-space:pre-wrap;word-break:break-word;font-style:italic;font-family:Arial,sans-serif;">${data.message}</p>
                </td>
              </tr>
            </table>

            <!-- CTA button -->
            <table cellpadding="0" cellspacing="0" border="0">
              <tr>
                <td align="center" style="background:linear-gradient(135deg,#3b82f6,#6366f1);border-radius:12px;">
                  <a href="mailto:${data.email}" style="display:inline-block;padding:14px 32px;font-size:14px;font-weight:700;color:#ffffff;text-decoration:none;font-family:Arial,sans-serif;">Reply to ${data.name} →</a>
                </td>
              </tr>
            </table>

          </td>
        </tr>

        <!-- FOOTER -->
        <tr>
          <td align="center" style="background:#f8faff;border:1px solid #e0e7ff;border-radius:0 0 20px 20px;padding:24px 32px;">
            <p style="margin:0 0 12px 0;font-size:12px;color:#94a3b8;font-family:Arial,sans-serif;">Sent from <strong>Shree Bhargav Portfolio</strong></p>
            <table cellpadding="0" cellspacing="0" border="0">
              <tr>
                <td style="padding:0 8px;">
                  <a href="https://linkedin.com/in/shree-bhargav-r-k-7b5b1419b" style="font-size:12px;color:#6366f1;font-weight:600;text-decoration:none;font-family:Arial,sans-serif;">LinkedIn</a>
                </td>
                <td style="padding:0 8px;">
                  <a href="https://github.com/rkshree001" style="font-size:12px;color:#6366f1;font-weight:600;text-decoration:none;font-family:Arial,sans-serif;">GitHub</a>
                </td>
              </tr>
            </table>
          </td>
        </tr>

      </table>
    </td>
  </tr>
</table>
</body>
</html>`;

  const userEmailHTML = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>Message Received</title>
</head>
<body style="margin:0;padding:0;background:#f0fdf4;font-family:Arial,Helvetica,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#f0fdf4;padding:32px 16px;">
  <tr>
    <td align="center">
      <table width="600" cellpadding="0" cellspacing="0" border="0" style="max-width:600px;width:100%;">

        <!-- HEADER -->
        <tr>
          <td align="center" style="background:linear-gradient(135deg,#10b981,#059669,#047857);border-radius:20px 20px 0 0;padding:40px 32px;">
            <p style="margin:0 0 12px 0;font-size:28px;">✅</p>
            <p style="margin:0 0 6px 0;font-size:11px;font-weight:700;color:rgba(255,255,255,0.8);letter-spacing:2px;text-transform:uppercase;font-family:Arial,sans-serif;">Message Received</p>
            <h1 style="margin:0 0 8px 0;font-size:26px;font-weight:700;color:#ffffff;font-family:Arial,sans-serif;">Thank You, ${data.name}!</h1>
            <p style="margin:0;font-size:14px;color:rgba(255,255,255,0.85);font-family:Arial,sans-serif;">Your message has been received successfully</p>
          </td>
        </tr>

        <!-- BODY -->
        <tr>
          <td style="background:#ffffff;padding:36px 32px;">

            <p style="margin:0 0 12px 0;font-size:20px;font-weight:700;color:#1e293b;font-family:Arial,sans-serif;">Hi ${data.name},</p>
            <p style="margin:0 0 28px 0;font-size:15px;color:#64748b;line-height:1.8;font-family:Arial,sans-serif;">Thank you for reaching out through my portfolio! I've received your message and will personally review it. I typically respond within <strong>24 hours</strong>.</p>

            <!-- Details label -->
            <p style="margin:0 0 16px 0;font-size:11px;font-weight:700;color:#10b981;letter-spacing:2px;text-transform:uppercase;font-family:Arial,sans-serif;">Your Submitted Details</p>

            <!-- Name + Email -->
            <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom:12px;">
              <tr>
                <td width="49%" valign="top" style="padding-right:8px;">
                  <table width="100%" cellpadding="0" cellspacing="0" border="0">
                    <tr>
                      <td style="background:#f0fdf4;border:1px solid #bbf7d0;border-radius:12px;padding:16px;">
                        <p style="margin:0 0 5px 0;font-size:10px;font-weight:700;color:#94a3b8;text-transform:uppercase;letter-spacing:1px;font-family:Arial,sans-serif;">Name</p>
                        <p style="margin:0;font-size:14px;font-weight:700;color:#1e293b;font-family:Arial,sans-serif;">${data.name}</p>
                      </td>
                    </tr>
                  </table>
                </td>
                <td width="49%" valign="top" style="padding-left:8px;">
                  <table width="100%" cellpadding="0" cellspacing="0" border="0">
                    <tr>
                      <td style="background:#f0fdf4;border:1px solid #bbf7d0;border-radius:12px;padding:16px;">
                        <p style="margin:0 0 5px 0;font-size:10px;font-weight:700;color:#94a3b8;text-transform:uppercase;letter-spacing:1px;font-family:Arial,sans-serif;">Email</p>
                        <p style="margin:0;font-size:14px;font-weight:700;color:#1e293b;word-break:break-word;font-family:Arial,sans-serif;">${data.email}</p>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>

            <!-- Mobile -->
            <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom:28px;">
              <tr>
                <td style="background:#f0fdf4;border:1px solid #bbf7d0;border-radius:12px;padding:16px;">
                  <p style="margin:0 0 5px 0;font-size:10px;font-weight:700;color:#94a3b8;text-transform:uppercase;letter-spacing:1px;font-family:Arial,sans-serif;">Mobile</p>
                  <p style="margin:0;font-size:14px;font-weight:700;color:#1e293b;font-family:Arial,sans-serif;">${data.mobile || "Not provided"}</p>
                </td>
              </tr>
            </table>

            <!-- Message label -->
            <p style="margin:0 0 16px 0;font-size:11px;font-weight:700;color:#10b981;letter-spacing:2px;text-transform:uppercase;font-family:Arial,sans-serif;">Your Message</p>
            <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom:28px;">
              <tr>
                <td style="background:#f0fdf4;border:1px solid #a7f3d0;border-radius:14px;padding:24px;">
                  <p style="margin:0;font-size:14px;color:#334155;line-height:1.8;white-space:pre-wrap;word-break:break-word;font-style:italic;font-family:Arial,sans-serif;">${data.message}</p>
                </td>
              </tr>
            </table>

            <!-- What's next box -->
            <table width="100%" cellpadding="0" cellspacing="0" border="0">
              <tr>
                <td style="background:#f8faff;border:1px solid #c7d2fe;border-radius:14px;padding:20px 24px;">
                  <p style="margin:0 0 10px 0;font-size:13px;color:#64748b;font-family:Arial,sans-serif;">📅 <strong>Expected Reply:</strong> Within 24 hours</p>
                  <p style="margin:0 0 10px 0;font-size:13px;color:#64748b;font-family:Arial,sans-serif;">📧 <strong>Reply Email:</strong> rkshree001@gmail.com</p>
                  <p style="margin:0;font-size:13px;color:#64748b;font-family:Arial,sans-serif;">💼 <strong>LinkedIn:</strong> linkedin.com/in/shree-bhargav-r-k-7b5b1419b</p>
                </td>
              </tr>
            </table>

          </td>
        </tr>

        <!-- FOOTER -->
        <tr>
          <td align="center" style="background:#f8faff;border:1px solid #e0e7ff;border-radius:0 0 20px 20px;padding:24px 32px;">
            <p style="margin:0 0 12px 0;font-size:12px;color:#94a3b8;font-family:Arial,sans-serif;">Sent from <strong>Shree Bhargav Portfolio</strong></p>
            <table cellpadding="0" cellspacing="0" border="0">
              <tr>
                <td style="padding:0 8px;">
                  <a href="https://linkedin.com/in/shree-bhargav-r-k-7b5b1419b" style="font-size:12px;color:#10b981;font-weight:600;text-decoration:none;font-family:Arial,sans-serif;">LinkedIn</a>
                </td>
                <td style="padding:0 8px;">
                  <a href="https://github.com/rkshree001" style="font-size:12px;color:#10b981;font-weight:600;text-decoration:none;font-family:Arial,sans-serif;">GitHub</a>
                </td>
              </tr>
            </table>
          </td>
        </tr>

      </table>
    </td>
  </tr>
</table>
</body>
</html>`;

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

  const ownerHireEmailHTML = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>New Hire Request</title>
</head>
<body style="margin:0;padding:0;background:#faf5ff;font-family:Arial,Helvetica,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#faf5ff;padding:32px 16px;">
  <tr>
    <td align="center">
      <table width="600" cellpadding="0" cellspacing="0" border="0" style="max-width:600px;width:100%;">

        <!-- HEADER -->
        <tr>
          <td align="center" style="background:linear-gradient(135deg,#7c3aed,#6366f1,#3b82f6);border-radius:20px 20px 0 0;padding:40px 32px;">
            <p style="margin:0 0 12px 0;font-size:32px;">🚀</p>
            <p style="margin:0 0 6px 0;font-size:11px;font-weight:700;color:rgba(255,255,255,0.8);letter-spacing:2px;text-transform:uppercase;font-family:Arial,sans-serif;">New Hire Request</p>
            <h1 style="margin:0 0 8px 0;font-size:26px;font-weight:700;color:#ffffff;font-family:Arial,sans-serif;">Someone Wants to Hire You!</h1>
            <p style="margin:0;font-size:14px;color:rgba(255,255,255,0.85);font-family:Arial,sans-serif;">A new project inquiry via your portfolio</p>
          </td>
        </tr>

        <!-- PRIORITY BANNER -->
        <tr>
          <td style="background:#7c3aed;padding:14px 32px;">
            <p style="margin:0;font-size:13px;font-weight:600;color:#ffffff;font-family:Arial,sans-serif;">🔥 New opportunity — Review and respond within 24 hours</p>
          </td>
        </tr>

        <!-- BODY -->
        <tr>
          <td style="background:#ffffff;padding:36px 32px;">

            <!-- Client info label -->
            <p style="margin:0 0 16px 0;font-size:11px;font-weight:700;color:#7c3aed;letter-spacing:2px;text-transform:uppercase;font-family:Arial,sans-serif;">Client Information</p>

            <!-- Name + Email -->
            <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom:12px;">
              <tr>
                <td width="49%" valign="top" style="padding-right:8px;">
                  <table width="100%" cellpadding="0" cellspacing="0" border="0">
                    <tr>
                      <td style="background:#faf5ff;border:1px solid #e9d5ff;border-radius:12px;padding:16px;">
                        <p style="margin:0 0 5px 0;font-size:10px;font-weight:700;color:#94a3b8;text-transform:uppercase;letter-spacing:1px;font-family:Arial,sans-serif;">Full Name</p>
                        <p style="margin:0;font-size:14px;font-weight:700;color:#1e293b;font-family:Arial,sans-serif;">${data.name}</p>
                      </td>
                    </tr>
                  </table>
                </td>
                <td width="49%" valign="top" style="padding-left:8px;">
                  <table width="100%" cellpadding="0" cellspacing="0" border="0">
                    <tr>
                      <td style="background:#faf5ff;border:1px solid #e9d5ff;border-radius:12px;padding:16px;">
                        <p style="margin:0 0 5px 0;font-size:10px;font-weight:700;color:#94a3b8;text-transform:uppercase;letter-spacing:1px;font-family:Arial,sans-serif;">Email</p>
                        <p style="margin:0;font-size:14px;font-weight:700;color:#1e293b;word-break:break-word;font-family:Arial,sans-serif;">${data.email}</p>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>

            <!-- Company + Mobile -->
            <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom:32px;">
              <tr>
                <td width="49%" valign="top" style="padding-right:8px;">
                  <table width="100%" cellpadding="0" cellspacing="0" border="0">
                    <tr>
                      <td style="background:#faf5ff;border:1px solid #e9d5ff;border-radius:12px;padding:16px;">
                        <p style="margin:0 0 5px 0;font-size:10px;font-weight:700;color:#94a3b8;text-transform:uppercase;letter-spacing:1px;font-family:Arial,sans-serif;">Company</p>
                        <p style="margin:0;font-size:14px;font-weight:700;color:#1e293b;font-family:Arial,sans-serif;">${data.company || "Not specified"}</p>
                      </td>
                    </tr>
                  </table>
                </td>
                <td width="49%" valign="top" style="padding-left:8px;">
                  <table width="100%" cellpadding="0" cellspacing="0" border="0">
                    <tr>
                      <td style="background:#faf5ff;border:1px solid #e9d5ff;border-radius:12px;padding:16px;">
                        <p style="margin:0 0 5px 0;font-size:10px;font-weight:700;color:#94a3b8;text-transform:uppercase;letter-spacing:1px;font-family:Arial,sans-serif;">Mobile</p>
                        <p style="margin:0;font-size:14px;font-weight:700;color:#1e293b;font-family:Arial,sans-serif;">${data.mobile || "Not provided"}</p>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>

            <!-- Project snapshot label -->
            <p style="margin:0 0 16px 0;font-size:11px;font-weight:700;color:#7c3aed;letter-spacing:2px;text-transform:uppercase;font-family:Arial,sans-serif;">Project Snapshot</p>

            <!-- Type + Timeline -->
            <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom:12px;">
              <tr>
                <td width="49%" valign="top" style="padding-right:8px;">
                  <table width="100%" cellpadding="0" cellspacing="0" border="0">
                    <tr>
                      <td align="center" style="background:#f0e7ff;border:1px solid #d8b4fe;border-radius:12px;padding:20px 16px;">
                        <p style="margin:0 0 8px 0;font-size:22px;line-height:1;">📱</p>
                        <p style="margin:0 0 6px 0;font-size:10px;font-weight:700;color:#7c3aed;text-transform:uppercase;letter-spacing:1px;font-family:Arial,sans-serif;">Project Type</p>
                        <p style="margin:0;font-size:13px;font-weight:700;color:#1e293b;font-family:Arial,sans-serif;">${data.projectType}</p>
                      </td>
                    </tr>
                  </table>
                </td>
                <td width="49%" valign="top" style="padding-left:8px;">
                  <table width="100%" cellpadding="0" cellspacing="0" border="0">
                    <tr>
                      <td align="center" style="background:#eff6ff;border:1px solid #93c5fd;border-radius:12px;padding:20px 16px;">
                        <p style="margin:0 0 8px 0;font-size:22px;line-height:1;">📅</p>
                        <p style="margin:0 0 6px 0;font-size:10px;font-weight:700;color:#1d4ed8;text-transform:uppercase;letter-spacing:1px;font-family:Arial,sans-serif;">Timeline</p>
                        <p style="margin:0;font-size:13px;font-weight:700;color:#1e293b;font-family:Arial,sans-serif;">${data.timeline}</p>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>

            <!-- Budget label -->
            <p style="margin:0 0 12px 0;font-size:11px;font-weight:700;color:#065f46;letter-spacing:2px;text-transform:uppercase;font-family:Arial,sans-serif;text-align:center;">💰 Budget Range</p>

            <!-- Budget multi-currency -->
            <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#ecfdf5;border:1px solid #6ee7b7;border-radius:14px;padding:0;margin-bottom:32px;">
              <tr>
                <td style="padding:18px 20px;">
                  ${budgetCurrencyTable(data.budget)}
                </td>
              </tr>
            </table>

            <!-- Description label -->
            <p style="margin:0 0 16px 0;font-size:11px;font-weight:700;color:#7c3aed;letter-spacing:2px;text-transform:uppercase;font-family:Arial,sans-serif;">Project Description</p>
            <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom:32px;">
              <tr>
                <td style="background:#faf5ff;border:1px solid #e9d5ff;border-radius:14px;padding:24px;">
                  <p style="margin:0;font-size:14px;color:#334155;line-height:1.8;white-space:pre-wrap;word-break:break-word;font-family:Arial,sans-serif;">${data.description}</p>
                </td>
              </tr>
            </table>

            <!-- CTA -->
            <table cellpadding="0" cellspacing="0" border="0">
              <tr>
                <td align="center" style="background:linear-gradient(135deg,#7c3aed,#3b82f6);border-radius:12px;">
                  <a href="mailto:${data.email}?subject=Re: Your Project Inquiry&body=Hi ${data.name}," style="display:inline-block;padding:15px 36px;font-size:15px;font-weight:700;color:#ffffff;text-decoration:none;font-family:Arial,sans-serif;">Reply to ${data.name} →</a>
                </td>
              </tr>
            </table>

          </td>
        </tr>

        <!-- FOOTER -->
        <tr>
          <td align="center" style="background:#faf5ff;border:1px solid #e9d5ff;border-radius:0 0 20px 20px;padding:24px 32px;">
            <p style="margin:0 0 12px 0;font-size:12px;color:#94a3b8;font-family:Arial,sans-serif;">Received via <strong>Shree Bhargav Portfolio — Hire Me</strong></p>
            <table cellpadding="0" cellspacing="0" border="0">
              <tr>
                <td style="padding:0 8px;">
                  <a href="https://linkedin.com/in/shree-bhargav-r-k-7b5b1419b" style="font-size:12px;color:#7c3aed;font-weight:600;text-decoration:none;font-family:Arial,sans-serif;">LinkedIn</a>
                </td>
                <td style="padding:0 8px;">
                  <a href="https://github.com/rkshree001" style="font-size:12px;color:#7c3aed;font-weight:600;text-decoration:none;font-family:Arial,sans-serif;">GitHub</a>
                </td>
              </tr>
            </table>
          </td>
        </tr>

      </table>
    </td>
  </tr>
</table>
</body>
</html>`;

  const clientHireEmailHTML = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>Hire Request Confirmed</title>
</head>
<body style="margin:0;padding:0;background:#f0f4ff;font-family:Arial,Helvetica,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#f0f4ff;padding:32px 16px;">
  <tr>
    <td align="center">
      <table width="600" cellpadding="0" cellspacing="0" border="0" style="max-width:600px;width:100%;">

        <!-- HEADER -->
        <tr>
          <td align="center" style="background:linear-gradient(135deg,#6366f1,#7c3aed,#4f46e5);border-radius:20px 20px 0 0;padding:44px 32px;">
            <!-- Avatar -->
            <table cellpadding="0" cellspacing="0" border="0" style="margin-bottom:16px;">
              <tr>
                <td align="center" width="72" height="72" style="background:rgba(255,255,255,0.2);border-radius:50%;width:72px;height:72px;">
                  <p style="margin:0;font-size:26px;font-weight:700;color:#ffffff;line-height:72px;font-family:Arial,sans-serif;">SB</p>
                </td>
              </tr>
            </table>
            <p style="margin:0 0 6px 0;font-size:11px;font-weight:700;color:rgba(255,255,255,0.8);letter-spacing:2px;text-transform:uppercase;font-family:Arial,sans-serif;">✅ Request Confirmed</p>
            <h1 style="margin:0 0 8px 0;font-size:26px;font-weight:700;color:#ffffff;font-family:Arial,sans-serif;">Hire Request Received!</h1>
            <p style="margin:0;font-size:14px;color:rgba(255,255,255,0.85);font-family:Arial,sans-serif;">I'll review your project and respond within 24 hours</p>
          </td>
        </tr>

        <!-- BODY -->
        <tr>
          <td style="background:#ffffff;padding:36px 32px;">

            <p style="margin:0 0 12px 0;font-size:22px;font-weight:700;color:#1e293b;font-family:Arial,sans-serif;">Hi ${data.name},</p>
            <p style="margin:0 0 28px 0;font-size:15px;color:#64748b;line-height:1.8;font-family:Arial,sans-serif;">
              Thank you for your interest in working with me! I've received your project inquiry and I'm genuinely excited to learn more about what you're building.
              I'll carefully review all your details and reach out with a personalized proposal within <strong>24 hours</strong>.
            </p>

            <!-- Project summary label -->
            <p style="margin:0 0 16px 0;font-size:11px;font-weight:700;color:#6366f1;letter-spacing:2px;text-transform:uppercase;font-family:Arial,sans-serif;">Your Project Summary</p>

            <!-- Type + Timeline -->
            <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom:12px;">
              <tr>
                <td width="49%" valign="top" style="padding-right:8px;">
                  <table width="100%" cellpadding="0" cellspacing="0" border="0">
                    <tr>
                      <td align="center" style="background:#f0e7ff;border:1px solid #c4b5fd;border-radius:14px;padding:20px 14px;">
                        <p style="margin:0 0 8px 0;font-size:20px;line-height:1;">📱</p>
                        <p style="margin:0 0 6px 0;font-size:10px;font-weight:700;color:#7c3aed;text-transform:uppercase;letter-spacing:0.8px;font-family:Arial,sans-serif;">Project Type</p>
                        <p style="margin:0;font-size:13px;font-weight:700;color:#1e293b;font-family:Arial,sans-serif;">${data.projectType}</p>
                      </td>
                    </tr>
                  </table>
                </td>
                <td width="49%" valign="top" style="padding-left:8px;">
                  <table width="100%" cellpadding="0" cellspacing="0" border="0">
                    <tr>
                      <td align="center" style="background:#eff6ff;border:1px solid #93c5fd;border-radius:14px;padding:20px 14px;">
                        <p style="margin:0 0 8px 0;font-size:20px;line-height:1;">📅</p>
                        <p style="margin:0 0 6px 0;font-size:10px;font-weight:700;color:#1d4ed8;text-transform:uppercase;letter-spacing:0.8px;font-family:Arial,sans-serif;">Timeline</p>
                        <p style="margin:0;font-size:13px;font-weight:700;color:#1e293b;font-family:Arial,sans-serif;">${data.timeline}</p>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>

            <!-- Budget multi-currency -->
            <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#ecfdf5;border:1px solid #6ee7b7;border-radius:14px;margin-bottom:32px;">
              <tr>
                <td style="padding:18px 20px;">
                  <p style="margin:0 0 14px 0;font-size:11px;font-weight:700;color:#065f46;letter-spacing:2px;text-transform:uppercase;text-align:center;font-family:Arial,sans-serif;">💰 Budget Range</p>
                  ${budgetCurrencyTable(data.budget)}
                </td>
              </tr>
            </table>

            <!-- What happens next label -->
            <p style="margin:0 0 16px 0;font-size:11px;font-weight:700;color:#6366f1;letter-spacing:2px;text-transform:uppercase;font-family:Arial,sans-serif;">What Happens Next?</p>

            <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#f5f3ff;border:1px solid #c7d2fe;border-radius:14px;margin-bottom:28px;">
              <tr>
                <td style="padding:24px;">
                  <!-- Step 1 -->
                  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom:16px;">
                    <tr>
                      <td width="36" valign="top">
                        <table cellpadding="0" cellspacing="0" border="0">
                          <tr>
                            <td align="center" width="28" height="28" style="background:linear-gradient(135deg,#6366f1,#7c3aed);border-radius:50%;width:28px;height:28px;">
                              <p style="margin:0;font-size:12px;font-weight:700;color:#ffffff;line-height:28px;font-family:Arial,sans-serif;">1</p>
                            </td>
                          </tr>
                        </table>
                      </td>
                      <td valign="middle" style="padding-left:12px;">
                        <p style="margin:0;font-size:14px;color:#334155;line-height:1.6;font-family:Arial,sans-serif;"><strong>Review</strong> — I'll review your project description and requirements in detail.</p>
                      </td>
                    </tr>
                  </table>
                  <!-- Step 2 -->
                  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom:16px;">
                    <tr>
                      <td width="36" valign="top">
                        <table cellpadding="0" cellspacing="0" border="0">
                          <tr>
                            <td align="center" width="28" height="28" style="background:linear-gradient(135deg,#6366f1,#7c3aed);border-radius:50%;width:28px;height:28px;">
                              <p style="margin:0;font-size:12px;font-weight:700;color:#ffffff;line-height:28px;font-family:Arial,sans-serif;">2</p>
                            </td>
                          </tr>
                        </table>
                      </td>
                      <td valign="middle" style="padding-left:12px;">
                        <p style="margin:0;font-size:14px;color:#334155;line-height:1.6;font-family:Arial,sans-serif;"><strong>Proposal</strong> — I'll prepare a customized proposal with timeline and cost breakdown.</p>
                      </td>
                    </tr>
                  </table>
                  <!-- Step 3 -->
                  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom:16px;">
                    <tr>
                      <td width="36" valign="top">
                        <table cellpadding="0" cellspacing="0" border="0">
                          <tr>
                            <td align="center" width="28" height="28" style="background:linear-gradient(135deg,#6366f1,#7c3aed);border-radius:50%;width:28px;height:28px;">
                              <p style="margin:0;font-size:12px;font-weight:700;color:#ffffff;line-height:28px;font-family:Arial,sans-serif;">3</p>
                            </td>
                          </tr>
                        </table>
                      </td>
                      <td valign="middle" style="padding-left:12px;">
                        <p style="margin:0;font-size:14px;color:#334155;line-height:1.6;font-family:Arial,sans-serif;"><strong>Connect</strong> — We'll schedule a call to discuss the project and align on expectations.</p>
                      </td>
                    </tr>
                  </table>
                  <!-- Step 4 -->
                  <table width="100%" cellpadding="0" cellspacing="0" border="0">
                    <tr>
                      <td width="36" valign="top">
                        <table cellpadding="0" cellspacing="0" border="0">
                          <tr>
                            <td align="center" width="28" height="28" style="background:linear-gradient(135deg,#6366f1,#7c3aed);border-radius:50%;width:28px;height:28px;">
                              <p style="margin:0;font-size:12px;font-weight:700;color:#ffffff;line-height:28px;font-family:Arial,sans-serif;">4</p>
                            </td>
                          </tr>
                        </table>
                      </td>
                      <td valign="middle" style="padding-left:12px;">
                        <p style="margin:0;font-size:14px;color:#334155;line-height:1.6;font-family:Arial,sans-serif;"><strong>Build</strong> — Once agreed, I'll start building your vision with regular progress updates.</p>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>

            <!-- Get in touch label -->
            <p style="margin:0 0 16px 0;font-size:11px;font-weight:700;color:#6366f1;letter-spacing:2px;text-transform:uppercase;font-family:Arial,sans-serif;">Get in Touch</p>

            <!-- Contact links -->
            <table width="100%" cellpadding="0" cellspacing="0" border="0">
              <tr>
                <td width="49%" valign="top" style="padding-right:8px;">
                  <table width="100%" cellpadding="0" cellspacing="0" border="0">
                    <tr>
                      <td style="background:#f0f4ff;border:1px solid #c7d2fe;border-radius:12px;padding:14px 16px;">
                        <p style="margin:0 0 3px 0;font-size:10px;font-weight:700;color:#94a3b8;text-transform:uppercase;letter-spacing:1px;font-family:Arial,sans-serif;">Direct Email</p>
                        <p style="margin:0;font-size:13px;font-weight:700;color:#4f46e5;font-family:Arial,sans-serif;">rkshree001@gmail.com</p>
                      </td>
                    </tr>
                  </table>
                </td>
                <td width="49%" valign="top" style="padding-left:8px;">
                  <table width="100%" cellpadding="0" cellspacing="0" border="0">
                    <tr>
                      <td style="background:#eff6ff;border:1px solid #bfdbfe;border-radius:12px;padding:14px 16px;">
                        <p style="margin:0 0 3px 0;font-size:10px;font-weight:700;color:#94a3b8;text-transform:uppercase;letter-spacing:1px;font-family:Arial,sans-serif;">LinkedIn</p>
                        <p style="margin:0;font-size:13px;font-weight:700;color:#1d4ed8;font-family:Arial,sans-serif;">Shree Bhargav R K</p>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>

          </td>
        </tr>

        <!-- FOOTER -->
        <tr>
          <td align="center" style="background:#f8faff;border:1px solid #e0e7ff;border-radius:0 0 20px 20px;padding:24px 32px;">
            <p style="margin:0 0 6px 0;font-size:12px;color:#94a3b8;font-family:Arial,sans-serif;">Sent by <strong>Shree Bhargav</strong> — Android Developer &amp; Team Lead</p>
            <table cellpadding="0" cellspacing="0" border="0">
              <tr>
                <td style="padding:0 8px;">
                  <a href="https://linkedin.com/in/shree-bhargav-r-k-7b5b1419b" style="font-size:12px;color:#6366f1;font-weight:600;text-decoration:none;font-family:Arial,sans-serif;">LinkedIn</a>
                </td>
                <td style="padding:0 8px;">
                  <a href="https://github.com/rkshree001" style="font-size:12px;color:#6366f1;font-weight:600;text-decoration:none;font-family:Arial,sans-serif;">GitHub</a>
                </td>
              </tr>
            </table>
          </td>
        </tr>

      </table>
    </td>
  </tr>
</table>
</body>
</html>`;

  await transporter.sendMail({
    from: `"Shree Bhargav Portfolio" <${GMAIL_USER}>`,
    to: "rkshree001@gmail.com",
    subject: "🚀 New Hire Request — " + data.name,
    html: ownerHireEmailHTML,
  });

  await transporter.sendMail({
    from: `"Shree Bhargav" <${GMAIL_USER}>`,
    to: data.email,
    replyTo: GMAIL_USER,
    subject: "✅ Hire Request Received — Let's Build Something Amazing!",
    html: clientHireEmailHTML,
  });

  console.log("✅ Hire Me emails sent successfully");
  return { success: true };
}
