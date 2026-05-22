/**
 * Example API Route for Email Notifications
 * Location: app/api/send-email.js
 * 
 * This is a template for handling booking confirmation emails
 * Requires: npm install nodemailer (or use SendGrid/Mailgun)
 */

// Uncomment and install: npm install nodemailer
// import nodemailer from 'nodemailer';

/**
 * POST /api/send-email
 * Send confirmation email after booking
 */
export async function POST(request) {
  try {
    const body = await request.json();
    const { name, email, serviceName, amount } = body;

    // Validate input
    if (!name || !email || !serviceName) {
      return Response.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Example with Nodemailer (Gmail, Outlook, etc.)
    // const transporter = nodemailer.createTransport({
    //   service: 'gmail',
    //   auth: {
    //     user: process.env.EMAIL_USER,
    //     pass: process.env.EMAIL_PASSWORD,
    //   },
    // });

    // Example with SendGrid
    // const sgMail = require('@sendgrid/mail');
    // sgMail.setApiKey(process.env.SENDGRID_API_KEY);

    const emailContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { font-family: 'DM Sans', sans-serif; background: #06080F; color: #E8EAF2; }
            .container { max-width: 600px; margin: 0 auto; padding: 40px 20px; }
            .header { text-align: center; margin-bottom: 32px; }
            .header h1 { color: #00C8F0; margin: 0; }
            .content { background: #0F1220; border: 1px solid #1C2035; border-radius: 12px; padding: 32px; }
            .detail { display: flex; justify-content: space-between; margin: 16px 0; }
            .detail-label { color: #7A7F9A; }
            .detail-value { font-weight: 700; }
            .button { display: inline-block; margin-top: 24px; padding: 12px 32px; background: #00C8F0; color: #fff; text-decoration: none; border-radius: 50px; }
            .footer { text-align: center; margin-top: 32px; color: #7A7F9A; font-size: 12px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>🎉 Booking Confirmed!</h1>
            </div>
            <div class="content">
              <p>Hi ${name},</p>
              <p>Thank you for booking our <strong>${serviceName}</strong> service with Taskmetry. Your booking has been confirmed!</p>
              
              <div class="detail">
                <span class="detail-label">Service</span>
                <span class="detail-value">${serviceName}</span>
              </div>
              <div class="detail">
                <span class="detail-label">Amount</span>
                <span class="detail-value">$${amount}</span>
              </div>
              <div class="detail">
                <span class="detail-label">Reference</span>
                <span class="detail-value">#${Math.random().toString(36).substr(2, 9).toUpperCase()}</span>
              </div>

              <p style="margin-top: 32px; color: #7A7F9A;">
                Our team will contact you within 24 hours to finalize the details.
              </p>

              <p>
                <a href="https://taskmetry.vercel.app/dashboard" class="button">View Your Booking</a>
              </p>
            </div>

            <div class="footer">
              <p>© 2025 Taskmetry. All rights reserved.</p>
              <p>Questions? Reply to this email or visit <a href="https://taskmetry.vercel.app" style="color: #00C8F0;">taskmetry.vercel.app</a></p>
            </div>
          </div>
        </body>
      </html>
    `;

    // Send email (example with Nodemailer)
    // await transporter.sendMail({
    //   from: process.env.EMAIL_USER,
    //   to: email,
    //   subject: `Booking Confirmed - ${serviceName}`,
    //   html: emailContent,
    // });

    // Example response
    return Response.json(
      { 
        success: true, 
        message: 'Confirmation email sent',
        bookingId: `TASK-${Date.now()}`
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Email sending error:', error);
    return Response.json(
      { error: 'Failed to send email' },
      { status: 500 }
    );
  }
}
