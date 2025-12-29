import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

// Initialize Stripe lazily to avoid build-time errors
function getStripe() {
  if (!process.env.STRIPE_SECRET_KEY) {
    throw new Error('STRIPE_SECRET_KEY is not configured');
  }
  return new Stripe(process.env.STRIPE_SECRET_KEY);
}

const camps: Record<string, { name: string; price: number; description: string }> = {
  'summer': {
    name: 'Summer Lacrosse Camp',
    price: 35000, // $350.00 in cents
    description: '4-day instructional camp for ages 7-17',
  },
  'bulldog-120': {
    name: 'Bulldog 120',
    price: 12500, // $125.00 in cents
    description: 'Intensive clinic for high school players',
  },
  'experience': {
    name: 'Bulldog Experience',
    price: 13500, // $135.00 in cents
    description: 'Immersive training for high school players',
  },
  'clash': {
    name: 'Bulldog Clash',
    price: 35000, // $350.00 in cents
    description: 'Elite prospect showcase',
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
    return NextResponse.json(
      { error: 'Failed to create checkout session' },
      { status: 500 }
    );
  }
}
