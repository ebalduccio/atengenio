// app/api/create-checkout-session/route.ts
import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-09-30.acacia',
});

export async function POST(request: Request) {
  try {
    const { customerEmail, priceId, setupFeeId, successUrl, cancelUrl } = await request.json();

    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      payment_method_types: ['card'],
      customer_email: customerEmail,
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
        {
          price: setupFeeId,
          quantity: 1,
        }
      ],
      success_url: successUrl,
      cancel_url: cancelUrl,
      metadata: {
        setupFeeIncluded: 'true',
      },
    });

    return NextResponse.json({ id: session.id });
  } catch (error) {
    console.error('Error:', error);
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json({ error: 'Unknown error occurred' }, { status: 500 });
  }
}