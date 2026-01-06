import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'blclacrossecamps@gmail.com',
    pass: process.env.GMAIL_APP_PASSWORD,
  },
});

interface SendEmailOptions {
  to: string | string[];
  subject: string;
  html: string;
}

export async function sendEmail({ to, subject, html }: SendEmailOptions) {
  const recipients = Array.isArray(to) ? to : [to];

  // Send to each recipient individually (for privacy, no BCC mass email)
  const results = await Promise.allSettled(
    recipients.map((recipient) =>
      transporter.sendMail({
        from: '"Bulldog Lacrosse Camps" <blclacrossecamps@gmail.com>',
        to: recipient,
        subject,
        html,
      })
    )
  );

  const sent = results.filter((r) => r.status === 'fulfilled').length;
  const failed = results.filter((r) => r.status === 'rejected').length;

  return { sent, failed, total: recipients.length };
}

export async function sendConfirmationEmail(registration: {
  parentEmail: string;
  parentName: string;
  camperName: string;
  campName: string;
  amount: string;
}) {
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <div style="background-color: #00356b; color: white; padding: 20px; text-align: center;">
        <h1 style="margin: 0;">Bulldog Lacrosse Camps</h1>
      </div>
      <div style="padding: 30px; background-color: #f9f9f9;">
        <h2 style="color: #00356b;">Registration Confirmed!</h2>
        <p>Hi ${registration.parentName},</p>
        <p>Thank you for registering <strong>${registration.camperName}</strong> for <strong>${registration.campName}</strong>!</p>
        <div style="background-color: white; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <p style="margin: 0;"><strong>Amount Paid:</strong> ${registration.amount}</p>
        </div>
        <p>We'll send more information as the camp date approaches, including what to bring and the schedule.</p>
        <p>If you have any questions, please email us at <a href="mailto:blclacrossecamps@gmail.com">blclacrossecamps@gmail.com</a>.</p>
        <p style="margin-top: 30px;">See you on the field!</p>
        <p><strong>Bulldog Lacrosse Camps</strong></p>
      </div>
      <div style="padding: 20px; text-align: center; color: #666; font-size: 12px;">
        <p>Yale University | New Haven, CT</p>
      </div>
    </div>
  `;

  return sendEmail({
    to: registration.parentEmail,
    subject: `Registration Confirmed: ${registration.campName}`,
    html,
  });
}
