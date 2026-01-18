import { NextRequest, NextResponse } from 'next/server';
import { sendEmail } from '@/lib/email';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      name,
      email,
      phone,
      age,
      gender,
      experience,
      position,
      hoursPerWeek,
      additionalInfo,
    } = body;

    // Validate required fields
    if (!name || !email || !age || !gender || !experience || !hoursPerWeek) {
      return NextResponse.json(
        { error: 'Please fill in all required fields' },
        { status: 400 }
      );
    }

    // Send notification email to staff
    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background-color: #00356b; color: white; padding: 20px; text-align: center;">
          <h1 style="margin: 0;">Private Lesson Request</h1>
        </div>
        <div style="padding: 30px; background-color: #f9f9f9;">
          <h2 style="color: #00356b;">New Lesson Inquiry</h2>

          <div style="background-color: white; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="margin-top: 0; color: #00356b;">Contact Information</h3>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
            <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
          </div>

          <div style="background-color: white; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="margin-top: 0; color: #00356b;">Player Details</h3>
            <p><strong>Age:</strong> ${age}</p>
            <p><strong>Gender:</strong> ${gender}</p>
            <p><strong>Experience Level:</strong> ${experience}</p>
            <p><strong>Position/Focus:</strong> ${position || 'Not specified'}</p>
          </div>

          <div style="background-color: white; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="margin-top: 0; color: #00356b;">Lesson Preferences</h3>
            <p><strong>Hours Per Week:</strong> ${hoursPerWeek}</p>
            ${additionalInfo ? `<p><strong>Additional Info:</strong> ${additionalInfo}</p>` : ''}
          </div>

          <p style="color: #666; font-size: 14px;">
            Please respond to this inquiry at your earliest convenience.
          </p>
        </div>
        <div style="padding: 20px; text-align: center; color: #666; font-size: 12px;">
          <p>Bulldog Lacrosse Camps | Yale University</p>
        </div>
      </div>
    `;

    await sendEmail({
      to: 'blclacrossecamps@gmail.com',
      subject: `Private Lesson Request: ${name} (${age}yo ${position || 'Player'})`,
      html,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Lesson request error:', error);
    return NextResponse.json(
      { error: 'Failed to submit request. Please try again.' },
      { status: 500 }
    );
  }
}
