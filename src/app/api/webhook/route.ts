import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { google } from 'googleapis';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

// Map camp IDs to sheet names
const campSheetNames: Record<string, string> = {
  'test': 'Test',
  'summer': 'Summer Camp',
  'bulldog-120': 'Bulldog 120',
  'experience': 'Bulldog Experience',
  'clash': 'Bulldog Clash',
};

async function addToSheet(data: {
  date: string;
  camp: string;
  amount: string;
  camperName: string;
  camperEmail: string;
  position: string;
  graduationYear: string;
  school: string;
  parentName: string;
  parentEmail: string;
  parentPhone: string;
  paymentId: string;
}) {
  try {
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_SERVICE_EMAIL,
        private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
      },
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    const sheets = google.sheets({ version: 'v4', auth });

    // Get the sheet name for this camp, default to "Other" if not found
    const sheetName = campSheetNames[data.camp] || 'Other';

    await sheets.spreadsheets.values.append({
      spreadsheetId: process.env.GOOGLE_SHEET_ID,
      range: `'${sheetName}'!A:M`,
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values: [[
          data.date,
          data.camp,
          data.amount,
          data.camperName,
          data.camperEmail,
          data.position,
          data.graduationYear,
          data.school,
          data.parentName,
          data.parentEmail,
          data.parentPhone,
          'Paid',
          data.paymentId,
        ]],
      },
    });

    console.log(`Added registration to ${sheetName} sheet`);
  } catch (error) {
    console.error('Google Sheets error:', error);
  }
}

export async function POST(request: NextRequest) {
  const body = await request.text();
  const signature = request.headers.get('stripe-signature')!;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch (err) {
    console.error('Webhook signature verification failed:', err);
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session;
    const metadata = session.metadata || {};

    await addToSheet({
      date: new Date().toLocaleString('en-US', { timeZone: 'America/New_York' }),
      camp: metadata.campId || '',
      amount: `$${((session.amount_total || 0) / 100).toFixed(2)}`,
      camperName: metadata.camperName || '',
      camperEmail: metadata.camperEmail || '',
      position: metadata.position || '',
      graduationYear: metadata.graduationYear || '',
      school: metadata.school || '',
      parentName: metadata.parentName || '',
      parentEmail: session.customer_email || '',
      parentPhone: metadata.parentPhone || '',
      paymentId: session.payment_intent as string || session.id,
    });
  }

  return NextResponse.json({ received: true });
}
