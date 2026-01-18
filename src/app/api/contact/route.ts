import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'blclacrossecamps@gmail.com',
    pass: process.env.GMAIL_APP_PASSWORD,
  },
});

const subjectLabels: Record<string, string> = {
  'summer-camp': 'Summer Camp',
  'bulldog-120': 'Bulldog 120',
  'experience': 'Bulldog Experience',
  'clash': 'Bulldog Clash',
  'refund': 'Refund Request',
  'other': 'Other',
};

export async function POST(request: Request) {
  try {
    const { name, email, subject, message } = await request.json();

    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    const subjectLabel = subjectLabels[subject] || subject;

    // Send email to camp
    await transporter.sendMail({
      from: '"Bulldog Lacrosse Camps" <blclacrossecamps@gmail.com>',
      to: 'blclacrossecamps@gmail.com',
      replyTo: email,
      subject: `Contact Form: ${subjectLabel} - ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background-color: #00356b; color: white; padding: 20px; text-align: center;">
            <h1 style="margin: 0;">New Contact Form Submission</h1>
          </div>
          <div style="padding: 30px; background-color: #f9f9f9;">
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #ddd;"><strong>Name:</strong></td>
                <td style="padding: 10px 0; border-bottom: 1px solid #ddd;">${name}</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #ddd;"><strong>Email:</strong></td>
                <td style="padding: 10px 0; border-bottom: 1px solid #ddd;"><a href="mailto:${email}">${email}</a></td>
              </tr>
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #ddd;"><strong>Subject:</strong></td>
                <td style="padding: 10px 0; border-bottom: 1px solid #ddd;">${subjectLabel}</td>
              </tr>
            </table>
            <div style="margin-top: 20px;">
              <strong>Message:</strong>
              <div style="background-color: white; padding: 15px; border-radius: 8px; margin-top: 10px; white-space: pre-wrap;">${message}</div>
            </div>
          </div>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { error: 'Failed to send message' },
      { status: 500 }
    );
  }
}
