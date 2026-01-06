import { NextRequest, NextResponse } from 'next/server';
import { verifySession } from '@/lib/auth';
import { sendEmail } from '@/lib/email';
import { logEmailSend } from '@/lib/emailStats';

export async function POST(request: NextRequest) {
  const isAuthenticated = await verifySession();
  if (!isAuthenticated) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { emails, subject, body } = await request.json();

    if (!emails || !Array.isArray(emails) || emails.length === 0) {
      return NextResponse.json({ error: 'No recipients specified' }, { status: 400 });
    }

    if (!subject || !body) {
      return NextResponse.json({ error: 'Subject and body are required' }, { status: 400 });
    }

    // Convert plain text body to HTML with line breaks preserved
    const htmlBody = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background-color: #00356b; color: white; padding: 20px; text-align: center;">
          <h1 style="margin: 0;">Bulldog Lacrosse Camps</h1>
        </div>
        <div style="padding: 30px; background-color: #f9f9f9;">
          ${body.split('\n').map((line: string) => `<p style="margin: 0 0 10px 0;">${line || '&nbsp;'}</p>`).join('')}
        </div>
        <div style="padding: 20px; text-align: center; color: #666; font-size: 12px;">
          <p>Yale University | New Haven, CT</p>
          <p><a href="mailto:blclacrossecamps@gmail.com">blclacrossecamps@gmail.com</a></p>
        </div>
      </div>
    `;

    const result = await sendEmail({
      to: emails,
      subject,
      html: htmlBody,
    });

    // Log the email send
    if (result.sent > 0) {
      await logEmailSend(result.sent, subject);
    }

    return NextResponse.json(result);
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
  }
}
