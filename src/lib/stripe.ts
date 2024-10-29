// lib/stripe.ts
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

// Atualizando a interface para incluir todas as propriedades necessárias
interface CreateCheckoutSessionData {
  customerEmail: string;
  planId: string;
  isAnnual?: boolean;
  priceAmount?: number;
}

// Mapeamento dos IDs de preço do Stripe
const STRIPE_PRICES = {
  starter: {
    monthly: 'price_1QFH59GCteyxoxfG2CYEFNfV', // Substitua pelo seu ID
    annual: 'price_1QFHDIGCteyxoxfGk9x58AGD',  // Substitua pelo seu ID
    setup_fee: 'price_1QFH8gGCteyxoxfGoXfSLUeY' // Taxa de setup
  },
  professional: {
    monthly: 'price_1QFH6dGCteyxoxfG0VZpLPOu', // Substitua pelo seu ID
    annual: 'price_1QFHaQGCteyxoxfGtMVSWU3e',  // Substitua pelo seu ID
    setup_fee: 'price_1QFH8gGCteyxoxfGoXfSLUeY' // Taxa de setup
  },
  enterprise: {
    monthly: 'price_1QFH7dGCteyxoxfGci2ElZal', // Substitua pelo seu ID
    annual: 'price_1QFHcCGCteyxoxfGAwFcy2mL',  // Substitua pelo seu ID
    setup_fee: 'price_1QFH8gGCteyxoxfGoXfSLUeY' // Taxa de setup
  }
} as const;

export async function createCheckoutSession({
  customerEmail,
  planId,
  isAnnual = false,
}: CreateCheckoutSessionData) {
  try {
    // Validar o plano
    if (!STRIPE_PRICES[planId as keyof typeof STRIPE_PRICES]) {
      throw new Error('Plano inválido');
    }

    const response = await fetch('/api/create-checkout-session', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        customerEmail,
        planId,
        isAnnual,
        priceId: STRIPE_PRICES[planId as keyof typeof STRIPE_PRICES][isAnnual ? 'annual' : 'monthly'],
        setupFeeId: STRIPE_PRICES[planId as keyof typeof STRIPE_PRICES].setup_fee,
        successUrl: `${window.location.origin}/success`,
        cancelUrl: `${window.location.origin}/#pricing`,
      }),
    });

    const session = await response.json();

    if (session.error) {
      throw new Error(session.error);
    }

    const stripe = await stripePromise;
    if (!stripe) {
      throw new Error('Stripe não inicializado');
    }

    const { error } = await stripe.redirectToCheckout({
      sessionId: session.id,
    });

    if (error) {
      throw new Error(error.message);
    }
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}