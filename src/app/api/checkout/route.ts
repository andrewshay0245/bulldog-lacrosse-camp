import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { google } from 'googleapis';
import { getPositionLimits, getSheetName, hasPositionLimits } from '@/lib/camp-config';

// Initialize Stripe lazily to avoid build-time errors
function getStripe() {
  if (!process.env.STRIPE_SECRET_KEY) {
    throw new Error('STRIPE_SECRET_KEY is not configured');
  }
  return new Stripe(process.env.STRIPE_SECRET_KEY);
}

async function checkPositionAvailability(campId: string, position: string): Promise<{ available: boolean; spotsLeft: number }> {
  const positionLimits = getPositionLimits(campId);
  if (!positionLimits) {
    return { available: true, spotsLeft: 999 };
  }

  const auth = new google.auth.GoogleAuth({
    credentials: {
      client_email: process.env.GOOGLE_SERVICE_EMAIL,
      private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    },
    scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
  });

  const sheets = google.sheets({ version: 'v4', auth });
  const sheetName = getSheetName(campId);

  const response = await sheets.spreadsheets.values.get({
    spreadsheetId: process.env.GOOGLE_SHEET_ID,
    range: `'${sheetName}'!A:M`,
  });

  const rows = response.data.values || [];
  let count = 0;

  for (const row of rows) {
    if (!row[0] || row[0] === 'Date') continue;
    if (row[5]?.trim() === position) {
      count++;
    }
  }

  const limit = positionLimits[position] || 0;
  const spotsLeft = Math.max(0, limit - count);

  return {
    available: spotsLeft > 0,
    spotsLeft,
  };
}

// Calculate Stripe processing fee (2.9% + $0.30)
function calculateProcessingFee(amountCents: number): number {
  const percentageFee = Math.round(amountCents * 0.029);
  const flatFee = 30; // $0.30 in cents
  return percentageFee + flatFee;
}

const camps: Record<string, { name: string; price: number; description: string }> = {
  'summer': {
    name: 'Summer Day Camp',
    price: 37500, // $375.00 in cents
    description: '4-day instructional camp for ages 7-17',
  },
  'bulldog-120': {
    name: 'Bulldog 120',
    price: 23500, // $235.00 in cents
    description: 'Yale-specific prospect day for high school players',
  },
  'experience': {
    name: 'Bulldog Experience',
    price: 23500, // $235.00 in cents
    description: 'Yale-specific prospect day for high school players',
  },
  'clash': {
    name: 'Bulldog Clash',
    price: 35000, // $350.00 in cents
    description: 'Elite prospect showcase with top D1 coaches',
  },
};

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { campId, camperName, camperEmail, position, graduationYear, school, parentName, parentEmail, parentPhone } = body;

    const camp = camps[campId];
    if (!camp) {
      return NextResponse.json({ error: 'Invalid camp selected' }, { status: 400 });
    }

    // Check position availability for camps with limits
    if (hasPositionLimits(campId) && position) {
      const { available, spotsLeft } = await checkPositionAvailability(campId, position);
      if (!available) {
        return NextResponse.json(
          { error: `Sorry, ${position} registration is now full. Please select a different position.` },
          { status: 400 }
        );
      }
      console.log(`${campId} ${position}: ${spotsLeft} spots remaining`);
    }

    // Calculate processing fee
    const processingFee = calculateProcessingFee(camp.price);

    // Create Stripe Checkout Session
    const stripe = getStripe();
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: camp.name,
              description: camp.description,
            },
            unit_amount: camp.price,
          },
          quantity: 1,
        },
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: 'Processing Fee',
              description: 'Credit card processing fee (2.9% + $0.30)',
            },
            unit_amount: processingFee,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/register/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/register?camp=${campId}`,
      customer_email: parentEmail,
      metadata: {
        campId,
        camperName,
        camperEmail: camperEmail || '',
        position: position || '',
        graduationYear: graduationYear || '',
        school: school || '',
        parentName,
        parentPhone: parentPhone || '',
      },
    });

    return NextResponse.json({ sessionId: session.id, url: session.url });
  } catch (error) {
    console.error('Stripe error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json(
      { error: `Failed to create checkout session: ${errorMessage}` },
      { status: 500 }
    );
  }
}
